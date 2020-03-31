import AxiosRepository from "../../../AxiosRepository";

const resource = "/tienes";
export default {
  get() {
    return AxiosRepository.get(`${resource}`);
  },

  getRelTiene(id) {
    return AxiosRepository.get(`${resource}/${id}`);
  },

  findAllRelTieneByUsuario(us_usuario) {
    return AxiosRepository.get(`${resource}/usuarios/${us_usuario}`);
  },

  findAllRelTieneByViaje(vi_viaje) {
    return AxiosRepository.get(`${resource}/viajes/${vi_viaje}`);
  },

  createRelTiene(payload) {
    return AxiosRepository.post(`${resource}`, payload);
  },

  deleteRelTiene(id) {
    return AxiosRepository.delete(`${resource}/${id}`);
  },

  updateRelTiene(id, payload) {
    return AxiosRepository.put(`${resource}/${id}`, payload);
  }
};
