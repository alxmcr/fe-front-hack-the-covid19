import AxiosRepository from "../../../AxiosRepository";

const resource = "/rutas";
export default {
  get() {
    return AxiosRepository.get(`${resource}`);
  },

  getRuta(id) {
    return AxiosRepository.get(`${resource}/${id}`);
  },

  createRuta(payload) {
    return AxiosRepository.post(`${resource}`, payload);
  },

  deleteRuta(id) {
    return AxiosRepository.delete(`${resource}/${id}`);
  },

  updateRuta(id, payload) {
    return AxiosRepository.put(`${resource}/${id}`, payload);
  },
};
