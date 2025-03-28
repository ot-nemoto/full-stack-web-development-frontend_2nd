"use client";

import type { Inventory } from "@/types/Inventory";
import { useCallback, useEffect, useState } from "react";

export default function InventoryMain({ productId }: { productId: number }) {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  // 在庫取得処理
  const fetchInventories = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/inventories?product_id=${productId}&_sort=date&_order=desc`,
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchInventories();
    };
    fetchData();
  }, [fetchInventories]);

  return (
    <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">商品在庫</h2>
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
