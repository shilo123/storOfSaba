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
    <div style="position: absolute" v-if="false">
      <router-link to="/avtaha"
        ><el-button type="primary">ניהול</el-button></router-link
      >
    </div>
    <!-- shows.showPerut -->
    <!-- <div v-show="true" class="ta" ref="table"> -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      style="position: absolute"
      @open="handleOpen"
      @close="handleClose"
      :background-color="negev()"
      text-color="black"
      active-text-color="black"
    >
      <!-- background-color="rgba(48, 49, 42, 0.879)" -->
      <el-menu-item index="1" @click="shinuy" v-if="!collapse">
        <i :class="icono" style="font-size: 30px; color: black"></i>
      </el-menu-item>
      <template v-if="!collapse">
        <el-submenu
          index="2"
          v-for="(p, i) in prodactinu"
          :key="i"
          style="border: 0.2px solid black; margin-bottom: 3px"
        >
          <template slot="title">
            <span style="color: white">
              {{ p.name }}
            </span>
          </template>
          <el-menu-item-group title="אפשרויות">
            <el-menu-item @click="haserProduct(p._id)"
              ><span class="po">הסר מוצר </span></el-menu-item
            >
            <el-menu-item
              ><span class="po">{{ p.price }}</span></el-menu-item
            >
            <el-menu-item class="po"> </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
      <el-menu-item
        index="3"
        v-show="collapse"
        id="item"
        style="position: absolute; top: 10%; width: 26px"
        @click="shinuy"
        ><i
          :class="icono"
          style="font-size: 60px; position: absolute; right: 20px"
        ></i
      ></el-menu-item>
    </el-menu>
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
    </div>
    <el-row :gutter="3" class="row">
      <el-col :span="6" v-for="p in prod" :key="p._id">
        <product
          :product="p"
          :sums="sum"
          @addos="Add"
          @showD="showcoloco"
        ></product>
      </el-col>
    </el-row>
    <el-dialog :title="prodOfC.name" :visible.sync="shows.showDi" width="30%">
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
      <!-- require(`../assets/${prodOfC.name}.png`) -->
    </el-dialog>
  </div>
</template>
<script>
import { URL } from "@/URL/url";
import VMenug from "@/components/menuComp.vue";
import product from "@/components/productComp.vue";
import logo from "@/assets/logo.png";
export default {
  components: { VMenug, product },
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
    };
  },
  watch: {
    prodactinu(old, val) {
      if (val.length === 0) {
        this.shows.showPerut = false;
      }
    },
    collapse(val) {
      if (val) {
        this.icono = "el-icon-arrow-right";
        document.body.style.background = "#ffdead";
      } else {
        setTimeout(() => {
          this.icono = "el-icon-arrow-down";
        }, 330);
        document.body.style.background = "rgba(48, 49, 42, 0.693)";
        // document.body.style.zIndex = "99999";
      }
    },
    ArrIds(val) {
      if (val.length === 0) {
        this.collapse = true;
      }
    },
  },
  mounted() {
    this.loading = true;
    document.body.style.background = "";
    this.$ax.get(URL).then((res) => {
      this.prod = res.data;
      this.data2 = res.data;
      this.sorted();
    });
    this.loading = false;
  },

  updated() {},

  methods: {
    mes(p) {
      this.$notify({
        title: "מידע",
        dangerouslyUseHTMLString: true,
        message: `<strong>המוצר שנוסף: <i>${p.name}</i> </strong><br><i>לפירוט קנייה לחץ על החץ שבצד שמאל</i>`,
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
      this.mes(prodactOne);
      this.prodactinu.push(prodactOne);
      this.sum = this.prodactinu.reduce((sum, item) => {
        return +sum + +item.price;
      }, 0);
      // console.log("this.prodactinu", this.prodactinu);
      if (this.ArrIds.length > 0) {
        this.shows.showPerut = true;
      } else {
        this.shows.showPerut = false;
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
    negev() {
      if (this.collapse) {
        return "rgb(224, 210, 210)";
      } else {
        return "rgba(48, 49, 42, 0.879)";
      }
    },
  },
};
</script>
<style scoped>
.img {
  border-bottom: 2px solid black;
  width: 100%;
  height: 150px;
  margin-top: 0px;
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
  min-height: 900px;
  z-index: 3000;
}
.el-menu--collapse {
  width: 40px;
  min-height: 500%;
  color: aliceblue;
  z-index: 5000;
}
.po {
  color: rgb(127, 127, 112);
}
#item {
  background: rgb(224, 210, 210) !important;
}
#item:hover {
  background: rgba(224, 210, 210, 0.558) !important;
}
</style>
<style>
body {
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0px 0px 0px 0px;
  height: auto;
  padding-bottom: 470px;
  background: #ffdead;
  background: linear-gradient(to top, #ffdead 100%, #ff9b4c 0%);
}
</style>
