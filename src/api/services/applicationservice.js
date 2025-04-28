import axios_instance from "../axios_instance";
export const getSingleApplication = async (id) => {
  try {
    const response = await axios_instance.get(`/application/getApplicationById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error; 
  }
};
