import { initIssueReporter } from './issue_reporter.js';

const apiHost = 'http://localhost:3000';
// const apiHost = 'https://philly-trail-waze.herokuapp.com';

const map = L.map('map').setView([39.95, -75.16], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mjumbe-test/cl1yh1ojk000014o5l2u4tiff/tiles/{tileSize}/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA', {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

async function loadTrails() {
  const resp = await fetch('https://opendata.arcgis.com/datasets/48323d574068405bbf5336b9b5b29455_0.geojson');
  const data = await resp.json();

  const trailsLayer = L.geoJSON(data, {
    style: {
      weight: 6,
      opacity: 0,
    },
  });
  trailsLayer.bindTooltip(
    (l) => l.feature.properties['TRAIL_NAME'],
    { sticky: true },
  );
  trailsLayer.addTo(map);
  return trailsLayer;
}

async function loadIssues() {
  const resp = await fetch(`${apiHost}/trail_issues/`);
  const data = await resp.json();

  const issuesLayer = L.geoJSON(data, {
    pointToLayer: (feature, latlng) => {
      const icon = L.icon({
        iconUrl: `images/markers/${feature.properties.category}-marker.png`,
        iconSize: [35, 41],
        iconAnchor: [18, 41],
        shadowUrl: 'images/markers/marker-shadow.png',
        shadowSize: [35, 41],
        shadowAnchor: [13, 41],
      });
      return L.marker(latlng, { icon });
    },
  });
  issuesLayer.addTo(map);
  return issuesLayer;
}

const [trailsLayer, issuesLayer] = await Promise.all([
  loadTrails(),
  loadIssues(),
]);
initIssueReporter(map, trailsLayer, issuesLayer, apiHost);
