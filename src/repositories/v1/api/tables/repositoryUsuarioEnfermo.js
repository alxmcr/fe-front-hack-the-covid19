import AxiosRepository from "../../../AxiosRepository";

const resource = "/usuarios-enfermos";
export default {
  get() {
    return AxiosRepository.get(`${resource}`);
  },

  getUsuarioEnfermo(id) {
    return AxiosRepository.get(`${resource}/${id}`);
  },

  createUsuarioEnfermo(payload) {
    return AxiosRepository.post(`${resource}`, payload);
  },

  deleteUsuarioEnfermo(id) {
    return AxiosRepository.delete(`${resource}/${id}`);
  },

  updateUsuarioEnfermo(id, payload) {
    return AxiosRepository.put(`${resource}/${id}`, payload);
  },
};
