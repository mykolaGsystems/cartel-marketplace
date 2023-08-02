import axios from "axios";

const URL = "https://puckqsvqm0.execute-api.us-east-2.amazonaws.com/pre-prod"

const getQueryString = (queries) => {
    return Object.keys(queries).reduce((result, key) => {
        return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
    }, []).join('&');
};

export const encodeData = async (data) => {  
    
    let path = URL + `/proceedpayment/?${getQueryString(data)}`;

    try {

        const response = await axios.get(path);
        
        console.log(response.data)
    
        return response.data

    } catch (error) {
        console.error(error.message);
    }
    

};