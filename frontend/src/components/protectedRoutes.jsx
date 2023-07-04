import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../services/authService";

function ProtectedRoutes() {
	const user = auth.getCurrentUser();

	if (!user || !user.isAdmin) {
		auth.logout();
		return <Navigate to="/login" replace={true} state={{ from: "/" }} />;
	}

	return <Outlet />;
}

export default ProtectedRoutes;
