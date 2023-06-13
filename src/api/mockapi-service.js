import axios from "axios";

import { settings } from "../helpers/setitngs";

const API_URL = settings.apiURL;

export const getAllData = () => {
  return axios.get(`${API_URL}/SocialMedia`);
};

export const getDataById = (id) => {
  return axios.get(`${API_URL}/SocialMedia/${id}`);
};

export const postData = (newData) => {
  return axios.post(`${API_URL}/SocialMedia`, newData);
};

export const updateDataById = (updateData, id) => {
  return axios.put(`${API_URL}/SocialMedia/${id}`, updateData);
};

export const deleteDataById = (id) => {
  return axios.delete(`${API_URL}/SocialMedia/${id}`);
};
