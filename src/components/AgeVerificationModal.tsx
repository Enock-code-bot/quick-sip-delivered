
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays } from 'lucide-react';

interface AgeVerificationModalProps {
  open: boolean;
  onVerificationComplete: (isVerified: boolean) => void;
}

const AgeVerificationModal = ({ open, onVerificationComplete }: AgeVerificationModalProps) => {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      const actualAge = age - 1;
      if (actualAge < 18) {
        setError('You must be 18 or older to access this app');
        onVerificationComplete(false);
        return;
      }
    } else if (age < 18) {
      setError('You must be 18 or older to access this app');
      onVerificationComplete(false);
      return;
    }

    onVerificationComplete(true);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-red-600" />
            Age Verification Required
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You must be 18 or older to access alcoholic beverages. Please verify your age to continue.
          </p>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Date of Birth</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                setError('');
              }}
              className="w-full"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <div className="flex gap-2">
            <Button 
              onClick={handleVerify}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Verify Age
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onVerificationComplete(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;
