import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Produto } from "@/lib/types";

interface RemoveProductProps{
    produto: Produto | null;
    onDelete: (id: number) => void;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
}

export default function RemoveProduct({ produto, onDelete, isDeleteDialogOpen, setIsDeleteDialogOpen} : RemoveProductProps) {
    return (
        <>
                {/* Dialog de Confirmação de Exclusão */}
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
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => onDelete(produto?.id!)}
                    >
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}