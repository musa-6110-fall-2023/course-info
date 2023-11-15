/* eslint-disable no-multi-spaces */
/* globals turf */

function initIssueReporter(map, trailsLayer, issuesLayer, apiHost) {
  // Multi-step Submission Form for "Trail Waze" App
  // ===============================================
  //
  // This JavaScript file implements a 3-step process for submitting an issue along
  // a trail. The steps are as follows:
  //
  // 1. **Select a Trail** - In the first step the user is prompted to click one
  //    of the trails on the map. All of the trails are represented as thick gray
  //    dashed lines until one of the trails is selected. When a trail is selected
  //    it turns yellow and the user is allowed to continue to the next step. The
  //    step doesn't progress automatically in case the user wants to change the
  //    chosen trail. The trail thickness is increased so that it is easier to
  //    click the lines on mobile interfaces (i.e., with your thumbs).
  //
  // 2. **Select a Point** - In the second step the user clicks the point nearest
  //    to where they encountered the issue along the trail. Wherever the user
  //    clicks, the app will find the location closest to that point along the
  //    shape of the trail.
  //
  // 3. **Enter Details** - In the third step the user selects the type of issue
  //    they encountered, the time at which they encountered the issue (defaulting
  //    to whatever the current time is), and any other details about the issue.
  //    At this point they can submit the form.

  const reportIssueToggleEl = document.querySelector('.report-issue-btn');
  const reportIssueBtn = document.querySelector('.report-issue-btn button');
  const closeIssueFormBtns = document.querySelectorAll('.close-issue-form');
  const issueReportFormEl = document.querySelector('.issue-report-form');
  const issueReportStepEls = document.querySelectorAll('.issue-report-step');
  const selectTrailStepEl = document.querySelector('.step-select-trail');
  const selectTrailContinueBtn = document.querySelector('.step-select-trail button');
  const selectPointStepEl = document.querySelector('.step-select-point');
  const selectPointContinueBtn = document.querySelector('.step-select-point button');
  const detailsStepEl = document.querySelector('.step-give-details');
  const submitIssueBtn = document.querySelector('.step-give-details button');
  const issueCategorySelect = document.querySelector('#issue-category');
  const issueDatetime = document.querySelector('#issue-datetime');
  const issueDetailText = document.querySelector('#issue-details');


  // We will use the `hideAllIssueReportSteps` function to get the form prepared
  // for whichever is the next step. The function will:
  //
  // 1. Add the `hidden` class to each of the step elements
  // 2. Remove the event listeners for selecting a trail and a point along that
  //    trail.
  // 3. Reset the style on all of the GeoJSON layer features and Remove any
  //    report markers.
  function hideAllIssueReportSteps() {
    for (const stepEl of issueReportStepEls) {                         // (1)
      stepEl.classList.add('hidden');
    }

    trailsLayer.eachLayer((layer) => {                                 // (2)
      layer.removeEventListener('click', handleTrailLayerSelection);
    });
    map.removeEventListener('click', handleIssuePointSelection);

    trailsLayer.resetStyle();                                          // (3)
    reportMarkers.clearLayers();
  }


  // We will use the `openIssueReporterForm` function to ensure that the issue
  // reporting form is visible, and that the button to open the form is _not_
  // (once we click the "Report an Issue" button, we want to hide that button on
  // the interface, because the issue reporting form will be open).
  //
  // Adding a "`hidden`" class hides an element from the UI (see styles.css for
  // the rule attached to the `.hidden` selector).
  function openIssueReporterForm() {
    console.log('Opening the issue reporter form.');

    reportIssueToggleEl.classList.add('hidden');
    issueReportFormEl.classList.remove('hidden');
  }


  function closeIssueReportForm() {
    console.log('Closing the issue reporter form.');
    hideAllIssueReportSteps();
    reportIssueToggleEl.classList.remove('hidden');
    issueReportFormEl.classList.add('hidden');
  }


  function resetIssueReportForm() {
    trailsLayer.resetStyle();
    issueReportSelectedLayer = null;

    reportMarkers.clearLayers();
    reportMarker = null;

    selectTrailContinueBtn.disabled = true;
    selectPointContinueBtn.disabled = true;
  }


  // STEP 1 - Select a trail
  // -----------------------

  const unselectedStyle = {
    stroke: true,
    color: 'gray',
    opacity: 0.5,
    weight: 6,
    dashArray: 6,
  };

  const selectedStyle = {
    stroke: true,
    color: 'yellow',
    opacity: 0.5,
    weight: 6,
  };

  let issueReportSelectedLayer = null;

  // To set up the interface so that the user can select a trail, we can use the
  // `showSelectTrailStep` function, which will:
  //
  // 1. Ensure that the issue form is open with no steps currently visible,
  // 2. Set the styles on each trail layer to the unselected style,
  // 3. Make it so when the user clicks a trail the `handleTrailLayerSelection`
  //    function gets called,
  // 4. And finally, show the instructions for the trail selection step by
  //    removing the `hidden` class from the element containing the step.
  function showSelectTrailStep() {
    console.log('Showing the select-trail step of issue submission.');

    openIssueReporterForm();                                      // (1)
    hideAllIssueReportSteps();

    trailsLayer.eachLayer((layer) => {
      layer.setStyle(unselectedStyle);                            // (2)
      layer.addEventListener('click', handleTrailLayerSelection); // (3)
    });
    selectTrailStepEl.classList.remove('hidden');                 // (4)
  }

  // When the user clicks on the trail where they encountered an issue, the
  // `handleTrailLayerSelection` function will be called. The function will:
  //
  // 1. If a trail has _previously_ been selected, then set that trail's layer's
  //    style to the unselected style (because we we're going to change which
  //    trail is selected),
  // 2. Save the selected layer (which is available through the `evt` argument)
  //    to a global variable named `issueReportSelectedLayer`,
  // 3. Update the layer that the user clicked (which we saved in the
  //    `issueReportSelectedLayer` variable) to use the selected style,
  // 4. And finally, enable the button that the user can click to go to the
  //    next step.
  function handleTrailLayerSelection(evt) {
    if (issueReportSelectedLayer) {                        // (1)
      issueReportSelectedLayer.setStyle(unselectedStyle);
    }

    issueReportSelectedLayer = evt.target;                 // (2)

    issueReportSelectedLayer.setStyle(selectedStyle);      // (3)

    selectTrailContinueBtn.disabled = false;               // (4)
  }


  // STEP 2 - Select a point along the trail
  // ---------------------------------------

  let reportMarker = null;
  const reportMarkers = L.layerGroup().addTo(map);

  // To set up the interface so that the user can select a point, we can use the
  // `showSelectPointStep` function, which will:
  //
  // 1. Ensure that the issue form is open with no steps currently visible,
  // 2. Update the styles on the selected trail layer,
  // 3. Make it so when the user clicks the map the `handleIssuePointSelection`
  //    function gets called,
  // 4. And finally, show the instructions for the point selection step by
  //    removing the `hidden` class from the element containing the step.
  function showSelectPointStep() {
    console.log('Showing the select-point step of issue submission.');

    openIssueReporterForm();                                      // (1)
    hideAllIssueReportSteps();

    issueReportSelectedLayer.setStyle(selectedStyle);             // (2)
    map.addEventListener('click', handleIssuePointSelection);     // (3)
    selectPointStepEl.classList.remove('hidden');                 // (4)
  }

  // When the user clicks the place near the trail where they encountered an issue, the
  // `handleIssuePointSelection` function will be called. The function will:
  //
  // 1. If a point has _previously_ been selected, then remove that point's marker
  //    from the map (because we we're going to add a different point),
  // 2. Find the point nearest to the trail represented by `issueReportSelectedLayer`;
  //    the latitude and longitude of the point where the user clicked is available
  //    through the `evt` argument,
  // 3. Create a marker at the point along the trail and add it to the map,
  // 4. And finally, enable the button that the user can click to go to the
  //    next step.
  function handleIssuePointSelection(evt) {
    if (reportMarker) {                            // (1)
      reportMarkers.removeLayer(reportMarker);
    }

    const clickedPoint = turf.point([              // (2)
      evt.latlng.lng,
      evt.latlng.lat,
    ]);
    const snappedPoint = turf.nearestPointOnLine(
      issueReportSelectedLayer.feature,
      clickedPoint,
    );

    reportMarker = L.marker([                      // (3)
      snappedPoint.geometry.coordinates[1],
      snappedPoint.geometry.coordinates[0],
    ]);
    reportMarkers.addLayer(reportMarker);

    selectPointContinueBtn.disabled = false;       // (4)
  }


  // STEP 3 - Enter issue details
  // ----------------------------

  // To set up the interface so that the user can enter additional details about
  // the issue, we can use the `showDetailsStep` function, which will:
  //
  // 1. Ensure that the issue form is open with no steps currently visible,
  // 2. Update the styles on the selected trail layer,
  // 3. Add the currently selected marker along the trail and add it to the map,
  // 4. And finally, enable the button that the user can click to submit the
  //    issue information.
  function showDetailsStep() {
    console.log('Showing the details step of issue submission.');

    openIssueReporterForm();                                      // (1)
    hideAllIssueReportSteps();

    issueReportSelectedLayer.setStyle(selectedStyle);             // (2)
    map.addLayer(reportMarker);                                   // (3)
    detailsStepEl.classList.remove('hidden');                     // (4)
  }


  // FINAL - Submit issue data to the backend
  // ----------------------------------------

  // The `submitIssueReportFormData` function will be used to send the completed
  // issue data to the back end.
  async function submitIssueReportFormData() {
    console.log('Submitting the issue data.');

    // Compile the form data into a GeoJSON feature object (`issueData`) with a
    // `type`, `geometry`, and `properties`.
    const trailFeature = issueReportSelectedLayer.feature;
    const issueLatLng = reportMarker.getLatLng();
    const issueData = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [issueLatLng.lng, issueLatLng.lat],
      },
      properties: {
        category: issueCategorySelect.value,
        encountered_at: (new Date(issueDatetime.value)).toISOString(),
        details: issueDetailText.value,
        trail_id: trailFeature.properties.OBJECTID,
        trail_label: trailFeature.properties.LABEL,
      },
    };

    // Use the `fetch` function to send a **POST** request to the API's trail
    // issues endpoint. The request will contain the `issueData` GeoJSON. When the
    // API server receives this request, the appropriate router function will be
    // called and the server will "deserialize" (or "parse") the GeoJSON request
    // content to store it in the database.
    //
    // If the request is successful, the server will respond with a final GeoJSON
    // representation of the trail issue, and we will add a marker for the issue
    // to the map (1).
    const resp = await fetch(`${apiHost}/trail_issues/`, {
      method: 'post',
      body: JSON.stringify(issueData),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await resp.json();

    console.log('Received the following response:');
    console.log(data);
    issuesLayer.addData(data);  // (1)
  }


  // UI Event Handlers
  // -----------------

  function maintainMapCenter(wrapped) {
    return function (...args) {
      const mapCenter = map.getCenter();
      // eslint-disable-next-line no-invalid-this
      const result = wrapped.apply(this, args);

      // After the issue report form is shown, the map may resize and wherever was
      // centered may not be anymore; so re-center the map.
      map.invalidateSize();
      map.panTo(mapCenter);

      return result;
    };
  }


  const handleReportIssueBtnClick = maintainMapCenter(() => {
    resetIssueReportForm();
    showSelectTrailStep();
    openIssueReporterForm();
  });


  const handleSelectTrailContinueBtnClick = maintainMapCenter(() => {
    showSelectPointStep();
  });


  const handleSelectPointContinueBtnClick = maintainMapCenter(() => {
    showDetailsStep();
  });


  const handleIssueSubmitBtnClick = maintainMapCenter(() => {
    submitIssueReportFormData();
    resetIssueReportForm();
    closeIssueReportForm();
  });

  const handleCloseIssueFormBtnClick = maintainMapCenter(() => {
    const confirmation = confirm('You really want to cancel this issue?');
    if (confirmation) {
      resetIssueReportForm();
      closeIssueReportForm();
    }
  });


  reportIssueBtn.addEventListener('click', handleReportIssueBtnClick);
  selectTrailContinueBtn.addEventListener('click', handleSelectTrailContinueBtnClick);
  selectPointContinueBtn.addEventListener('click', handleSelectPointContinueBtnClick);
  submitIssueBtn.addEventListener('click', handleIssueSubmitBtnClick);

  for (const btn of closeIssueFormBtns) {
    btn.addEventListener('click', handleCloseIssueFormBtnClick);
  }
}


export {
  initIssueReporter,
};
