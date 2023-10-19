<!-- cild -->
<template>
  <div>
    <i
      class="el-icon-check"
      style="font-size: 60px; color: red"
      v-show="showVi"
    ></i>
    <el-button
      type="success"
      v-if="routeP()"
      @click="updateProducts"
      v-show="!showVi"
      >שמור פריט</el-button
    >
    <el-card class="box" ref="box">
      <div class="title" v-if="IfHomeAndTashlum()">{{ prod.name }}</div>
      <el-input
        v-model="UP.upName"
        placeholder="עדכן את שם המוצר"
        v-if="routeP()"
      ></el-input>
      <!-- arrData
      ></div> -->
      <div class="child" ref="child">
        <!-- $route.path === '/' || $route.path.startsWith('/tashlum/') -->
        <div class="des" v-if="IfHomeAndTashlum()">
          {{ prod.des }}
        </div>
        <el-input
          v-model="UP.upDes"
          placeholder="עדכן את תיאור המוצר"
          v-if="routeP()"
        ></el-input>

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
        <el-input
          v-model="UP.upPrice"
          placeholder="עדכן את מחיר המוצר"
          v-if="routeP()"
        ></el-input>

        <div
          style="display: flex; position: relative; left: 32px"
          v-if="IfHomeAndTashlum()"
        >
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
            @click="showco"
            >מידע נוסף</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { URL } from "@/URL/url";

export default {
  name: "StorOfSabaProduct",
  props: ["product", "sums"],

  data() {
    return {
      showVi: false,
      sum: this.sums,
      file: "",
      prod: this.product,
      Marginos: "280",
      arrEl: [],
      UP: {
        upName: "",
        upDes: "",
        upPrice: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.UP.upName = this.prod.name;
    this.UP.upDes = this.prod.des;
    this.UP.upPrice = this.prod.price;
    // console.log(this.prod.name);
    if (this.prod.name === "ארון אימרי 70.75.80") {
      this.prod.name = "ארון אימרי .70.75.80";
    }
    // this.file = require(`../assets/${this.prod.imageName}.png`);
    this.file = this.prod.imageName + ".png";
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
    showco() {
      this.$emit("showD", this.prod);
    },
    IfHomeAndTashlum() {
      return (
        this.$route.path === "/" || this.$route.path.startsWith("/tashlum/")
      );
    },
    routeP() {
      return this.$route.path === "/Daf-bakara-of-saba-moshe";
    },
    updateProducts() {
      this.$ax
        .post(URL + "upPr", { up: this.UP, id: this.prod._id })
        .then((res) => {
          if (res.data) {
            this.$message.success("הפריט נשמר");
            this.showVi = true;
            setTimeout(() => {
              this.showVi = false;
            }, 2000);
          }
        });
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
