import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AlertCircle, Chrome } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { User } from '../types';

interface AuthModalProps {
  type: 'owner' | 'provider';
  onSuccess: (user: User) => void;
  onClose: () => void;
}

export default function AuthModal({ type, onSuccess, onClose }: AuthModalProps) {
  const [step, setStep] = useState<'password' | 'google'>('password');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const PROVIDER_PASSWORD = 'firestation2024'; // In real app, this would be from env

  const handlePasswordSubmit = () => {
    if (type === 'owner') {
      // Owners skip password step
      setStep('google');
      return;
    }

    if (password !== PROVIDER_PASSWORD) {
      setError('Invalid provider password');
      return;
    }

    setError('');
    setStep('google');
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: type === 'owner' ? 'John Smith' : 'Fire Station Central',
        email: type === 'owner' ? 'john.smith@email.com' : 'central@firestation.gov',
        role: type,
        address: type === 'owner' ? '123 Main St, City, State' : 'Fire Station #1, Downtown',
        contact: type === 'owner' ? '+1-555-0123' : '+1-555-FIRE'
      };
      
      onSuccess(mockUser);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Register as {type === 'owner' ? 'Property Owner' : 'Fire Station Provider'}
          </DialogTitle>
          <DialogDescription>
            {step === 'password' 
              ? 'Enter the provider password to continue'
              : 'Complete registration with Google authentication'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'password' && type === 'provider' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Provider Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter provider password"
                />
              </div>
              
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handlePasswordSubmit} className="flex-1">
                  Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Chrome className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Click below to authenticate with Google and complete your registration
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleGoogleAuth} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Authenticating...' : 'Continue with Google'}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}