import * as env from './env';

export async function httpApiPPPD(endp: string, metodo: string, cabeceras: any, bd: any) {
    try {
        const recurso = `${env.REACT_APP_API_URL_DEV}${endp}`;
        const response = await fetch(recurso, {
                method: metodo,
                headers: cabeceras,
                body: JSON.stringify(bd)
        });    
        const data = await response.json();
        return ({code: response.status, message: data});
    }
    catch(e){
        console.log(" Error: ", e); 
        return ({code: 400, message: "Error en la petición api"});
    }
}

export async function httpApiDelete(endp: string, metodo: string, cabeceras: any, bd: any) {
    
    let data: any = null;

    try {
        const recurso = `${env.REACT_APP_API_URL_DEV}${endp}`;
        const response = await fetch(recurso, {
                method: metodo,
                headers: cabeceras,
                body: JSON.stringify(bd)
        }); 
        if (response.status !== 204){
            data = await response.json();
        }else{
            data = "";
        }       

        return ({code: response.status, message: data});
    }
    catch(e){
        console.log(" Error: ", e); 
        return ({code: 400, message: "Error en la petición api"});
    }
}

export async function httpApiGet(endp: string) {
    
    try {
        const recurso = `${env.REACT_APP_API_URL_DEV}${endp}`;
        const response = await fetch(recurso, {
                method: 'GET',
        });         
        const data = await response.json();
        return ({code: response.status, message: data});
    }
    catch(e){
        console.log(" Error: ", e); 
        return ({code: 400, message: "Error en la petición api"});
    }
}