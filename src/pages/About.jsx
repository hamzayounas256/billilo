import Title from "../components/Title";
import { assets } from "../assets/assets";

export default function About() {
	return (
		<div>
			<div className="text-2xl text-center pt-8 border-t">
				<Title text1={"ABOUT"} text2={"US"} />
			</div>
			<div className="my-10 flex flex-col justify-center md:flex-row gap-16">
				<img
					className="w-full md:max-w-[450px]"
					src={assets.about_img}
					alt=""
				/>
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
					<p>
						Welcome to BilliLo, where passion meets purpose! Founded by Rihaab
						Fareed, an aspiring young advocate for animals, our journey began
						with a simple yet profound love for animals.
					</p>
					<p>
						Growing up surrounded by pets, I witnessed the heart-wrenching
						stories of stray animals and the challenges faced by families
						needing to rehome their beloved companions. Inspired by these
						experiences, I set out to create a solution that could bridge the
						gap between pet parents and compassionate adopters.
					</p>
				</div>
			</div>

			<div className="flex flex-col md:flex-row text-sm my-5">
				<div className="border border-orange-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<p className="text-gray-600 text-justify">
						BilliLo is Pakistan’s first app and website dedicated to
						streamlining the rehoming process, ensuring that every animal finds
						a loving home. We believe that every pet deserves a second chance,
						and our platform connects those looking to rehome their pets with
						caring individuals ready to open their hearts.
					</p>
				</div>
				<div className="border border-orange-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<p className="text-gray-600 text-justify">
						But we’re more than just a rehoming service. BilliLo features the
						country’s largest database of veterinarians, providing users with
						exclusive deals and offers to support their furry friends’ health.
						We’ve partnered with local restaurants and brands to create a unique
						ecosystem where community generosity is rewarded —every donation
						unlocks discounts and vouchers, benefiting both pets in need and
						their new families.
					</p>
				</div>
				<div className="border border-orange-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<p className="text-gray-600 text-justify">
						At BilliLo, we’re not just about finding homes; we’re about
						fostering a community that cares. Join us in our mission to support
						animal welfare, one paw at a time.
					</p>
				</div>
			</div>
		</div>
	);
}
