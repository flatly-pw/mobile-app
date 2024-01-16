import React from "react";

import Filters from "../interfaces/Filters";

const FiltersContext = React.createContext<{
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
}>(null);

export default FiltersContext;
