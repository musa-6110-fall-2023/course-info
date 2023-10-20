function initializeGradientChart(chartElId, maximumLevel, initialLevel) {
  const wrapper = document.getElementById(chartElId);
  const background = document.createElement('div');
  const levelMarker = document.createElement('div');

  background.classList.add('chart-background');
  levelMarker.classList.add('chart-marker');

  wrapper.append(background);
  wrapper.append(levelMarker);

  const chart = {
    wrapper,
    background,
    levelMarker,
    maximumLevel,
  };

  updateChartLevel(chart, initialLevel);

  return chart;
}

function updateChartLevel(chart, newLevel) {
  // Note that the following uses a linear scale to convert from the input
  // range (i.e. 0 to maximumLevel) to the output domain (i.e. 0 to 100).
  const scaledLevel = newLevel / chart.maximumLevel * 100;
  // For values that are uniformly or normally distributed, this kind of linear
  // scale makes sense. However, in some cases it would be appropriate to use a
  // logarithmic range (e.g. if the values are concentrated on the low end, and
  // it's less important to differentiate high values from each other). That
  // could be done like this:
  //
  // const scaledLevel = Math.log(newLevel) / Math.log(chart.maximumLevel) * 100;

  chart.levelMarker.style.width = `${scaledLevel}%`;
}

export {
  initializeGradientChart,
  updateChartLevel,
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  You could then import this module from your main.js file. Something like:

  import { initialiseGradientChart, updateChartLevel } from './gradient-chart.js';
*/

const chart = initializeGradientChart('chart-wrapper', 800, 200);

window.chart = chart;
window.updateChartLevel = updateChartLevel;
