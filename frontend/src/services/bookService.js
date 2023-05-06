import http from "./httpService";
import config from "./config.json";

const apiUrl = `${config.apiEndpoint}/books`;

function bookUrl(id) {
	return `${apiUrl}/${id}`;
}

export function getBooks() {
	return http.get(apiUrl);
}

export function getBook(bookId) {
	return http.get(bookUrl(bookId));
}
export function saveBook(book) {
	if (book._id) {
		const body = { ...book };
		delete body._id;
		return http.put(bookUrl(book._id), body);
	}

	return http.post(apiUrl, book);
}

export function deleteBooks(bookId) {
	return http.delete(bookUrl(bookId));
}
