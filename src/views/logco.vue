<template>
  <div class="c">
    <el-input v-model="tvtaha" placeholder="הזן קוד..."></el-input>
  </div>
</template>
<script>
export default {
  name: "StorOfSabaLogco",

  data() {
    return {
      tvtaha: "",
    };
  },
  watch: {
    tvtaha(val) {
      if (val === "12345") {
        this.$router.push({ path: "/Daf-bakara-of-saba-moshe" });
      }
    },
  },
  mounted() {
    document.body.style.background = "rgba(35, 33, 33, 0.17)";
  },

  methods: {},
};
</script>
<style scoped>
.c {
  position: absolute;
  left: 30%;
  top: 40%;
  width: 40%;
  height: 100px;
}
</style>
