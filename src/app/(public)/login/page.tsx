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
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token && !isTokenExpired(token)){
      router.push("/products")
      console.log("push")
    }
  }, [router]);

  const login = async () => {
    if (!username || !password) {
      setLoginStatus('error');
      setMessage('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setLoginStatus('idle');
    setMessage('');

    try {
      const res = await api.post('/login', {
        username,
        password
      });
      const data = res.data;

      if (res.status === 200) {
        setLoginStatus('success');
        setMessage('Login realizado com sucesso!');
        localStorage.setItem('token', data.token);
        
        // Aguarda um pouco para mostrar a mensagem de sucesso
        setTimeout(() => {
          router.push('/products');
        }, 1500);
      } else {
        setLoginStatus('error');
        setMessage('Credenciais inválidas');
        toast.error("Credenciais inválidas");
      }
    } catch (err) {
      console.error(err);
      setLoginStatus('error');
      setMessage('Erro ao conectar com o servidor');
      toast.error("Erro ao conectar");
    } finally {
      setIsLoading(false);
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
          
          {/* Componente de feedback */}
          {loginStatus !== 'idle' && (
            <div className={`flex items-center gap-2 p-3 rounded-md ${
              loginStatus === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {loginStatus === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{message}</span>
            </div>
          )}
          
          <Button 
            className='bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50' 
            onClick={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
