import React from "react";

import FlatOfferData from "../interfaces/FlatOfferData";

const FlatOfferDataContext = React.createContext<{
  flatOfferData: FlatOfferData;
  setFlatOfferData: (newFlatOfferData: FlatOfferData) => void;
}>(null);

export default FlatOfferDataContext;
