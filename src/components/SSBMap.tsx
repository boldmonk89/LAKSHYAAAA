import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '1rem',
};

const center = {
  lat: 23.5937,
  lng: 78.9629, // Center of India
};

const ssbLocations = [
  // Army Boards
  { lat: 25.4358, lng: 81.8463, name: 'SSB Prayagraj (11, 14, 18, 19, 34)', type: 'army' },
  { lat: 23.2599, lng: 77.4126, name: 'SSB Bhopal (20, 21, 22)', type: 'army' },
  { lat: 31.3260, lng: 75.5762, name: 'SSB Jalandhar (31, 32)', type: 'army' },
  { lat: 12.9716, lng: 77.5946, name: 'SSB Bangalore (17, 24)', type: 'army' },
  
  // Air Force Boards
  { lat: 25.3176, lng: 82.9739, name: '4 AFSB Varanasi', type: 'airforce' },
  { lat: 23.2156, lng: 72.6369, name: '3 AFSB Gandhinagar', type: 'airforce' },
  { lat: 26.1445, lng: 91.7362, name: '5 AFSB Guwahati', type: 'airforce' },
  { lat: 12.3052, lng: 76.6553, name: '2 AFSB Mysore', type: 'airforce' },
  { lat: 30.3165, lng: 78.0322, name: '1 AFSB Dehradun', type: 'airforce' },
  
  // Navy Boards
  { lat: 11.0168, lng: 76.9558, name: 'NSB Coimbatore', type: 'navy' },
  { lat: 23.2599, lng: 77.4126, name: 'NSB Bhopal', type: 'navy' },
  { lat: 12.9716, lng: 77.5946, name: 'NSB Bengaluru', type: 'navy' },
  { lat: 17.6868, lng: 83.2185, name: 'NSB Visakhapatnam', type: 'navy' },
  { lat: 22.5726, lng: 88.3639, name: 'NSB Kolkata', type: 'navy' },
];

const SSBMap = () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAFmYsi94-B3VakUjboQGajUOXqoD8-d7k';

  const getMarkerIcon = (type: string) => {
    const colors = {
      army: '#D97706', // Orange for Army
      airforce: '#3B82F6', // Blue for Air Force
      navy: '#0EA5E9', // Sky blue for Navy
    };
    
    return {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillColor: colors[type as keyof typeof colors] || '#D97706',
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      scale: 1.5,
    };
  };

  return (
    <div className="w-full">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          options={{
            styles: [
              {
                elementType: 'geometry',
                stylers: [{ color: '#1a1a1a' }],
              },
              {
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#000000' }],
              },
              {
                elementType: 'labels.text.fill',
                stylers: [{ color: '#D97706' }],
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#0a0a0a' }],
              },
            ],
          }}
        >
          {ssbLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              icon={getMarkerIcon(location.type)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SSBMap;
