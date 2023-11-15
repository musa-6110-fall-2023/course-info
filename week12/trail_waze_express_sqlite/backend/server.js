// Read/Write API for "Trail Waze" App
// ===================================
//
// This API is implemented using the Express JS micro-framework, and the Knex JS
// SQL-generating library. It is a REST-style API and supports two primary
// operations: (1) retrieving a list of recent issues reported (within the last
// 30 days), and (2) submitting a new issue.
//
// (note that _Cross-Origin Resource Sharing_, or _CORS_, is not something you
// have to be very familiar with, except to know that it is a security feature
// of HTTP. Suffice to say that including `app.use(cors())` is something you'll
// often have to do. https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

const express = require('express');
const knex = require('knex');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let knexOptions;

if (process.env.DATABASE_URL) {
  knexOptions = {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
  };
} else {
  knexOptions = {
    client: 'better-sqlite3',
    connection: {
      filename: './db.sqlite3'
    }
  };
}

const db = knex(knexOptions);


// Serialization and Deserialization
// ---------------------------------
//
// HTTP APIs that exchange data with a client need to be able to **serialize**
// and **deserialize** data.

// * **Serialization** is the process of converting data that comes from, say, a
//   database into a format that's ready to be sent to the client. In this case,
//   we're creating a `recordToFeature` function to convert a database record as
//   we would get from Knex into a GeoJSON feature. Sometimes "serializing"
//   will be referred to as "rendering".

const recordToFeature = function (record) {
  const geometry = {
    type: 'Point',
    coordinates: [record.longitude, record.latitude],
  };
  const properties = { ...record };  // This line makes a copy of the record.
  delete properties.latitude;
  delete properties.longitude;

  return {
    type: 'Feature',
    geometry,
    properties,
  };
};

// * **Deserialization** is the process of converting data that comes from a
//   client into something useable be your system. In this case, we're creating
//   a `featureToRecord` function to convert a GeoJSON feature that we get from
//   the client into a record that we can write to the database. Sometimes
//   "deserializing" is referred to as "parsing".

const featureToRecord = function (feature) {
  const coords = feature.geometry.coordinates;
  const record = { ...feature.properties };  // This makes a copy of the feature properties.
  [record.longitude, record.latitude] = coords;

  if (feature.properties.created_at) {
    record.created_at = (new Date(feature.properties.created_at)).toISOString();
  }

  if (feature.properties.encountered_at) {
    record.encountered_at = (new Date(feature.properties.encountered_at)).toISOString();
  }

  return record;
};


// Routing Functions
// -----------------
//
// This API exposes (i.e., makes available) one route that can be used with two
// different methods. It is common in REST-style APIs to have a single URL do
// different things depending on the HTTP method used in the client's request.
//
// A REST API will determine the paths that it exposes by the "resources" that
// the API needs to represent. In this API, the main type of resource we're
// representing is a "trail issue", and we want to allow API clients to (1) get
// a list of trail issues, and (2) create a new trail issue. For this we'll
// expose a route at `/trail_issues/`, and use the **GET** and **POST** HTTP
// methods, respectively.
//
// Think of `/trail_issues/` as a resource that represents the collection of all
// trail issues in the system (for our case, we're limiting ourselves to
// returning issues that were reported within the last 30 days, assuming that
// older issues have likely been addressed). Sending a GET request for that
// resource is like asking the API to read those issues, and sending a POST
// request is asking the API to add a new issue to the collection.

app.get('/trail_issues/', (req, res) => {
  const currentDateTime = new Date();
  const currentTimestamp = currentDateTime.getTime();

  const millisecsPerMonth = 30 * 24 * 60 * 60 * 1000;
  const oneMonthAgo = new Date(currentTimestamp - millisecsPerMonth);  // Calculate 30 days ago.

  console.log(`Retrieving issues created after ${oneMonthAgo}`);
  db.select().from('trail_issue').where('created_at', '>', oneMonthAgo.toISOString())
    .then(records => {
      res.json({
        type: 'FeatureCollection',
        features: records.map(recordToFeature),  // Serialize the records.
      });
    });
});

app.post('/trail_issues/', (req, res) => {
  const currentDateTime = new Date();
  const newRecord = featureToRecord(req.body);  // Deserialize the request data.
  newRecord.created_at = currentDateTime.toISOString();

  db.insert(newRecord).into('trail_issue').returning('*')
    .then(insertedRecords => {
      const newFeature = recordToFeature(insertedRecords[0]);
      res.json(newFeature);
    });
});


// Running the Server
// ------------------
//
// If there is an environment variable named `PORT` then we will run the server
// on the port number specified by that environment variable. Otherwise, we will
// use a default (arbitrary) port 3000. This pattern of looking for and using an
// environment variable if it's available will allow us flexibility when we
// deploy this server to a cloud hosting platform.

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
