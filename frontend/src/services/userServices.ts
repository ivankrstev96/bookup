import axios from "./http";
import {UserDto} from "../types/UserDto";
import {UserUpsertDto} from "../types/UserUpsertDto";

const apiUri = `/api/v1/users`;

export const getCurrentUser = (): Promise<UserDto> => {
  return axios.get(`${apiUri}/current-user`)
      .then(response => response.data);
}

export const register = (userUpsertDto: UserUpsertDto): Promise<UserDto> => {
  return axios.post(`${apiUri}/register`, userUpsertDto)
      .then(response => response.data);
}