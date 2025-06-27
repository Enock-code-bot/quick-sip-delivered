
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Bell, Package, Percent, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettingsProps {
  onBack: () => void;
}

const NotificationSettings = ({ onBack }: NotificationSettingsProps) => {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    generalUpdates: true
  });
  const { toast } = useToast();

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const notificationTypes = [
    {
      key: 'orderUpdates' as keyof typeof settings,
      title: 'Order Updates',
      description: 'Notifications about order status changes',
      icon: Package
    },
    {
      key: 'promotions' as keyof typeof settings,
      title: 'Promotions & Offers',
      description: 'Special deals and discounts',
      icon: Percent
    },
    {
      key: 'newProducts' as keyof typeof settings,
      title: 'New Products',
      description: 'Notifications about new items',
      icon: Bell
    },
    {
      key: 'generalUpdates' as keyof typeof settings,
      title: 'General Updates',
      description: 'App updates and announcements',
      icon: MessageSquare
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
        </div>

        <div className="space-y-4 mb-6">
          {notificationTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card key={type.key} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className="text-gray-600 text-sm">{type.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[type.key]}
                      onChange={() => handleToggle(type.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </Card>
            );
          })}
        </div>

        <Button onClick={handleSave} className="w-full bg-red-600 hover:bg-red-700 text-white">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
