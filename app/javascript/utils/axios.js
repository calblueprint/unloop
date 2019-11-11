import axios from 'axios';

const config = {
  withCredentials: true,
};

export function apiGet(path) {
  return axios.get(path, config);
}
export function apiPost(path, data) {
  return axios.post(path, data, config);
}

export function apiPatch(path, data) {
  return axios.patch(path, data, config);
}

export function apiPut(path, data) {
  return axios.put(path, data, config);
}

export function apiDelete(path, data) {
  return axios.delete(path, { ...config, ...data });
}
