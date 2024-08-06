import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ThreeJSOverlayView } from "@googlemaps/three";

let map: google.maps.Map;
let markers: google.maps.Marker[] = [];
let polylines: google.maps.Polyline[] = [];
let heading = 0;
let polygons: google.maps.Polygon[] = [];

const mapOptions = {
  tilt: 65,
  zoom: 17,
  center: { lat: 28.5544, lng: 77.0844 },
  mapId: "b75944e5f5e2e984",
  gestureHandling: "auto",
  keyboardShortcuts: false,
};

function initMap(): void {
  const mapDiv = document.getElementById("map") as HTMLElement;

  map = new google.maps.Map(mapDiv, mapOptions);

  fetch("https://20f6885ad668496f847e5b2daff0e531.api.mockbin.io/")
    .then((response) => response.json())
    .then((data) => {
      // Loop through each area in the API response
      for (const area in data) {
        const coordinates = data[area].map((point: any) => ({
          lat: point.lat,
          lng: point.lng,
          z: point.z || 0, // Set z-axis value, default to 0 if not provided
        }));

        // Create polygon
        const polygon = new google.maps.Polygon({
          paths: coordinates,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#0000FF",
          fillOpacity: 0.35,
        });

        // Set polygon on the map
        polygon.setMap(map);
        polygons.push(polygon);
      }
    });

  // Function to create info window content
  function getInfoWindowContent(data: any): string {
    return `
      <div>
        <p><strong>Vehicle/Flight Name:</strong> ${data.title}</p>
        <p><strong>Latitude:</strong> ${data.position.lat()}</p>
        <p><strong>Longitude:</strong> ${data.position.lng()}</p>
      </div>
    `;
  }

  // Create info window
  const infoWindow = new google.maps.InfoWindow();
  
  // Fetch live flight data from the API
  fetch("https://f39922900c80418a8833fba40907e5d5.api.mockbin.io/")
    .then((response) => response.json())
    .then((data) => {
      // Loop through each live flight data
      data.liveFlights.forEach((flight: any) => {
        // Create marker
        const marker = new google.maps.Marker({
          position: { lat: flight.latitude, lng: flight.longitude },
          map: map,
          title: flight.callSign, // Marker title
        });
        markers.push(marker);

        // Add click event listener to marker
        marker.addListener("click", () => {
          infoWindow.setContent(getInfoWindowContent(marker));
          infoWindow.open(map, marker);
        });

        // Add mouseover event listener to marker
        marker.addListener("mouseover", () => {
          infoWindow.setContent(getInfoWindowContent(marker));
          infoWindow.open(map, marker);
        });

        // Add mouseout event listener to marker
        marker.addListener("mouseout", () => {
          infoWindow.close();
        });
      });
    });

  // Fetch live vehicle data from the API
  fetch("https://e51baf07198c464d84dd603fc0ce772f.api.mockbin.io/")
    .then((response) => response.json())
    .then((data) => {
      // Loop through each live vehicle data
      data.liveVehicles.forEach((vehicle: any) => {
        // Create marker
        const marker = new google.maps.Marker({
          position: { lat: parseFloat(vehicle.latitude), lng: parseFloat(vehicle.longitude) },
          map: map,
          title: vehicle.vehicle_Name, // Marker title
        });
        markers.push(marker);

        // Add click event listener to marker
        marker.addListener("click", () => {
          infoWindow.setContent(getInfoWindowContent(marker));
          infoWindow.open(map, marker);
        });

        // Add mouseover event listener to marker
        marker.addListener("mouseover", () => {
          infoWindow.setContent(getInfoWindowContent(marker));
          infoWindow.open(map, marker);
        });

        // Add mouseout event listener to marker
        marker.addListener("mouseout", () => {
          infoWindow.close();
        });
      });
    });

  // Add buttons for changing direction and angle
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  const directions = ["Rotate Left", "Rotate Right", "Tilt Up", "Tilt Down"];
  directions.forEach(direction => {
    const button = document.createElement("button");
    button.textContent = direction;
    button.addEventListener("click", () => handleDirectionChange(direction));
    buttonsContainer.appendChild(button);
  });

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttonsContainer);

  // Add 3D flight marker
  const loader = new GLTFLoader();
  const url = "https://threejs.org/examples/models/gltf/Flamingo.glb";
  loader.load(url, (gltf) => {
    const flightMarker = gltf.scene;

    // Create the ThreeJS overlay
    const overlay = new ThreeJSOverlayView({
      map: map,
      scene: flightMarker,
    });
  });
}

function animateMarker(marker: google.maps.Marker, coordinates: number[][]): void {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % coordinates.length;
    const newPosition = { lat: coordinates[index][0], lng: coordinates[index][1] };
    marker.setPosition(newPosition);
  }, 1000); // Change the interval as needed
}

function handleDirectionChange(direction: string): void {
  switch (direction) {
    case "Rotate Left":
      heading -= 10;
      map.setOptions({ heading });
      break;
    case "Rotate Right":
      heading += 10;
      map.setOptions({ heading });
      break;
    case "Tilt Up":
      map.setTilt(map.getTilt() + 10);
      break;
    case "Tilt Down":
      map.setTilt(map.getTilt() - 10);
      break;
    default:
      break;
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export { initMap };
