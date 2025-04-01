
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pedido } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DialogProductProps {
    selectedPedido: Pedido | null;
    setSelectedPedido: (pedido: Pedido | null) => void;

}
export default function DialogProduct({ selectedPedido, setSelectedPedido }: DialogProductProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (status: string) => {
            const res = await fetch(`https://restaurante-api-wv3i.onrender.com/pedidos/${selectedPedido?.id}`, {
                headers: { "Content-Type": "application/json" },
                method: "PUT",
                body: JSON.stringify({ status: status, mesaId: selectedPedido?.mesaId, produtos: selectedPedido?.produtos })
            });
            if (!res.ok) {
                throw new Error("Erro ao atualizar status do pedido");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pedidos', 'all'] });
            setSelectedPedido(null);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    return <>
        {selectedPedido &&
            <Dialog open={!!selectedPedido} onOpenChange={() => setSelectedPedido(null)}>
                <DialogContent className="max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Detalhes do Pedido #{selectedPedido?.id}</DialogTitle>
                    </DialogHeader>

                    {selectedPedido && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                               
                                    <p className="font-semibold">Mesa {selectedPedido.mesaId}</p>
                                    
                              <div className="space-y-1">
                              <Badge  className={`${selectedPedido.status === "pendente" ? "bg-yellow-500" : selectedPedido.status === "finalizado" ? "bg-green-500" : "bg-red-500"}`}>{selectedPedido.status}</Badge>
                              <p className="text-sm text-muted-foreground text-end">há 32m</p>
                                
                              </div>
                                
                            </div>

                            <div className="space-y-2">
                                <p className="font-medium">Itens do pedido:</p>
                                {selectedPedido.produtos.map((item) => (
                                    <div key={item.produto.id} className="flex justify-between py-2 border-b">
                                        <div>
                                            <p className="font-medium">{item.produto.nome}</p>
                                            <p className="text-sm text-muted-foreground">{item.produto.descricao}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{item.quantidade}x</p>
                                            <p className="text-sm text-muted-foreground">
                                                R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <p className="font-semibold"> Total: R$ {selectedPedido.produtos.reduce((total, item) =>
                                total + (item.produto.preco * item.quantidade), 0).toFixed(2)}</p>
                            {selectedPedido.status === "pendente" && (
                                <div className="flex gap-2">
                                    <Button disabled={mutation.isPending} className="bg-red-500 text-white" onClick={() => mutation.mutate("cancelado")}>
                                        {mutation.isPending ? "Cancelando..." : "Cancelar Pedido"}
                                    </Button>
                                    <Button disabled={mutation.isPending} className="bg-green-500 text-white" onClick={() => mutation.mutate("finalizado")}>
                                        {mutation.isPending ? "Marcando como finalizado..." : "Marcar Pedido Como Finalizado"}
                                    </Button>

                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>}
    </>


}