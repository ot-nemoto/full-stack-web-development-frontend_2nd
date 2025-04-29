import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");

    // クエリパラメータのバリデーション
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `http://localhost:3001/inventories?product_id=${productId}&_sort=date&_order=desc`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch inventories");
    }

    const inventories = await response.json();

    return NextResponse.json(inventories, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch inventories" },
      { status: 500 },
    );
  }
}
