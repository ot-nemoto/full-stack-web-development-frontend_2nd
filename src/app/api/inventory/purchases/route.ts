import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // 商品IDと数量が指定されているか確認
  if (!data.product_id || !data.quantity) {
    return NextResponse.json(
      { error: "product_id and quantity are required" },
      { status: 400 },
    );
  }

  // 数量が正の整数か確認
  if (!Number.isInteger(data.quantity) || data.quantity <= 0) {
    return NextResponse.json(
      { error: "quantity must be a positive integer" },
      { status: 400 },
    );
  }

  // 商品が存在するか確認
  const products = await (
    await fetch(`http://localhost:3001/products?id=${data.product_id}`)
  ).json();
  if (products.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 最新の在庫数を取得
  const inventories = await (
    await fetch(
      `http://localhost:3001/inventories?product_id=${data.product_id}&_sort=date&_order=desc&_limit=1`,
    )
  ).json();

  // 処理日時
  const date = new Date();
  const formattedDate = date
    .toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Tokyo",
    })
    .replace(/\//g, "-");

  // 在庫数
  const inventory =
    (inventories.length > 0 ? inventories[0].inventory : 0) + data.quantity;

  const requestBody = {
    product_id: products[0].id,
    type: "仕入れ",
    date: formattedDate,
    price: products[0].price,
    quantity: data.quantity,
    total_price: products[0].price * data.quantity,
    inventory: inventory,
  };

  try {
    const response = await fetch("http://localhost:3001/inventories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Failed to create inventory");
    }

    return NextResponse.json({ message: "Inventory created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create inventory" },
      { status: 500 },
    );
  }
}
