import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { getLocalStorage } from './Localstorage';

const baseURL = 'https://www.pre-onboarding-selection-task.shop';
// const baseURL = 'http://localhost:8000';

// eslint-disable-next-line import/prefer-default-export
export const Api: AxiosInstance = axios.create({
	baseURL,
	timeout: 10000,
	params: {},
});

Api.interceptors.response.use(
	(config: AxiosResponse) => {
		return config;
	},
	(err: AxiosError) => {
		return Promise.reject(err);
	},
);

Api.interceptors.request.use(
	(config) => {
		axios.defaults.withCredentials = true;
		// eslint-disable-next-line no-param-reassign
		config.headers['Content-Type'] = 'application/json';
		// eslint-disable-next-line no-param-reassign
		config.headers.Authorization = `Bearer ${getLocalStorage('accessToken')}`;
		return config;
	},
	(err: AxiosError) => {
		return Promise.reject(err);
	},
);
