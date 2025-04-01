"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Categoria } from "@/lib/types";
import { FaSpinner, FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

interface RemoveCategoryProps {
    isDeleteDialogOpen: boolean;
    categoria: Categoria;
    onClose: () => void;
    open: () => void;
}

export default function RemoveCategory({ isDeleteDialogOpen, categoria, onClose, open }: RemoveCategoryProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`https://restaurante-api-wv3i.onrender.com/categorias/${categoria?.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error(`Erro ao excluir categoria: ${res.statusText}`);
            }
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
            toast.success("Categoria excluída com sucesso!");
            onClose();
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao excluir categoria");
        },
    });

    return (
        <>
            <Button 
                variant="destructive" 
                className="rounded-full w-min text-nowrap mt-4 flex items-center gap-2"
                onClick={open}
            >
                <FaTrash className="text-white" size={20} />
                Remover Categoria
            </Button>

            <Dialog open={isDeleteDialogOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir a categoria "{categoria?.nome}"?
                            Esta ação não pode ser desfeita e removerá todos os produtos associados.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-between">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={mutation.isPending}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => mutation.mutate()}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : null}
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}