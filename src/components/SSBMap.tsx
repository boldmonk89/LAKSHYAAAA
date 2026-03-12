import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons in Leaflet + bundlers
const createIcon = (color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="11" r="5" fill="#fff" opacity="0.9"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 42],
    iconAnchor: [14, 42],
    popupAnchor: [0, -42],
  });
};

const armyIcon = createIcon('#D97706');
const airforceIcon = createIcon('#3B82F6');
const navyIcon = createIcon('#0EA5E9');

const ssbLocations = [
  // Army Boards
  { lat: 25.4484, lng: 81.8340, name: '11 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4504, lng: 81.8350, name: '14 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4524, lng: 81.8360, name: '18 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4544, lng: 81.8370, name: '19 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 25.4564, lng: 81.8380, name: '34 SSB Allahabad', address: 'Selection Centre Central, Cantt Rd, Old Cantt, Prayagraj, UP 211001', type: 'army' },
  { lat: 23.2833, lng: 77.3500, name: '20 SSB Bhopal', address: 'Selection Centre South, Bairagarh, Bhopal, MP 462030', type: 'army' },
  { lat: 23.2853, lng: 77.3510, name: '21 SSB Bhopal', address: 'Selection Centre South, Bairagarh, Bhopal, MP 462030', type: 'army' },
  { lat: 23.2873, lng: 77.3520, name: '22 SSB Bhopal', address: 'Selection Centre South, Bairagarh, Bhopal, MP 462030', type: 'army' },
  { lat: 12.9352, lng: 77.6245, name: '17 SSB Bangalore', address: 'Selection Centre South, 1 Richmond Rd, Langford Town, Bengaluru, KA 560025', type: 'army' },
  { lat: 12.9372, lng: 77.6255, name: '24 SSB Bangalore', address: 'Selection Centre South, 1 Richmond Rd, Langford Town, Bengaluru, KA 560025', type: 'army' },
  { lat: 31.3075, lng: 75.5724, name: '31 SSB Jalandhar', address: 'Selection Centre North, Military Station, Cantt, Jalandhar, PB 144005', type: 'army' },
  { lat: 31.3095, lng: 75.5734, name: '32 SSB Jalandhar', address: 'Selection Centre North, Military Station, Cantt, Jalandhar, PB 144005', type: 'army' },
  // Air Force Boards
  { lat: 25.3050, lng: 83.0150, name: '4 AFSB Varanasi', address: 'Air Force Selection Board, BHU Campus, Varanasi, UP 221005', type: 'airforce' },
  { lat: 23.2156, lng: 72.6369, name: '3 AFSB Gandhinagar', address: 'Air Force Selection Board, Sector 7, Gandhinagar, Gujarat 382007', type: 'airforce' },
  { lat: 26.1000, lng: 91.5860, name: '5 AFSB Guwahati', address: 'Air Force Selection Board, Borjhar, Near Airport, Guwahati, Assam 781015', type: 'airforce' },
  { lat: 12.3052, lng: 76.6553, name: '2 AFSB Mysore', address: 'Air Force Selection Board, Nazarbad, Mysuru, KA 570010', type: 'airforce' },
  { lat: 30.2900, lng: 78.0100, name: '1 AFSB Dehradun', address: 'Air Force Selection Board, Clement Town, Dehradun, UK 248002', type: 'airforce' },
  // Navy Boards
  { lat: 11.0000, lng: 76.9600, name: 'NSB Coimbatore (INS Agrani)', address: 'INS Agrani, Naval Base, Vattamalaipalayam, Coimbatore, TN 641015', type: 'navy' },
  { lat: 23.2893, lng: 77.3540, name: '33 SSB Bhopal (Navy)', address: 'Inside Selection Centre South Complex, Bairagarh, Bhopal, MP 462030', type: 'navy' },
  { lat: 12.9716, lng: 77.5946, name: '12 SSB Bangalore (Navy)', address: 'Selection Centre South, 1 Richmond Rd, Langford Town, Bengaluru, KA 560025', type: 'navy' },
  { lat: 17.7330, lng: 83.3000, name: 'NSB Visakhapatnam (INS Kalinga)', address: 'INS Kalinga, Naval Base, Bheemunipatnam, Visakhapatnam, AP 531163', type: 'navy' },
  { lat: 22.5600, lng: 88.3530, name: 'NSB Kolkata', address: 'Naval Selection Board, Garden Reach, Kolkata, WB 700024', type: 'navy' },
  { lat: 28.6070, lng: 77.3570, name: 'CSB Noida', address: 'Capsule Selection Board, Sector 62, Noida, UP 201309', type: 'navy' },
  { lat: 15.4909, lng: 73.8278, name: 'CSB Goa', address: 'Capsule Selection Board, INS Mandovi, Verem, Goa 403109', type: 'navy' },
];

const getIcon = (type: string) => {
  if (type === 'airforce') return airforceIcon;
  if (type === 'navy') return navyIcon;
  return armyIcon;
};

const typeLabels: Record<string, string> = {
  army: '🟠 Army SSB',
  airforce: '🔵 Air Force AFSB',
  navy: '🩵 Navy/CSB',
};

const SSBMap = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-[500px] bg-muted/20 rounded-xl animate-pulse" />;

  return (
    <div className="w-full relative">
      <MapContainer
        center={[23.5937, 78.9629]}
        zoom={5}
        style={{ width: '100%', height: '500px', borderRadius: '1rem' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {ssbLocations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]} icon={getIcon(location.type)}>
            <Popup>
              <div style={{ maxWidth: 260, padding: 4 }}>
                <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#1a1a1a' }}>{location.name}</h4>
                <p style={{ fontSize: 11, color: '#555', marginBottom: 6 }}>{typeLabels[location.type]}</p>
                <p style={{ fontSize: 12, lineHeight: 1.4, color: '#333' }}>📍 {location.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, color: '#D97706', fontWeight: 600, display: 'inline-block', marginTop: 6 }}
                >
                  Open in Google Maps →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-black/80 backdrop-blur-sm border border-primary/30 rounded-lg p-4 text-sm">
        <h4 className="font-bold text-gradient mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--primary))]"></div>
            <span className="text-foreground/80">Army SSB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-foreground/80">Air Force AFSB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-sky-500"></div>
            <span className="text-foreground/80">Navy/CSB</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">Click marker for exact address</p>
      </div>
    </div>
  );
};

export default SSBMap;
