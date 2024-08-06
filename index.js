// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { ThreeJSOverlayView } from "@googlemaps/three";

// let map: google.maps.Map;
// let markers: google.maps.Marker[] = [];
// let polylines: google.maps.Polyline[] = [];
// let heading = 0;
// let polygons: google.maps.Polygon[] = [];

// const mapOptions = {
//   tilt: 45,
//   zoom: 18,
//   center: { lat: 28.5551, lng: 77.0844 },
//   mapId: "b75944e5f5e2e984",
//   gestureHandling: "auto",
//   keyboardShortcuts: false,
// };

// function initMap(): void {
//   const mapDiv = document.getElementById("map") as HTMLElement;
//   map = new google.maps.Map(mapDiv, mapOptions);

//   fetch("https://20f6885ad668496f847e5b2daff0e531.api.mockbin.io/")
//     .then((response) => response.json())
//     .then((data) => {
//       for (const area in data) {
//         const coordinates = data[area].map((point: any) => ({
//           lat: point.lat,
//           lng: point.lng,
//         }));

//         const polygon = new google.maps.Polygon({
//           paths: coordinates,
//           strokeColor: "#FF0000",
//           strokeOpacity: 0.8,
//           strokeWeight: 2,
//           fillColor: "#FF0000",
//           fillOpacity: 0.35,
//         });

//         polygon.setMap(map);
//         polygons.push(polygon);
//       }
//     });

//   // Example coordinates array for the marker animation
  
//   // Sample arrays of coordinates
  

//   coordinatesArrays.forEach((coordinates, index) => {
//     const marker = new google.maps.Marker({
//       position: { lat: coordinates[0][0], lng: coordinates[0][1] },
//       map: map,
//       label: (index + 1).toString(),
//     });
//     markers.push(marker);

//     const path = coordinates.map(coord => ({ lat: coord[0], lng: coord[1] }));

//     const polyline = new google.maps.Polyline({
//       path: path,
//       geodesic: true,
//       strokeColor: "#FF0000",
//       strokeOpacity: 1.0,
//       strokeWeight: 2,
//     });
//     polyline.setMap(map);
//     polylines.push(polyline);

//     animateMarker(marker, coordinates);
//   });

//   const buttonsContainer = document.createElement("div");
//   buttonsContainer.classList.add("buttons-container");

//   const directions = ["Rotate Left", "Rotate Right", "Tilt Up", "Tilt Down"];
//   directions.forEach(direction => {
//     const button = document.createElement("button");
//     button.textContent = direction;
//     button.addEventListener("click", () => handleDirectionChange(direction));
//     buttonsContainer.appendChild(button);
//   });

//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttonsContainer);

  

// function animateMarker(marker: google.maps.Marker, coordinates: number[][]): void {
//   let index = 0;
//   setInterval(() => {
//     index = (index + 1) % coordinates.length;
//     const newPosition = { lat: coordinates[index][0], lng: coordinates[index][1] };
//     marker.setPosition(newPosition);
//   }, 1000); // Change the interval as needed
// }
// const loader = new GLTFLoader();
//       const url = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Flamingo.glb';
//       loader.load(url, (gltf) => {
//         const flightMarker = gltf.scene;
//         const overlay = new ThreeJSOverlayView({
//           map: map,
//           scene: flightMarker,
//         });
//       });
//     };

//     initMap();
  
//     return (
//       <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
//         <div id="map" style={{ height: '100%', width: '100%' }}></div>
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             background: 'rgba(0, 0, 0, 0.6)',
//             color: 'white',
//             padding: '10px',
//             fontSize: '20px',
//             fontWeight: 'bold',
//           }}
//         >
//           This is a demo project; the main project was made for the company
//         </div>
//       </div>
//     );
//   };


// function handleDirectionChange(direction: string): void {
//   switch (direction) {
//     case "Rotate Left":
//       heading -= 10;
//       map.setOptions({ heading });
//       break;
//     case "Rotate Right":
//       heading += 10;
//       map.setOptions({ heading });
//       break;
//     case "Tilt Up":
//       map.setTilt(map.getTilt() + 10);
//       break;
//     case "Tilt Down":
//       map.setTilt(map.getTilt() - 10);
//       break;
//     default:
//       break;
//   }
// }

// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }
// window.initMap = initMap;
// export { initMap };
