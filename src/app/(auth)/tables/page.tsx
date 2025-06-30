"use client"
import TablesSelect from "./_components/tables-select"
import Orders from "./_components/orders"
import { Mesa, Pedido } from "@/lib/types"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "@/lib/axios";

async function fetchPedidos() {
    const res = await api.get('/pedidos');
    if (res.status !== 200  ) {
        throw new Error('Erro ao buscar pedidos');
    }
    return res.data;
}

export default function Tables() {
    const [selectedTable, setSelectedTable] =useState<string>("all")

    const { data: pedidoData = [] } = useQuery<Pedido[]>({
        queryKey: selectedTable ? ['pedidos', 'mesa', selectedTable] : ['pedidos', 'all'],
        queryFn: async () => {
            if (selectedTable !== "all") {
                const res = await api.get(`/mesas/${selectedTable}`);
                const data = await res.data;
                return (data as Mesa).pedidos.filter((pedido) => pedido.status === "pendente");
            } else {
                return fetchPedidos().then((pedidos) => pedidos.filter((pedido : Pedido) => pedido.status === "pendente"));
            }
        }
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_APIURL);

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
            <Orders selectedTable={selectedTable} pedidos={pedidoData} />
        </div>
    )
}


