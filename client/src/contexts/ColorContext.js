import { createContext, useState } from 'react';


export const ColorContext = createContext({});

export const ColorContextProvider = ({children}) => {
    const [color, setColor] = useState()

    return (
        <ColorContext.Provider value={{color, setColor}}>
            {children}
        </ColorContext.Provider>
    )
}