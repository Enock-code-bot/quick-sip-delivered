
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  User, 
  Bell, 
  History, 
  Settings, 
  Lock, 
  Palette, 
  Globe, 
  BellRing,
  Phone,
  Info,
  Star,
  Share,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import PersonalDataSection from '@/components/PersonalDataSection';
import SettingsSection from '@/components/SettingsSection';
import OtherInfoSection from '@/components/OtherInfoSection';

interface ProfileProps {
  onBack: () => void;
}

const Profile = ({ onBack }: ProfileProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const profileSections = [
    {
      id: 'personal',
      title: 'Personal Data',
      icon: User,
      description: 'Notifications & Transaction History',
      subsections: [
        { id: 'notifications', title: 'Notifications', icon: Bell },
        { id: 'transactions', title: 'Transaction History', icon: History }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      description: 'Password, Theme, Language & Notifications',
      subsections: [
        { id: 'password', title: 'Change Password', icon: Lock },
        { id: 'theme', title: 'Change Theme', icon: Palette },
        { id: 'language', title: 'Change Language', icon: Globe },
        { id: 'notification-settings', title: 'Notification Settings', icon: BellRing }
      ]
    },
    {
      id: 'other',
      title: 'Other Information',
      icon: Info,
      description: 'Support, About & Legal',
      subsections: [
        { id: 'contact', title: 'Contact Us', icon: Phone },
        { id: 'about', title: 'About Us', icon: Info },
        { id: 'rate', title: 'Rate Us', icon: Star },
        { id: 'share', title: 'Share App', icon: Share },
        { id: 'faq', title: 'FAQ', icon: HelpCircle },
        { id: 'terms', title: 'Terms & Conditions', icon: FileText },
        { id: 'policies', title: 'Policies', icon: Shield },
        { id: 'logout', title: 'Logout', icon: LogOut }
      ]
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalDataSection onBack={() => setActiveSection(null)} />;
      case 'settings':
        return <SettingsSection onBack={() => setActiveSection(null)} />;
      case 'other':
        return <OtherInfoSection onBack={() => setActiveSection(null)} />;
      default:
        return null;
    }
  };

  if (activeSection) {
    return renderSectionContent();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        {/* User Info */}
        <Card className="p-6 mb-6 text-center">
          <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-1">John Doe</h2>
          <p className="text-gray-600">john.doe@example.com</p>
        </Card>

        {/* Profile Sections */}
        <div className="space-y-4">
          {profileSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card 
                key={section.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{section.title}</h3>
                      <p className="text-gray-600 text-sm">{section.description}</p>
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

export default Profile;
