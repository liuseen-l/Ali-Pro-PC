<template>
  <div class="item">
    <div class="count">{{ count }}</div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "HeadItem",
  props: ["count", "name"],
};
</script>

<style lang="less" scoped>
.item {
  font-size: 20px;
  text-align: center;

  .count {
    font-size: 25px;
    margin: 10px 0;
  }

  .name {
    font-weight: 600;
    letter-spacing: 3px;
    color: #00e6f6;
  }
}
</style>