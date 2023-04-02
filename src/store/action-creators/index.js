import * as filmsActionCreators from "./filmsActionCreator";
import * as singleFilmActionCreators from "./singleFilmActionCreator";

export default {
  ...filmsActionCreators,
  ...singleFilmActionCreators,
};
