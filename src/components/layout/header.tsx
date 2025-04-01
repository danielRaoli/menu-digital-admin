import { Notifications } from "@/components/notifications";

export function Header() {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-medium">Bom dia!</h2>
      </div>
      <div className="flex items-center gap-4">
        <Notifications />
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span>❔</span>
        </button>
      </div>
    </header>
  )
}
