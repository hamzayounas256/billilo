import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AnimalContextProvider from "./context/AnimalContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AnimalContextProvider>
			<GoogleOAuthProvider clientId="1047617019506-rvjecpnbc1uqrv0i38c0ujkvsc1k601n.apps.googleusercontent.com">
				<App />
			</GoogleOAuthProvider>
		</AnimalContextProvider>
	</BrowserRouter>
);
