export type Categoria = {
    id: number;
    nome: string;
    produtos: Produto[];
    subcategorias: SubCategoria[];
  };
  
  export type SubCategoria = {
    id: number;
    nome: string;
    categoriaId: number;
    categoria: Categoria;
    produtos: Produto[];
  };
  
  export type Produto = {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    descricao?: string;
    categoriaId: number;
    categoria: Categoria;
    subcategoriaId?: number;
    subcategoria?: SubCategoria;
    pedidoProdutos: PedidoProduto[];
  };
  
  export type Pedido = {
    id: number;
    mesaId: number;
    status: string;
    produtos: PedidoProduto[];
    mesa: Mesa;
  };
  
  export type PedidoProduto = {
    id: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    pedido: Pedido;
    produto: Produto;
  };
  
  export type Mesa = {
    id: number;
    numero: number;
    pedidos: Pedido[];
  };