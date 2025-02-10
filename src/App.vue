<script setup lang="ts">
import ChartFilter from "@/components/ChartFilter.vue";
import useSocialPosts from "@/composables/useSocialPosts";
import { onMounted, ref } from "vue";
import HeatMap from "@/components/HeatMap.vue";

const {
  postsCounts,
  postTypesList,
  totalPostsCount,
  isStreaming,
  startStream,
  pauseStream,
  resetStream,
} = useSocialPosts();

const selectedFilters = ref<string[]>([]);

const toggleFilter = (type?: { value: string }) => {
  if (!type) {
    selectedFilters.value = [];
  } else {
    if (selectedFilters.value.includes(type.value)) {
      selectedFilters.value = selectedFilters.value.filter(
        (f) => f !== type.value
      );
    } else {
      selectedFilters.value.push(type.value);
    }
  }
};

const toggleStreaming = () => {
  isStreaming.value = !isStreaming.value;

  if (isStreaming.value) {
    startStream();
  } else {
    pauseStream();
  }
};

const selectAllFilters = () => {
  selectedFilters.value = postTypesList.value.map(
    (type: PostType) => type.value
  );
};

onMounted(() => {
  startStream();
});
</script>

<template>
  <div class="container flex spaced section-gap">
    <div>
      <div class="flex big-gap">
        <p class="link primary title" @click="selectAllFilters">
          Select all filters
        </p>
        <p class="link title" @click="toggleFilter()">Reinitialize filters</p>
      </div>

      <div class="filters flex wrapped small-gap">
        <ChartFilter
          v-for="type in postTypesList"
          :key="type.value"
          :label="type.label"
          :value="type.value"
          @click="toggleFilter(type)"
          :selected="selectedFilters.includes(type.value)"
        />
      </div>
    </div>

    <div class="flex section-gap">
      <div>
        <p class="title">Total posts</p>
        <div class="flex column small-gap">
          <div class="flex">
            <div class="kpi">{{ totalPostsCount ?? 0 }}</div>
          </div>
        </div>
      </div>
      <div>
        <p class="title">Streaming</p>
        <div class="flex column small-gap">
          <div class="button primary" @click="toggleStreaming">
            {{ isStreaming ? "Pause stream" : "Play stream" }}
          </div>
          <div class="button" @click="resetStream">Reset stream</div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <HeatMap :data="postsCounts" :postTypes="selectedFilters" />
  </div>

  <div class="container flex wrapped section-gap post-types-counts">
    <div v-for="postType in postTypesList" class="flex" :key="postType.value">
      <p
        class="title"
        :style="{
          color: selectedFilters.includes(postType.value)
            ? 'var(--color-blue)'
            : '',
        }"
      >
        {{ postType.label }} :
      </p>
      <p
        :style="{
          color: selectedFilters.includes(postType.value)
            ? 'var(--color-blue)'
            : '',
        }"
      >
        {{ postType.count }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  padding-bottom: 1rem;
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
}

.kpi {
  min-width: 100px;
  font-size: var(--font-size-kpi);
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  line-height: var(--button-height);
}

.post-types-counts {
  row-gap: var(--small-gap);

  .title {
    padding: 0;
  }
}
</style>
