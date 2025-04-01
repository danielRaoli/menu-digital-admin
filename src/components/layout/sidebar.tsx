import Link from 'next/link'
import { BiSolidFoodMenu } from 'react-icons/bi'
import { FaChartColumn } from 'react-icons/fa6'
import { MdOutlineChatBubble, MdOutlineSettings, MdOutlineTableRestaurant, MdOutlineUpdate } from 'react-icons/md'

export function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen bg-white ">
      <div className="p-4 ">
        <h1 className="text-2xl font-bold text-red-600">Logo</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2 h-full">
          <li>
            <Link href="/analytics" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <FaChartColumn className='mr-2' />
              Analytics
            </Link>
          </li>
          <li>
            <Link href="/products" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <BiSolidFoodMenu className='mr-2' />
              Cardápio
            </Link>
          </li>
          <li>
            <Link href="/tables" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <MdOutlineTableRestaurant className='mr-2' />
              Mesas
            </Link>
          </li>
          <li>
            <Link href="/feedback" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <MdOutlineChatBubble className='mr-2' />
              Histórico de Pedidos
            </Link>
          </li>
          <li className="fixed bottom-4">
            <Link href="/settings" className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
            <MdOutlineSettings className='mr-2' />
              Configurações
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  )
}
