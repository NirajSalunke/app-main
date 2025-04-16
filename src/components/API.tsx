import { useDash } from "@/hooks/useDash";
import { useProject } from "@/hooks/useProject";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
// import { Separator } from "@radix-ui/react-separator";
import { CodeBlockCopy } from "./CodeBlockCopy";
import { codeInit } from "@/constants/code-snippet";
import { Separator } from "./ui/separator";

const API = () => {
  const { activeTab } = useDash();
  const { activeProject } = useProject();
  const [currProj, setCurrProj] = useState(activeProject);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copymsg, setcopymsg] = useState("Copy");

  useEffect(() => {
    setCurrProj(activeProject);
    console.log(currProj);
  }, [activeTab, activeProject]);

  const handleCopy = () => {
    setcopymsg("Copied");
    if (activeProject?.key?.apiKey) {
      navigator.clipboard.writeText(activeProject.key.apiKey);
    }
    setTimeout(() => {
      setcopymsg("Copy");
    }, 2000);
  };
  if (!activeProject) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-gray-500 text-3xl">
        <div>No Project Selected...</div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ScrollArea className="min-h-[100vh] flex-1 p-10 rounded-xl bg-muted/50 flex flex-col justify-evenly md:min-h-min">
        <div className="text-6xl font-bold mb-8">API Keys</div>

        <div className="flex flex-col gap-4 max-w-md">
          <label
            htmlFor="apikey"
            className="text-lg font-medium text-muted-foreground"
          >
            API Key
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="apikey"
              type={apiKeyVisible ? "text" : "password"}
              value={activeProject?.key?.apiKey ?? ""}
              readOnly
              className="flex-1 min-w-[50vw] "
            />
            <Button
              variant="outline"
              onClick={() => setApiKeyVisible((prev) => !prev)}
            >
              {apiKeyVisible ? "Hide" : "Show"}
            </Button>
            <Button variant="default" onClick={handleCopy}>
              {copymsg}
            </Button>
          </div>
        </div>

        <Separator className="my-10" />
        <div className="flex flex-col gap-10">
          <h2 className="text-4xl">Initialisation Code</h2>
          <CodeBlockCopy
            name="init.ts"
            code={codeInit}
            lines={[4, 7, 8]}
            lang="javascript"
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default API;
