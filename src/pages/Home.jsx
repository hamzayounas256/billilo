import CatProduct from "../components/CatProduct";
import DogProduct from "../components/DogProduct";
import Hero from "../components/Hero";
import HomeAdd from "../components/HomeAdd";

export default function Home() {
	return (
		<div>
			<Hero />
			<CatProduct />
			<DogProduct />
			<HomeAdd />
		</div>
	);
}
