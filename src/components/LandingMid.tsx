"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { TitleOfScroll } from "./ui/TitleOfScroll";
import { CodeBlockCopy } from "./CodeBlockCopy";
import ImageSlider from "./ImageSlider";

export function LandingMid() {
  const images = Array.from({ length: 30 }, (_, i) => {
    if (i < 10) {
      return `/screenshots/0${i + 1}.png`;
    } else {
      return `/screenshots/${i + 1}.png`;
    }
  });

  const code1 = `# First, install create-vault globally (only needed once)
      npm i -g create-vault
      
      # Then, create a new VaultBase project
      npx create-vault@latest
      `;
  return (
    <div className="relative mx-auto  flex h-screen w-screen   flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="z-20 w-full mb-14  ">
        <TitleOfScroll />
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        Setting up your stack shouldn't feel like solving a Rubik's Cube
        blindfolded. Vault Base gets you from zero to running in record time —
        no copy-pasting required.
      </p>
      <div className="relative z-20 ">
        <CodeBlockCopy code={code1} />
      </div>
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none hidden sm:flex absolute  inset-0 h-screen w-full opacity-50"
        images={images}
      />
      <ImageSlider />
    </div>
  );
}
