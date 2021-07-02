import React, { createContext } from 'react';

const AddingSvgContext = createContext();

const AddingSvgContextProvider = ({ children }) => {
  return (
    <AddingSvgContext.Provider value={{ thisIs: 'a string' }}>
      {children}
    </AddingSvgContext.Provider>
  );
};

export default AddingSvgContextProvider;
export { AddingSvgContext };
