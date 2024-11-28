import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AnimalContextProvider from "./context/AnimalContext.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter basename="/billilo">
		<AnimalContextProvider>
			<App />
		</AnimalContextProvider>
	</BrowserRouter>
);
