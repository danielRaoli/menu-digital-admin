import Link from 'next/link'
import { BiSolidFoodMenu } from 'react-icons/bi'
import { FaChartColumn } from 'react-icons/fa6'
import { MdOutlineChatBubble, MdOutlineTableRestaurant } from 'react-icons/md'
const links = [
  {
    href: "/dashboard",
    icon: <FaChartColumn className='text-2xl' />,
    label: "Dashboard"
  },
  {
    href: "/products",
    icon: <BiSolidFoodMenu className='text-2xl' />,
    label: "Cardápio"
  },
  {
    href: "/tables",
    icon: <MdOutlineTableRestaurant className='text-2xl' />,
    label: "Mesas"
  },
  {
    href: "/pedidos",
    icon: <MdOutlineChatBubble className='text-2xl' />,
    label: "Histórico de Pedidos"
  },

    
]
export function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen bg-white ">
      <div className="p-4 ">
        <h1 className="text-2xl font-bold text-red-600">Logo</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-4 h-full">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="flex items-center text-slate-800 p-2 hover:bg-gray-100 rounded-lg">
              {link.icon}
              <span className='ml-2 text-lg font-semibold'> {link.label}</span>
             
              </Link>
            </li>
          ))}
        </ul>


        </nav>
    </aside>
  )
}
