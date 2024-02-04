export const useHttp = () => {
    const initialHeaders = {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, XWith, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  
    }
    const request = async (url, method = 'GET', body = null, headers = initialHeaders) => {
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return { request }
}