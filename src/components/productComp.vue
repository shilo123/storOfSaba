<!-- cild -->
<template>
  <div>
    <el-card class="box" ref="box">
      <div class="title">{{ prod.name }}</div>
      <!-- arrData
      ></div> -->
      <div class="child" ref="child">
        <div class="des">
          {{ prod.des }}
        </div>
        <div>
          <img
            class="imgf"
            :src="file"
            alt="loading..."
            width="270px"
            height="270px
        "
          />
        </div>
        <div class="pr" v-if="$route.path === '/'">
          <span class="val">{{ prod.price }}₪</span
          ><span class="key">:מחיר</span>
        </div>
        <div style="display: flex; position: relative; left: 32px">
          <el-button
            type="success"
            ref="b"
            class="button"
            @click="husefLaSal"
            v-if="$route.path === '/'"
            >הוסף לסל</el-button
          >
          <el-button
            type="primary"
            style="float: left"
            v-if="$route.path === '/'"
            >מידע נוסף</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "StorOfSabaProduct",
  props: ["product", "sums"],

  data() {
    return {
      sum: this.sums,
      file: "",
      prod: this.product,
      Marginos: "280",
      arrEl: [],
    };
  },
  computed: {},
  mounted() {
    // this.file = require(`../../dist/img/${this.prod.name}.png`);
    console.log(this.prod.name);
    this.file = require(`../assets/${this.prod.name}.png`);
    // this.sortB();
  },

  methods: {
    husefLaSal() {
      // this.$refs.b.plain = true;
      this.$emit("addos", this.prod._id);
    },
    styleOfChild() {
      return { marginBottom: this.Marginos + "px" };
    },
    sortB() {
      // let H = this.$refs.box.$el.offsetHeight;
      // let c = this.$refs.child.offsetTop;
      let He = this.$refs.box.$el;
      let ce = this.$refs.child;
      let elmentRect = ce.getBoundingClientRect().top;
      let hordusRect = He.getBoundingClientRect().top;
      console.log(ce, elmentRect);

      // console.log(He, hordusRect);
    },
  },
};
</script>
<style scoped>
.box {
  border-radius: 16px;
  padding: 0px 30px 30px 30px;
  /* height: auto; */
  width: 300px;
  background: #78aca6;
  margin-bottom: 10px;
  margin-left: 0%;
  display: flex;
  flex-direction: column;
  height: auto;
  /* height: 550px; */
  justify-content: space-between;
}
.title {
  text-align: center;
  font-size: 30px;
  border-bottom: 3px solid black;
  height: 80px;
  /* . */
  /* position: absolute; */
  /* width: 230px; */
  margin-bottom: auto;
}
.des {
  text-align: center;
  /* max-height: 1.2em; */
}
.imgf {
  position: relative;
  left: -5px;
}
.pr {
  position: relative;
  bottom: 5px;
  right: 5px;
  width: 104%;
  text-align: center;
  font-size: 30px;
  display: flex;
  background: rgb(99, 95, 95);
  color: aliceblue;
}
.key {
  width: 100%;
  position: relative;
  right: 30px;
}
.val {
  width: 100%;
  position: relative;
  left: 30px;
}
.child {
  margin-top: 0px;
  display: flex;
  flex-direction: column;
}
/* .button {
  position: relative;
  left: 50px;
} */
</style>
