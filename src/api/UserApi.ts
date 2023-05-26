import axios from "axios";
import configData from "../config/config.json";
import { User } from '../types/userInterface';

export const getAllUsers = async () => {
    const response = await axios.get(`${configData.SERVER_URl}/users`);
    return response;
}

export const createUser = async (user: User) => {
    const response = await axios.post(`${configData.SERVER_URl}/user`, user);
    return response;
}

export const editUser = async (user: User) => {
    const response = await axios.put(`${configData.SERVER_URl}/updateUser`, user);
    return response;
}

export const deleteUser = async (id: number) => {
    const response = await axios.delete(`${configData.SERVER_URl}/deleteUser/${id}`);
    return response;
}