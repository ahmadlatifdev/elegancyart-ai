// TEMP Prisma bypass (no DB dependency)

export const adminPrisma = {
  async $queryRawUnsafe() {
    return [];
  },
  async $executeRawUnsafe() {
    return;
  },
};