import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./prisma";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import AgentService from "./services/AgentService";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Discord, Google],
  events: {
    createUser: async ({ user }) => {
      if (user.id === undefined) {
        return;
      }

      const agentService = await AgentService.get();
      await agentService.createAgent(user.id);
    },
  },
} satisfies NextAuthConfig;
