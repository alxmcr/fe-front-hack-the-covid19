import AxiosRepository from "../../../AxiosRepository";

const resource = "/buses";
export default {
  get() {
    return AxiosRepository.get(`${resource}`);
  },

  getBus(id) {
    return AxiosRepository.get(`${resource}/${id}`);
  },

  createBus(payload) {
    return AxiosRepository.post(`${resource}`, payload);
  },

  deleteBus(id) {
    return AxiosRepository.delete(`${resource}/${id}`);
  },

  updateBus(id, payload) {
    return AxiosRepository.put(`${resource}/${id}`, payload);
  },
};
