import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubCategoria } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa6";
import api from "@/lib/axios";

interface RemoveSubcategoriaProps {
    subcategoria: SubCategoria | null;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
}

export default function RemoveSubcategoria({ subcategoria, isDeleteDialogOpen, setIsDeleteDialogOpen }: RemoveSubcategoriaProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await api.delete(`https://restaurante-api-wv3i.onrender.com/subcategorias/${subcategoria?.id}`);


            // Don't try to parse JSON for 204 responses
            if (res.status === 204) {
                return null;
            }

            return res.data();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
            toast.success("Subcategoria excluída com sucesso!");
            setIsDeleteDialogOpen(false);
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao excluir subcategoria");
        },
    });

    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir a subcategoria &quot;{subcategoria?.nome}&quot;?
                        Esta ação não pode ser desfeita e removerá todos os produtos associados.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-between">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsDeleteDialogOpen(false)}
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
    );
} 