"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Button from "./ui/Button";
import Link from "next/link";
import { User } from "next-auth";

function LoginLink({
  provider,
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Link
      href={""}
      onClick={() => signIn(provider)}
      className="border-white border-solid border px-5 mx-5 rounded-xl"
    >
      Sign in
    </Link>
  );
}

function LogoutLink() {
  return (
    <Link href={"/"} onClick={() => signOut()} className="text-subtle">
      Sign out
    </Link>
  );
}

type Props = {
  user?: User;
};

const Login = ({ user }: Props) => {
  if (!user) {
    return (
      <div className="flex flex-row text-center items-center justify-evenly">
        <LoginLink provider="github" />
      </div>
    );
  }

  return (
    <div className="flex flex-row text-center items-center justify-evenly">
      {user.image ? (
        <Image
          src={user.image}
          alt="user profile avatar"
          referrerPolicy="no-referrer"
          width={48}
          height={48}
          className="rounded-full"
          priority
        />
      ) : (
        <div className="rounded-full border border-white border-solid">
          {user.name}
        </div>
      )}
      <div className="px-2">
        <p>{user.name}</p>
        <LogoutLink />
      </div>
    </div>
  );
};

export default Login;
