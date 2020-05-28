import React, { useState } from 'react';
import axios from 'axios';
import { baseUrlApi } from './baseUrl';



export const LastContext = React.createContext({
    isLoading: true,
    error: '',
    indicadores: null,
    getIndicadores: async _ => { },
});

const endpoint = baseUrlApi + "/last";

const LastContextProvider = props => {
    const [indicadores, setIndicadores] = useState(null);
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const getIndicadoresHandler = async () => {
        try {
            setIsLoading(true);
            if (indicadores) {
                setIsLoading(false);
                return true;
            }
            const response = await axios.get(endpoint);
            
            setIndicadores(response.data.data);
            setIsLoading(false);
            return true;
        }
        catch (error) {
            setError("Error al cargar la información.");
            setIsLoading(false);
            return false;
        }
    }

    return (
        <LastContext.Provider
            value={{
                getIndicadores: getIndicadoresHandler,
                indicadores: indicadores,
                error: error,
                isLoading: isLoading
            }}>
            {props.children}
        </LastContext.Provider>
    );
};

export default LastContextProvider;