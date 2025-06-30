"use client";

import { useQuery } from "@tanstack/react-query";
import { Conta, Pedido } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import { useState, useEffect } from "react";
import { Ticket, User } from "lucide-react";
import { useSocket } from "@/contexts/socket-context";

async function fetchConta(contaId: string): Promise<Pedido[]> {
    const res = await api.get(`/contas/${contaId}`);
    if (res.data ) {
        throw new Error('Erro ao buscar pedidos');
    }
    
    return res.data;
}

interface BillPageClientProps {
    contaId: string;
}

export default function BillPageClient({ contaId }: BillPageClientProps) {

    const [conta, setConta] = useState<Conta | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const socket = useSocket();

    useEffect(() => {
        async function fetchConta() {
            setIsLoading(true);
            setError(null);
            try {
                const res = await api.get(`/contas/${contaId}`);
                setConta(res.data);
            } catch (err: any) {
                setError('Erro ao buscar conta');
            } finally {
                setIsLoading(false);
            }
        }
        fetchConta();
    }, [contaId]);

    const calcularTotalPedido = (pedido: Pedido) => {
        return pedido.produtos.reduce((total, item) => {
            return total + (item.produto.preco * item.quantidade);
        }, 0);
    };

    const calcularTotalGeral = () => {
        if (!conta) return 0;
        return conta.pedidos
            .filter(pedido => pedido.status !== "cancelado")
            .reduce((total, pedido) => {
                return total + calcularTotalPedido(pedido);
            }, 0);
    };

    const  handleFecharConta = async () => {
        if (socket && contaId) {
            await api.put(`/contas/${contaId}`,{...conta, statusConta: "fechada"} )
            socket.emit("fecharConta", { contaId });
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Carregando...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    if (!conta) {
        return <div className="flex items-center justify-center h-screen">Conta não encontrada</div>;
    }

    return (
        <div className="w-full p-8">
            <div className="flex justify-between">
                <div className="flex items-start flex-col mb-8">
                    <h1 className="text-3xl font-bold">Conta da Mesa {conta.pedidos[0]?.mesaId ?? ''}</h1>
                    <div className="flex gap-2">
                        <User className="text-red-600"/>
                        <span className="text-red-600 text-lg font-semibold">{conta.donoConta}</span>
                    </div>
                </div>
                <Button className="bg-green-600" onClick={handleFecharConta}>
                    Fechar Conta
                    <Ticket/>
                </Button>
            </div>


            <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                    {conta.pedidos.length === 0 ? (
                        <div className="text-center text-muted-foreground">Nenhum pedido nesta conta.</div>
                    ) : (
                        conta.pedidos.map((pedido) => (
                            <div key={pedido.id} className="border-b pb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold">
                                        Pedido #{pedido.id}
                                    </h2>
                                    <Badge 
                                        className={`$ {
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
                        ))
                    )}
                </div>

                <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">Total A pagar (Excluindo Cancelados)</span>
                        <span className="text-2xl font-bold text-green-600">
                            R$ {calcularTotalGeral().toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
} 