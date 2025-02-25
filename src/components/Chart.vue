<script setup>
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  results: Array,
});

const bars = ref(new Array(props.results.length).fill({ height: 0 }));
const percentages = ref(new Array(props.results.length).fill("0%"));
const loading = ref(true);
const COLORS = [
  "green",
  "yellow",
  "orange",
  "red",
  "blue",
  "purple",
  "pink",
  "brown",
  "gray",
  "black",
];

watch(
  () => props.results,
  async (newResults) => {
    console.log(newResults.length);
    if (!newResults || newResults.length === 0) {
      bars.value = [{ height: 0 }, { height: 0 }, { height: 0 }, { height: 0 }];
    } else {
      const maxOps = Math.max(...newResults);

      const sortedIndices = newResults
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value)
        .map((item) => item.index);

      bars.value = await newResults.map((result, index) => ({
        height: (result / maxOps) * 300,
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
  <div class="chart-container">
    <div class="chart" v-for="(bar, index) in bars" :key="index">
      <span
        class="bar"
        :style="{
          height: `${bar.height}px`,
          background: bar.fill,
        }"
      ></span>
      <span class="number">{{ index + 1 }}</span>
      <span class="percentage">{{ percentages[index] }}</span>
    </div>
  </div>
</template>

<style>
.chart-container {
  width: 400px;
  display: flex;
  justify-content: space-between;
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
