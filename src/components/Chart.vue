<script setup>
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  results: Array,
});

const bars = ref([{ height: 0 }, { height: 0 }, { height: 0 }, { height: 0 }]);
const percentages = ref(["...", "...", "...", "..."]);
const loading = ref(true);
const COLORS = ["green", "yellow", "orange", "red", "blue", "purple"];

watch(
  () => props.results,
  (newResults) => {
    if (!newResults || newResults.length === 0) {
      bars.value = [{ height: 0 }, { height: 0 }, { height: 0 }, { height: 0 }];
    } else {
      const maxOps = Math.max(...newResults);

      const sortedIndices = newResults
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value)
        .map((item) => item.index);

      bars.value = newResults.map((result, index) => ({
        height: (result / maxOps) * 300,
        fill: COLORS[sortedIndices.indexOf(index)],
      }));

      percentages.value = newResults.map(
        (result) => `${Math.round((result / maxOps) * 100)}%`
      );
      loading.value = false;
    }
  }
);
</script>

<template>
  <svg class="chart" viewBox="0 0 200 300">
    <rect
      v-for="(bar, index) in bars"
      :key="index"
      class="bar"
      :x="5 + index * 62"
      y="-300"
      width="2"
      :height="loading ? 0 : bar.height"
      :fill="bar.fill"
    ></rect>
  </svg>
  <div class="numbers">
    <span v-for="(bar, index) in bars" class="number"> {{ index + 1 }} </span>
  </div>
  <div class="percentages">
    <span
      v-for="(percentage, index) in percentages"
      :key="index"
      class="percentage"
    >
      {{ percentage }}
    </span>
  </div>
</template>

<style>
.chart {
  width: 400px;
  height: 500px;
}

.bar {
  transform: scale(1, -1);
  transition: height 0.5s ease;
}

.numbers {
  margin-top: 10px;
  width: 400px;
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
  width: 400px;
  display: flex;
  font-size: 15px;
  justify-content: space-around;
  gap: 10px;
}
</style>
