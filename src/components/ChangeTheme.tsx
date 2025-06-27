
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Sun, Moon, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChangeThemeProps {
  onBack: () => void;
}

const ChangeTheme = ({ onBack }: ChangeThemeProps) => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const { toast } = useToast();

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Clean and bright interface',
      icon: Sun
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes',
      icon: Moon
    },
    {
      id: 'system',
      name: 'System Default',
      description: 'Follow system preference',
      icon: Monitor
    }
  ];

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    toast({
      title: "Theme Changed",
      description: `Switched to ${themes.find(t => t.id === themeId)?.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Change Theme</h1>
        </div>

        <div className="space-y-4">
          {themes.map((theme) => {
            const IconComponent = theme.icon;
            const isSelected = selectedTheme === theme.id;
            return (
              <Card 
                key={theme.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-red-500 bg-red-50' : 'hover:shadow-md'
                }`}
                onClick={() => handleThemeChange(theme.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                      isSelected ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        isSelected ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${
                        isSelected ? 'text-red-600' : ''
                      }`}>{theme.name}</h3>
                      <p className="text-gray-600 text-sm">{theme.description}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    isSelected 
                      ? 'border-red-500 bg-red-500' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChangeTheme;
