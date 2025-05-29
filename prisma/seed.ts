import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const LeaderName = "some-leader-name";
const GovernmentName = "some-government-name";
const LeaderTitle = "some-leader-title";

export default async function () {
  await prisma.user.create({
    data: {
      Agent: {
        create: {
          Governments: {
            create: [
              {
                leaderName: LeaderName,
                name: GovernmentName,
                leaderTitle: LeaderTitle,
                turns: 40,
                maximumTurns: 200,
                StarSystems: {
                  create: [{ name: "Test Star System" }],
                },
              },
            ],
          },
        },
      },
    },
  });
}
