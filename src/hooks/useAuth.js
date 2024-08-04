import axios from "../config/axios";
import { saveToken } from "../config/token";

const useAuth = () => {
  const signup = async ({ email, username, password }) => {
    try {
      const response = await axios().post("/user/create", {
        email,
        password,
        username,
      });

      //   console.log(response.data.data);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios().post("/user/login", {
        email,
        password,
      });

      saveToken(response.data.token);
      //   console.log(response.data.token);

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    signup,
    login,
  };
};

export default useAuth;
