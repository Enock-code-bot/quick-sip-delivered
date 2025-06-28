
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle } from 'lucide-react';

interface AgeVerificationModalProps {
  open: boolean;
  onVerificationComplete: (isVerified: boolean) => void;
}

const AgeVerificationModal = ({ open, onVerificationComplete }: AgeVerificationModalProps) => {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const handleVerification = () => {
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age >= 18) {
      onVerificationComplete(true);
    } else {
      setError('You must be 18 or older to access this app');
      setTimeout(() => onVerificationComplete(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            Age Verification Required
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              You must be 18 years or older to access Click n Sip
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter your birth date:
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => onVerificationComplete(false)}
              variant="outline"
              className="flex-1"
            >
              Exit
            </Button>
            <Button
              onClick={handleVerification}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Verify Age
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;
