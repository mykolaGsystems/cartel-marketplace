import axios from "axios";

const URL = "https://puckqsvqm0.execute-api.us-east-2.amazonaws.com/pre-prod"

const getQueryString = (queries) => {
    return Object.keys(queries).reduce((result, key) => {
        return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
    }, []).join('&');
};

export const encodeData = async (data) => {

    let message_dict = {
        "Country-Region" : data["Country-Region"] , 
        "FullName" : data.FullName, 
        "PhoneNumber" : data.PhoneNumber,
        "Postcode" : data.Postcode, 
        "AddressLine1" : data.AddressLine1, 
        "AddressLine2" : data.AddressLine2, 
        "City" : data.City,
    };
    
    let path = URL + `/proceedpayment/?${getQueryString(message_dict)}`;

    try {
        const response = await axios.get(path);
        return response
    } catch (error) {
        console.error(error.message);
    }
    

};