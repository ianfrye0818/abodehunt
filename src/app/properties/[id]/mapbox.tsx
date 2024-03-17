'use client';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress, OutputFormat } from 'react-geocode';
import { useState, useEffect, useRef } from 'react';
import Pin from '@/assets/images/pin.svg';
import { FaSpinner } from 'react-icons/fa';
import { MapResults, Property } from '@/types';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';

export default function MapBox({ location }: { location: string }) {
  const locationObj: Property['location'] = JSON.parse(location);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loading, setLoading] = useState(true);

  const initialLocationObjRef = useRef(locationObj);

  setDefaults({
    outputFormat: OutputFormat.JSON,
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY!,
    language: 'en',
    region: 'us',
  });

  useEffect(() => {
    const fetchAddress = async () => {
      const { street, city, state, zipcode } = initialLocationObjRef.current;

      const res: MapResults = await fromAddress(`${street} ${city} ${state} ${zipcode}`);

      const { lat, lng } = res.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
    };
    fetchAddress();
    setLoading(false);
  }, []);

  if (loading) return <FaSpinner className='animate-spin' />;
  return (
    !loading && (
      <div>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          style={{ width: '100%', height: '500px' }}
          mapLib={import('mapbox-gl')}
          initialViewState={{
            zoom: 12,
            latitude: lat,
            longitude: lng,
          }}
          latitude={lat}
          longitude={lng}
        >
          <Marker
            latitude={lat}
            longitude={lng}
          >
            <Image
              src={Pin}
              alt='pin'
              width={40}
              height={40}
            />
          </Marker>
        </Map>
      </div>
    )
  );
}
