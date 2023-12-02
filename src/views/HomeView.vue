<!-- arrData -->
<template>
  <div
    style="width: 100%; height: 100%; position: absolute"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    ref="divv"
  >
    <i class="el-icon-menu" @click="menuco"></i>
    <el-badge
      v-if="prodactinu.length > 0 && !drawer"
      :value="prodactinu.length"
      class="badgj"
    ></el-badge>

    <div class="hen-ya">חן_יה שיווק מוצרי מיקלחת</div>
    <div style="position: absolute" v-if="false">
      <router-link to="/avtaha"
        ><el-button type="primary"><i class="el-icon-cart"></i></el-button
      ></router-link>
    </div>

    <div class="mst">
      <el-input
        v-model="leberurim"
        placeholder=""
        size="mini"
        style="width: 172px; float: right"
        @input="valid()"
      >
      </el-input>
    </div>

    <!-- v-if="prodactinu.length > 0" -->
    <div class="knia" v-if="prodactinu.length > 0">
      <span class="sum"
        ><strong>{{ sum }}₪</strong> :סך הכל</span
      >
      <i class="el-icon-shopping-cart-2" style="font-size: 40px"></i>
      <el-dropdown class="dropo">
        <el-button type="primary">
          לכל המוצרים שהזמנת<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="p in prodactinu" :key="p._id"
            >{{ p.name }}{{ " " }}/{{ " " }}{{ p.price }}₪</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <span class="aharon">{{ prodactinu[prodactinu.length - 1].name }} </span>
      <!-- <span v-for="p in prodactinu" :key="p._id">{{ p.name }}|</span> -->
    </div>
    <div class="fixed">
      <el-image :src="logo" fit="cover" class="img"></el-image>
      <VMenug
        class="ME"
        :ids="ArrIds"
        :category="category"
        @filtCategory="filterCategoriz"
        @serchop="serchproduct"
      ></VMenug>
      <!--  -->
      <el-drawer
        class="draw"
        title="תפריט"
        :visible.sync="drawer"
        :with-header="false"
        size="60%"
      >
        <menuisPhone
          :ids="ArrIds"
          :category="category"
          @filtCategory="filterCategoriz"
          @serchop="serchproduct"
        />
      </el-drawer>

      <!--  -->
    </div>
    <el-row :gutter="5" class="row">
      <el-col
        :span="6"
        v-for="p in prod"
        :key="p._id"
        class="ell-coll"
        :id="p._id"
      >
        <product
          class="compRoduct"
          :product="p"
          :sums="sum"
          @addos="Add"
          @showD="showcoloco"
        ></product>
      </el-col>
    </el-row>
    <el-dialog
      :title="prodOfC.name"
      :visible.sync="shows.showDi"
      class="dialog"
      width="30%"
    >
      <div>{{ prodOfC.des }}</div>
      <img
        :src="serchPick()"
        alt=""
        v-if="shows.showDi"
        width="200px"
        height="200px"
      />
      <br />
      <strong>מחיר {{ prodOfC.price }}</strong>
      <span slot="footer">
        <el-button type="success" @click="Add(prodOfC._id)"
          >הוסף מוצר</el-button
        >
        <el-button
          type="danger"
          @click="shows.showDi = false"
          style="width: 100px"
          >צא</el-button
        >
      </span>
    </el-dialog>
    <hazeshelhalemata class="posham"></hazeshelhalemata>
  </div>
