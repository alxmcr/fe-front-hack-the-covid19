import RutaRepository from "../api/tables/repositoryRuta";
import BusRepository from "../api/tables/repositoryBus";
import ViajeRepository from "../api/tables/repositoryViaje";

const RepositoriesTables = {
  ruta: RutaRepository,
  bus: BusRepository,
  viaje: ViajeRepository,
};

export default RepositoriesTables;
