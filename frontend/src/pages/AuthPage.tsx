import LoginForm from '@/components/pages/AuthPage/LoginForm';
import RegisterForm from '@/components/pages/AuthPage/RegisterForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <Card className="w-full max-w-md flex flex-col">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {activeTab === 'login' ? 'Вход' : 'Регистрация'}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full self-center">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
        >
          <TabsList className="grid grid-cols-2 mb-4 mx-auto">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="w-full">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthPage;
