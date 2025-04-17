import { useDash } from "@/hooks/useDash";
import { Project, useProject } from "@/hooks/useProject";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { ChartProject } from "./charts/ChartProject";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { SelectGroup } from "@radix-ui/react-select";
import {
  // DataMakerFor24Hours,
  DataMakerFor6Hours,
  // DataMakerFor7Days,
} from "@/helpers/helpers";
const Storage = () => {
  const { activeTab } = useDash();
  const user = useUser();
  const { activeProject, setActiveProject } = useProject();
  const [currProject, setcurrProject] = useState<Project | undefined>(
    activeProject
  );

  const [chartDataD, setChartDataD] = useState<
    { time: string; Usage: number }[]
  >([]);

  const [chartDataU, setChartDataU] = useState<
    { time: string; Usage: number }[]
  >([]);

  const [backg, setbackground] = useState(
    activeProject?.isActiveStorage ? "bg-green-900" : "bg-muted/50"
  );

  const getDownloadAnalytics = async (dataReq: {
    scope: number;
    interval: number;
  }) => {
    try {
      const responseDown = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/analytics/storage/download/${
          activeProject?.name
        }/${dataReq.scope}/${dataReq.interval}`,
        {
          headers: {
            ClerkID: user.user?.id,
            SecretKey: import.meta.env.VITE_SECRET_KEY,
            XTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }
      );

      const responseUpload = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/analytics/storage/upload/${
          activeProject?.name
        }/${dataReq.scope}/${dataReq.interval}`,
        {
          headers: {
            ClerkID: user.user?.id,
            SecretKey: import.meta.env.VITE_SECRET_KEY,
            XTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }
      );
      console.log(responseDown.data.storage);
      console.log(responseUpload.data.storage);
      if (responseDown.data.storage && responseUpload.data.storage) {
        const dataD = DataMakerFor6Hours({
          time: responseDown.data.storage.XTimeStr,
          usage: responseDown.data.storage.YFreq,
        });

        setChartDataD(dataD);
        const dataB = DataMakerFor6Hours({
          time: responseUpload.data.storage.XTimeStr,
          usage: responseUpload.data.storage.YFreq,
        });
        setChartDataU(dataB);
        toast.success("Analytics Updated");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching analytics");
    }
  };

  useEffect(() => {
    setcurrProject(activeProject);
    if (activeProject) {
      getDownloadAnalytics({
        scope: 21600,
        interval: 3600,
      });
    }
  }, [activeTab, activeProject]);

  const setToogle = async (value: boolean) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/toggleservice`,
        {
          Name: activeProject?.name,
          Storage: value,
          Cache: activeProject?.isActiveCache,
        },
        {
          headers: {
            ClerkID: user.user?.id,
            SecretKey: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      toast("Service Policy has been updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
  const handleToggle = (value: boolean) => {
    if (!currProject) return;
    const updated = {
      ...currProject,
      isActiveStorage: value,
    };
    setcurrProject(updated);
    setActiveProject(updated);
    setToogle(value);
    if (value) {
      setbackground("bg-green-900");
    } else {
      setbackground("bg-muted/50");
    }
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
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div
          className={` p-8  rounded-xl ${backg} flex flex-col justify-evenly gap-2`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-6xl font-bold text-foreground">
              Storage Service
            </h2>
            <Switch
              id="storage-toggle"
              className="scale-125"
              checked={currProject?.isActiveStorage}
              onCheckedChange={handleToggle}
            />
          </div>

          <div className="flex items-center gap-4">
            {activeProject?.isActiveStorage ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <XCircle className="text-red-500 w-6 h-6" />
            )}
            <div className="flex gap-5 items-center ">
              <Label
                htmlFor="storage-toggle"
                className="text-lg font-medium text-muted-foreground"
              >
                Current Status
              </Label>
              <span
                className={`mt-1 w-fit px-3 py-1 rounded-full text-sm font-semibold ${
                  activeProject?.isActiveStorage
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {activeProject?.isActiveStorage ? "Running" : "Stopped"}
              </span>
            </div>
          </div>
          <p>
            <p>Enabling new services may incur additional charges.</p>
          </p>
          {/* <div className="flex items-center gap-5">
            <p>Anaytics Time Duration</p>
            <Select defaultValue="6" onValueChange={(e) => handleSelect(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="6">Last 6 hours</SelectItem>
                  <SelectItem value="24">Last 24 hrs</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
        </div>

        <div className=" rounded-xl bg-muted/50">
          <ChartProject
            chartData={chartDataD}
            title={"Upload Activity"}
            description={"Track how your file uploads have evolved.."}
            footerContent={"Uploads Analytics are calculated using AI."}
          />
        </div>
      </div>

      <ScrollArea className="min-h-[50vh] flex-1 p-10 rounded-xl bg-muted/50 flex flex-col justify-evenly md:min-h-min">
        <ChartProject
          chartData={chartDataU}
          title={"Download Trends"}
          description={"Monitor how often your files have been downloaded..."}
          footerContent={"Downloads Analytics are calculated using AI."}
        />
      </ScrollArea>
    </div>
  );
};

export default Storage;
