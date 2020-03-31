import AxiosRepository from "../../../AxiosRepository";

const resource = "/usuarios";
export default {
  get() {
    return AxiosRepository.get(`${resource}`);
  },

  getUsuario(id) {
    return AxiosRepository.get(`${resource}/${id}`);
  },

  createUsuario(payload) {
    return AxiosRepository.post(`${resource}`, payload);
  },

  deleteUsuario(id) {
    return AxiosRepository.delete(`${resource}/${id}`);
  },

  updateUsuario(id, payload) {
    return AxiosRepository.put(`${resource}/${id}`, payload);
  },
};
