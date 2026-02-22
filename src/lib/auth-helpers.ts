import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './db';

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    return session?.user;
}

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}

export async function requireAdmin() {
    const user = await requireAuth();
    const role = (user as any).role;

    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        throw new Error('Forbidden - Admin access required');
    }

    return user;
}

export async function isVIP(userId: number) {
    const subscription = await prisma.subscription.findUnique({
        where: { userId },
    });

    if (!subscription) return false;

    return (
        subscription.status === 'ACTIVE' &&
        subscription.currentPeriodEnd > new Date()
    );
}
