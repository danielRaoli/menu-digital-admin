import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdOutlineTableRestaurant } from "react-icons/md";

const tables = [
    "mesa 01",
    "mesa 02",
    "mesa 03",
    "mesa 04",
    "mesa 05",
    "mesa 06",
    "mesa 07",
    "mesa 08",
    "mesa 09",
    "mesa 10",
    "mesa 11",
    "mesa 12",
    "mesa 13",
    "mesa 14",
    "mesa 15",
    "mesa 16",
    "mesa 17",
    "mesa 18",
    "mesa 19",
    "mesa 20",
    "mesa 21",


]

export default function TablesSelect() {
    return (
        <ToggleGroup type="single" className="w-full flex flex-wrap justify-around gap-2 justify-start" >
        {tables.map((table) => (
            <ToggleGroupItem className="data-[state=on]:bg-primary cursor-pointer flex-auto max-w-min data-[state=on]:text-white px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-200 transition-colors " key={table} value={table}>
                 <MdOutlineTableRestaurant  />
                 <span className="uppercase">{table}</span>
            </ToggleGroupItem>
        ))}
    </ToggleGroup>
    )
}