function initializeGradientChart(chartElId, maximumLevel, benchmarkLevel) {
  const chartWrapper = document.getElementById(chartElId);
  const background = document.createElement('div');
  const benchmarkMarker = document.createElement('div');
  const description = document.createElement('p');

  background.classList.add('chart-background');
  benchmarkMarker.classList.add('chart-marker');

  const scaledBenchmarkLevel = benchmarkLevel / maximumLevel * 100;
  benchmarkMarker.style.width = `${scaledBenchmarkLevel}%`;

  chartWrapper.append(background);
  chartWrapper.append(benchmarkMarker);
  chartWrapper.append(description);

  return {
    chartWrapper,
    background,
    benchmarkMarker,
    maximumLevel,
  };
}

function updateChartLevel(chart, newLevel) {
  const scaledLevel = newLevel / chart.maximumLevel * 100;
  chart.benchmarkMarker.style.width = `${scaledLevel}%`;
}

const chart = initializeGradientChart('chart-wrapper', 800, 200);

window.chart = chart;
window.updateChartLevel = updateChartLevel;
