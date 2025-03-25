import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Categoria } from "@/lib/types";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";

export default function AddCategory() {
    const [nome, setNome] = useState("");

    const queryClient = useQueryClient();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const mutation = useMutation({
      mutationFn: async (categoria: Omit<Categoria, "id" | "produtos" | "subcategorias">) => {
        const res = await fetch("https://restaurante-api-wv3i.onrender.com/categorias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoria),
        });
        return res.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categorias"] });
        setIsAddDialogOpen(false);
      },
    })
    return (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger>
            <Button className="rounded-full w-min text-nowrap bg-blue-500 mt-4"> 
        <IoAddCircleOutline className="text-2xl text-white w-20" size={40} />
        Adicionar Nova Categoria
      </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para adicionar uma nova categoria.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Digite o nome da categoria"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-blue-500 text-white" disabled={mutation.isPending} onClick={() => mutation.mutate({ nome })}>
                        {mutation.isPending ? <FaSpinner className="animate-spin" /> : "Salvar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}