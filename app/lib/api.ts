"use client";

import axios from 'axios';

const API = axios.create({
    baseURL: '/lib/proxy?path=',
    withCredentials: true,
});

export default API;
