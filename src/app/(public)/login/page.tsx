// app/login/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isTokenExpired } from '@/utils/jwt';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token && !isTokenExpired(token)){
      router.push("/products")
      console.log("push")
    }
  }, [router]);

  const login = async () => {
    try {
      const res = api.post('/login', {
        username,
        password
      })
      const data = (await res).data;

      if ((await res).status === 200) {
        localStorage.setItem('token', data.token);
        router.push('/products');
      } else {
        toast.error("Credenciais inválidas");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao conectar");
    }
  };

  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className="bg-orange-700 w-1/2 h-screen flex flex-col gap-4 items-center justify-center">
        <Image src="/logo.png" alt="logo" className='rounded-full' width={100} height={100} />
        <h1 className='text-white text-2xl font-bold'>Acesso ao Dashboard de Administrador</h1>
  

      </div>
      <div className="w-1/2 h-1/2 flex items-center justify-center">
        <div className='flex text-orange-600 flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Gerencie seu Restaurante</h1>
          <div className='flex flex-col gap-2'>
            <Label>Usuário</Label>
            <Input type="text" placeholder='Nome de usuários' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Senha</Label>
            <Input type="password" placeholder='Senha de acesso' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button className='bg-orange-600 text-white hover:bg-orange-700'  onClick={login}>Entrar</Button>
        </div>
      </div>
    </div>
  );
}
