"use client"
import TablesSelect from "./_components/tables-select"
import Orders from "./_components/orders"
import { Mesa, Pedido } from "@/lib/types"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

async function fetchPedidos() {
    const res = await fetch('https://restaurante-api-wv3i.onrender.com/pedidos');
    if (!res.ok) {
        throw new Error('Erro ao buscar pedidos');
    }
    return res.json();
}

export default function Tables() {
    const [selectedTable, setSelectedTable] =useState<string>("all")

    const { data: pedidoData = [], isLoading: loadingPedidos } = useQuery<Pedido[]>({
        queryKey: selectedTable ? ['pedidos', 'mesa', selectedTable] : ['pedidos', 'all'],
        queryFn: async () => {
            if (selectedTable !== "all") {
                const res = await fetch(`https://restaurante-api-wv3i.onrender.com/mesas/${selectedTable}`);
                const data = await res.json();
                return (data as Mesa).pedidos.filter((pedido) => pedido.status === "pendente");
            } else {
                return fetchPedidos();
            }
        }
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = io("https://restaurante-api-wv3i.onrender.com");

        socket.on("pedidoCriado", (novoPedido: Pedido) => {
            console.log("Novo pedido recebido via WebSocket:", novoPedido);
            
            queryClient.setQueryData<Pedido[]>(['pedidos', 'all'], (oldPedidos = []) => {
                return [...oldPedidos, novoPedido];
            });

            if (selectedTable !== "all" && novoPedido.mesaId === Number(selectedTable)) {
                queryClient.setQueryData<Pedido[]>(['pedidos', 'mesa', selectedTable], (oldPedidos = []) => {
                    return [...oldPedidos, novoPedido];
                });
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [selectedTable, queryClient]);

    return (
        <div className="w-full flex flex-col h-full">
            <TablesSelect 
                onSelect={setSelectedTable}
                selectedTable={selectedTable}
            />
            <Orders pedidos={pedidoData} />
        </div>
    )
}


