
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChangeLanguageProps {
  onBack: () => void;
}

const ChangeLanguage = ({ onBack }: ChangeLanguageProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    const language = languages.find(l => l.code === languageCode);
    toast({
      title: "Language Changed",
      description: `Switched to ${language?.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Change Language</h1>
        </div>

        <div className="space-y-2">
          {languages.map((language) => {
            const isSelected = selectedLanguage === language.code;
            return (
              <Card 
                key={language.code}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-red-500 bg-red-50' : 'hover:shadow-md'
                }`}
                onClick={() => handleLanguageChange(language.code)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${
                      isSelected ? 'text-red-600' : ''
                    }`}>{language.name}</h3>
                    <p className="text-gray-600 text-sm">{language.nativeName}</p>
                  </div>
                  {isSelected && (
                    <Check className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChangeLanguage;
