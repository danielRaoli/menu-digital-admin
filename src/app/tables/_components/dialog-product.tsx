
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pedido } from "@/lib/types";

interface DialogProductProps{
 selectedPedido: Pedido | null;
 setSelectedPedido: (pedido: Pedido | null) => void;

}
export default function DialogProduct({ selectedPedido, setSelectedPedido }: DialogProductProps) {
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
                    <div>
                        <p className="font-semibold">Mesa {selectedPedido.mesaId}</p>
                        <p className="text-sm text-muted-foreground">Status: {selectedPedido.status}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">há 32m</p>
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

                <div className="flex justify-between pt-4 border-t">
                    <p className="font-semibold"> Total: R$ {selectedPedido.produtos.reduce((total, item) => 
                            total + (item.produto.preco * item.quantidade), 0).toFixed(2)}</p>
                    <Button className="bg-green-500 text-white" onClick={() => setSelectedPedido(null)}>Marcar Pedido Como Finalizado</Button>
                </div>
            </div>
        )}
    </DialogContent>
</Dialog>}
    </> 
   

}