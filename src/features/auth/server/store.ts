import { prisma } from "@/shared/lib/server/prisma";
import { hashSessionToken } from "./session";

type AuthUserRow = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
};

type PrismaAuthClient = {
  user: {
    findUnique(args: {
      where: { email?: string; id?: string };
      select?: {
        id?: boolean;
        email?: boolean;
        name?: boolean;
        passwordHash?: boolean;
      };
    }): Promise<AuthUserRow | null>;
    create(args: {
      data: { email: string; name: string | null; passwordHash: string };
      select?: {
        id?: boolean;
        email?: boolean;
        name?: boolean;
        passwordHash?: boolean;
      };
    }): Promise<AuthUserRow>;
  };
  session: {
    findFirst(args: {
      where: { tokenHash: string; expiresAt: { gt: Date } };
      select: { user: { select: { id: boolean; email: boolean; name: boolean; passwordHash: boolean } } };
    }): Promise<{ user: AuthUserRow } | null>;
    create(args: {
      data: { userId: string; tokenHash: string; expiresAt: Date };
    }): Promise<unknown>;
    deleteMany(args: { where: { tokenHash?: string; expiresAt?: { lte: Date } } }): Promise<unknown>;
  };
};

function getAuthDb(): PrismaAuthClient {
  const db = prisma as unknown as Partial<PrismaAuthClient>;
  if (!db.user || !db.session) {
    throw new Error("Prisma client is not generated with User/Session models. Run `npx prisma generate`.");
  }
  return db as PrismaAuthClient;
}

export async function findUserByEmail(email: string) {
  const db = getAuthDb();
  return db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true, email: true, name: true, passwordHash: true },
  });
}

export async function findUserBySessionToken(token: string) {
  const db = getAuthDb();
  const tokenHash = hashSessionToken(token);
  const session = await db.session.findFirst({
    where: {
      tokenHash,
      expiresAt: { gt: new Date() },
    },
    select: {
      user: { select: { id: true, email: true, name: true, passwordHash: true } },
    },
  });
  return session?.user ?? null;
}

export async function createUser(payload: { email: string; name?: string; passwordHash: string }) {
  const db = getAuthDb();
  return db.user.create({
    data: {
      email: payload.email.toLowerCase(),
      name: payload.name ?? null,
      passwordHash: payload.passwordHash,
    },
    select: { id: true, email: true, name: true, passwordHash: true },
  });
}

export async function createSession(payload: { userId: string; token: string; expiresAt: Date }) {
  const db = getAuthDb();
  await db.session.create({
    data: {
      userId: payload.userId,
      tokenHash: hashSessionToken(payload.token),
      expiresAt: payload.expiresAt,
    },
  });
}

export async function deleteSessionByToken(token: string) {
  const db = getAuthDb();
  await db.session.deleteMany({
    where: { tokenHash: hashSessionToken(token) },
  });
}

export async function cleanupExpiredSessions() {
  const db = getAuthDb();
  await db.session.deleteMany({
    where: { expiresAt: { lte: new Date() } },
  });
}

export function toAuthUser(user: AuthUserRow) {
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
  };
}
