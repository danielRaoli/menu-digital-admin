import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pedido } from "@/lib/types";

interface OrderCardProps {
    pedido: Pedido;
    onDetailsClick: () => void;
}

export default function OrderCard({ pedido, onDetailsClick }: OrderCardProps) {
    return (    
        <Card key={pedido.id} className="w-min-[300px] flex-1 max-w-[400px]">
            <CardContent className="h-full flex flex-col relative">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-nowrap font-semibold text-slate-800">
                            Mesa {pedido.mesaId}
                        </span>
                        <span className="text-slate-400 text-sm">#Pedido {pedido.id}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Badge className="text-nowrap rounded-full w-min h-6 bg-green-600 opacity-50">
                            {pedido.status}
                        </Badge>
                        <span className="text-sm text-slate-400 text-end"> há 32m </span>
                    </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-2 mt-2"> 
                    {pedido.produtos.length > 2 ? (
                        <>
                            <div className="flex justify-between">
                                <span>{pedido.produtos[0].produto.nome}</span>
                                <span>{pedido.produtos[0].quantidade}X</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{pedido.produtos[1].produto.nome}</span>
                                <span>{pedido.produtos[1].quantidade}X</span>
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Ver mais...</AccordionTrigger>
                                    <AccordionContent>
                                        {pedido.produtos.slice(2).map((produtoPedido) => (
                                            <div className="flex justify-between" key={produtoPedido.produto.id}>
                                                <span>{produtoPedido.produto.nome}</span>
                                                <span>{produtoPedido.quantidade}X</span>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </>
                    ) : pedido.produtos.map((produtoPedido) => (
                        <div className="flex justify-between" key={produtoPedido.produto.id}>
                            <span>{produtoPedido.produto.nome}</span>
                            <span>{produtoPedido.quantidade}X</span>
                        </div>
                    ))}
                </div>

                <Button 
                    className="bg-slate-800 mt-auto hover:bg-slate-700" 
                    onClick={onDetailsClick}
                >
                    Detalhes
                </Button>
            </CardContent>
        </Card>
    );
}