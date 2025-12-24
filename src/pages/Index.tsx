import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Пользователь';
  const [resolution, setResolution] = useState('1080p');
  const [bitrate, setBitrate] = useState('5000');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
  };

  const activeStreams = [
    { id: 1, title: 'Игровой стрим', viewers: 234, status: 'live', resolution: '1080p', bitrate: '6000' },
    { id: 2, title: 'Обучение React', viewers: 89, status: 'live', resolution: '720p', bitrate: '4000' },
    { id: 3, title: 'Дизайн в Figma', viewers: 156, status: 'live', resolution: '1080p', bitrate: '5000' },
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Monitor" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">StreamCast</h1>
                <p className="text-sm text-muted-foreground">Трансляция экрана</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="User" size={18} className="text-muted-foreground" />
                <span className="text-sm">{username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden gradient-primary p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Профессиональная трансляция экрана
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Транслируйте свой экран в высоком качестве с гибкими настройками разрешения и битрейта
              </p>
              <Button 
                size="lg" 
                className={`text-lg px-8 ${isStreaming ? 'bg-destructive hover:bg-destructive/90' : 'gradient-accent hover:opacity-90'} transition-all`}
                onClick={toggleStreaming}
              >
                <Icon name={isStreaming ? "StopCircle" : "Radio"} size={24} className="mr-2" />
                {isStreaming ? 'Остановить трансляцию' : 'Начать трансляцию'}
              </Button>
            </div>
          </div>
        </section>

        <Tabs defaultValue="streams" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 glass">
            <TabsTrigger value="streams">
              <Icon name="Radio" size={18} className="mr-2" />
              Трансляции
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="guide">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Порядок
            </TabsTrigger>
          </TabsList>

          <TabsContent value="streams" className="space-y-6 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Активные трансляции</h3>
              <Badge variant="outline" className="text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow mr-2" />
                {activeStreams.length} в эфире
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeStreams.map((stream) => (
                <Card key={stream.id} className="glass border-white/20 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{stream.title}</CardTitle>
                      <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Users" size={16} />
                      {stream.viewers} зрителей
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Разрешение:</span>
                      <span className="font-medium">{stream.resolution}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Битрейт:</span>
                      <span className="font-medium">{stream.bitrate} kbps</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 animate-fade-up">
            <Card className="glass border-white/20 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sliders" size={24} className="text-primary" />
                  Настройки трансляции
                </CardTitle>
                <CardDescription>
                  Выберите оптимальные параметры для вашего стрима
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="resolution" className="text-base">Разрешение видео</Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger id="resolution" className="bg-white/5 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">
                        <div className="flex items-center gap-2">
                          <Icon name="Monitor" size={16} />
                          720p (1280x720) - Оптимально
                        </div>
                      </SelectItem>
                      <SelectItem value="1080p">
                        <div className="flex items-center gap-2">
                          <Icon name="MonitorUp" size={16} />
                          1080p (1920x1080) - HD
                        </div>
                      </SelectItem>
                      <SelectItem value="1440p">
                        <div className="flex items-center gap-2">
                          <Icon name="MonitorUp" size={16} />
                          1440p (2560x1440) - QHD
                        </div>
                      </SelectItem>
                      <SelectItem value="4k">
                        <div className="flex items-center gap-2">
                          <Icon name="Tv" size={16} />
                          4K (3840x2160) - Ultra HD
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Более высокое разрешение требует больше пропускной способности
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bitrate" className="text-base">Битрейт (kbps)</Label>
                  <Select value={bitrate} onValueChange={setBitrate}>
                    <SelectTrigger id="bitrate" className="bg-white/5 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2500">2500 kbps - Низкое качество</SelectItem>
                      <SelectItem value="4000">4000 kbps - Среднее качество</SelectItem>
                      <SelectItem value="5000">5000 kbps - Высокое качество</SelectItem>
                      <SelectItem value="6000">6000 kbps - Очень высокое</SelectItem>
                      <SelectItem value="8000">8000 kbps - Максимальное</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Битрейт влияет на качество изображения и плавность видео
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                    <div className="flex items-center gap-3">
                      <Icon name="Zap" size={24} className="text-primary" />
                      <div>
                        <p className="font-medium">Текущие настройки</p>
                        <p className="text-sm text-muted-foreground">
                          {resolution} • {bitrate} kbps
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Готово</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6 animate-fade-up">
            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-3xl font-bold text-center mb-8">Порядок работы</h3>
              
              {[
                {
                  step: 1,
                  icon: 'Settings',
                  title: 'Настройте параметры',
                  description: 'Выберите подходящее разрешение и битрейт в разделе "Настройки"'
                },
                {
                  step: 2,
                  icon: 'MonitorPlay',
                  title: 'Выберите область захвата',
                  description: 'Укажите, что транслировать: весь экран, окно приложения или определенную область'
                },
                {
                  step: 3,
                  icon: 'Radio',
                  title: 'Начните трансляцию',
                  description: 'Нажмите кнопку "Начать трансляцию" и разрешите доступ к экрану в браузере'
                },
                {
                  step: 4,
                  icon: 'Eye',
                  title: 'Мониторьте эфир',
                  description: 'Следите за качеством трансляции и количеством зрителей в реальном времени'
                }
              ].map((item) => (
                <Card key={item.step} className="glass border-white/20 hover:border-primary/50 transition-all">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon name={item.icon as any} size={24} className="text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">Шаг {item.step}</Badge>
                        <h4 className="text-xl font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
