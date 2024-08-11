<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const series = ref([44, 55, 13, 43, 22]);

const chartOptions = ref({
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
});

const basicChartSeries = ref([{
  name: 'Net Profit',
  data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
}, {
  name: 'Revenue',
  data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
}, {
  name: 'Free Cash Flow',
  data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
}]);

const basicChartOptions = ref({
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands";
      }
    }
  }
});

// Data series for the chart
const seriesLine = ref([{
  name: 'XYZ MOTORS',
  data: [
    {
      x: new Date('2024-01-01').getTime(),
      y: 1000000
    },
    {
      x: new Date('2024-01-02').getTime(),
      y: 1100000
    },
    {
      x: new Date('2024-01-03').getTime(),
      y: 1050000
    }
    // Add more data points as needed
  ]
}]);

// Chart options
const chartLine = ref({
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  title: {
    text: 'Stock Price Movement',
    align: 'left'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    },
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return (val / 1000000).toFixed(0);
      },
    },
    title: {
      text: 'Price'
    },
  },
  xaxis: {
    type: 'datetime',
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val) {
        return (val / 1000000).toFixed(0)
      }
    }
  }
});

</script>

<template>
  <section class="home-item-section">
    <div class="row g-4">
      <div class="col-md-4">
        <section class="pie-chart-section">
          <div id="chart">
            <vue-apex-charts type="pie" width="100%" :options="chartOptions" :series="series"></vue-apex-charts>
          </div>
        </section>
      </div>
      <div class="col-md-4">
        <section class="pie-chart-section">
          <div id="chart">
            <vue-apex-charts type="bar" width="100%" :options="basicChartOptions"
              :series="basicChartSeries"></vue-apex-charts>
          </div>
        </section>
      </div>
      <div class="col-md-4">
        <section class="pie-chart-section">
          <div id="chart">
            <vue-apex-charts type="area" height="350" :options="chartLine" :series="seriesLine">
            </vue-apex-charts>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pie-chart-section {
  margin-bottom: 15px;
  padding: 10px 15px;
  background-color: #f3f3f3;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  height: 340px;
}
</style>