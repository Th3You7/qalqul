import axios from "axios";

const url = "http://localhost:5000";

export const fetchNames = async (name) => {
  try {
    const result = await axios.get(`${url}/user/${name}`);

    return result;
  } catch (error) {
    return error;
  }
};
