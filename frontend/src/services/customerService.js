import config from "./config.json";
import http from "./httpService";

const apiUrl = `${config.apiEndpoint}/customers`;

function customerUrl(id) {
	return `${apiUrl}/${id}`;
}

export function getCustomers() {
	return http.get(apiUrl);
}

export function getCustomer(id) {
	return http.get(customerUrl(id));
}

export function saveCustomer(customer) {
	if (customer._id) {
		const body = { ...customer };
		delete body._id;
		return http.put(customerUrl(customer._id), body);
	}

	return http.post(apiUrl, customer);
}

export function deleteCustomer(id) {
	return http.delete(customerUrl(id));
}
