import { Produto, Categoria } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface EditProductProps {
    produto: Produto | null;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
}

export default function EditProduct({ produto, isEditDialogOpen, setIsEditDialogOpen }: EditProductProps) {
    const queryClient = useQueryClient();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCategoria, setSelectedCategoria] = useState<number>(produto?.categoriaId || 0);
    const [selectedSubCategoria, setSelectedSubCategoria] = useState<number | undefined>(produto?.subcategoriaId);

    const { data: categorias = [] } = useQuery<Categoria[]>({
        queryKey: ["categorias"],
        queryFn: async () => {
            const res = await fetch("https://restaurante-api-wv3i.onrender.com/categorias");
            return res.json();
        },
    });

    const categoriaAtual = categorias.find(c => c.id === selectedCategoria);
    const subcategorias = categoriaAtual?.subcategorias || [];

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await fetch(`https://restaurante-api-wv3i.onrender.com/produtos/${produto?.id}`, {
                method: "PUT",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Erro ao atualizar produto");
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produtos"] });
            toast.success("Produto atualizado com sucesso!");
            setIsEditDialogOpen(false);
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao atualizar produto");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Adiciona a imagem ao FormData se houver uma nova selecionada
        if (selectedFile) {
            formData.append("imagem", selectedFile);
        }

        // Adiciona a subcategoria ao FormData se houver uma selecionada
        if (selectedSubCategoria) {
            formData.append("subcategoriaId", selectedSubCategoria.toString());
        }

        mutation.mutate(formData);
    };

    const handleCategoriaChange = (categoriaId: string) => {
        setSelectedCategoria(Number(categoriaId));
        setSelectedSubCategoria(undefined); // Reset subcategoria when category changes
    };

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Produto</DialogTitle>
                    <DialogDescription>
                        Faça as alterações necessárias no produto. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            name="nome"
                            defaultValue={produto?.nome}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Preço
                        </Label>
                        <Input
                            id="price"
                            name="preco"
                            defaultValue={produto?.preco}
                            className="col-span-3"
                            type="number"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descrição
                        </Label>
                        <Input
                            id="description"
                            name="descricao"
                            defaultValue={produto?.descricao}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="categoria" className="text-right">
                            Categoria
                        </Label>
                        <Select
                            name="categoriaId"
                            value={selectedCategoria.toString()}
                            onValueChange={handleCategoriaChange}
                        >
                            <SelectTrigger className="col-span-3">
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
                    {subcategorias.length > 0 && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="subcategoria" className="text-right">
                                Subcategoria
                            </Label>
                            <Select
                                name="subcategoriaId"
                                value={selectedSubCategoria?.toString()}
                                onValueChange={(value) => setSelectedSubCategoria(Number(value))}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecione uma subcategoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subcategorias.map((subcategoria) => (
                                        <SelectItem key={subcategoria.id} value={subcategoria.id.toString()}>
                                            {subcategoria.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imagem" className="text-right">
                            Imagem
                        </Label>
                        <Input
                            id="imagem"
                            type="file"
                            accept="image/*"
                            className="col-span-3"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Salvando..." : "Salvar alterações"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}