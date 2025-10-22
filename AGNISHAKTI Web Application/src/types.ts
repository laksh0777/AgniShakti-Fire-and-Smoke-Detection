export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'provider';
  address?: string;
  contact?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  showAuthModal: boolean;
  authType: 'owner' | 'provider' | null;
}

export interface Camera {
  id: string;
  name: string;
  type: 'usb' | 'rtsp';
  url?: string;
  isActive: boolean;
  isMonitoring: boolean;
  lastDetection?: Date;
}

export interface FireIncident {
  id: string;
  cameraId: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  snapshot: string;
  status: 'active' | 'resolved' | 'cancelled';
  ownerInfo: {
    name: string;
    address: string;
    contact: string;
    coordinates: { lat: number; lng: number };
  };
}

export interface AlertModalState {
  isOpen: boolean;
  incident: FireIncident | null;
  countdown: number;
}