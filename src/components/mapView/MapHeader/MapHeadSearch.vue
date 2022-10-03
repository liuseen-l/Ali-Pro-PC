<template>
  <div class="search-container">
    <div class="search-bar">
      <i class="el-icon-search"></i>
      <input type="text" placeholder="Search" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapHeadSearch',
};
</script>

<style lang="less" scoped>
@font-color: #e9ecef;

.search-container {
  .search-bar {
    box-shadow: 0 2px 2px 2px #34edf5;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon-search {
      margin: 0 5px;
      cursor: pointer;
    }

    input {
      width: 400px;
      background: transparent;
      outline: none;
      border: none;
      color: @font-color;

      &::placeholder {
        color: @font-color;
      }
    }
  }
}
</style>