import http from "./httpService";
import config from "./config.json";

const apiUrl = `${config.apiEndpoint}/returns`;

export function returnBook(customerId, bookId) {
	return http.post(apiUrl, { customerId, bookId });
}
