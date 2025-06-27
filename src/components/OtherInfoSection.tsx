
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Phone, 
  Info, 
  Star, 
  Share, 
  HelpCircle, 
  FileText, 
  Shield, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OtherInfoSectionProps {
  onBack: () => void;
}

const OtherInfoSection = ({ onBack }: OtherInfoSectionProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    switch (action) {
      case 'contact':
        toast({
          title: "Contact Us",
          description: "Email: support@quicksip.com | Phone: +1-234-567-8900",
        });
        break;
      case 'about':
        toast({
          title: "About QuickSip",
          description: "Premium beverages delivered to your door in 30 minutes.",
        });
        break;
      case 'rate':
        toast({
          title: "Rate Us",
          description: "Thank you for your feedback! Redirecting to app store...",
        });
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'QuickSip - Premium Beverage Delivery',
            text: 'Get your favorite drinks delivered in 30 minutes!',
            url: window.location.origin,
          });
        } else {
          toast({
            title: "Share QuickSip",
            description: "Link copied to clipboard!",
          });
        }
        break;
      case 'logout':
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        break;
      default:
        toast({
          title: action.charAt(0).toUpperCase() + action.slice(1),
          description: `${action.charAt(0).toUpperCase() + action.slice(1)} page would open here.`,
        });
    }
  };

  const subsections = [
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Phone,
      description: 'Get in touch with our support team'
    },
    {
      id: 'about',
      title: 'About Us',
      icon: Info,
      description: 'Learn more about QuickSip'
    },
    {
      id: 'rate',
      title: 'Rate Us',
      icon: Star,
      description: 'Rate our app on the store'
    },
    {
      id: 'share',
      title: 'Share App',
      icon: Share,
      description: 'Share QuickSip with friends'
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: HelpCircle,
      description: 'Frequently asked questions'
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: FileText,
      description: 'Read our terms of service'
    },
    {
      id: 'policies',
      title: 'Policies',
      icon: Shield,
      description: 'Privacy and other policies'
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: LogOut,
      description: 'Sign out of your account'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Other Information</h1>
        </div>

        <div className="space-y-4">
          {subsections.map((subsection) => {
            const IconComponent = subsection.icon;
            const isLogout = subsection.id === 'logout';
            return (
              <Card 
                key={subsection.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  isLogout ? 'border-red-200 hover:border-red-300' : ''
                }`}
                onClick={() => handleAction(subsection.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                      isLogout ? 'bg-red-100' : 'bg-red-100'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        isLogout ? 'text-red-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${
                        isLogout ? 'text-red-600' : ''
                      }`}>{subsection.title}</h3>
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

export default OtherInfoSection;
