import http from "./httpService";
import config from "./config.json";

const apiUrl = `${config.apiEndpoint}/borrows`;

export function borrow(customerId, bookIds) {
	return http.post(apiUrl, { customerId, bookIds });
}
