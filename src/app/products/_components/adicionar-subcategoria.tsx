"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Categoria } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { FaPlus, FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";
interface AdicionarSubcategoriaProps {
    categorias: Categoria[];
}

export default function AdicionarSubcategoria({ categorias }: AdicionarSubcategoriaProps) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [categoriaId, setCategoriaId] = useState<number | null>(null);

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("https://restaurante-api-wv3i.onrender.com/subcategorias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, categoriaId }),
            });
            if (!res.ok) {
                throw new Error("Erro ao adicionar subcategoria");
            }
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
            handleClose();
            toast.success("Subcategoria adicionada com sucesso");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleClose = () => {
        setNome("");
        setCategoriaId(null);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full text-green-600 hover:bg-green-200 hover:text-green-600 transition-colors"
                >
                    <FaPlus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[500px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Subcategoria</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                        <Label>Nome</Label>
                        <Input 
                            type="text" 
                            placeholder="Nome da subcategoria" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Categoria</Label>
                        <Select 
                            value={categoriaId?.toString()} 
                            onValueChange={(value) => setCategoriaId(Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categorias.map((categoria) => (
                                    <SelectItem key={categoria.id} value={categoria.id.toString()}>
                                        {categoria.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        className="bg-green-600 hover:bg-green-800" 
                        disabled={mutation.isPending || !nome || !categoriaId} 
                        onClick={() => mutation.mutate()}
                    >
                        {mutation.isPending ? (
                            <FaSpinner className="animate-spin mr-2" />
                        ) : null}
                        Adicionar Subcategoria
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
