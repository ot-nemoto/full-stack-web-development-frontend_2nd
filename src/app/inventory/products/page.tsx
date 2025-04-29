import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductMain from "@/components/ProductMain";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProductMain />
      <Footer />
    </div>
  );
}
