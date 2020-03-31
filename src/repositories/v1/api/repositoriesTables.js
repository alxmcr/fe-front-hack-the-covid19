import RutaRepository from "../api/tables/repositoryRuta";
import BusRepository from "../api/tables/repositoryBus";
import ViajeRepository from "../api/tables/repositoryViaje";
import UsuarioRepository from "../api/tables/repositoryUsuario";
import UsuarioEnfermoRepository from "../api/tables/repositoryUsuarioEnfermo";

const RepositoriesTables = {
  ruta: RutaRepository,
  bus: BusRepository,
  viaje: ViajeRepository,
  usuario: UsuarioRepository,
  usuarioEnfermo: UsuarioEnfermoRepository,
};

export default RepositoriesTables;
