import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  key?: {
    id: string;
    apiKey: string;
    createdAt: number;
    expiresAt: number;
  };
  isActiveCache: boolean;
  isActiveStorage: boolean;
}

interface ProjectContextType {
  activeProject: Project | undefined;
  activeAllProjects: Project[] | undefined;
  setActiveProject: Dispatch<SetStateAction<Project | undefined>>;
  setActiveAllProject: Dispatch<SetStateAction<Project[] | undefined>>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [activeAllProjects, setActiveAllProject] = useState<
    Project[] | undefined
  >(undefined);
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  );
  const user = useUser();

  const getAllProjects = useCallback(async () => {
    if (!user.user?.id) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/allprojects/${user.user?.id}`,
        {
          headers: {
            ClerkID: user.user?.id,
            SecretKey: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      console.log(response.data);

      const allProjects: Project[] = response.data.allprojs.map(
        (element: any) => ({
          id: element.id,
          name: element.name,
          createdAt: element.createdat,
          key: {
            id: element.keyinfo.id,
            apiKey: element.keyinfo.key,
            createdAt: element.keyinfo.createdat,
            expiresAt: element.keyinfo.expiresat,
          },
          isActiveCache: element.keyinfo.cache,
          isActiveStorage: element.keyinfo.storage,
        })
      );

      setActiveAllProject(allProjects);
    } catch (error) {
      console.error("All projects not set", error);
    }
  }, [user.user?.id]);

  useEffect(() => {
    if (user.user?.id) {
      getAllProjects();
    }
  }, [user.user?.id, getAllProjects]);

  useEffect(() => {
    if (activeAllProjects !== undefined) {
      setActiveProject(activeAllProjects[0]);
    }
  }, [activeAllProjects]);

  return (
    <ProjectContext.Provider
      value={{
        activeProject,
        setActiveProject,
        activeAllProjects,
        setActiveAllProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
