import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});

// Start server
async function start() {
    await connectDB();
    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`);
    });
}

start();
