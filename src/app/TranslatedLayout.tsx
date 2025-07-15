import PlayerContext from "@/context/PlayerContext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { tryGetPlayer } from "./queries";
import { WithAuth } from "./WithAuth";
import Login from "@/components/auth-components";
import { auth } from "@/auth";
import TopNavigation from "@/components/TopNavigation";

type Props = {
  children: ReactNode;
};

const TranslatedLayout = async ({ children }: Props) => {
  const session = await auth();

  const login = <Login user={session?.user} />;
  return (
    <div className="flex flex-col mt-2 px-8">
      <SessionProvider>
        <WithAuth>
          <PlayerContext playerId={(await tryGetPlayer())?.id}>
            <div className="flex flex-col gap-2">
              {session?.user && <TopNavigation />}
              <div id="content" className="mb-24 grow">
                <main className="flex flex-row justify-start items-start pb-48">
                  <div className="flex flex-col items-center justify-start grow">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </PlayerContext>
        </WithAuth>
      </SessionProvider>
      <footer>
        <div className="h-16 mt-auto touch-none flex border-t flex-row items-center justify-evenly fixed bottom-0 left-0 w-screen bg-primary">
          {login}
        </div>
      </footer>
    </div>
  );
};

export default TranslatedLayout;
