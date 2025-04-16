import { Timeline } from "@/components/ui/timeline";
import { CodeBlockCopy } from "./CodeBlockCopy";
import { codeInit } from "@/constants/code-snippet";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { IconArrowRight } from "@tabler/icons-react";

export function LandingLast() {
  const navigate = useNavigate();
  const code1 = `# First, install create-vault globally (only needed once)
npm i -g create-vault      
# Then, create a new VaultBase project
npx create-vault@latest
`;
  const code2 = `
  # Run this command in Root folder of your App.
      vault-base deploy < githubPublicUrl >
      `;

  const data = [
    {
      title: "Install and Setup ",
      content: <CodeBlockCopy lines={[2, 4]} code={code1} />,
    },
    {
      title: "API Keys",
      content: (
        <div className="flex justify-center items-center gap-10">
          <p className="text-neutral-800 dark:text-neutral-200 text-xl flex justify-center items-center gap-5  ">
            Generate API keys from DashBoard <IconArrowRight />
          </p>
          <SignedIn>
            <Button variant={"default"} onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          </SignedIn>
          <SignedOut>
            <Button variant="outline" className=" cursor-pointer">
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      ),
    },
    {
      title: "Storage & Cache",
      content: (
        <CodeBlockCopy
          lang="javascript"
          lines={[4, 6, 9, 10]}
          name="vault.js"
          code={codeInit}
        />
      ),
    },
    {
      title: "Vault-Deploy",
      content: <CodeBlockCopy lines={[3]} code={code2} />,
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
