import axios from "axios";
import RequestTB from "../models/request.js";

export const createRequest = async (newRequest) => {
    await newRequest.save();
    const response = await axios.get(`https://gateway-9pxx.onrender.com/account/admin`);
    await axios.post(`https://gateway-9pxx.onrender.com/notification/create/request/${newRequest._id}/${response.data.email}`);
    return newRequest;
}

export const getRequestbyEmail = async (email) => {
    const requests = await RequestTB.find({ email });
    return requests;
}

export const getRequestbyID = async (id) => {
    const request = await RequestTB.findById(id);
    return request;
}
