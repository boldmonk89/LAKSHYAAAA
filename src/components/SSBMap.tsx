import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '1rem',
};

const center = {
  lat: 23.5937,
  lng: 78.9629,
};

const ssbLocations = [
  // Army Boards - Exact addresses
  { lat: 25.4484, lng: 81.8340, name: '11 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4484, lng: 81.8350, name: '14 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4484, lng: 81.8360, name: '18 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4484, lng: 81.8370, name: '19 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4484, lng: 81.8380, name: '34 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 23.2833, lng: 77.3500, name: '20 SSB Bhopal', address: 'Selection Centre South, Bairagarh, Bhopal, MP 462030', type: 'army' },
  { lat: 23.2833, lng: 77.3510, name: '21 SSB Bhopal', address: 'Selection Centre South, Bairagarh, Bhopal, MP 462030', type: 'army' },
  { lat: 23.2833, lng: 77.3520, name: '22 SSB Bhopal', address: 'Selection Centre South, Bairagarh, Bhopal, MP 462030', type: 'army' },
  { lat: 12.9352, lng: 77.6245, name: '17 SSB Bangalore', address: 'Selection Centre South, 1 Richmond Rd, Langford Town, Bengaluru, KA 560025', type: 'army' },
  { lat: 12.9352, lng: 77.6255, name: '24 SSB Bangalore', address: 'Selection Centre South, 1 Richmond Rd, Langford Town, Bengaluru, KA 560025', type: 'army' },
  { lat: 31.3075, lng: 75.5724, name: '31 SSB Jalandhar', address: 'Selection Centre North, Military Station, Cantt, Jalandhar, PB 144005', type: 'army' },
  { lat: 31.3075, lng: 75.5734, name: '32 SSB Jalandhar', address: 'Selection Centre North, Military Station, Cantt, Jalandhar, PB 144005', type: 'army' },
  
  // Air Force Boards - Exact addresses
  { lat: 25.3050, lng: 83.0150, name: '4 AFSB Varanasi', address: 'Air Force Selection Board, BHU Campus, Varanasi, UP 221005', type: 'airforce' },
  { lat: 23.2156, lng: 72.6369, name: '3 AFSB Gandhinagar', address: 'Air Force Selection Board, Sector 7, Gandhinagar, Gujarat 382007', type: 'airforce' },
  { lat: 26.1000, lng: 91.5860, name: '5 AFSB Guwahati', address: 'Air Force Selection Board, Borjhar, Near Airport, Guwahati, Assam 781015', type: 'airforce' },
  { lat: 12.3052, lng: 76.6553, name: '2 AFSB Mysore', address: 'Air Force Selection Board, Nazarbad, Mysuru, KA 570010', type: 'airforce' },
  { lat: 30.2900, lng: 78.0100, name: '1 AFSB Dehradun', address: 'Air Force Selection Board, Clement Town, Dehradun, UK 248002', type: 'airforce' },
  
  // Navy Boards - Exact addresses
  { lat: 11.0000, lng: 76.9600, name: 'NSB Coimbatore (INS Agrani)', address: 'INS Agrani, Naval Base, Vattamalaipalayam, Coimbatore, TN 641015', type: 'navy' },
  { lat: 23.2833, lng: 77.3540, name: '33 SSB Bhopal (Navy)', address: 'Inside Selection Centre South Complex, Bairagarh, Bhopal, MP 462030', type: 'navy' },
  { lat: 12.9716, lng: 77.5946, name: '12 SSB Bangalore (Navy)', address: 'Selection Centre South, 1 Richmond Rd, Langford Town, Bengaluru, KA 560025', type: 'navy' },
  { lat: 17.7330, lng: 83.3000, name: 'NSB Visakhapatnam (INS Kalinga)', address: 'INS Kalinga, Naval Base, Bheemunipatnam, Visakhapatnam, AP 531163', type: 'navy' },
  { lat: 22.5600, lng: 88.3530, name: 'NSB Kolkata', address: 'Naval Selection Board, Garden Reach, Kolkata, WB 700024', type: 'navy' },
  { lat: 28.6070, lng: 77.3570, name: 'CSB Noida', address: 'Capsule Selection Board, Sector 62, Noida, UP 201309', type: 'navy' },
  { lat: 15.4909, lng: 73.8278, name: 'CSB Goa', address: 'Capsule Selection Board, INS Mandovi, Verem, Goa 403109', type: 'navy' },
];

interface SelectedLocation {
  name: string;
  address: string;
  type: string;
  lat: number;
  lng: number;
}

const SSBMap = () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAFmYsi94-B3VakUjboQGajUOXqoD8-d7k';
  const [selected, setSelected] = useState<SelectedLocation | null>(null);

  const getMarkerIcon = (type: string) => {
    const colors: Record<string, string> = {
      army: '#D97706',
      airforce: '#3B82F6',
      navy: '#0EA5E9',
    };
    
    return {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillColor: colors[type] || '#D97706',
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      scale: 1.5,
    };
  };

  const typeLabels: Record<string, string> = {
    army: '🟠 Army SSB',
    airforce: '🔵 Air Force AFSB',
    navy: '🩵 Navy/CSB',
  };

  return (
    <div className="w-full relative">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          options={{
            styles: [
              { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
              { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }] },
              { elementType: 'labels.text.fill', stylers: [{ color: '#D97706' }] },
              { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a0a0a' }] },
              { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a2a' }] },
              { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
              { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#D97706' }] },
              { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
            ],
          }}
        >
          {ssbLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              icon={getMarkerIcon(location.type)}
              onClick={() => setSelected(location)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div style={{ maxWidth: 260, padding: 4, color: '#1a1a1a' }}>
                <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{selected.name}</h4>
                <p style={{ fontSize: 11, color: '#555', marginBottom: 6 }}>{typeLabels[selected.type]}</p>
                <p style={{ fontSize: 12, lineHeight: 1.4 }}>
                  📍 {selected.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, color: '#D97706', fontWeight: 600, display: 'inline-block', marginTop: 6 }}
                >
                  Open in Google Maps →
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-primary/30 rounded-lg p-4 text-sm">
        <h4 className="font-bold text-gradient mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#D97706]"></div>
            <span className="text-foreground/80">Army SSB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#3B82F6]"></div>
            <span className="text-foreground/80">Air Force AFSB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#0EA5E9]"></div>
            <span className="text-foreground/80">Navy/CSB</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">Click marker for exact address</p>
      </div>
    </div>
  );
};

export default SSBMap;
