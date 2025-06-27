
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Lock, Palette, Globe, BellRing, ChevronRight } from 'lucide-react';
import ChangePassword from '@/components/ChangePassword';
import ChangeTheme from '@/components/ChangeTheme';
import ChangeLanguage from '@/components/ChangeLanguage';
import NotificationSettings from '@/components/NotificationSettings';

interface SettingsSectionProps {
  onBack: () => void;
}

const SettingsSection = ({ onBack }: SettingsSectionProps) => {
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);

  const subsections = [
    {
      id: 'password',
      title: 'Change Password',
      icon: Lock,
      description: 'Update your account password'
    },
    {
      id: 'theme',
      title: 'Change Theme',
      icon: Palette,
      description: 'Light or dark mode'
    },
    {
      id: 'language',
      title: 'Change Language',
      icon: Globe,
      description: 'Select your preferred language'
    },
    {
      id: 'notification-settings',
      title: 'Notification Settings',
      icon: BellRing,
      description: 'Manage notification preferences'
    }
  ];

  const renderSubsectionContent = () => {
    switch (activeSubsection) {
      case 'password':
        return <ChangePassword onBack={() => setActiveSubsection(null)} />;
      case 'theme':
        return <ChangeTheme onBack={() => setActiveSubsection(null)} />;
      case 'language':
        return <ChangeLanguage onBack={() => setActiveSubsection(null)} />;
      case 'notification-settings':
        return <NotificationSettings onBack={() => setActiveSubsection(null)} />;
      default:
        return null;
    }
  };

  if (activeSubsection) {
    return renderSubsectionContent();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="space-y-4">
          {subsections.map((subsection) => {
            const IconComponent = subsection.icon;
            return (
              <Card 
                key={subsection.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveSubsection(subsection.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{subsection.title}</h3>
                      <p className="text-gray-600 text-sm">{subsection.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
