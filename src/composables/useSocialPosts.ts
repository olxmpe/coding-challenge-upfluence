import { ref } from "vue";
import * as format from "@/services/format";

const useSocialPosts = () => {
  const postsCounts = ref<PostData>({});
  const postTypesList = ref<PostType[]>([]);
  const totalPostsCount = ref(0);
  const isStreaming = ref(false);

  let eventStream: EventSource | null = null;

  const startStream = () => {
    if (eventStream === null) {
      eventStream = new EventSource("https://stream.upfluence.co/stream");
      isStreaming.value = true;

      eventStream.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        const [postType, { timestamp }] = Object.entries(data)[0] as [
          string,
          { timestamp: number }
        ];

        const { day, hour } = format.timestampToDayAndHour(timestamp);
        const timeKey = `${day}-${hour}`;

        if (!postsCounts.value[postType]) {
          postsCounts.value[postType] = {};
          const existingPostType = postTypesList.value.find(
            (type) => type.value === postType
          );
          if (!existingPostType) {
            postTypesList.value.push({
              label: format.stringToTitleCase(postType),
              value: postType,
              count: 1,
            });
          } else {
            existingPostType.count++;
          }
        } else {
          const existingPostType = postTypesList.value.find(
            (type) => type.value === postType
          );
          if (existingPostType) {
            existingPostType.count++;
          }
        }

        if (!postsCounts.value[postType][timeKey]) {
          postsCounts.value[postType][timeKey] = 0;
        }
        postsCounts.value[postType][timeKey]++;
        totalPostsCount.value++;
      };
    }
  };

  const pauseStream = () => {
    if (eventStream) {
      eventStream.close();
      eventStream = null;
      isStreaming.value = false;
    }
  };

  const resetStream = () => {
    pauseStream();
    postsCounts.value = {};
    totalPostsCount.value = 0;
    postTypesList.value.length = 0;
    startStream();
  };

  return {
    postsCounts,
    postTypesList,
    totalPostsCount,
    isStreaming,
    startStream,
    pauseStream,
    resetStream,
  };
};

export default useSocialPosts;
