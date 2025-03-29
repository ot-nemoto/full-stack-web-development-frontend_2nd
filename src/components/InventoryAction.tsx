"use client";

import type { Severity } from "@/components/Alert";
import type { Product } from "@/types/Product";
import { useState } from "react";

export default function InventoryAction({
  product,
  onSuccess,
  setSeverity,
  setMessage,
}: {
  product: Product | null;
  onSuccess: () => void;
  setSeverity: (severity: Severity) => void;
  setMessage: (message: string) => void;
}) {
  const [quantity, setQuantity] = useState(0); // 数量
  const [isProcessing, setIsProcessing] = useState(false); // 処理中状態

  // 仕入れ登録処理
  const submitPurchase = async () => {
    if (quantity <= 0) {
      setSeverity("warning");
      setMessage("数量は0より大きい整数でなければなりません");
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
            product_id: product?.id,
            quantity: quantity,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("仕入れ登録に失敗しました");
      }

      // 成功時の処理
      setSeverity("success");
      setMessage("在庫処理が完了しました");
      setQuantity(0);
      onSuccess();
    } catch (err) {
      setSeverity("error");
      setMessage("エラーが発生しました");
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  // 卸し登録処理
  const submitSales = async () => {
    if (quantity <= 0) {
      setSeverity("warning");
      setMessage("数量は0より大きい整数でなければなりません");
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
            product_id: product?.id,
            quantity: quantity,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("卸し登録に失敗しました");
      }

      // 成功時の処理
      setSeverity("success");
      setMessage("在庫処理が完了しました");
      setQuantity(0);
      onSuccess();
    } catch (err) {
      setSeverity("error");
      setMessage("エラーが発生しました");
    } finally {
      setIsProcessing(false); // 処理完了
    }
  };

  return (
    <>
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
    </>
  );
}
