import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdoptPet from "./pages/AdoptPet";
import AnimalShelter from "./pages/AnimalShelter";
import Contact from "./pages/Contact";
import LostAndFoundPet from "./pages/LostAndFoundPet";
import VetsNearby from "./pages/VetsNearby";
import Login from "./pages/Login";

function App() {
	return (
		<div className="container mx-auto px-4 sm:px-[5px] md:px-[7px] lg:px-[9px]">
			<ToastContainer />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/adoptpet" element={<AdoptPet />} />
				<Route path="/animalshelter" element={<AnimalShelter />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/lostandfoundpet" element={<LostAndFoundPet />} />
				<Route path="/vetsnearby" element={<VetsNearby />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
