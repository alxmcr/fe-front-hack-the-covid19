import RepositoriesTables from "../v1/api/repositoriesTables";
import RepositoriesRelationships from "../v1/api/repositoriesRelationships";

const RepositoryAPI = {
  ...RepositoriesTables,
  ...RepositoriesRelationships,
};

export default RepositoryAPI;
