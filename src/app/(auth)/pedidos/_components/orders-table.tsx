"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pedido } from "@/lib/types";
import { useState } from "react";
import DialogProduct from "@/app/(auth)/tables/_components/dialog-product";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EyeIcon } from "lucide-react";

interface OrdersTableProps {
  pedidos: Pedido[];
}

export default function OrdersTable({ pedidos }: OrdersTableProps) {
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  const calcularTotalPedido = (pedido: Pedido) => {
    return pedido.produtos.reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  };

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID do Pedido</TableHead>
              <TableHead className="text-center">Mesa</TableHead>
              <TableHead className="text-center">Qtd Items</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell className="text-center">#{pedido.id}</TableCell>
                <TableCell className="font-medium text-center">Mesa {pedido.mesaId}</TableCell>
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
                    variant="ghost" className="text-blue-700 text-xs"
                    onClick={() => setSelectedPedido(pedido)}
                  >
                    <EyeIcon className="w-4 h-4" />
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <DialogProduct
        selectedPedido={selectedPedido}
        setSelectedPedido={setSelectedPedido}
      />
    </>
  );
} 