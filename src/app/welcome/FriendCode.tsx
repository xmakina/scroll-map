"use client";

import Button from "@/components/ui/Button";
import LabeledInput from "@/components/ui/LabeledInput";
import React, { useState } from "react";

type Props = {
  onSubmit: (friendCode: string) => Promise<void>;
};

const FriendCode = ({ onSubmit }: Props) => {
  const [friendCode, setFriendCode] = useState("");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="italic text-md">Do you have a friend code?</div>
      <div className="flex flex-col items-center gap-2">
        <LabeledInput
          id="friend-code"
          value={friendCode}
          onChange={(e) => setFriendCode(e.target.value)}
        >
          Friend Code
        </LabeledInput>
        <Button onClick={() => onSubmit(friendCode)}>Join up!</Button>
      </div>
    </div>
  );
};

export default FriendCode;
