import { ConfigKey, PrismaClient } from "@prisma/client";
import { parseArgs } from "node:util";

const options = { environment: { type: "string" } } as const;

const prisma = new PrismaClient();

export default async function seed() {
  const {
    values: { environment },
  } = parseArgs({ options });

  await prisma.config.create({
    data: {
      key: ConfigKey.DurationMultiplier,
      value: "1",
    },
  });

  switch (environment) {
    case "test":
      await prisma.user.create({
        data: {},
      });
      break;
    default:
      break;
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
