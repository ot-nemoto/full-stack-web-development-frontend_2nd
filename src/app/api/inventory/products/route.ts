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
