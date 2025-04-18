import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Produto } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa6";

interface RemoveProductProps {
    produto: Produto | null;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
}

export default function RemoveProduct({ produto, isDeleteDialogOpen, setIsDeleteDialogOpen }: RemoveProductProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`https://restaurante-api-wv3i.onrender.com/produtos/${produto?.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Erro ao excluir produto");
            }

            // Don't try to parse JSON for 204 responses
            if (res.status === 204) {
                return null;
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produtos"] });
            toast.success("Produto excluído com sucesso!");
            setIsDeleteDialogOpen(false);
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao excluir produto");
        },
    });

    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir o produto "{produto?.nome}"?
                        Esta ação não pode ser desfeita.
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