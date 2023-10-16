<!-- arrData -->
<template>
  <div
    style="width: 100%; height: 100%; position: absolute"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div style="position: absolute" v-if="true">
      <router-link to="/avtaha"
        ><el-button type="primary">ניהול</el-button></router-link
      >
    </div>
    <div v-show="shows.showPerut" class="ta" ref="table">
      <el-table
        @mouseover="shinuy"
        :data="prodactinu"
        height="200"
        style="width: 300px"
      >
        <!-- :style="styleoftable()" -->
        <el-table-column label="שם מוצר" prop="name"></el-table-column>
        <el-table-column label="מחיר" prop="price"></el-table-column>
        <el-table-column label="הסר">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="haserProduct(scope.row)"
              >הסר מוצר</el-button
            >
          </template>
          <!-- style="position: absolute; right: 55px bottom:35px" -->
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <el-button
              style="position: relative; bottom: 15px; z-index: 9001"
              @click="shows.showPerut = false"
            >
              <i class="el-icon-close"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
        <product :product="p" :sums="sum" @addos="Add"></product>
      </el-col>
    </el-row>
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
    };
  },
  watch: {
    prodactinu(old, val) {
      if (val.length === 0) {
        this.shows.showPerut = false;
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
      this.$nextTick(() => {
        let grar = this.$refs.table;
        let offsetX = 0;
        let offsetY = 0;

        grar.addEventListener("mousedown", (e) => {
          offsetX = e.clientX - grar.getBoundingClientRect().left;
          offsetY = e.clientY - grar.getBoundingClientRect().top;

          window.addEventListener("mousemove", move);
          window.addEventListener("mouseup", stop);
        });

        function move(event) {
          grar.style.left = event.clientX - offsetX + "px";
          grar.style.top = event.clientY - offsetY + "px";
        }

        function stop() {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", stop);
        }
      });
      this.loading = false;
    });
  },

  updated() {},

  methods: {
    Add(id) {
      this.ArrIds.push(id);
      let prodactOne = this.prod.find((e) => {
        return e._id === id;
      });
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
    haserProduct(producto) {
      let i = this.prodactinu.findIndex((e) => {
        return e._id === producto._id;
      });
      this.prodactinu.splice(i, 1);
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
      this.hover = true;
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
  background: rgba(255, 0, 0, 0.219);
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
