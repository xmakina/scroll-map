import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./prisma";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Discord, Google],
  events: {
    createUser: async ({ user }) => {
      if (user.id === undefined) {
        return;
      }

      // TODO: Set up new user account
    },
  },
} satisfies NextAuthConfig;
