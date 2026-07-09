import BistroNav from "@/components/bistro/BistroNav";
import HeroBistro from "@/components/bistro/HeroBistro";
import SpecialsTicker from "@/components/bistro/SpecialsTicker";
import TastingMenu from "@/components/bistro/TastingMenu";
import RecipeCards from "@/components/bistro/RecipeCards";
import MethodKitchen from "@/components/bistro/MethodKitchen";
import ChefReviews from "@/components/bistro/ChefReviews";
import Reservation from "@/components/bistro/Reservation";
import MenuColophon from "@/components/bistro/MenuColophon";

export default function Home() {
  return (
    <>
      <BistroNav />
      <main>
        <HeroBistro />
        <SpecialsTicker />
        <TastingMenu />
        <RecipeCards />
        <MethodKitchen />
        <ChefReviews />
        <Reservation />
      </main>
      <MenuColophon />
    </>
  );
}
