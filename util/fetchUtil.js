import {getDecodedJwtToken, getJwtToken} from "./tokenUtil";
import authFacade from "../facades/authFacade";

export const makeOptions = async (method, includeToken, body) => {
    let opts = {
        method: method,
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
    };
    if (body) {
        opts.body = JSON.stringify(body);
    }
    if (includeToken) {
        opts.headers['Authorization'] = await acuireAccessToken();
    }

    return opts;
};


const acuireAccessToken = async () => {
    let token = getDecodedJwtToken();

    if (token && token.exp > Math.floor(new Date().getTime() / 1000)) {
        return getJwtToken();
    } else {
        try{

        let response = await authFacade.refreshToken()
            if (response) {
                let token = await response.token;
                localStorage.setItem("token", token);
                return token;
            }
        } catch (e){
            
        }
    }
}