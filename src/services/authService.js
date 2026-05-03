import API from "./api";

// signup
export const signup = async (data) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

// login
export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// logout (optional backend call)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};