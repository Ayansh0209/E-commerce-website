import Image from "next/image";
import HeroBanner from "./components/home/HeroBanner";
import FeatureRow from "./components/home/FeatureRow";
import Category from "./components/home/Category";
import Bestseller from "./components/home/Bestseller";
import mens_shirt from "../app/data/mens_shirt.json"
import Footer from "./components/Footer";

async function getProducts(query) {
  const params = new URLSearchParams(query).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?${params}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.content || [];
}
export default async  function Home() {
   const bestsellerProducts = await getProducts({
    isBestSeller: true,
    pageSize: 15,
  });

  const newArrivalProducts = await getProducts({
    isNewArrival: true,
    pageSize: 15,
  });


  return (
    <div className="">
      <HeroBanner />
      <FeatureRow />
      <Bestseller sectionName="Bestseller" data={bestsellerProducts} link="/shop?isBestSeller=true"/>
      <Category />
      {/* <Bestseller sectionName="Hoodies & Sweatshirts" data={mens_shirt} /> */}
      <Bestseller sectionName="New Arrival" data={newArrivalProducts} link="/shop?isNewArrival=true"/>
      <Footer/>
    </div>
  );
}
