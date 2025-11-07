import axios from "axios";
import { toast } from "sonner";

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
    const responce = await axios.get("/api/projects");
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
    return responce.data;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to get all projects");
  }
};
