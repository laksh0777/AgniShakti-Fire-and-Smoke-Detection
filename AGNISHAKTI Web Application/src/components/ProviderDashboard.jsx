import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, LogOut, MapPin, Phone, Clock, Navigation, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function ProviderDashboard({ user, onSignOut }) {
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Mock data for protected properties
  const protectedProperties = [
    { id: '1', name: 'Smith Residence', address: '123 Main St', coordinates: { lat: 40.7128, lng: -74.0060 }, status: 'normal' },
    { id: '2', name: 'Johnson House', address: '456 Oak Ave', coordinates: { lat: 40.7589, lng: -73.9851 }, status: 'normal' },
    { id: '3', name: 'Brown Estate', address: '789 Pine Rd', coordinates: { lat: 40.7282, lng: -74.0776 }, status: 'normal' }
  ];

  // Simulate receiving fire incidents
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance every 10 seconds
        const randomProperty = protectedProperties[Math.floor(Math.random() * protectedProperties.length)];
        const incident = {
          id: Date.now().toString(),
          cameraId: '1',
          timestamp: new Date(),
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          snapshot: 'https://images.unsplash.com/photo-1666285571949-3ee1a4946059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZW1lcmdlbmN5JTIwZGV0ZWN0aW9ufGVufDF8fHx8MTc1ODI5MjM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          status: 'active',
          ownerInfo: {
            name: randomProperty.name.split(' ')[0] + ' Family',
            address: randomProperty.address,
            contact: '+1-555-' + Math.floor(Math.random() * 9000 + 1000),
            coordinates: randomProperty.coordinates
          }
        };
        setActiveIncidents(prev => [...prev, incident]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const resolveIncident = (incidentId) => {
    setActiveIncidents(prev => prev.filter(i => i.id !== incidentId));
    if (selectedIncident?.id === incidentId) {
      setSelectedIncident(null);
    }
  };

  const getGoogleMapsUrl = (coordinates) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">AGNISHAKTI</h1>
                <p className="text-sm text-gray-600">Fire Station Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant={activeIncidents.length > 0 ? 'destructive' : 'default'}>
                  {activeIncidents.length} Active Alerts
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Protected Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{protectedProperties.length}</div>
                  <p className="text-sm text-gray-600">Total monitored locations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Active Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{activeIncidents.length}</div>
                  <p className="text-sm text-gray-600">Requiring immediate attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">4.2</div>
                  <p className="text-sm text-gray-600">Average minutes to respond</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest fire detection alerts and responses</CardDescription>
              </CardHeader>
              <CardContent>
                {activeIncidents.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">All Clear</h3>
                    <p className="text-gray-600">No active fire incidents at this time.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeIncidents.slice(0, 3).map((incident) => (
                      <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(incident.severity)} animate-pulse`} />
                          <div>
                            <p className="font-medium">{incident.ownerInfo.name}</p>
                            <p className="text-sm text-gray-600">{incident.ownerInfo.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{incident.timestamp.toLocaleTimeString()}</p>
                          <Badge variant="destructive" className="text-xs">
                            {incident.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Active Fire Incidents</h2>
              <Badge variant="destructive" className="text-lg px-3 py-1">
                {activeIncidents.length} Active
              </Badge>
            </div>

            {activeIncidents.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Active Incidents</h3>
                  <p className="text-gray-600">All monitored properties are safe. You'll be notified immediately of any fire detection.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeIncidents.map((incident) => (
                  <Card key={incident.id} className="border-red-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-red-600">Fire Detected</CardTitle>
                        <Badge variant="destructive">{incident.severity.toUpperCase()}</Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {incident.timestamp.toLocaleString()}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={incident.snapshot}
                          alt="Fire detection snapshot"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{incident.ownerInfo.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{incident.ownerInfo.contact}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(getGoogleMapsUrl(incident.ownerInfo.coordinates), '_blank')}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => resolveIncident(incident.id)}
                          className="flex-1"
                        >
                          Mark Resolved
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <h2 className="text-2xl font-semibold">Protected Area Map</h2>
            
            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Simplified map representation */}
                  <div className="absolute inset-0 bg-blue-50">
                    <svg className="w-full h-full">
                      {/* Roads */}
                      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d1d5db" strokeWidth="2" />
                      <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#d1d5db" strokeWidth="2" />
                      <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#d1d5db" strokeWidth="2" />
                      
                      {/* Protected properties */}
                      {protectedProperties.map((property, index) => {
                        const hasIncident = activeIncidents.some(i => i.ownerInfo.address === property.address);
                        const x = 20 + (index * 25);
                        const y = 30 + (index % 2 * 40);
                        
                        return (
                          <g key={property.id}>
                            <circle
                              cx={`${x}%`}
                              cy={`${y}%`}
                              r="8"
                              fill={hasIncident ? '#ef4444' : '#10b981'}
                              stroke="white"
                              strokeWidth="2"
                              className={hasIncident ? 'animate-pulse' : ''}
                            />
                            {hasIncident && (
                              <circle
                                cx={`${x}%`}
                                cy={`${y}%`}
                                r="12"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2"
                                className="animate-ping"
                              />
                            )}
                            <text
                              x={`${x}%`}
                              y={`${y + 8}%`}
                              textAnchor="middle"
                              className="text-xs fill-gray-700"
                            >
                              {property.name.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* Fire station */}
                      <g>
                        <rect x="45%" y="45%" width="16" height="16" fill="#dc2626" rx="2" />
                        <text x="53%" y="65%" textAnchor="middle" className="text-xs fill-gray-700">
                          Fire Station
                        </text>
                      </g>
                    </svg>
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                    <h3 className="font-semibold mb-2">Legend</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Safe Property</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Fire Detected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                        <span>Fire Station</span>
                      </div>
                    </div>
                  </div>
                  
                  {activeIncidents.length > 0 && (
                    <div className="absolute top-4 right-4 bg-red-50 border border-red-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">{activeIncidents.length} Active Incident{activeIncidents.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-gray-600 text-center">
              This is a simplified map view. In a real deployment, this would integrate with Google Maps API 
              to show actual property locations and provide turn-by-turn navigation.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}