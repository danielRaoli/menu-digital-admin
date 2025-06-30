"use client";

import OrderCard from "./card-order";
import { Pedido } from "@/lib/types";
import { useState } from "react";
import DialogProduct from "./dialog-product";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaReceipt } from "react-icons/fa6";

interface OrdersProps {
    pedidos: Pedido[];
    selectedTable: string;
}

export default function Orders({ pedidos, selectedTable }: OrdersProps) {
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    const router = useRouter();

    const handleFecharConta = () => {
        router.push(`/tables/bill/${selectedTable}`);
    };

    return (
        <>
            <div className="w-full bg-white rounded-md p-4 flex flex-col gap-2 mt-6 h-full">
                <div className="flex justify-between items-center">
                    <span className="text-2xl text-gray-600">Pedidos</span>
                    {selectedTable !== "all" && (
                        <Button 
                            onClick={handleFecharConta}
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        >
                            <FaReceipt />
                            Fechar Conta
                        </Button>
                    )}
                </div>
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