import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AnimalContext = createContext();

const AnimalContextProvider = (props) => {
	const navigate = useNavigate();
	const currency = "$";

	const value = { navigate, currency };

	return (
		<AnimalContext.Provider value={value}>
			{props.children}
		</AnimalContext.Provider>
	);
};

export default AnimalContextProvider;
