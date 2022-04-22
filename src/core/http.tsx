import {default as axios} from "axios";

const http = 
    axios.create({
        baseURL: 'https://asia-southeast2-sejutacita-app.cloudfunctions.net/',
        headers: {"Access-Control-Allow-Origin": "*"}
    });

export default http;