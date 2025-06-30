"use client";

import { Pedido } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import OrdersTable from "./_components/orders-table";
import api from "@/lib/axios";

async function fetchPedidos() {
  const res = await api.get('/pedidos');
  if (res.status !== 200) {
    throw new Error('Erro ao buscar pedidos');
  }
  return res.data;
}

export default function Pedidos() {
  const { data: pedidos = [], isLoading } = useQuery<Pedido[]>({
    queryKey: ['pedidos', 'all'],
    queryFn: fetchPedidos
  });




  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <div className="w-full px-8 py-2">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os pedidos do restaurante
          </p>
        </div>
        <OrdersTable pedidos={pedidos} />
      </div>
    </div>
  );
}
