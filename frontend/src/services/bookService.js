import http from "./httpService";
import config from "./config.json";

const apiUrl = `${config.apiEndpoint}/books`;

export function getBooks() {
	return http.get(apiUrl);
}

export function deleteBooks(book) {
	return http.delete(`${apiUrl}/${book}`);
}
