"use client"

import CategorySelect from "./_components/category-select";
import ProductsTable from "./_components/products-table";
import { Categoria, Produto, SubCategoria } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddCategory from "./_components/add-category";
import RemoveCategory from "./_components/remove-category";

const ITEMS_PER_PAGE = 5; // Número de produtos por página

async function fetchCategorias(): Promise<Categoria[]> {
  const res = await fetch("https://restaurante-api-wv3i.onrender.com/categorias");
  return res.json();
}

async function fetchProdutos(): Promise<Produto[]> {
  const res = await fetch("https://restaurante-api-wv3i.onrender.com/produtos");
  return res.json();
}

export default function Products() {
  const { data: categoriasData, isLoading: loadingCategorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: fetchCategorias,
  });

  const { data: produtosData, isLoading: loadingProdutos } = useQuery({
    queryKey: ["produtos"],
    queryFn: fetchProdutos,
  });

  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProdutos, setPaginatedProdutos] = useState<Produto[]>([]);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  function handleCategoryChange(categoriaId: number) {
    if (categoriaId === selectedCategoria?.id) return;
    const categoria = categoriasData?.find(c => c.id === categoriaId);
    setSelectedCategoria(categoria ?? null);
    setSubCategorias(categoria ? categoria.subcategorias : []);
    setCurrentPage(1); // Reset para primeira página ao mudar categoria
    const produtosFiltrados = produtosData?.filter(p => p.categoriaId === categoriaId) ?? [];
    const paginatedProdutos = produtosFiltrados 
      ? produtosFiltrados.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      : [];
    setPaginatedProdutos(paginatedProdutos);
  }

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
      />
    </section>
  );
}