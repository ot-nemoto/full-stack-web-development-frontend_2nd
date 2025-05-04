"use client";

import Alert from "@/components/Alert";
import InventoryAction from "@/components/InventoryAction";
import InventoryHistory from "@/components/InventoryHistory";
import { useAlert } from "@/hooks/useAlert";
import type { Inventory } from "@/types/Inventory";
import type { Product } from "@/types/Product";
import { useCallback, useEffect, useState } from "react";

export default function InventoryMain({ productId }: { productId: number }) {
  const [product, setProduct] = useState<Product | null>(null); // 商品情報
  const [inventories, setInventories] = useState<Inventory[]>([]); // 在庫履歴

  const { message, severity, visible, showAlert } = useAlert();

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

  useEffect(() => {
    fetchProduct();
    fetchInventories();
  }, [fetchProduct, fetchInventories]);

  return (
    <main className="flex-grow p-4">
      <Alert severity={severity} visible={visible}>
        {message}
      </Alert>
      <h2 className="text-2xl font-bold mb-4">商品在庫</h2>
      <InventoryAction
        product={product}
        onSuccess={fetchInventories}
        onAlert={showAlert}
      />
      <InventoryHistory inventories={inventories} />
    </main>
  );
}
