import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Camera, Play, Square, Settings, LogOut, Plus, Trash2, AlertTriangle } from 'lucide-react';
import FireAlertModal from './FireAlertModal';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function OwnerDashboard({ user, onSignOut }) {
  const [cameras, setCameras] = useState([
    {
      id: '1',
      name: 'Front Entrance',
      type: 'usb',
      isActive: true,
      isMonitoring: false
    },
    {
      id: '2',
      name: 'Backyard',
      type: 'rtsp',
      url: 'rtsp://192.168.1.100:554/stream',
      isActive: false,
      isMonitoring: false
    }
  ]);

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [newCamera, setNewCamera] = useState({
    name: '',
    type: 'usb',
    url: ''
  });
  const [fireAlert, setFireAlert] = useState(null);
  const [alertCountdown, setAlertCountdown] = useState(30);

  // Simulate fire detection
  useEffect(() => {
    const interval = setInterval(() => {
      const monitoringCameras = cameras.filter(c => c.isMonitoring);
      if (monitoringCameras.length > 0 && Math.random() < 0.1) { // 10% chance every 5 seconds
        const randomCamera = monitoringCameras[Math.floor(Math.random() * monitoringCameras.length)];
        const incident = {
          id: Date.now().toString(),
          cameraId: randomCamera.id,
          timestamp: new Date(),
          severity: 'high',
          snapshot: 'https://images.unsplash.com/photo-1666285571949-3ee1a4946059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZW1lcmdlbmN5JTIwZGV0ZWN0aW9ufGVufDF8fHx8MTc1ODI5MjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          status: 'active',
          ownerInfo: {
            name: user.name,
            address: user.address || '123 Main St',
            contact: user.contact || '+1-555-0123',
            coordinates: { lat: 40.7128, lng: -74.0060 }
          }
        };
        setFireAlert(incident);
        setAlertCountdown(30);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [cameras, user]);

  // Alert countdown
  useEffect(() => {
    if (fireAlert && alertCountdown > 0) {
      const timer = setTimeout(() => setAlertCountdown(alertCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (fireAlert && alertCountdown === 0) {
      // Auto-send alert to fire station
      setFireAlert(null);
    }
  }, [fireAlert, alertCountdown]);

  const handleAddCamera = () => {
    if (!newCamera.name) return;
    
    const camera = {
      id: Date.now().toString(),
      name: newCamera.name,
      type: newCamera.type,
      url: newCamera.type === 'rtsp' ? newCamera.url : undefined,
      isActive: false,
      isMonitoring: false
    };
    
    setCameras([...cameras, camera]);
    setNewCamera({ name: '', type: 'usb', url: '' });
    setShowAddCamera(false);
  };

  const handleDeleteCamera = (id) => {
    setCameras(cameras.filter(c => c.id !== id));
    if (selectedCamera === id) {
      setSelectedCamera(null);
    }
  };

  const toggleMonitoring = (id) => {
    setCameras(cameras.map(c => 
      c.id === id ? { ...c, isMonitoring: !c.isMonitoring } : c
    ));
  };

  const handleCancelAlert = () => {
    setFireAlert(null);
    setAlertCountdown(30);
  };

  const monitoringCount = cameras.filter(c => c.isMonitoring).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">AGNISHAKTI</h1>
                <p className="text-sm text-gray-600">Owner Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant={monitoringCount > 0 ? 'default' : 'secondary'}>
                  {monitoringCount} Monitoring
                </Badge>
              </div>
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="cameras" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cameras">Camera Management</TabsTrigger>
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="cameras" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Camera Management</h2>
              <Button onClick={() => setShowAddCamera(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Camera
              </Button>
            </div>

            {showAddCamera && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Camera</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="camera-name">Camera Name</Label>
                      <Input
                        id="camera-name"
                        value={newCamera.name}
                        onChange={(e) => setNewCamera({...newCamera, name: e.target.value})}
                        placeholder="e.g., Front Door"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="camera-type">Camera Type</Label>
                      <Select
                        value={newCamera.type}
                        onValueChange={(value) => setNewCamera({...newCamera, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usb">USB/Webcam</SelectItem>
                          <SelectItem value="rtsp">RTSP/IP Camera</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {newCamera.type === 'rtsp' && (
                    <div className="space-y-2">
                      <Label htmlFor="camera-url">RTSP URL</Label>
                      <Input
                        id="camera-url"
                        value={newCamera.url}
                        onChange={(e) => setNewCamera({...newCamera, url: e.target.value})}
                        placeholder="rtsp://192.168.1.100:554/stream"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowAddCamera(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCamera}>
                      Add Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cameras.map((camera) => (
                <Card key={camera.id}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{camera.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCamera(camera.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardDescription>
                      {camera.type.toUpperCase()} Camera
                      {camera.url && ` • ${camera.url}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1665848383782-1ea74efde68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMHN1cnZlaWxsYW5jZXxlbnwxfHx8fDE3NTgyNTYyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Camera feed"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant={camera.isActive ? 'default' : 'secondary'}>
                        {camera.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant={camera.isMonitoring ? 'destructive' : 'outline'}>
                        {camera.isMonitoring ? 'Monitoring' : 'Stopped'}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={camera.isMonitoring ? 'destructive' : 'default'}
                        onClick={() => toggleMonitoring(camera.id)}
                        className="flex-1"
                      >
                        {camera.isMonitoring ? (
                          <>
                            <Square className="w-4 h-4 mr-2" />
                            Stop
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedCamera(camera.id)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <h2 className="text-2xl font-semibold">Live Monitoring</h2>
            
            {monitoringCount === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Monitoring</h3>
                  <p className="text-gray-600">Start monitoring cameras to view live feeds here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cameras.filter(c => c.isMonitoring).map((camera) => (
                  <Card key={camera.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {camera.name}
                        <Badge variant="destructive">LIVE</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1665848383782-1ea74efde68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMHN1cnZlaWxsYW5jZXxlbnwxfHx8fDE3NTgyNTYyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Live camera feed"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {fireAlert && (
        <FireAlertModal
          incident={fireAlert}
          countdown={alertCountdown}
          onCancel={handleCancelAlert}
        />
      )}
    </div>
  );
}