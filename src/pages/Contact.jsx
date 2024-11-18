import Title from "../components/Title";
import { assets } from "../assets/assets";

export default function Contact() {
	return (
		<div>
			<div className="text-center text-2xl pt-10 border-t">
				<Title text1={"CONTACT"} text2={"US"} />
			</div>
			<div className="flex flex-col md:flex-row justify-center gap-10 mb-28">
				<img
					className="w-full md:max-w-[480px]"
					src={assets.contact_img}
					alt=""
				/>
				<div className="flex flex-col justify-center items-start gap-6">
					<p className="font-semibold text-xl text-orange-600">OUR STORE</p>
					<p className="text-gray-500">
						15-D Al-Makkah Colony <br /> Township, Lahore, Pakistan
					</p>
					<p className="text-gray-500">
						Tel: +923 364 527 513 <br /> Email: hamzayounas256@gmail.com
					</p>
					<p className="font-semibold text-xl text-orange-600">
						Careers at Billingo
					</p>
					<p className="text-gray-500">
						Learn more about our teams and job openings.
					</p>
					<button className="border border-orange-600 text-orange-600 px-8 py-4 text-sm hover:bg-orange-600 hover:text-white transition-all duration-500">
						Explore Jobs
					</button>
				</div>
			</div>
		</div>
	);
}
