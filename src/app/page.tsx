import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Histórico de pedidos</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex gap-4">
              <span>Mesa: 79</span>
              <span>Comanda: 2x Cerveja Hop Lager</span>
            </div>
            <span>Tablets</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex gap-4">
              <span>Mesa: 80</span>
              <span>Comanda: 1x Omelete</span>
            </div>
            <span>Tablets</span>
          </div>
        </div>
      </div>
    </div>
  );
}
