"use client";

import type { Severity } from "@/components/Alert";
import Alert from "@/components/Alert";
import type { Product } from "@/types/Product";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function ProductMain() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
  });
  const [severity, setSeverity] = useState<Severity>("info");
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/inventory/products",
      );
      if (!response.ok) {
        throw new Error("商品一覧の取得に失敗しました");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // 商品追加ボタンクリック時の処理
  const handleShowForm = () => {
    setShowForm(true);
  };
  // 商品追加フォームの入力値変更時の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: Number(value),
    }));
  };
  // 商品追加フォームのキャンセルボタンクリック時の処理
  const handleCancel = () => {
    setShowForm(false);
    setNewProduct({
      name: "",
      price: 0,
      description: "",
    });
  };
  // 商品追加フォームの登録ボタンクリック時の処理
  const handleRegister = async () => {
    if (newProduct.name === "") {
      setSeverity("warning");
      setMessage("商品名は必須です");
      return;
    }

    if (newProduct.price <= 0) {
      setSeverity("warning");
      setMessage("単価は0より大きい整数でなければなりません");
      return;
    }

    console.log(newProduct);
    try {
      const response = await fetch(
        "http://localhost:3000/api/inventory/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        },
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("商品登録に失敗しました");
      }

      // 成功時の処理
      setSeverity("success");
      setMessage("商品登録が完了しました");
      setShowForm(false);
      setNewProduct({
        name: "",
        price: 0,
        description: "",
      });
      fetchProducts();
    } catch (error) {
      setSeverity("error");
      setMessage("エラーが発生しました");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setVisible(message !== "");
  }, [message]);

  return (
    <main className="flex-grow p-4">
      <Alert severity={severity} visible={visible}>
        {message}
      </Alert>
      <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleShowForm}
      >
        商品を追加する
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="py-2 px-4 border-b">商品ID</th>
            <th className="py-2 px-4 border-b">商品名</th>
            <th className="py-2 px-4 border-b">単価</th>
            <th className="py-2 px-4 border-b">説明</th>
            <th className="py-2 px-4 border-b" />
            <th className="py-2 px-4 border-b" />
          </tr>
        </thead>
        <tbody>
          {showForm && (
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b" />
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleNumberInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  type="button"
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  onClick={handleRegister}
                >
                  登録する
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={handleCancel}
                >
                  キャンセル
                </button>
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  href={`/inventory/products/${product.id}`}
                  className="text-blue-500 hover:text-blue-700 hover:underline"
                >
                  在庫処理
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
