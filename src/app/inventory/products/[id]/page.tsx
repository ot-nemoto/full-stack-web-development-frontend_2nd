import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InventoryMain from "@/components/InventoryMain";

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <InventoryMain productId={Number(id)} />
      <Footer />
    </div>
  );
}
