import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InventoryMain from "@/components/InventoryMain";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <InventoryMain />
      <Footer />
    </div>
  );
}
