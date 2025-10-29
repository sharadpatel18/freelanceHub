import Axios from "axios";
import { toast } from "sonner";
import type { createUserType } from "@/types/auth-types";

export const createUser = async (data: createUserType) => {
  try {
    const response = await Axios.post("/api/auth/signup", data);
    return response;
  } catch (error) {
    console.error(error);
    toast.error(`Something went wrong ${error}`);
    throw new Error("Failed to create user");
  }
};

export const uploadUserImage = async (data: any) => {
  try {
    const response = await Axios.post("/api/upload", data);
    return response;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to upload image");
  }
};

export const completeProfile = async (data: any) => {
  try {
    const response = await Axios.post("/api/profile/complete", data);
    return response;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    throw new Error("Failed to complete profile");
  }
};

export const getProfile = async () => {
  try {
    const response = await Axios.get("/api/profile");
    return response;
  } catch (error) {
    console.error("Failed to get profile");
    toast.error("Failed to get profile");
    throw new Error("Failed to get profile");
  }
};
