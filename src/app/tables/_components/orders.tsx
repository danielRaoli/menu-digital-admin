"use client";

import OrderCard from "./card-order";
import { Pedido } from "@/lib/types";
import { useState } from "react";
import DialogProduct from "./dialog-product";

export default function Orders({ pedidos }: { pedidos: Pedido[] }) {
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

    return (
        <>
            <div className="w-full bg-white rounded-md p-4 flex flex-col gap-2 mt-6 h-full">
                <span className="text-2xl text-gray-600">Pedidos</span>
                {pedidos.length === 0 ? (
                    <span className="text-center text-gray-400 my-auto">Nenhum pedido encontrado</span>
                ) : (
                    <div className="grid grid-cols-4 w-full gap-4">
                        {pedidos.map((pedido) => (
                            <OrderCard 
                                key={pedido.id} 
                                pedido={pedido}
                                onDetailsClick={() => setSelectedPedido(pedido)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <DialogProduct selectedPedido={selectedPedido} setSelectedPedido={setSelectedPedido} />
        </>
    );
}