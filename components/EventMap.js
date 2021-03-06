import Image from 'next/image';
import { NEXT_URL } from '@/config/index';
import { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: 44.8378,
    longitude: -0.594,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  useEffect(() => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${evt.address}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        const { lat, lon } = result.features[0].properties;
        setLat(lat);
        setLng(lon);
        setViewport({ ...viewport, latitude: lat, longitude: lon });
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, []);

  if (loading) return false;

  return (
    //   onViewportChange to be able to move the map zoom in and zoom out
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src='/images/pin.svg' width={30} height={30} />
      </Marker>
    </ReactMapGl>
  );
}
