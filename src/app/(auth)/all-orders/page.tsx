"use client";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { Pedido } from "@/lib/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OrderDialog from "./components/order-dialog";
import api from "@/lib/axios";

async function fetchPedidos() {
    const res = await api.get('/pedidos');
    if (res.status !== 200) {
        throw new Error('Erro ao buscar pedidos');
    }
    return res.data;
}

export default function AllOrders() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    
    const { data: pedidos = [], isLoading } = useQuery<Pedido[]>({
        queryKey: ['pedidos', 'all'],
        queryFn: fetchPedidos
    });

    const calcularTotalPedido = (pedido: Pedido) => {
        return pedido.produtos.reduce((total, item) => {
            return total + (item.produto.preco * item.quantidade);
        }, 0);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Histórico de Pedidos</h1>
                <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-48"
                />
            </div>
            <Card className="w-full bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">CÓD</TableHead>
                            <TableHead className="text-center">Mesa</TableHead>
                            <TableHead className="text-center">Qtd Itens</TableHead>
                            <TableHead className="text-center">Total</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidos.map((pedido) => (
                            <TableRow key={pedido.id}>
                                <TableCell className="text-center">#{pedido.id}</TableCell>
                                <TableCell className="text-center">Mesa {pedido.mesaId}</TableCell>
                                <TableCell className="text-center">{pedido.produtos.length}</TableCell>
                                <TableCell className="text-center">R$ {calcularTotalPedido(pedido).toFixed(2)}</TableCell>
                                <TableCell className="text-center">
                                    <Badge 
                                        className={`${
                                            pedido.status === "finalizado"
                                                ? "bg-green-500" 
                                                : "bg-red-500"
                                        } rounded-full`}
                                    >
                                        {pedido.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button 
                                        variant="ghost" 
                                        className="text-blue-600"
                                        onClick={() => setSelectedPedido(pedido)}
                                    >
                                        <Eye className="w-4 h-4 mr-2"/>
                                        Ver Detalhes
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <OrderDialog 
                pedido={selectedPedido}
                isOpen={!!selectedPedido}
                onClose={() => setSelectedPedido(null)}
            />
        </div>
    );
}