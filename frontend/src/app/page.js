import Image from "next/image";
import HeroBanner from "./components/home/HeroBanner";
import FeatureRow from "./components/home/FeatureRow";
import Category from "./components/home/Category";
import Bestseller from "./components/home/Bestseller";
import mens_shirt from "../app/data/mens_shirt.json"
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <HeroBanner />
      <FeatureRow />
      <Bestseller sectionName="Bestseller" data={mens_shirt}/>
      <Category />
      <Bestseller sectionName="Hoodies & Sweatshirts" data={mens_shirt} />
      <Bestseller sectionName="New Arrival" data={mens_shirt}/>
      <Footer/>
    </div>
  );
}
