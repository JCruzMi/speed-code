<script setup></script>

<template>
  <svg class="chart" viewBox="0 0 200 300">
    <rect
      class="bar"
      x="10"
      y="-300"
      width="1"
      height="300"
      fill="green"
    ></rect>
    <rect
      class="bar"
      x="70"
      y="-300"
      width="1"
      height="200"
      fill="yellow"
    ></rect>
    <rect
      class="bar"
      x="130"
      y="-300"
      width="1"
      height="100"
      fill="orange"
    ></rect>
    <rect class="bar" x="190" y="-300" width="1" height="50" fill="red"></rect>
  </svg>
  <div class="percentages">
    <span class="percentage">100%</span>
    <span class="percentage">80%</span>
    <span class="percentage">60%</span>
    <span class="percentage">40%</span>
  </div>
</template>

<style>
.chart {
  width: 400px;
  height: 500px;
}

.bar {
  transform: scale(1, -1);
  transition: height 0.3s ease;
}

.percentages {
  margin-top: 10px;
  width: 400px;
  display: flex;
  font-size: 15px;
  justify-content: space-around;
  gap: 10px;
}
</style>
