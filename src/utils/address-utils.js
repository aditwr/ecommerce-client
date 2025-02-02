import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addAddress = async ({
  userId,
  address,
  city,
  postalCode,
  country,
  phoneNumber,
  deliveryInstructions,
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/account/address/add`,
      {
        userId,
        address,
        city,
        postalCode,
        country,
        phoneNumber,
        deliveryInstructions,
      },
      {
        withCredentials: true, // Send cookies
      }
    );
    return response.data;
  } catch (error) {
    console.log("addNewAddress Error : ", error);
    throw error.response.data;
  }
};

export const getAddress = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/account/address/get/${userId}`,
      {
        withCredentials: true, // Send cookies
      }
    );
    return response.data;
  } catch (error) {
    console.log("getAddress Error : ", error);
    throw error.response.data; // {message: "error message", success: false}
  }
};

export const deleteAddress = async ({ addressId, userId }) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/account/address/delete/${addressId}/user/${userId}`,
      {
        withCredentials: true, // Send cookies
      }
    );
    return response.data;
  } catch (error) {
    console.log("deleteAddress Error : ", error);
    throw error.response.data;
  }
};
