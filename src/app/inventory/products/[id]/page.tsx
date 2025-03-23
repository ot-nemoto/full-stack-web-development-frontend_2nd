import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InventoryMain from "@/components/InventoryMain";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <InventoryMain id={Number(id)} />
      <Footer />
    </div>
  );
}
