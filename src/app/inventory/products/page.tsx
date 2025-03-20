export default function Page() {
  const products = [
    {
      id: 1,
      name: "コットン100%バックリボンティアードワンピース（黒）",
      price: 6900,
      description:
        "大人の愛らしさを引き立てる、ナチュラルな風合い。リラックスxトレンドを楽しめる、上品なティアードワンピース。",
    },
    {
      id: 2,
      name: "ライトストレッチカットソー（ネイビー）",
      price: 2980,
      description:
        "しなやかな肌触りが心地よい、程よいフィット感のカットソー。ビジネスカジュアルにも普段使いにも使える、ベーシックなデザイン。",
    },
    {
      id: 3,
      name: "ベルト付きデニムパンツ（ブルー）",
      price: 5980,
      description:
        "定番のデニムパンツに、フェミニンなベルトをプラスしたスタイリッシュなアイテム。カジュアルにもきれいめにも合わせやすい。",
    },
    {
      id: 4,
      name: "レースフレアスカート（ホワイト）",
      price: 4980,
      description:
        "エレガントな雰囲気を醸し出すレーススカート。裏地付きで透け感も抑えられ、通年使えるおすすめアイテム。",
    },
  ];

  return (
    <>
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
    </>
  );
}
