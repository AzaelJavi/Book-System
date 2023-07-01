import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import auth from "../services/authService";

function ProtectedRoutes() {
	const location = useLocation();
	const user = auth.getCurrentUser();

	if (!user || !user.isAdmin) {
		auth.logout();
		return (
			<Navigate
				to="/login"
				replace={true}
				state={{ from: location.pathname }}
			/>
		);
	}

	return <Outlet />;
}

export default ProtectedRoutes;
