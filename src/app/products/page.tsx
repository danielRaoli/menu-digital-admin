"use client"

import CategorySelect from "./_components/category-select";
import ProductsTable from "./_components/products-table";
import { Categoria, Produto, SubCategoria } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddCategory from "./_components/add-category";
import RemoveCategory from "./_components/remove-category";

const ITEMS_PER_PAGE = 5; // Número de produtos por página

async function fetchCategorias(): Promise<Categoria[]> {
  const res = await fetch("https://restaurante-api-wv3i.onrender.com/categorias");
  return res.json();
}

async function fetchProdutos(categoriaId?: number, subcategoriaId?: number): Promise<Produto[]> {
  let url = "https://restaurante-api-wv3i.onrender.com/produtos";
  if (subcategoriaId) {
    url = `https://restaurante-api-wv3i.onrender.com/subcategorias/${subcategoriaId}`;
  } else if (categoriaId) {
    url = `https://restaurante-api-wv3i.onrender.com/categorias/${categoriaId}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  // If the response contains a produtos array, return it, otherwise return the data itself
  return data.produtos || data;
}

export default function Products() {
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [selectedSubCategoria, setSelectedSubCategoria] = useState<SubCategoria | null>(null);
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProdutos, setPaginatedProdutos] = useState<Produto[]>([]);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: categoriasData, isLoading: loadingCategorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const categorias = await fetchCategorias();
      // Atualiza as subcategorias baseado na categoria selecionada
      if (selectedCategoria) {
        const categoriaAtual = categorias.find(c => c.id === selectedCategoria.id);
        setSubCategorias(categoriaAtual?.subcategorias || []);
      } else {
        setSubCategorias(categorias.flatMap(c => c.subcategorias));
      }
      return categorias;
    },
  });

  const { data: produtosData, isLoading: loadingProdutos } = useQuery({
    queryKey: ["produtos", selectedCategoria?.id, selectedSubCategoria?.id],
    queryFn: () => fetchProdutos(selectedCategoria?.id, selectedSubCategoria?.id),
    enabled: true,
  });

  function handleCategoryChange(categoriaId: number) {
    if (categoriaId === selectedCategoria?.id) return;
    const categoria = categoriasData?.find(c => c.id === categoriaId);
    setSelectedCategoria(categoria ?? null);
    setSelectedSubCategoria(null); // Reset subcategoria when category changes
    setSubCategorias(categoria ? categoria.subcategorias : []);
    setCurrentPage(1); // Reset para primeira página ao mudar categoria
  }

  function handleSubCategoryChange(subcategoriaId: number) {
    if (subcategoriaId === selectedSubCategoria?.id) return;
    const subcategoria = subCategorias.find(s => s.id === subcategoriaId);
    setSelectedSubCategoria(subcategoria ?? null);
    setCurrentPage(1); // Reset para primeira página ao mudar subcategoria
  }

  // Efeito para atualizar as subcategorias quando a categoria selecionada muda
  useEffect(() => {
    if (selectedCategoria && categoriasData) {
      const categoriaAtual = categoriasData.find(c => c.id === selectedCategoria.id);
      setSubCategorias(categoriaAtual?.subcategorias || []);
    } else if (categoriasData) {
      setSubCategorias(categoriasData.flatMap(c => c.subcategorias));
    }
  }, [selectedCategoria, categoriasData]);

  useEffect(() => {
    const paginatedProdutos = produtosData 
      ? produtosData.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      : [];
    setPaginatedProdutos(paginatedProdutos);
  }, [currentPage, produtosData]);

  // Calcula o total de páginas
  const totalPages = Math.ceil((produtosData?.length ?? 0) / ITEMS_PER_PAGE);

  return (
    <section className="w-full">
      <CategorySelect 
        categorias={categoriasData ?? []} 
        onCategoryChange={handleCategoryChange} 
      />

      <div className="flex gap-8 items-end">
        <AddCategory />
        {selectedCategoria && (
          <RemoveCategory 
            isDeleteDialogOpen={isRemoveDialogOpen}
            onClose={() => setIsRemoveDialogOpen(false)}
            open={() => setIsRemoveDialogOpen(true)}
            categoria={selectedCategoria}
          />
        )}
      </div>

      <ProductsTable 
        subCategorias={subCategorias} 
        produtos={paginatedProdutos}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        categorias={categoriasData ?? []}
        onSubCategoryChange={handleSubCategoryChange}
        selectedSubCategoria={selectedSubCategoria}
      />
    </section>
  );
}