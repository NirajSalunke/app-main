import API from "@/components/API";
import { AppSidebar } from "@/components/app-sidebar";
import Cache from "@/components/Cache";
import { CodeBlockCopy } from "@/components/CodeBlockCopy";
import Host from "@/components/Host";
import Storage from "@/components/Storage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  codeInit,
  fileUpload,
  getCache,
  getFile,
  setCache,
} from "@/constants/code-snippet";
import { ActiveTabProvider, useDash } from "@/hooks/useDash";
import { ProjectProvider } from "@/hooks/useProject";
import { CloudDownload, CloudUpload } from "lucide-react";

export default function DashBoard() {
  return (
    <ProjectProvider>
      <ActiveTabProvider>
        <InsideSidebar />
      </ActiveTabProvider>
    </ProjectProvider>
  );
}

const MyBreadcrumb = ({ activeTabNumber }: { activeTabNumber: number }) => {
  const { category, label } = getBreadcrumbInfo(activeTabNumber);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>{category}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const InitCompo = () => (
  <ContentWrapper>
    <h2 className="text-8xl">Initialisation</h2>
    <Separator />
    <p className="text-lg">
      Initialisation configures your service environment and ensures that
      everything is set up correctly from the start.
    </p>
    <p>
      Follow the example below to understand how to initialise your application
      with the required parameters and settings.
    </p>
    <Separator />
    <h2 className="text-4xl">Initialisation Code</h2>
    <CodeBlockCopy
      name="init.ts"
      code={codeInit}
      lines={[4, 7, 8]}
      lang="javascript"
    />
  </ContentWrapper>
);

const StorageDocs = () => (
  <ContentWrapper>
    <h2 className="text-8xl">Storage Service</h2>
    <Separator />
    <p className="text-lg">
      Storage Service is your secure cloud-based partner for managing files
      without the clutter.
    </p>
    <p>We keep it simple by handling just two things....</p>
    <ul className="px-10 flex flex-col gap-5">
      <li className="flex items-center gap-5">
        <CloudUpload /> Upload Your File
      </li>
      <li className="flex items-center gap-5">
        <CloudDownload /> Retrieve Your File
      </li>
    </ul>
    <Separator />
    <h2 className="text-4xl">Uploading File</h2>
    <CodeBlockCopy
      name="upload.ts"
      code={fileUpload}
      lines={[3, 10]}
      lang="javascript"
    />
    <h2 className="text-4xl">Retrieve File</h2>
    <CodeBlockCopy
      name="get.ts"
      code={getFile}
      lines={[3, 9]}
      lang="javascript"
    />
  </ContentWrapper>
);

const CacheDocs = () => (
  <ContentWrapper>
    <h2 className="text-8xl">Cache Service</h2>
    <Separator />
    <p className="text-lg">
      Cache Service is your lightning-fast in-memory key–value store for quick
      lookups.
    </p>
    <p>
      It provides simple APIs to set key–value pairs and retrieve values
      efficiently.
    </p>
    <ul className="px-10 flex flex-col gap-5">
      <li className="flex items-center gap-5">
        <CloudUpload /> Set Key–Value Pair
      </li>
      <li className="flex items-center gap-5">
        <CloudDownload /> Retrieve Value
      </li>
    </ul>
    <Separator />
    <h2 className="text-4xl">Set Key–Value Pair</h2>
    <CodeBlockCopy
      name="set.ts"
      code={setCache}
      lines={[3, 10]}
      lang="javascript"
    />
    <h2 className="text-4xl">Retrieve Value</h2>
    <CodeBlockCopy
      name="get.ts"
      code={getCache}
      lines={[3, 9]}
      lang="javascript"
    />
  </ContentWrapper>
);

const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    <ScrollArea className="min-h-[100vh] flex-1 p-10 rounded-xl bg-muted/50 flex flex-col justify-evenly md:min-h-min">
      <div className="flex flex-col gap-5">{children}</div>
    </ScrollArea>
  </div>
);

const InsideSidebar = () => {
  const { activeTab } = useDash();

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <API />;
      case 2:
        return <Storage />;
      case 3:
        return <Cache />;
      case 4:
        return <Host />;
      case 5:
        return <InitCompo />;
      case 6:
      case 7:
        return <StorageDocs />;
      case 8:
      case 9:
        return <CacheDocs />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <MyBreadcrumb activeTabNumber={activeTab} />
          </div>
        </header>
        {renderContent()}
      </SidebarInset>
    </SidebarProvider>
  );
};

const getBreadcrumbInfo = (tabNumber: number) => {
  switch (tabNumber) {
    case 1:
      return { category: "Services", label: "API Key" };
    case 2:
      return { category: "Services", label: "Storage" };
    case 3:
      return { category: "Services", label: "Cache" };
    case 4:
      return { category: "Services", label: "Host" };
    case 5:
      return { category: "Documentation", label: "Initialisation" };
    case 6:
    case 7:
      return { category: "Documentation", label: "Storage" };
    case 8:
    case 9:
      return { category: "Documentation", label: "Cache" };
    default:
      return { category: "", label: "" };
  }
};
