export const makeOptions = (method,includeToken,body) => {
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
        opts.headers['Authorization'] = localStorage.getItem("token");
    }

    return opts;
};