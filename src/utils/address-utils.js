import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addAddress = async ({
  address,
  city,
  postalCode,
  country,
  phoneNumber,
  deliveryInstructions,
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/account/address/add`,
      {
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

export const getAddress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/account/address/get`, {
      withCredentials: true, // Send cookies
    });
    return response.data;
  } catch (error) {
    console.log("getAddress Error : ", error);
    throw error.response.data; // {message: "error message", success: false}
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/account/address/delete/${addressId}`,
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
