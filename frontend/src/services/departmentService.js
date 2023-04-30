import config from "./config.json";
import http from "./httpService";

const apiUrl = `${config.apiEndpoint}/departments`;

export function getDepartments() {
	return http.get(apiUrl);
}
