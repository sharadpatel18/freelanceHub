import { ProjectType } from "@/types/projects";
import { create } from "zustand";

interface IProjectStore {
  projects: ProjectType[];

  setProjects: (projects: ProjectType[]) => void;
  addProject: (project: ProjectType) => void;
  updateProject: (id: string, data: Partial<ProjectType>) => void;
  removeProject: (id: string) => void;
  clearProjects: () => void;
}

export const useProjectStore = create<IProjectStore>((set) => ({
  projects: [],

  setProjects: (projects) => {
    set({ projects });
  },

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProject: (id, data) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  clearProjects: () => set({ projects: [] }),
}));
