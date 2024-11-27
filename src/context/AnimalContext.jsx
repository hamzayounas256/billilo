import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AnimalContext = createContext();

const AnimalContextProvider = (props) => {
	const navigate = useNavigate();
	const currency = "Rs";

	const apiLink = "https://petapp1503.pythonanywhere.com/petapp";
	const value = { navigate, currency, apiLink };

	return (
		<AnimalContext.Provider value={value}>
			{props.children}
		</AnimalContext.Provider>
	);
};

export default AnimalContextProvider;
