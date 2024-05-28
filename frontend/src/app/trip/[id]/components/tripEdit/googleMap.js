'use client';
import { useEffect, useState, useRef, useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';

// interface MarkerPosition {
//   lat: number;
//   lng: number;
//   title: string;
// }

const Map = () => {
  const mapRef = useRef();
  const  {allSpots, currGroupId, currDay} = useContext(DataContext);
  const [markerPositions, setMarkerPositions] = useState([]); // Array<MarkerPosition> = [

  // Array of marker positions with titles
  useEffect(() => {
    setMarkerPositions(allSpots?.[currGroupId]?.[currDay]?.map((spot) => {
      return {
        lng: Number(spot?.lng),
        lat: Number(spot?.lat),
        title: spot?.title,
      };
    }));
  }, [allSpots, currGroupId, currDay]);
  // const markerPositions = [
  //   { lat: 37.4239163, lng: -122.0947209, title: 'Marker 1' },
  //   { lat: 37.4114685, lng: -122.0539898, title: 'Marker 2' },
  //   { lat: 37.3968706, lng: -122.0418258, title: 'Marker 3' },
  //   { lat: 37.4055460, lng: -122.0138953, title: 'Marker 4' },
  // ];

  useEffect(() => {
    const initMap = async () => {
      try {
        // Request needed libraries.
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const directionsService = new google.maps.DirectionsService();

        // Define the options for the DirectionsRenderer
        const rendererOptions = {
          polylineOptions: {
            strokeColor: 'blue',
            strokeOpacity: 0.5,
            strokeWeight: 3
          }
        };
        const directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);

        // Create the map instance.
        if (markerPositions?.length === 0 || markerPositions === undefined) return;
        const map = new Map(mapRef.current, {
          center: { lat: markerPositions[0].lat, lng: markerPositions[0].lng },
          zoom: 12,
          mapId: '4504f8b37365c3d0',
        });

        // Directions
        directionsRenderer.setMap(map);

        const request = {
          origin: { lat: markerPositions[0].lat, lng: markerPositions[0].lng },
          destination: { lat: markerPositions[markerPositions.length - 1].lat, lng: markerPositions[markerPositions.length - 1].lng },
          waypoints: markerPositions.slice(1, markerPositions.length - 1).map((position) => {
            return { location: { lat: position.lat, lng: position.lng } };
          }),
          travelMode: google.maps.TravelMode.DRIVING,
        };
  
        directionsService.route(request, function(result, status) { //callback function that will be executed when the directions are calculated
          if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          }
        });

        // Add markers for each position with InfoWindow
        markerPositions.forEach((position) => {
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: position.lat, lng: position.lng },
          });
          const infoWindow = new google.maps.InfoWindow({
            content: position.title,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
      }
    };

    initMap();
  }, [markerPositions]);

  return <div ref={mapRef} className='h-[calc(70vh_-_3rem)] mt-[1rem]'/>;
};

export default function GoogleMap() {
  return (
    <div className='mx-4'>
      <Map />
    </div>
  );
}