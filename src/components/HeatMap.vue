<script setup lang="ts">
import { ref, watch } from "vue";
import * as colorService from "@/services/color";

const props = defineProps<{
  data: PostData;
  postTypes: string[];
}>();

const hours = [...Array(24).keys()];
const daysOfWeek = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
  { value: 7, label: "Sun" },
];

const mergedData = ref<PostTypeCount>({});
const maxCount = ref(1);

const hoveredCell = ref<{ day: number; hour: number } | null>(null);

const getBackgroundColor = (day: number, hour: number): string => {
  const count = mergedData.value[`${day}-${hour}`] || 0;
  const intensity = count > 0 ? Math.min(count / maxCount.value, 1) : 0;
  return colorService.generateColor(intensity);
};

const getPostCount = (day: number, hour: number): number => {
  return props.postTypes.reduce((total) => {
    const count = mergedData.value[`${day}-${hour}`] || 0;
    return total + count;
  }, 0);
};

watch(
  () => props.data,
  (newData) => {
    const result: PostTypeCount = {};
    let highestCount = 1;

    props.postTypes.forEach((type) => {
      if (newData[type]) {
        Object.entries(newData[type]).forEach(([key, count]) => {
          result[key] = (result[key] || 0) + count;
          highestCount = Math.max(highestCount, result[key]);
        });
      }
    });

    mergedData.value = result;
    maxCount.value = highestCount;
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="heatmap-container flex no-gap">
    <div class="heatmap flex no-gap">
      <div class="legend-hours flex no-gap column spaced">
        <div v-for="hour in hours" :key="hour" class="legend-hour flex no-gap">
          {{ hour }}
        </div>
      </div>

      <div class="heatmap-grid flex no-gap column">
        <div class="legend-days flex no-gap spaced">
          <div v-for="day in daysOfWeek" :key="day.value" class="legend-day">
            {{ day.label }}
          </div>
        </div>

        <div class="grid-content flex no-gap column">
          <div v-for="hour in hours" :key="hour" class="hour-row flex no-gap">
            <div
              v-for="day in daysOfWeek"
              :key="day.value"
              :style="{
                backgroundColor: getBackgroundColor(day.value, hour),
                width: `calc(100% / 7)`,
                height: '19px',
                margin: '1px',
              }"
              class="heatmap-cell"
              @mouseenter="hoveredCell = { day: day.value, hour }"
              @mouseleave="hoveredCell = null"
            >
              <div
                class="tooltip"
                v-if="
                  hoveredCell?.day === day.value &&
                  hoveredCell?.hour === hour &&
                  getPostCount(hoveredCell.day, hoveredCell.hour) > 0
                "
              >
                <p>
                  {{
                    daysOfWeek.find((d) => d.value === hoveredCell?.day)?.label
                  }}
                  - {{ hoveredCell.hour }}h :
                  {{ getPostCount(hoveredCell.day, hoveredCell.hour) }} posts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$cell-line-height: 19px;
$cell-font-size: 0.7rem;
$weekdays-count: 7;

.heatmap-container {
  justify-content: center;
  width: 100%;

  .heatmap {
    width: 100%;

    .legend-hours {
      margin-right: 5px;
      margin-top: $cell-line-height;

      .legend-hour {
        align-items: center;
        font-size: $cell-font-size;
        height: $cell-line-height;
      }
    }

    .legend-days {
      width: 100%;
      height: $cell-line-height;

      .legend-day {
        text-align: center;
        font-size: $cell-font-size;
        width: calc(100% / $weekdays-count);
      }
    }

    .heatmap-grid {
      width: 100%;

      .grid-content {
        width: 100%;
      }

      .hour-row {
        width: 100%;

        .heatmap-cell {
          position: relative;
          border-radius: 2px;
          border: 1px solid var(--color-light-grey);
        }

        .tooltip {
          pointer-events: none;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-dark-grey);
          box-shadow: var(--default-shadow);
          padding: 0.2rem 0.4rem;
          white-space: nowrap;
          border-radius: var(--button-border-radius);
          text-align: center;
          z-index: 10;
        }
      }
    }
  }
}
</style>
