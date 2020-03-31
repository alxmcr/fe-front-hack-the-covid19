import RepositoryAPI from "./v1/apiRepository";

const repositories = {
  ...RepositoryAPI,
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
