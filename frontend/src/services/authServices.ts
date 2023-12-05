import axios from "./http";

// const {REACT_APP_API_BASE_URL: baseUrl} = process.env;
const apiUri = `/api/v1/login`;

export const login = (username: string, password: string) => {
  const data = {
    username,
    password
  }
  return axios.post(apiUri, data)
}