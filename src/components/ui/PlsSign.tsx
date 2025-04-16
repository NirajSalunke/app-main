import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { FlipText } from "../magicui/flip-text";
import { Button } from "./button";

const PlsSign = () => {
  const navigate = useNavigate();

  const headlines = [
    "You’re not signed in. How rebellious of you!",
    "Access denied.",
    "Awkward? You need to sign in to unlock the magic.",
    "You, my friend, are currently... identity-less.",
  ];

  const bodies = [
    "We get it. Passwords are hard. But still — sign in.",
    "Not because we’re mean. You just forgot to sign in.",
    "Look, we love the mystery vibe. But we need to know who you are.",
    "Sign in. Or stare at this page for eternity. Your call.",
  ];

  const buttons = [
    "Fine, I’ll Sign In",
    "Ugh, okay. Take me to the Sign In",
    "Show me the keys 🔐",
    "Unlock the Vault",
  ];

  const safeIndex = useMemo(() => {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % headlines.length;
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col gap-5 justify-center items-center text-center px-4">
      <FlipText className="text-4xl sm:text-6xl font-bold -tracking-widest text-black dark:text-white">
        {headlines[safeIndex]}
      </FlipText>
      <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-lg">
        {bodies[safeIndex]}
      </p>
      <Button
        variant={"outline"}
        onClick={() => navigate("/")}
        className="mt-4  text-white cursor-pointer px-6 py-2 rounded-xl transition"
      >
        {buttons[safeIndex]}
      </Button>
    </main>
  );
};

export default PlsSign;
