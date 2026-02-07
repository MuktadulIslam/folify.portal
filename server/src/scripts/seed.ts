import mongoose from 'mongoose';
import { SystemAdmin } from '../models/SystemAdmin.js';
import { env } from '../config/env.js';

async function seed() {
    await mongoose.connect(env.MONGODB_URI);

    // Seed the system admin (gatekeeper for registration)
    const existingAdmin = await SystemAdmin.findOne({ username: 'folify-system-admin' });
    if (existingAdmin) {
        console.log('System admin already exists');
    } else {
        await SystemAdmin.create({
            username: 'folify-system-admin',
            password: 'ilovefolify',
        });
        console.log('System admin created: folify-system-admin / ilovefolify');
    }

    await mongoose.disconnect();
}

seed().catch(console.error);
