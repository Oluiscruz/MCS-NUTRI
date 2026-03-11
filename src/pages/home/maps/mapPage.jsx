import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const strategicMarkers = [
    {
        id: 'consultorio',
        label: 'Consultório NutriMS',
        position: { lat: -8.058288554580095, lng: -34.886904704851595 },
        
        description: 'Sala 05 e 06 · Rua Corredor do Bispo, 125 lado B, Boa Vista'
    }
];

const defaultCenter = strategicMarkers[0].position;
const defaultZoom = 13;

export default function MapPage() {

    return (
        <APIProvider apiKey={'AIzaSyAC-WZjA6Pf3MCPxqNn_-otroICyK9Zdho'} onLoad={() => console.log('API do Maps carregada')}>
            <Map
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                style={{ width: '100%', height: '360px' }}
                onCameraChanged={(ev) =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }
            >
                {strategicMarkers.map(({ id, position, label }) => (
                    <Marker key={id} position={position} title={label} />
                    
                ))}
            </Map>
        </APIProvider>

    );
}
