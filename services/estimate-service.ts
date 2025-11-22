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
