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
  ];

  return (
    <>
      <h2>商品一覧</h2>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名</th>
            <th>単価</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
