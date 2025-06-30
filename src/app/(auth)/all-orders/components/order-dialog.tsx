import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pedido } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface OrderDialogProps {
    pedido: Pedido | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function OrderDialog({ pedido, isOpen, onClose }: OrderDialogProps) {
    if (!pedido) return null;

    const calcularTotalPedido = (pedido: Pedido) => {
        return pedido.produtos.reduce((total, item) => {
            return total + (item.produto.preco * item.quantidade);
        }, 0);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Detalhes do Pedido #{pedido.id}</span>
                        <Badge 
                            className={`${
                                pedido.status === "finalizado"
                                    ? "bg-green-500" 
                                    : "bg-red-500"
                            } rounded-full`}
                        >
                            {pedido.status}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Mesa:</span>
                        <span>Mesa {pedido.mesaId}</span>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Itens do Pedido</h3>
                        <div className="space-y-4">
                            {pedido.produtos.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={item.produto.imagem} alt={item.produto.nome} />
                                        <AvatarFallback>{item.produto.nome.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.produto.nome}</h4>
                                        <p className="text-sm text-gray-500">
                                            Quantidade: {item.quantidade}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            R$ {item.produto.preco.toFixed(2)} unidade
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total do Pedido</span>
                            <span className="text-xl font-bold text-green-600">
                                R$ {calcularTotalPedido(pedido).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}