import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
	const id = localStorage.getItem("id");
	return id ? <Outlet /> : <Navigate to={"/login"} />;
}
