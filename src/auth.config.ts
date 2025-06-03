import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./prisma";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import PlayerService from "./services/PlayerService";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Discord, Google],
  events: {
    createUser: async ({ user }) => {
      if (user.id === undefined) {
        return;
      }

      const agentService = await PlayerService.get();
      await agentService.createPlayer(user.id);
    },
  },
} satisfies NextAuthConfig;
