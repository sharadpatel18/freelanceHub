import axios from "axios";

export const createProject = async (data: any) => {
  try {
    const responce = await axios.post("/api/projects", data);
    return responce.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create project");
  }
};

export const getProjectByUserId = async () => {
  try {
    const responce = await axios.get("/api/projects");
    return responce.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get project");
  }
};

export const deleteProjectByUserId = async (id: string) => {
  try {
    const responce = await axios.delete(`/api/projects/${id}`);
    return responce.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete project");
  }
};
