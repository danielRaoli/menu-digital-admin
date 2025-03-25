"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Categoria, SubCategoria } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";

interface AddProductProps {
    categorias: Categoria[]
    isOpen: boolean;
    onClose: () => void;
    open: () => void;
}

export default function AddProduct({ isOpen, onClose, open, categorias }: AddProductProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCategoria, setSelectedCategoria] = useState<string>("");
    const [selectedSubCategoria, setSelectedSubCategoria] = useState<string>("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const queryClient = useQueryClient();

    // Get subcategorias based on selected categoria
    const subcategorias = categorias
        ?.find(c => c.id.toString() === selectedCategoria)
        ?.subcategorias as SubCategoria[] ?? [];

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await fetch("https://restaurante-api-wv3i.onrender.com/produtos", {
                method: "POST",
                body: formData
            });
            if (!res.ok) {
                throw new Error('Erro ao criar produto');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produtos"] });
            handleClose();
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !selectedCategoria || !nome || !preco) {
            return;
        }

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("categoriaId", selectedCategoria);
        if(selectedCategoria !== ""){
            formData.append("subcategoriaId", selectedSubCategoria);
        }
        formData.append("descricao", descricao);
        formData.append("preco", preco);
        formData.append("imagem", selectedFile);

        mutation.mutate(formData);
    };

    const handleClose = () => {
        setSelectedFile(null);
        setSelectedCategoria("");
        setSelectedSubCategoria("");
        setNome("");
        setDescricao("");
        setPreco("");
        onClose();
    };

    return <>
        <Button onClick={open} className="rounded-md flex items-center w-min text-white text-nowrap bg-green-500">
            <IoAddCircleOutline className="text-white" />
            Adicionar Novo Produto
        </Button>
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Produto</DialogTitle>
                    <DialogDescription>
                        Preencha os dados do novo produto. Campos com * são obrigatórios.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nome">Nome do Produto *</Label>
                            <Input
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome do produto"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="descricao">Descrição</Label>
                            <Textarea
                                id="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Digite a descrição do produto"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="preco">Preço *</Label>
                            <Input
                                id="preco"
                                type="number"
                                step="0.01"
                                min="0"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Categoria *</Label>
                            <Select
                                value={selectedCategoria}
                                onValueChange={setSelectedCategoria}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categorias</SelectLabel>
                                        {categorias?.map((categoria) => (
                                            <SelectItem
                                                key={categoria.id}
                                                value={categoria.id.toString()}
                                            >
                                                {categoria.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label>Subcategoria</Label>
                            <Select
                                value={selectedSubCategoria}
                                onValueChange={setSelectedSubCategoria}
                                disabled={!selectedCategoria}
                            >
                                <SelectTrigger>
                                    <SelectValue 
                                        placeholder={
                                            selectedCategoria 
                                                ? "Selecione uma subcategoria" 
                                                : "Primeiro selecione uma categoria"
                                        } 
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Subcategorias</SelectLabel>
                                        {subcategorias.map((subcategoria) => (
                                            <SelectItem
                                                key={subcategoria.id}
                                                value={subcategoria.id.toString()}
                                            >
                                                {subcategoria.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Imagem do Produto *</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setSelectedFile(file);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                mutation.isPending ||
                                !selectedFile ||
                                !selectedCategoria ||
                                !nome ||
                                !preco
                            }
                        >
                            {mutation.isPending ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Criando...
                                </>
                            ) : (
                                "Criar Produto"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>;
}
