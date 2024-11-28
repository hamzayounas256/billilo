import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import OwnPets from "./pages/OwnPets";
import ProductLost from "./pages/ProductLost";
import ProductFind from "./pages/ProductFind";

import FindAdoptPet from "./pages/FindAdoptPet";
import FindAnimalShelter from "./pages/FindAnimalShelter";
import FindFoundPet from "./pages/FindFoundPet";
import FindLostPet from "./pages/FindLostPet";
import FindSellPet from "./pages/FindSellPet";
import FindVetsNearby from "./pages/FindVetsNearby";

import PostAdoptPet from "./pages/PostAdoptPet";
import PostAnimalShelter from "./pages/PostAnimalShelter";
import PostFoundPet from "./pages/PostFoundPet";
import PostLostPet from "./pages/PostLostPet";
import PostSellPet from "./pages/PostSellPet";
import PostVetsNearby from "./pages/PostVetsNearby";
import ProductSell from "./pages/ProductSell";
import ProductAdopt from "./pages/ProductAdopt";
import Hero from "./components/Hero";

function App() {
	return (
		// <div className="mx-auto px-4 sm:px-[5px] md:px-[7px] lg:px-[9px]">
		<div className="mx-auto">
			<ToastContainer />
			<Navbar />
			<Routes>
				<Route path="/billilo" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="/hero" element={<Hero />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/productsell/:productId" element={<ProductSell />} />
				<Route path="/productadopt/:productId" element={<ProductAdopt />} />
				<Route path="/productlost/:productId" element={<ProductLost />} />
				<Route path="/productfind/:productId" element={<ProductFind />} />

				<Route path="/about" element={<About />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/ownpets" element={<OwnPets />} />

				<Route path="/findadoptpet" element={<FindAdoptPet />} />
				<Route path="/findanimalshelter" element={<FindAnimalShelter />} />
				<Route path="/findfoundpet" element={<FindFoundPet />} />
				<Route path="/findlostpet" element={<FindLostPet />} />
				<Route path="/findsellpet" element={<FindSellPet />} />
				<Route path="/findvetsnearby" element={<FindVetsNearby />} />

				<Route path="/postadoptpet" element={<PostAdoptPet />} />
				<Route path="/postanimalshelter" element={<PostAnimalShelter />} />
				<Route path="/postfoundpet" element={<PostFoundPet />} />
				<Route path="/postlostpet" element={<PostLostPet />} />
				<Route path="/postsellpet" element={<PostSellPet />} />
				<Route path="/postvetsnearby" element={<PostVetsNearby />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
