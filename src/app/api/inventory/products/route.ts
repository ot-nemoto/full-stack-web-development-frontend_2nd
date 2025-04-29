import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:3001/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 商品名と価格が指定されているか確認
    if (!data.name || !data.price) {
      return NextResponse.json(
        { error: "name and price are required" },
        { status: 400 },
      );
    }
    // 価格が正の整数か確認
    if (!Number.isInteger(data.price) || data.price <= 0) {
      return NextResponse.json(
        { error: "price must be a positive integer" },
        { status: 400 },
      );
    }

    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const product = await response.json();

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
