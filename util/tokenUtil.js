export function getDecodedJwtToken() {

    let token = localStorage.getItem("token");

    if(token != null){
    return JSON.parse(atob(token.split('.')[1]))
    }
    return null;
}

export function getJwtToken() {
    return localStorage.getItem("token")
}