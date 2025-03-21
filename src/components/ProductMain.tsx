import type { Product } from "@/types/Product";

export default async function ProductMain() {
  let products: Product[] = [];

  try {
    const response = await fetch("http://localhost:3001/products");
    if (!response.ok) {
      throw new Error("商品一覧の取得に失敗しました");
    }
    products = await response.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="py-2 px-4 border-b">商品ID</th>
            <th className="py-2 px-4 border-b">商品名</th>
            <th className="py-2 px-4 border-b">単価</th>
            <th className="py-2 px-4 border-b">説明</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
