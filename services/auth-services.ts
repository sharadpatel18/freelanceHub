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
