import AxiosRepository from "../../../AxiosRepository";

const resource = "/viajes";
export default {
  get() {
    return AxiosRepository.get(`${resource}`);
  },

  getViaje(id) {
    return AxiosRepository.get(`${resource}/${id}`);
  },

  createViaje(payload) {
    return AxiosRepository.post(`${resource}`, payload);
  },

  deleteViaje(id) {
    return AxiosRepository.delete(`${resource}/${id}`);
  },

  updateViaje(id, payload) {
    return AxiosRepository.put(`${resource}/${id}`, payload);
  },
};
