import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";

const Host = () => {
  // const { activeProject } = useProject();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ScrollArea className="min-h-[100vh] flex-1 p-10 rounded-xl bg-muted/50 flex flex-col  md:min-h-min">
        <div className="flex flex-col gap-2">
          <h2 className="text-6xl">Under Developement</h2>
          <Separator />
          <p className="text-lg ">
            This page is currently under development. Please check back later
            for updates.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Host;
