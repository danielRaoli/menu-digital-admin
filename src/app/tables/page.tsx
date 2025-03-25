
import TablesSelect from "./_components/tables-select"
import Orders from "./_components/orders"
import { Pedido } from "@/lib/types"

export default function Tables() {

    const pedidos = [
        {
            id: 1,
            mesaId: 5,
            status: "Em preparação",
            produtos: [
                {
                    id: 1,
                    pedidoId: 1,
                    produtoId: 1,
                    quantidade: 2,
                    produto: {
                        id: 1,
                        nome: "Hambúrguer Artesanal",
                        preco: 25.99,
                        imagem: "hamburguer.jpg",
                        descricao: "Hambúrguer feito com carne Angus, queijo cheddar e bacon.",
                        categoriaId: 1,
                        subcategoriaId: null,
                    },
                },
                {
                    id: 2,
                    pedidoId: 1,
                    produtoId: 2,
                    quantidade: 1,
                    produto: {
                        id: 2,
                        nome: "Batata Frita",
                        preco: 12.5,
                        imagem: "batata-frita.jpg",
                        descricao: "Batata frita crocante acompanhada de molho especial.",
                        categoriaId: 2,
                        subcategoriaId: null,
                    },
                },
                {
                    id: 3,
                    pedidoId: 1,
                    produtoId: 3,
                    quantidade: 1,
                    produto: {
                        id: 3,
                        nome: "Batata Frita",
                        preco: 12.5,
                        imagem: "batata-frita.jpg",
                        descricao: "Batata frita crocante acompanhada de molho especial.",
                        categoriaId: 2,
                        subcategoriaId: null,
                    },
                },
            ],
            mesa: {
                id: 5,
            },
        },
        {
            id: 2,
            mesaId: 3,
            status: "Finalizado",
            produtos: [
                {
                    id: 3,
                    pedidoId: 2,
                    produtoId: 3,
                    quantidade: 1,
                    produto: {
                        id: 3,
                        nome: "Pizza de Calabresa",
                        preco: 42.99,
                        imagem: "pizza-calabresa.jpg",
                        descricao: "Pizza com calabresa, cebola e queijo mussarela.",
                        categoriaId: 3,
                        subcategoriaId: null,
                    },
                },
            ],
            mesa: {
                id: 3,
            },
        },
    ] as unknown as Pedido[];
    return (
        <div className="w-full flex flex-col h-full">
            <TablesSelect />
            <Orders pedidos={pedidos} />
        </div>
    )
}


