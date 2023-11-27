<template>
  <div>
    <div class="txt">
      העסקה בוצע בהצלחה קבלה במייל
      <i class="el-icon-check"></i>
    </div>
    <h4 class="txt2" @click="postMessageo" ref="bu">חזור לדף הבית</h4>
  </div>
</template>
<script>
export default {
  name: "StorOfSabaSuccesView",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    postMessageo() {
      //   parent.postMessage(
      //     "on",
      //     "https://hen-ya-shivuk.com/tashlum/65278f7d94b37c7731674729,65278e7e94b37c7731674728,6527914b94b37c773167472a,6527934a94b37c773167472b"
      //   );
      parent.postMessage(
        "on",
        "http://localhost:8080/tashlum/65278f7d94b37c7731674729,65278e7e94b37c7731674728,6527914b94b37c773167472a,6527934a94b37c773167472b"
      );
    },
  },
};
</script>
<style scoped>
.txt {
  font-size: 50px;
  position: absolute;
  left: 20%;
  right: 30%;
  background: rgb(33, 195, 33);
  border-radius: 20px;
  top: 10%;
  padding: 0px;
  text-align: center;
  width: 60%;
}
.txt2 {
  position: absolute;
  top: 24%;
  left: 37%;
  font-size: 30px;
  background: rgb(26, 166, 87);
  padding: 40px;
  border-radius: 40px;
}
.txt2:hover {
  background: rgba(26, 166, 87, 0.627);
  cursor: pointer;
}
</style>
