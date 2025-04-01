"use client";

import { useQuery } from "@tanstack/react-query";
import { Pedido } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

async function fetchPedidos(mesaId: string): Promise<Pedido[]> {
    const res = await fetch(`https://restaurante-api-wv3i.onrender.com/mesas/${mesaId}`);
    if (!res.ok) {
        throw new Error('Erro ao buscar pedidos');
    }
    const data = await res.json();
    return data.pedidos;
}

export default function BillPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const mesaId = params.id;

    const { data: pedidos = [], isLoading } = useQuery({
        queryKey: ['pedidos', 'mesa', mesaId],
        queryFn: () => fetchPedidos(mesaId),
    });

    const calcularTotalPedido = (pedido: Pedido) => {
        return pedido.produtos.reduce((total, item) => {
            return total + (item.produto.preco * item.quantidade);
        }, 0);
    };

    const calcularTotalGeral = () => {
        return pedidos
            .filter(pedido => pedido.status !== "cancelado")
            .reduce((total, pedido) => {
                return total + calcularTotalPedido(pedido);
            }, 0);
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Carregando...</div>;
    }

    return (
        <div className="w-full p-8">
            <div className="flex items-center gap-4 mb-8">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <FaArrowLeft />
                    Voltar
                </Button>
                <h1 className="text-3xl font-bold">Conta da Mesa {mesaId}</h1>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className="border-b pb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">
                                    Pedido #{pedido.id}
                                </h2>
                                <Badge 
                                    className={`${
                                        pedido.status === "pendente" 
                                            ? "bg-yellow-500" 
                                            : pedido.status === "finalizado" 
                                                ? "bg-green-500" 
                                                : "bg-red-500"
                                    }`}
                                >
                                    {pedido.status}
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                {pedido.produtos.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">{item.produto.nome}</span>
                                            <span className="text-gray-600 ml-2">
                                                x{item.quantidade}
                                            </span>
                                        </div>
                                        <span className="text-gray-700">
                                            R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-2">
                                <span className="font-semibold">
                                    Total: R$ {calcularTotalPedido(pedido).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">Total Geral (Excluindo Cancelados)</span>
                        <span className="text-2xl font-bold text-green-600">
                            R$ {calcularTotalGeral().toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
} 