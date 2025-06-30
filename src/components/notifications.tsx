"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client";
import Link from "next/link";


interface Notification {
  id: string;
  type: 'garcom' | 'conta';
  message: string;
  mesaId: number;
  timestamp: number;
  read: boolean;
  contaId: number | null
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.read).length;



  useEffect(() => {
    const socket= io(process.env.NEXT_PUBLIC_APIURL);
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    socket.on("contaSolicitada", ({ numeroMesa, idConta, donoConta }) => {
      console.log("Conta solicitada na mesa", numeroMesa);
      const id = idConta + "conta";
    
      setNotifications(prevNotifications => {
        const updatedNotifications = prevNotifications.filter(n => n.id !== id);
    
        const newNotification: Notification = {
          id,
          type: 'conta',
          message: `${donoConta} está solicitando a conta na mesa ${numeroMesa.toString()} `,
          mesaId: numeroMesa,
          timestamp: Date.now(),
          read: false,
          contaId: idConta
        };
    
        const finalNotifications = [...updatedNotifications, newNotification];
        localStorage.setItem('notifications', JSON.stringify(finalNotifications));
        return finalNotifications;
      });
    });
    

    socket.on("garcomChamado", (mesa: number) => {
        console.log("Garçom chamado recebido via WebSocket:", mesa);
        setNotifications(prevNotifications => {
            const updatedNotifications = prevNotifications.filter(n => n.id !== mesa.toString() + "garcom");

            const newNotification: Notification = {
                id: mesa.toString() + "garcom",
                type: 'garcom',
                message: `O garçom foi chamado para a mesa ${mesa.toString()}`,
                mesaId: mesa,
                timestamp: Date.now(),
                read: false,
                contaId: null
            };
            const finalNotifications = [...updatedNotifications, newNotification];
            localStorage.setItem('notifications', JSON.stringify(finalNotifications));
            return finalNotifications;
        });
    });

    return () => {
        socket.disconnect();
    };

  }, []);



  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="relative">
          <Bell className="text-2xl" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notificações</span>
          {notifications.length > 0 && (
            <span
              onClick={clearAll}
              className="cursor-pointer h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              Limpar todas
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Nenhuma notificação
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start mb-2 p-4 ${!notification.read ? 'bg-muted' : ''}`}
              >
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-sm text-muted-foreground">
                      Mesa {notification.mesaId}
                    </p>
                  </div>
                  {notification.type == "conta" && (
                    <Link href={`/tables/bill/${notification.contaId}`}></Link>
                  )}
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                    >
                      Marcar como lida
                    </Button>
                  )}
                </div>
                <div  className={`flex w-full ${notification.type === 'conta' ? 'justify-between' : 'justify-start'}`}>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                  {notification.type === 'conta' && notification.contaId && (
                    <Link href={`/tables/bill/${notification.contaId}`} className="text-xs text-primary underline ml-2">
                      Ver conta
                    </Link>
                  )}
                </div>

              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 