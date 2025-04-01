import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Mesa } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineTableRestaurant } from "react-icons/md";

interface TablesSelectProps {
    onSelect: (tableId: string) => void;
    selectedTable: string;
}

export default function TablesSelect({ onSelect, selectedTable }: TablesSelectProps) {
    const { data: tables = [] } = useQuery({
        queryKey: ["tables"],
        queryFn: async () => {
            const res = await fetch(`https://restaurante-api-wv3i.onrender.com/mesas`);
            const data = await res.json();
            return (data as Mesa[]);
        },
    });

    return (
        <ToggleGroup 
            value={selectedTable}
            onValueChange={(value) => onSelect(value)} 
            type="single" 
            className="w-full flex flex-wrap justify-around gap-2 justify-start"
        >
            <ToggleGroupItem 
                className="data-[state=on]:bg-primary cursor-pointer flex-auto max-w-min data-[state=on]:text-white px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-200 transition-colors" 
                value="all"
            >
                <MdOutlineTableRestaurant />
                <span className="uppercase">Todas as Mesas</span>
            </ToggleGroupItem>
            {tables.map((table) => (
                <ToggleGroupItem  
                    className=" relative data-[state=on]:bg-primary cursor-pointer flex-auto max-w-min data-[state=on]:text-white px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-200 transition-colors" 
                    key={table.id} 
                    value={table.id.toString()}
                >
                    <MdOutlineTableRestaurant />
                    <span className="uppercase">Mesa {table.numero}</span>
                    {table.pedidos.length >0 && <div className="w-1 h-1 bg-green-600 rounded-full animation-pulse transition-all duration-300 absolute right-1 top-1"></div>}
                    
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}