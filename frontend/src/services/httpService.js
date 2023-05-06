import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.log(error);
		toast("Something failed");
	} else {
		switch (error.response.status) {
			case 400:
				toast("Bad Request");
				break;
			case 401:
				toast("Unauthorized");
				break;
			case 404:
				toast("Not Found");
				break;
			case 500:
				toast("Internal Server Error");
				break;
			default:
				toast("Error");
		}
	}
	return Promise.reject(error);
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};
