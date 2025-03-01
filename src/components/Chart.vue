<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  results: Array,
});

const bars = ref(new Array(props.results.length).fill({ height: 0 }));
const percentages = ref(new Array(props.results.length).fill('0%'));
const loading = ref(true);
const COLORS = [
  'green',
  'yellow',
  'orange',
  'red',
  'blue',
  'purple',
  'pink',
  'brown',
  'lime',
  'black',
];

watch(
  () => props.results,
  async (newResults) => {
    if (!newResults || newResults.length === 0) {
      bars.value = [{ height: 0 }, { height: 0 }, { height: 0 }, { height: 0 }];
    } else {
      const maxOps = Math.max(...newResults);

      const sortedIndices = newResults
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value)
        .map((item) => item.index);

      bars.value = await newResults.map((result, index) => ({
        height: (result / maxOps) * 260,
        fill: COLORS[sortedIndices.indexOf(index)],
      }));

      percentages.value = newResults.map(
        (result) => `${Math.round((result / maxOps) * 100)}%`
      );
    }
    loading.value = false;
  }
);
</script>

<template>
  <div class="charts-container">
    <template v-if="!loading && results.length > 0" v-auto-animate>
      <div class="chart" v-for="(bar, index) in bars" :key="index">
        <span
          v-auto-animate
          class="bar"
          :style="{
            height: `${bar.height}px`,
            background: bar.fill,
          }"
        ></span>
        <span class="number">{{ index + 1 }}</span>
        <span class="percentage" v-auto-animate>{{ percentages[index] }}</span>
      </div>
    </template>
    <template v-else>
      <div v-for="index in 4" :key="index" class="chart" v-auto-animate>
        <span class="bar" style="height: 260px; background: gray"></span>
        <span class="number"></span>
      </div>
    </template>
  </div>
</template>

<style>
.charts-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
}

.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  gap: 10px;
}

.bar {
  width: 5px;
  transform: scale(1, -1);
  transition: height 0.5s ease;
  border-radius: 2px;
}

.numbers {
  margin-top: 10px;
  width: 100%;
  min-width: 100px;
  display: flex;
  font-size: 15px;
  justify-content: space-around;
  gap: 10px;
}

.number {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-background-tertiary);
  color: var(--color-text);
  display: flex;
  justify-content: center;
  align-items: center;
}

.percentages {
  margin-top: 10px;
  width: 100%;
  min-width: 100px;
  display: flex;
  font-size: 15px;
  justify-content: space-around;
  gap: 10px;
}
</style>
