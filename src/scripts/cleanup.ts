import { prisma } from "../lib/db";
import { cleanupExpiredSessions, cleanupStaleJobs, cleanupExpiredTokens, cleanupOldUsageLedger } from "../lib/cleanup";

async function main() {
  console.log("Starting cleanup...");

  const sessionsRemoved = await cleanupExpiredSessions();
  console.log(`Expired sessions removed: ${sessionsRemoved}`);

  const tokensRemoved = await cleanupExpiredTokens();
  console.log(`Expired verification tokens removed: ${tokensRemoved}`);

  const jobsRemoved = await cleanupStaleJobs();
  console.log(`Stale jobs removed: ${jobsRemoved}`);

  const ledgerRemoved = await cleanupOldUsageLedger();
  console.log(`Old usage ledger entries removed: ${ledgerRemoved}`);

  await prisma.$disconnect();
  console.log("Cleanup complete.");
}

main().catch((error) => {
  console.error("Cleanup failed:", error);
  process.exit(1);
});
