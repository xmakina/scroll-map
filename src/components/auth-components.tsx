"use client";

import { signIn, signOut } from "next-auth/react";
import React, { ReactNode } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import Link from "next/link";
import { User } from "next-auth";
import { useTranslations } from "next-intl";

type Provider = "github" | "discord" | "google";

const providerLogo: { [key in Provider]: ReactNode } = {
  github: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 1792 1792"
    >
      <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
    </svg>
  ),
  discord: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_13183_10121)">
        <path
          d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
          fill="#3F83F8"
        ></path>
        <path
          d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
          fill="#34A853"
        ></path>
        <path
          d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
          fill="#FBBC04"
        ></path>
        <path
          d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
          fill="#EA4335"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_13183_10121">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  ),
};

function LoginLink({
  provider,
}: { provider: Provider } & React.ComponentPropsWithRef<typeof Button>) {
  const t = useTranslations("LoginLink");
  return (
    <Link
      href={""}
      onClick={() => signIn(provider)}
      className="border-white border-solid border px-5 mx-5 rounded-xl"
    >
      <div className="flex flex-row gap-2">
        <div className="hidden md:flex">
          {t("Login with {provider}", { provider: t(provider) })}
        </div>
        <div className="w-6 h-6">{providerLogo[provider]}</div>
      </div>
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
        <LoginLink provider="google" />
        <LoginLink provider="discord" />
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