</template>
<script>
import { URL } from "@/URL/url";
import VMenug from "@/components/menuComp.vue";
import menuisPhone from "@/components/MenuePhone.vue";
import product from "@/components/productComp.vue";
import logo from "@/assets/lemaala.png";
import hazeshelhalemata from "@/components/lemata.vue";
export default {
  components: { VMenug, product, hazeshelhalemata, menuisPhone },
  data() {
    return {
      shows: {
        showPerut: false,
        showDi: false,
      },
      logo,
      prod: "",
      data2: "",
      ArrIds: [],
      prodactinu: [],
      sum: "",
      leberurim: "לבירורים: 0528875848 משה",
      category: [],
      loading: false,
      collapse: true,
      prodOfC: "",
      icono: "el-icon-arrow-right",
      mouseX: "",
      mouseY: "",
      ev: "",
      drawer: false,
    };
  },

  watch: {
    prodactinu(old, val) {
      if (val.length === 0) {
        this.shows.showPerut = false;
      }
    },
    ArrIds(val) {
      if (val.length === 0) {
        this.collapse = true;
      }
    },
  },
  mounted() {
    console.log(window.innerWidth);
    document.body.style.height = "";
    document.addEventListener("mousemove", this.trackMouse);
    this.loading = true;
    document.body.style.background = "";
    this.$ax.get(URL).then((res) => {
      this.prod = res.data;
      this.data2 = res.data;
      this.sorted();
    });
    this.loading = false;
  },
  created() {
    window.addEventListener("offline", () => {
      setInterval(() => {
        this.$message.error("בדוק את החיבור שלך לאינטרנט");
      }, 3000);
    });
  },
  updated() {
    {
    }
  },

  methods: {
    trackMouse(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    },
    mouse() {},
    mes(p) {
      this.$notify({
        title: "מידע",
        dangerouslyUseHTMLString: true,
        message: `<strong>המוצר שנוסף: <i>${p.name}</i> </strong>`,
        position: "bottom-left",
      });
    },
    Add(id) {
      if (this.shows.showDi === true) {
        this.shows.showDi = false;
      }
      this.ArrIds.push(id);
      let prodactOne = this.prod.find((e) => {
        return e._id === id;
      });
      // this.mes(prodactOne);
      this.prodactinu.push(prodactOne);
      this.sum = this.prodactinu.reduce((sum, item) => {
        return +sum + +item.price;
      }, 0);
      // console.log("this.prodactinu", this.prodactinu);
      if (this.ArrIds.length > 0) {
        this.shows.showPerut = true;
        this.collapse = false;
      } else {
        this.shows.showPerut = false;
      }
      if (window.innerWidth <= 500) {
        this.mes(prodactOne);
      }
    },
    sorted() {
      this.prod.forEach((element) => {
        this.category.push(element.category);
      });
      this.category.push("הכל");
      this.category = this.category.filter((e, i, arr) => {
        return arr.indexOf(e) === i;
      });
      // console.log("this.category", this.category);
    },
    serchproduct(inp) {
      // if (inp !== "") {
      this.prod = this.data2;
      console.log("inp", inp);
      this.prod = this.prod.filter((e) => {
        return e.name.includes(inp);
      });
      // }
    },
    haserProduct(id) {
      let i = this.prodactinu.findIndex((e) => {
        return e._id === id;
      });
      console.log(i);
      this.prodactinu.splice(i, 1);
      if (this.prodactinu.length > 0) {
        let ix = this.ArrIds.findIndex((e) => {
          return e === this.prodactinu[i]._id;
        });

        this.ArrIds.splice(ix, 1);
      } else {
        this.ArrIds = [];
      }
    },
    valid() {
      this.leberurim = "לבירורים: 0528875848 משה";
    },
    filterCategoriz(c) {
      this.prod = this.data2;
      if (c !== "הכל") {
        this.prod = this.prod.filter((e) => {
          return e.category === c;
        });
      }
    },
    shinuy() {
      if (this.prodactinu.length > 0) {
        this.collapse = !this.collapse;
      } else {
        this.$message("לא בחרת כלום");
        this.collapse = true;
      }
    },
    handleOpen() {
      // this.$message("open");
    },
    handleClose() {
      // this.$message("close");
    },
    showcoloco(prodOfC) {
      this.shows.showDi = true;
      this.prodOfC = prodOfC;
    },
    serchPick() {
      return `${this.prodOfC.imageName}`;
    },
    menuco() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
<style scoped>
/* .compRoduct:hover {
  font-size: 20px;
} */
.knia {
  background: linear-gradient(45deg, #00e5ff, #4137ff);
  height: 40px;
  width: 25%;
  position: fixed;
  bottom: 20px;
  left: 10%;
  z-index: 99999;
}
.knia .dropo {
  position: absolute;
  left: 100%;
}
.sum {
  position: relative;
  top: -10px;
}
.aharon {
  position: absolute;
  left: 50%;
  top: 7px;
  width: auto;
}
.dialog {
  height: 100% !important;
}
.img {
  border-bottom: 2px solid black;
  width: 100%;
  height: 140px;
  margin: 0px;
  position: relative;
  bottom: 43px;
  z-index: -1;
  filter: brightness(110%);
  /* filter: hue-rotate(120%); */
}
.ta {
  background: rgba(255, 0, 0, 0.219);
  z-index: 8000;
  position: fixed;
  left: 70%;
}
body {
  background: rgba(48, 49, 42, 0.693);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 900px; */
  z-index: 3000;
}
.el-menu--collapse {
  width: 20px;
  min-height: 300%;
  color: aliceblue;
  z-index: 5000;
}
.po {
  color: rgb(127, 127, 112);
}
#item {
  width: -4% !important;
  background: rgb(224, 210, 210) !important;
}
#item:hover {
  background: rgba(224, 210, 210, 0.558) !important;
}
.hen-ya {
  float: left;
  font-size: 30px;
  margin-left: 40px;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1.5px;
  word-spacing: 2px;
  transition: transform 0.5s ease;
  color: rgb(255, 106, 13);
  border-bottom: 2px solid #ff9b4c;
}
.hen-ya:hover {
  transform: scale(1.1);
}
a {
  text-decoration: none;
  margin: 0;
}
.el-carousel {
  margin-bottom: 200px;
}
.el-icon-menu {
  display: none;
}
.badgj {
  display: none;
}
/* @media screen and (max-width: 1000px) {
  .ell-coll {
    width: 23%;
    height: 40%;
    margin-bottom: 30px;
    margin-left: 100px;
  }
  .knia {
    display: none;
  }
  .knia .dropo {
    display: none;
    position: absolute;
    left: 37%;
    top: 40px;
  }
} */
@media screen and (max-width: 400px) {
  .ell-coll {
    /* background: #000; */
    /* background: red; */
    width: 73%;
    /* height: 40%; */
    position: relative;
    left: 13px;
    margin-bottom: 30px;
  }
  .knia {
    display: none;
  }
  .knia .dropo {
    display: none;
    position: absolute;
    left: 37%;
    top: 40px;
  }
  .posham {
    display: none;
  }
  .img {
    display: none;
  }
  .mst {
    display: none;
  }
  .hen-ya {
    z-index: -1;
  }
  .el-icon-menu {
    z-index: 1;
    display: block;
    position: absolute;
    top: 6px;
    right: 170px;
    font-size: 40px;
    color: rgb(226, 244, 183);
  }
  .badgj {
    display: inline;
    z-index: 9999999;
    position: absolute;
    right: 210px;
    top: 14px;
  }
}
@media screen and (max-width: 530px) and (min-width: 400px) {
  .ell-coll {
    /* background: #000; */
    /* background: red; */
    width: 73%;
    /* height: 40%; */
    position: relative;
    left: 83px;
    margin-bottom: 30px;
  }
  .knia {
    display: none;
  }
  .knia .dropo {
    display: none;
    position: absolute;
    left: 37%;
    top: 40px;
  }
  .posham {
    display: none;
  }
  .img {
    display: none;
  }
  .mst {
    display: none;
  }
  .hen-ya {
    z-index: -1;
  }
  .el-icon-menu {
    z-index: 1;
    display: block;
    position: absolute;
    top: 6px;
    right: 170px;
    font-size: 40px;
    color: rgb(226, 244, 183);
  }
  .badgj {
    display: inline;
    z-index: 9999999;
    position: absolute;
    right: 210px;
    top: 14px;
  }
}
</style>
<style>
body {
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0px 0px 0px 0px;
  height: auto;
  padding-bottom: 470px;
  background: url("@/assets/aronReka.jpg");
  /* filter: brightness(60%); */
}
html {
  scroll-behavior: smooth;
}

@media screen and (max-width: 400px) {
  body {
    max-width: 100%;
    overflow-x: hidden;
  }
}
</style>
