import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { System } from '../models/System.js';
import { SystemAdmin } from '../models/SystemAdmin.js';
import {
    generateAccessToken,
    generateRefreshToken,
    setTokenCookies,
    clearTokenCookies,
} from '../utils/tokens.js';
import { env } from '../config/env.js';

const router = Router();

// POST /api/auth/verify-system-admin
router.post('/verify-system-admin', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    const admin = await SystemAdmin.findOne({ username: username.toLowerCase().trim() });
    if (!admin) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    // Issue a short-lived token for the registration flow
    const adminToken = jwt.sign(
        { adminId: admin._id.toString(), purpose: 'system-registration' },
        env.JWT_ACCESS_SECRET,
        { expiresIn: '30m' }
    );

    res.status(200).json({ message: 'Verified', adminToken });
});

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
    const { adminToken, systemName, email, phone, username, password } = req.body;

    // Verify system admin token
    if (!adminToken) {
        res.status(401).json({ message: 'System admin authorization required' });
        return;
    }

    try {
        const decoded = jwt.verify(adminToken, env.JWT_ACCESS_SECRET) as {
            adminId: string;
            purpose: string;
        };
        if (decoded.purpose !== 'system-registration') {
            res.status(401).json({ message: 'Invalid authorization token' });
            return;
        }
    } catch {
        res.status(401).json({ message: 'Authorization expired, please verify again' });
        return;
    }

    if (!systemName || !email || !phone || !username || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    const existingUser = await User.findOne({
        $or: [
            { email: email.toLowerCase().trim() },
            { username: username.toLowerCase().trim() },
        ],
    });
    if (existingUser) {
        res.status(409).json({ message: 'Email or username already exists' });
        return;
    }

    const existingSystem = await System.findOne({ name: systemName.trim() });
    if (existingSystem) {
        res.status(409).json({ message: 'System name already exists' });
        return;
    }

    // Create user with a placeholder system reference
    const user = await User.create({
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        username: username.toLowerCase().trim(),
        password,
        role: 'superadmin',
        system: new mongoose.Types.ObjectId(), // placeholder, updated below
    });

    try {
        const system = await System.create({
            name: systemName.trim(),
            createdBy: user._id,
        });

        user.system = system._id as mongoose.Types.ObjectId;
        await user.save();

        res.status(201).json({
            message: 'System registered successfully',
            user: { id: user._id, email: user.email, username: user.username, role: user.role },
            system: { id: system._id, name: system.name },
        });
    } catch (error) {
        // Clean up the user if system creation fails
        await User.findByIdAndDelete(user._id);
        throw error;
    }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    setTokenCookies(res, accessToken, refreshToken);

    res.status(200).json({
        message: 'Login successful',
        user: { id: user._id, email: user.email },
    });
});

// POST /api/auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
    const token = req.cookies?.refresh_token;

    if (!token) {
        res.status(401).json({ message: 'No refresh token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as {
            userId: string;
        };

        const user = await User.findById(decoded.userId);
        if (!user) {
            clearTokenCookies(res);
            res.status(401).json({ message: 'Invalid refresh token' });
            return;
        }

        const newAccessToken = generateAccessToken(user._id.toString());
        const newRefreshToken = generateRefreshToken(user._id.toString());

        setTokenCookies(res, newAccessToken, newRefreshToken);

        res.status(200).json({ message: 'Tokens refreshed' });
    } catch {
        clearTokenCookies(res);
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
});

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
    clearTokenCookies(res);
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
