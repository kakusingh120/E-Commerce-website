import React from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://fakestoreapi.com/",
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
})

export default instance;
