import axios from "./http";
import {UserDto} from "../types/UserDto";

const apiUri = `/api/v1/users`;

export const getCurrentUser = (): Promise<UserDto> => {
  return axios.get(`${apiUri}/current-user`)
      .then(response => response.data);
}