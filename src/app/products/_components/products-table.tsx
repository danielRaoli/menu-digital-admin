"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IoAddCircleOutline } from "react-icons/io5";
import { Categoria, Produto, SubCategoria } from "@/lib/types";
import CardProduct from "./card-product";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import RemoveProduct from "./remove-product";
import EditProduct from "./edit-product";
import AddProduct from "./add-product";
import { FaPlus, FaTrash } from "react-icons/fa6";
import AdicionarSubcategoria from "./adicionar-subcategoria";
import RemoveSubcategoria from "./remove-subcategoria";

interface ProductsTableProps {
   subCategorias: SubCategoria[];
   produtos: Produto[];
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
   categorias: Categoria[];
   onSubCategoryChange: (subcategoriaId: number) => void;
   selectedSubCategoria: SubCategoria | null;
}

export default function ProductsTable({ 
  categorias,
  subCategorias, 
  produtos, 
  currentPage, 
  totalPages,
  onPageChange,
  onSubCategoryChange,
  selectedSubCategoria
}: ProductsTableProps) {
    const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteSubcategoriaDialogOpen, setIsDeleteSubcategoriaDialogOpen] = useState(false);

    const handleEdit = (produto: Produto) => {
        setSelectedProduct(produto);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (produto: Produto) => {
        setSelectedProduct(produto);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteSubcategoria = () => {
        setIsDeleteSubcategoriaDialogOpen(true);
    };

    // Gera array de números de página para paginação
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return <>
     <div className="w-full rounded-md bg-white flex flex-col p-4 lg:p-8 mt-4">
          <div className="flex justify-between items-center">
           <span>Items do Cardápio</span>

           <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <AdicionarSubcategoria categorias={categorias} />
              {selectedSubCategoria && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleDeleteSubcategoria}
                  className="rounded-full text-red-600 hover:bg-red-200 hover:text-red-600 transition-colors"
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              )}
              <Select onValueChange={(value) => onSubCategoryChange(Number(value))} value={selectedSubCategoria?.id.toString()}>
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Sub Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{subCategorias.length > 0 ? "Sub Categorias" : "Selecione uma categoria"}</SelectLabel>
                    {subCategorias.map((subcategoria) => (
                      <SelectItem key={subcategoria.id} value={subcategoria.id.toString()}>
                        {subcategoria.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup> 
                </SelectContent>
              </Select>
            </div>

            <AddProduct 
              categorias={categorias}
              isOpen={isAddDialogOpen}
              open={() => setIsAddDialogOpen(true)}
              onClose={() => setIsAddDialogOpen(false)}
            />
           </div>
          </div>

         <div className="mt-4">
            {produtos.map((produto) => (
              <CardProduct 
                key={produto.id} 
                produto={produto}
                onEdit={() => handleEdit(produto)}
                onDelete={() => handleDelete(produto)}
              />
            ))}
         </div>

         {/* Paginação */}
         {totalPages > 1 && (
           <div className="mt-4 flex justify-center">
             <Pagination>
               <PaginationContent>
                 <PaginationItem>
                   <PaginationPrevious 
                     href="#" 
                     onClick={(e) => {
                       e.preventDefault();
                       if (currentPage > 1) onPageChange(currentPage - 1);
                     }}
                   />
                 </PaginationItem>
                 
                 {pageNumbers.map((page) => (
                   <PaginationItem key={page}>
                     <PaginationLink
                       href="#"
                       isActive={page === currentPage}
                       onClick={(e) => {
                         e.preventDefault();
                         onPageChange(page);
                       }}
                     >
                       {page}
                     </PaginationLink>
                   </PaginationItem>
                 ))}

                 <PaginationItem>
                   <PaginationNext 
                     href="#" 
                     onClick={(e) => {
                       e.preventDefault();
                       if (currentPage < totalPages) onPageChange(currentPage + 1);
                     }}
                   />
                 </PaginationItem>
               </PaginationContent>
             </Pagination>
           </div>
         )}
        </div>

        <EditProduct
          produto={selectedProduct}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
        />
        <RemoveProduct 
          produto={selectedProduct} 
          isDeleteDialogOpen={isDeleteDialogOpen} 
          setIsDeleteDialogOpen={setIsDeleteDialogOpen} 
        />
        <RemoveSubcategoria
          subcategoria={selectedSubCategoria}
          isDeleteDialogOpen={isDeleteSubcategoriaDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteSubcategoriaDialogOpen}
        />
    </>;
}