import axios from "axios";
import { toast } from "sonner";

export const sendEstimate = async (data: any, projectId: string) => {
  try {
    const response = await axios.post(
      `/api/projects/estimate?projectId=${projectId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to send estimate");
  }
};

export const getEstimateByProjectId = async (projectId: string) => {
  try {
    const response = await axios.get(
      `/api/projects/estimate?projectId=${projectId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to get estimate");
    throw new Error("Failed to get estimate");
  }
};

export const getEstimateById = async (id: string) => {
  try {
    const response = await axios.get(`/api/projects/estimate/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("somethning went wrong");
    throw new Error("failed to get estimate");
  }
};

export const getEstimateByUserId = async () => {
  try {
    const response = await axios.get("/api/projects/estimate/user");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("something went wrong");
    throw new Error("failed to get estimate");
  }
};
