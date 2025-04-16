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
import { DataMakerFor6Hours } from "@/helpers/helpers";
const Cache = () => {
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
    activeProject?.isActiveCache ? "bg-green-900" : "bg-muted/50"
  );

  const getDownloadAnalytics = async (dataReq: {
    scope: number;
    interval: number;
  }) => {
    try {
      const responseDown = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/analytics/cache/get/${
          activeProject?.name
        }/${dataReq.scope}/${dataReq.interval}`,
        {
          headers: {
            clerkID: user.user?.id,
            secret_key: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );

      const responseUpload = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/analytics/cache/put/${
          activeProject?.name
        }/${dataReq.scope}/${dataReq.interval}`,
        {
          headers: {
            clerkID: user.user?.id,
            secret_key: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );

      console.log(responseDown.data.cache);
      console.log(responseUpload.data.cache);
      if (responseDown.data.cache && responseUpload.data.cache) {
        const dataD = DataMakerFor6Hours({
          time: responseDown.data.cache.XTimeStr,
          usage: responseDown.data.cache.YFreq,
        });

        setChartDataD(dataD);
        const dataB = DataMakerFor6Hours({
          time: responseUpload.data.cache.XTimeStr,
          usage: responseUpload.data.cache.YFreq,
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
    getDownloadAnalytics({
      scope: 21600,
      interval: 3600,
    });
  }, [activeTab, activeProject]);

  const setToogle = async (value: boolean) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/toggleservice`,
        {
          Name: activeProject?.name,
          Storage: activeProject?.isActiveStorage,
          Cache: value,
        },
        {
          headers: {
            clerkID: user.user?.id,
            secret_key: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      toast("Service Policy has been updated");
    } catch (error) {
      toast("Something went wrong");
      console.error(error);
    }
  };
  const handleToggle = (value: boolean) => {
    if (!currProject) return;
    const updated = {
      ...currProject,
      isActiveCache: value,
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
      <div className="grid auto-rows-min  gap-4 md:grid-cols-2">
        <div
          className={` p-10 rounded-xl ${backg} flex flex-col justify-evenly gap-6`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-6xl font-bold text-foreground">
              Cache Service
            </h2>
            <Switch
              id="storage-toggle"
              className="scale-125"
              checked={currProject?.isActiveCache}
              onCheckedChange={handleToggle}
            />
          </div>

          <div className="flex items-center gap-4">
            {activeProject?.isActiveCache ? (
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
                  activeProject?.isActiveCache
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {activeProject?.isActiveCache ? "Running" : "Stopped"}
              </span>
            </div>
          </div>
          <p>
            <p>Enabling new services may incur additional charges.</p>
          </p>
        </div>
        {/* import {(CheckCircle, XCircle)} from "lucide-react"; */}
        <div className="aspect-video rounded-xl bg-muted/50">
          <div className=" rounded-xl bg-muted/50">
            <ChartProject
              chartData={chartDataU}
              title={"Set Cache Activity"}
              description={"Track how your Cache Usage have evolved.."}
              footerContent={"Set Analytics are calculated using AI."}
            />
          </div>
        </div>
      </div>

      <ScrollArea className="min-h-[100vh] flex-1 p-10 rounded-xl bg-muted/50 flex flex-col justify-evenly md:min-h-min">
        <ChartProject
          chartData={chartDataD}
          title={"Retriving Trends"}
          description={"Monitor how often your Cache have been retrieved..."}
          footerContent={"Retrieve Analytics are calculated using AI."}
        />
      </ScrollArea>
    </div>
  );
};

export default Cache;
