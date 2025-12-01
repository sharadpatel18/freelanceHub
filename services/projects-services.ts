import axios from "axios";
import { toast } from "sonner";
import { useProjectStore } from "@/store/projects-store";

const { setProjects } = useProjectStore.getState();

export const createProject = async (data: any) => {
  try {
    const responce = await axios.post("/api/projects", data);

    return responce.data;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to create project");
  }
};

export const getProjectByUserId = async () => {
  try {
    // const { setProjects } = useProjectStore.getState();
    const responce = await axios.get("/api/projects");
    setProjects(responce.data.data);
    return responce.data;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to get project");
  }
};

export const deleteProjectByUserId = async (id: string) => {
  try {
    const responce = await axios.delete(`/api/projects/${id}`);
    return responce.data;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to delete project");
  }
};

export const getAllProjects = async () => {
  try {
    const responce = await axios.get("/api/projects/all-project");
    setProjects(responce.data.data);
    // return responce.data;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to get all projects");
  }
};

export const getProjectById = async (id: string) => {
  try {
    const responce = await axios.get(`/api/projects/${id}`);
    setProjects(responce.data.data);
    return responce.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to get project");
    throw new Error("Failed to get project");
  }
};
