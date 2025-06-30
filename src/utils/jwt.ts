import {jwtDecode} from "jwt-decode"  ;

interface JwtPayload {
  exp: number;
  username?: string;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000); // em segundos
    return decoded.exp < currentTime;
  } catch {
    return true; // se falhar ao decodificar, considere inválido
  }
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}