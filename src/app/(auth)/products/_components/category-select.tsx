import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Categoria } from "@/lib/types";

interface CategorySelectProps {
    categorias: Categoria[];
    onCategoryChange: (categoriaId: number) => void;
}
export default function CategorySelect({ categorias, onCategoryChange }: CategorySelectProps) {
    return (
             
        <ToggleGroup 
          type="single" 
          className=" flex-wrap gap-2"
        >
          <ToggleGroupItem 
              className="data-[state=on]:bg-slate-700  flex-auto max-w-min data-[state=on]:text-white  py-2 rounded-2xl  bg-gray-200 hover:bg-gray-200 transition-colors "
              value="all"
              onClick={() => onCategoryChange(0)}
            >
              Todos
            </ToggleGroupItem>
          {categorias.map((categoria) => (
            <ToggleGroupItem 
              className="data-[state=on]:bg-slate-700  flex-auto max-w-min data-[state=on]:text-white  py-2 rounded-2xl  bg-gray-200 hover:bg-gray-200 transition-colors "
              key={categoria.id}
              value={categoria.id.toString()}
              onClick={() => onCategoryChange(categoria.id)}
            >
              {categoria.nome}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
    )
}