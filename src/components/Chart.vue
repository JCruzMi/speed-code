<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  results: Array,
});

const bars = ref([{ height: 0 }, { height: 0 }, { height: 0 }, { height: 0 }]);
const percentages = ref(['...', '...', '...', '...']);
const loading = ref(true);
const COLORS = ['green', 'yellow', 'orange', 'red', 'blue', 'purple'];

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
  <div class="chart" v-for="(bar, index) in bars">
    <span
      class="bar"
      :style="{
        height: `${bar.height}px`,
        background: bar?.fill,
      }"
    ></span>
    <span class="number"> {{ index + 1 }} </span>
    <span class="percentage">
      {{ percentages[index] }}
    </span>
  </div>
</template>

<style>
.chart {
  width: 100%;
  height: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  min-width: 160px;
}

.bar {
  width: 4px;
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
