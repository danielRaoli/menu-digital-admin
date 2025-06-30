import { Notifications } from "@/components/notifications";

export function Header() {
  return (
    <header className="h-16 bg-white flex py-2 items-center justify-between px-6">
      <div className="flex items-center w-full justify-end gap-4">
        <Notifications />
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <span>❔</span>
        </button>
      </div>
    </header>
  )
}
