<template>
  <div class="around-info">
    <div v-for="item in list" :key="item.name">
      <HeadItem :count="item.count" :name="item.name" />
    </div>
  </div>
</template>

<script>
import HeadItem from "./HeadItem.vue";

export default {
  name: "MapHeadPositionCount",
  components: {
    HeadItem,
  },
  data() {
    return {
      list: [
        {
          name: "酒店",
          count: 4,
        },
        {
          name: "图书馆",
          count: 1,
        },
        {
          name: "健身房",
          count: 3,
        },
        {
          name: "药店",
          count: 10,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@cyan: #00e6f6;

.around-info {
  display: flex;
  gap: 20px;
}
</style>