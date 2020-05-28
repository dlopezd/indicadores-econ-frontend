import React, { useState } from 'react';
import axios from 'axios';


export const HistoricContext = React.createContext({
    isLoading: true,
    error: '',
    historic: null,
    getHistoric: async indicador => { },
});

const endpoint = "http://localhost:2000";

const HistoricContextProvider = props => {
    const [historic, setHistoric] = useState({
        dolar: null,
        euro: null,
        yen: null,
        uf: null,
        utm: null,
        oro: null,
        plata: null,
        cobre: null,
        ipc: null,
        ivp: null
    });
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const getHistoricHandler = async (indicador) => {
        try {
            console.log(`historico: ${JSON.stringify(historic)}`);
            console.log(`indicador: ${indicador}`);
            
            setIsLoading(true);
            if (historic[indicador]) {
                console.log(`hay datos`);
                setIsLoading(false);
                return true;
            }
            var path = `/values/${indicador}`;
            const response = await axios.get(endpoint + path);

            var newHistoric = {...historic};
            newHistoric[indicador] = response.data.data
            setHistoric({...newHistoric});
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
        <HistoricContext.Provider
            value={{
                getHistoric: getHistoricHandler,
                historic: historic,
                error: error,
                isLoading: isLoading
            }}>
            {props.children}
        </HistoricContext.Provider>
    );
};

export default HistoricContextProvider;