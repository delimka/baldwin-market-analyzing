import * as PrismaPkg from "@prisma/client";

type PrismaClientLike = {
  $executeRawUnsafe: (query: string, ...values: unknown[]) => Promise<unknown>;
  $queryRawUnsafe: <T = unknown>(query: string, ...values: unknown[]) => Promise<T>;
};

const PrismaClientCtor = (PrismaPkg as { PrismaClient?: new (options?: unknown) => PrismaClientLike })
  .PrismaClient;
const accelerateUrl = process.env.DATABASE_URL;

if (!PrismaClientCtor) {
  throw new Error(
    "Prisma client is not generated. Run `npx prisma generate` before starting the app.",
  );
}
if (!accelerateUrl) {
  throw new Error("DATABASE_URL is missing");
}

const globalForPrisma = globalThis as typeof globalThis & {
  __prisma?: PrismaClientLike;
};

export const prisma =
  globalForPrisma.__prisma ??
  new PrismaClientCtor({
    accelerateUrl,
  } as unknown as object);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}
