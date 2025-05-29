import { PrismaClient } from "@prisma/client";
import seed from "../../prisma/seed";

const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction([
    prisma.agent.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  await seed();

  console.log("database reset");
};
