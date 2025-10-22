import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, Users, Eye, Flame } from 'lucide-react';

export default function LandingPage({ onOwnerRegister, onProviderRegister, onSignIn }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AGNISHAKTI</h1>
          </div>
          <Button variant="outline" onClick={onSignIn}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Advanced Fire Detection & Monitoring System
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Protect your property with AI-powered fire detection that provides instant alerts 
            to emergency services and real-time monitoring capabilities.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-orange-100">
              <Eye className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">24/7 AI-powered video analysis with instant fire detection</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg border border-orange-100">
              <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Alerts</h3>
              <p className="text-gray-600">Immediate notifications to property owners and fire stations</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg border border-orange-100">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Emergency Response</h3>
              <p className="text-gray-600">Direct integration with fire stations for rapid response</p>
            </div>
          </div>

          {/* Auth Options */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="bg-white border-orange-200 hover:border-orange-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-orange-600">Property Owner</CardTitle>
                <CardDescription>
                  Monitor your property with advanced fire detection system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={onOwnerRegister}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Register as Owner
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-red-200 hover:border-red-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-red-600">Fire Station Provider</CardTitle>
                <CardDescription>
                  Manage emergency responses and monitor protected areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={onProviderRegister}
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-50"
                >
                  Register as Provider
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-orange-100">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2025 AGNISHAKTI. Advanced Fire Detection System.</p>
        </div>
      </footer>
    </div>
  );
}