"use client";

import type { Inventory } from "@/types/Inventory";
import type { Product } from "@/types/Product";
import { useCallback, useEffect, useState } from "react";

export default function InventoryMain({ productId }: { productId: number }) {
  const [product, setProduct] = useState<Product | null>(null); // 商品情報
  const [quantity, setQuantity] = useState(0); // 数量
  const [inventories, setInventories] = useState<Inventory[]>([]); // 在庫履歴
  const [isProcessing, setIsProcessing] = useState(false); // 処理中状態

  // 正常登録時の処理
  const handleSuccess = async () => {
    setQuantity(0);
    await fetchInventories();
  };

  // 商品取得処理
  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/products/${productId}`,
      );
      if (!response.ok) {
        throw new Error("商品情報の取得に失敗しました");
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
    }
  }, [productId]);

  // 在庫取得処理
  const fetchInventories = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/inventories?product_id=${productId}`,
      );
      if (!response.ok) {
        throw new Error("在庫履歴一覧の取得に失敗しました");
      }
      const data = await response.json();
      setInventories(data);
    } catch (err) {
      console.error(err);
    }
  }, [productId]);

  // 仕入れ登録処理
  const submitPurchase = async () => {
    if (quantity <= 0) {
      return;
    }

    setIsProcessing(true); // 処理開始

    try {
      const response = await fetch(
        "http://localhost:3000/api/inventory/purchases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: productId,
            quantity: quantity,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("仕入れ登録に失敗しました");
      }

      handleSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  // 卸し登録処理
  const submitSales = async () => {
    if (quantity <= 0) {
      return;
    }

    setIsProcessing(true); // 処理開始

    try {
      const response = await fetch(
        "http://localhost:3000/api/inventory/sales",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: productId,
            quantity: quantity,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("卸し登録に失敗しました");
      }

      handleSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
      await fetchInventories();
    };
    fetchData();
  }, [fetchProduct, fetchInventories]);

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品在庫</h2>
      <h3 className="text-xl font-bold mb-4">在庫処理</h3>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center mb-4">
            <span className="mr-2">商品名:</span>
            <span className="font-bold">{product?.name}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2">数量:</span>
            <input
              type="number"
              value={quantity}
              className="border border-gray-200 rounded px-2 py-1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={isProcessing}
            />
          </div>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
            onClick={submitPurchase}
            disabled={isProcessing}
          >
            商品を仕入れる
          </button>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
            onClick={submitSales}
            disabled={isProcessing}
          >
            商品を卸す
          </button>
        </form>
      </div>
      <h3 className="text-xl font-bold mb-4">在庫履歴</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="py-2 px-4 border-b">処理種別</th>
            <th className="py-2 px-4 border-b">処理日時</th>
            <th className="py-2 px-4 border-b">単価</th>
            <th className="py-2 px-4 border-b">数量</th>
            <th className="py-2 px-4 border-b">価格</th>
            <th className="py-2 px-4 border-b">在庫数</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{inventory.type}</td>
              <td className="py-2 px-4 border-b">{inventory.date}</td>
              <td className="py-2 px-4 border-b">{inventory.price}</td>
              <td className="py-2 px-4 border-b">{inventory.quantity}</td>
              <td className="py-2 px-4 border-b">{inventory.total_price}</td>
              <td className="py-2 px-4 border-b">{inventory.inventory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
