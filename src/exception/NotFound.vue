<template>
  <div class="page">
    <div class="item">
      <img src="@/assets/images/404.png" alt="404" />
      <!-- <div class="tips">
        <div class="secondary" @click="toHome">您要找的页面走丢了...</div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const { route, router } = useAppRouter();
const toHome = () => {
  router.push({ path: "/home" });
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 120px;
  background-color: #f5f4f9;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 247px;
      height: 247px;
      // filter: blur(0.4px);
    }
    .tips {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        color: #959595;
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: 400;
      }
      .secondary {
        color: #b3c0ce;
        letter-spacing: 1px;
        font-size: 18px;
        font-weight: 400;
      }

      .btn {
        width: 120px;
        height: 32px;
        font-size: 16px;
        font-weight: 600;
        margin-top: 30px;
        border-radius: 32px;
        background-color: #fec4c5;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
