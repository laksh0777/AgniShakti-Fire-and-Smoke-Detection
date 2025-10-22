import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertTriangle, Clock, Phone, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function FireAlertModal({ incident, countdown, onCancel }) {
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (countdown <= 10) {
      setIsUrgent(true);
    }
  }, [countdown]);

  const severityColor = {
    low: 'bg-yellow-500',
    medium: 'bg-orange-500',
    high: 'bg-red-500'
  };

  return (
    <Dialog open={true} modal>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-red-600">
            <div className={`w-6 h-6 ${severityColor[incident.severity]} rounded-full flex items-center justify-center animate-pulse`}>
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            FIRE DETECTED
          </DialogTitle>
          <DialogDescription>
            Immediate action required - Fire station will be notified automatically
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Countdown Timer */}
          <div className={`text-center p-6 rounded-lg ${isUrgent ? 'bg-red-50 border-2 border-red-200' : 'bg-orange-50 border-2 border-orange-200'}`}>
            <div className={`text-4xl font-bold ${isUrgent ? 'text-red-600' : 'text-orange-600'} mb-2`}>
              {countdown}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>seconds until automatic alert</span>
            </div>
          </div>

          {/* Fire Detection Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Detection Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{incident.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Camera:</span>
                    <span>Camera {incident.cameraId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Severity:</span>
                    <Badge variant={incident.severity === 'high' ? 'destructive' : 'default'}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Property Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{incident.ownerInfo.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{incident.ownerInfo.contact}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Fire Detection Snapshot</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={incident.snapshot}
                  alt="Fire detection snapshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={countdown === 0}
            >
              Cancel Alert
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                // Simulate immediate fire station notification
                alert('Fire station has been notified immediately!');
                onCancel();
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              Notify Now
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            {countdown > 0 ? (
              <p>Alert will be automatically sent to fire station in {countdown} seconds unless cancelled.</p>
            ) : (
              <p className="text-red-600 font-medium">Alert has been sent to fire station automatically.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}