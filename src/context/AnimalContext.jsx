import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AnimalContext = createContext();

const AnimalContextProvider = ({ children }) => {
	const navigate = useNavigate();

	const currency = "Rs";

	const apiLink = "https://petapp.billilo.com/petapp";

	const value = { navigate, currency, apiLink };

	return (
		<AnimalContext.Provider value={value}>{children}</AnimalContext.Provider>
	);
};

export default AnimalContextProvider;
