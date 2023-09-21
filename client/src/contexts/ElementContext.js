import { createContext, useState } from 'react';


export const ElementContext = createContext({});

export const ElementContextProvider = ({children}) => {
    const [element, setElement] = useState()

    return (
        <ElementContext.Provider value={{element, setElement}}>
            {children}
        </ElementContext.Provider>
    )
}