import { useMemo } from "react";
import { useNavigate } from "react-router";
import { FlipText } from "../magicui/flip-text";
import { Button } from "./button";

const NotFound = () => {
  const navigate = useNavigate();

  const headlines = [
    "404. Well, that’s awkward.",
    "Lost in the void.",
    "This page ran off. Sorry.",
    "Oops. That wasn’t supposed to happen.",
  ];

  const bodies = [
    "We looked everywhere. Even under the couch. No page.",
    "That page? Poof. Gone. Vanished.",
    "Some say this page never existed. Who are we to argue?",
    "Congrats! You’ve officially reached a digital dead end.",
  ];

  const buttons = [
    "Take Me Home",
    "Back to Safety",
    "Let’s Try Again",
    "Return from the Shadows",
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
        className="mt-4 text-white cursor-pointer px-6 py-2 rounded-xl transition"
      >
        {buttons[safeIndex]}
      </Button>
    </main>
  );
};

export default NotFound;
