<!-- cild -->
<template>
  <div>
    <el-card
      :class="{ box: true, 'no-hover': $route.path !== '/' }"
      ref="box"
      id="box"
      @mouseover="overol"
    >
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
      </div>
      <div class="title" v-if="IfHomeAndTashlum()" ref="title">
        {{ prod.name }}
      </div>
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
        <!-- / -->
        <!-- / -->
        <!-- / -->

        <el-upload :action="actiontmuna()" v-if="routeP()" :on-success="onFile">
          <div class="shabetmun">שנה תמונה</div>
        </el-upload>
        <!-- / -->
        <!-- / -->
        <!-- / -->
        <div class="pr" v-if="$route.path === '/'">
          <span class="val">{{ serchprice(prod.price) }}₪</span
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
            class="buttoon"
            @click="husefLaSal"
            v-if="$route.path === '/'"
            >הוסף לסל</el-button
          >
          <el-button
            class="buttoon"
            type="primary"
            style="float: left"
            v-if="$route.path === '/'"
            @click="showco"
            >מידע נוסף</el-button
          >
        </div>
      </div>
      <div>
        <i
          class="el-icon-check"
          style="font-size: 60px; color: red"
          v-show="showVi2"
        ></i>
        <el-popover
          placement="top"
          width="160"
          v-model="visible"
          v-if="routeP()"
        >
          <p>אתה בטוח שאתה רוצה למחוק את המוצר?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false"
              >לא</el-button
            >
            <el-button type="primary" size="mini" @click="DelProducts"
              >כן</el-button
            >
          </div>

          <el-button
            slot="reference"
            type="danger"
            v-if="routeP()"
            v-show="!showVi2"
            >מחק פריט</el-button
          >
        </el-popover>
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
      url: URL,
      visible: true,
      showVi2: false,
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
    this.file = this.prod.imageName;
    // console.log(this.this.prod.);
    // this.sortB();
    // let box = this.$refs.box.$el;
    // console.log(box.clientHeight);
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
    DelProducts() {
      this.visible = false;
      this.$ax.delete(URL + "Delprod/" + this.prod._id).then((res) => {
        console.log(res.data);
        this.$emit("dellocall", this.prod._id);
        this.$message.warning({
          dangerouslyUseHTMLString: true,
          message: `<strong>המוצר <i>${this.prod.name}</i> הוסר מהאתר</strong>`,
        });
      });
    },
    actiontmuna() {
      // console.log();
      // console.log(this.prod._id);
      // url + 'shinuyTmuna' + prod._id
      return this.url + "shinuyTmuna/" + this.prod._id;
    },
    onFile() {
      this.$message.success("התמונה שונתה");
    },
    overol() {
      let element = this.$refs.title;
      element.style.fontSize = "30px";
    },
    serchprice(p) {
      if (p.length === 4) {
        let newso = p.split("");
        if (!newso.includes(".")) {
          newso.splice(1, 0, ",");
          newso = newso.join("");
          return newso;
        } else {
          return p;
        }
      } else {
        return p;
      }
    },
  },
};
</script>
<style scoped>
body {
  background: rgba(174, 224, 130, 0.793);
}
.box {
  border-radius: 16px;
  padding: 0px 30px 30px 30px;
  /* height: auto; */
  width: 300px;
  background: #f1e9e9;
  /* background: #78aca6; */
  margin-bottom: 10px;
  margin-left: 0%;
  display: flex;
  flex-direction: column;
  height: 513px;
  /* height: 550px; */
  justify-content: space-between;
}
.box:hover:not(.no-hover) {
  background: #f1e9e95e;
  border-radius: 58px;
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
.shabetmun {
  background: rgb(255, 178, 25);
  margin: 0px;
  position: relative;
  bottom: 60%;
  border-bottom: 3px solid black;
  width: 445%;
}
@media screen and (max-width: 600px) {
  .box {
    height: auto;
  }
  .title {
    position: relative;
  }
  .child {
    position: relative;
    margin-top: 30px;
  }
  .val {
    width: 100%;
    position: relative;
    left: 13px;
  }
}
</style>
<style></style>
