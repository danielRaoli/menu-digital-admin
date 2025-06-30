import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";
import { Produto } from "@/lib/types";

interface CardProductProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

export default function CardProduct({ produto, onEdit, onDelete }: CardProductProps) {
    return (
      <div className="w-full grid grid-cols-6 gap-4 items-center mt-6">
        {/* Imagem do produto */}
        <div className="col-span-1 flex justify-start">
          <div className="w-20 h-20 relative">
            <Image src={`${produto.imagem}`} width={100} height={100} alt="" layout="intrinsic" />
          </div>
        </div>

        {/* Nome e descrição */}
        <div className="col-span-3 text-start flex flex-col">
          <span className="text-2xl text-gray-600">{produto.nome}</span>
          <p className="text-xl text-gray-400">{produto.descricao}</p>
        </div>

        {/* Preço */}
        <span className="col-span-1 text-2xl">R$ {produto.preco.toFixed(2)}</span>

        {/* Botões */}
        <div className="col-span-1 flex items-end gap-2">
          <Button 
            className="rounded-md w-min text-nowrap bg-yellow-500"
            onClick={() => onEdit(produto)}
          >
            <SquarePen className="text-white" />
            Editar
          </Button>
          <Button 
            className="rounded-md w-min text-nowrap bg-red-500"
            onClick={() => onDelete(produto)}
          >
            <Trash className="text-white" />
            Remover
          </Button>
        </div>
      </div>
    );
}