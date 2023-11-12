const mapboxApiKey = 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2w3ZTh1NTIxMTgxNTQwcGhmODU2NW5kaSJ9.pBPd19nWO-Gt-vTf1pOHBA';

function initMap() {
  const map = L.map('map', {zoomSnap: 0, zoomDelta: 1}).setView([39.99, -75.15], 16);

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
  map.routeLayer = L.geoJSON(null, {
    style: {
      // More options in the Path Options on Leaflet docs
      // https://leafletjs.com/reference.html#path-option
      color: 'gray',
      dashArray: '10 10',
    },
  }).addTo(map);

  let currentLocation = null;

  navigator.geolocation.watchPosition(
      (pos) => {
        map.currentLocationLayer.clearLayers();

        currentLocation = [pos.coords.latitude, pos.coords.longitude];
        const currentLocationMarker = L.circleMarker(currentLocation);

        map.currentLocationLayer.addLayer(currentLocationMarker);
        map.panTo(currentLocation);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          alert('Sorry, I can\'t give you directions if you don\'t give me your location');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          alert('Sorry, I wasn\'t able to determine your position.');
        } else {
          alert(`There was an error that I'm unfamiliar with: ${err.code}`);
        }
      },
  );

  map.addEventListener('click', async (evt) => {
    const fromLatLng = currentLocation;
    const toLatLng = evt.latlng;

    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${fromLatLng[1]},${fromLatLng[0]};${toLatLng.lng},${toLatLng.lat}` +
      `?geometries=geojson` +
      `&access_token=${mapboxApiKey}`;

    // const resp = await fetch(url);
    // const data = await resp.json();

    let resp;
    let data;
    try {
      resp = await fetch(url);

      if (resp.status !== 200) {
        throw new Error('Something exceptional happened.');
      }

      data = await resp.json();
    } catch (err) {
      alert('Hey, something happend. Sorry.');
      return;
    }

    console.log(data);

    // The response will have one or more routes. 🤔 Maybe there can be 0, so
    // we'll handle that case as well.
    if (data.routes.length < 1) {
      alert('Looks like there are no routes to there from where you are.');
    }

    const routeGeom = data.routes[0].geometry;
    map.routeLayer.clearLayers();
    map.routeLayer.addData(routeGeom);
    map.routeLayer.addLayer(L.marker(toLatLng));
  });

  return map;
}

initMap();
