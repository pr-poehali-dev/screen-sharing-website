import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        toast({
          title: 'Успешный вход!',
          description: `Добро пожаловать, ${username}`,
        });
        navigate('/');
      } else {
        toast({
          title: 'Ошибка входа',
          description: 'Пожалуйста, заполните все поля',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md glass border-white/30 relative z-10 animate-scale-in">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <Icon name="Monitor" size={32} className="text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Вход в систему
          </CardTitle>
          <CardDescription className="text-white/70">
            Войдите для доступа к трансляциям
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/90">Логин</Label>
              <div className="relative">
                <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Введите логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Пароль</Label>
              <div className="relative">
                <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full gradient-accent hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
              Забыли пароль?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
