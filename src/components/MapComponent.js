// src/components/MapComponent.js

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./MapComponent.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// 初始中心位置設定為高雄市中心
const defaultCenter = {
  lat: 22.6273, // 高雄市中心緯度
  lng: 120.3014, // 高雄市中心經度
};

const MapComponent = ({ origin, destination, onRouteChange }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [currentPosition, setCurrentPosition] = useState(
    origin || defaultCenter
  );
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (isLoaded && origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(),
            trafficModel: "bestguess",
          },
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
            if (onRouteChange) {
              onRouteChange(result);
            }
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [isLoaded, origin, destination, onRouteChange]);

  useEffect(() => {
    if (isLoaded) {
      // 模擬外送員的位置更新，每5秒更新一次
      const interval = setInterval(() => {
        setCurrentPosition((prev) => ({
          lat: prev.lat + 0.001, // 模擬移動
          lng: prev.lng + 0.001,
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      className="google-map-container"
      center={currentPosition}
      zoom={14}
    >
      <Marker position={currentPosition} />
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default React.memo(MapComponent);
