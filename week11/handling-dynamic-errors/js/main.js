const mapboxApiKey = 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2w3ZTh1NTIxMTgxNTQwcGhmODU2NW5kaSJ9.pBPd19nWO-Gt-vTf1pOHBA';

function initMap() {
  const map = L.map('map', {preferCanvas: true, zoomSnap: 0, zoomDelta: 1}).setView([39.99, -75.15], 16);

  L.tileLayer('https://api.mapbox.com/styles/v1/{username}/{styleId}/tiles/{tileSize}/{z}/{x}/{y}{r}?access_token={apiKey}', {
    username: 'mapbox',
    styleId: 'light-v11',
    tileSize: 512,
    zoomOffset: -1,
    apiKey: mapboxApiKey,

    // Standard Mapbox attribution from https://docs.mapbox.com/help/getting-started/attribution/#other-mapping-frameworks
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  }).addTo(map);

  map.currentLocationLayer = L.layerGroup().addTo(map);
  map.routeLayer = L.layerGroup().addTo(map);

  navigator.geolocation.watchPosition(
      (pos) => {
        map.currentLocationLayer.clearLayers();
        const currentLocation = [pos.coords.latitude, pos.coords.longitude];
        const currentLocationMarker = L.circleMarker(currentLocation);
        map.currentLocationLayer.addLayer(currentLocationMarker);
        map.panTo(currentLocation);
      },
  );

  return map;
}

initMap();
