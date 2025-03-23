export default function Page() {
  return (
    <>
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
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">卸し</td>
            <td className="py-2 px-4 border-b">2023-04-07 14:58:13</td>
            <td className="py-2 px-4 border-b">6900</td>
            <td className="py-2 px-4 border-b">2</td>
            <td className="py-2 px-4 border-b">13800</td>
            <td className="py-2 px-4 border-b">390</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">仕入れ</td>
            <td className="py-2 px-4 border-b">2023-04-06 15:57:14</td>
            <td className="py-2 px-4 border-b">6900</td>
            <td className="py-2 px-4 border-b">3</td>
            <td className="py-2 px-4 border-b">20700</td>
            <td className="py-2 px-4 border-b">392</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">卸し</td>
            <td className="py-2 px-4 border-b">2023-04-05 16:56:15</td>
            <td className="py-2 px-4 border-b">6900</td>
            <td className="py-2 px-4 border-b">1</td>
            <td className="py-2 px-4 border-b">6900</td>
            <td className="py-2 px-4 border-b">389</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">卸し</td>
            <td className="py-2 px-4 border-b">2023-04-04 17:55:16</td>
            <td className="py-2 px-4 border-b">6900</td>
            <td className="py-2 px-4 border-b">10</td>
            <td className="py-2 px-4 border-b">69000</td>
            <td className="py-2 px-4 border-b">390</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">仕入れ</td>
            <td className="py-2 px-4 border-b">2023-04-03 18:54:17</td>
            <td className="py-2 px-4 border-b">6900</td>
            <td className="py-2 px-4 border-b">400</td>
            <td className="py-2 px-4 border-b">2760000</td>
            <td className="py-2 px-4 border-b">400</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
