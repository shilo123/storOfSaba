<template>
  <div v-if="shogen">
    <div class="fixed">
      <el-image :src="logo" fit="cover" class="img"></el-image>
      <VMenu class="ME"></VMenu>
    </div>
    <div style="border-bottom: 2px solid black">
      <div style="width: 100%; text-align: center; font-size: 60px">
        מוצרים שקנית
      </div>
      <el-row :gutter="3" class="row">
        <el-col :span="6" v-for="p in products" :key="p._id">
          <product :product="p"></product>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="products" show-summary border :summary-method="metSum">
        <el-table-column label="מחיר" prop="price"></el-table-column>
        <el-table-column
          label="מחיר ליחידה"
          prop="priceForInt"
        ></el-table-column>
        <el-table-column label="שם מוצר" prop="name"></el-table-column>
        <el-table-column label="תיאור מוצר" prop="des"></el-table-column>
        <el-table-column label="קטגוריה">
          <template slot-scope="scope">
            {{ returncategory(scope.row.category) }}
          </template>
        </el-table-column>
        <el-table-column label="כמות" prop="Some"></el-table-column>
      </el-table>
    </div>
    <lig class="lig" :sumco="serchSum()" v-if="showComp" @siyum="send"></lig>
    <div v-show="!showComp" style="font-size: 80px; text-align: center">
      הפרטים מולאו
    </div>
  </div>
</template>
<script>
import logo from "@/assets/logo.png";
import VMenu from "@/components/menuComp.vue";
import { URL } from "@/URL/url";
import product from "@/components/productComp.vue";
import lig from "@/components/signUpView.vue";
export default {
  name: "StorOfSabaProductsTashlumView",
  components: { VMenu, product, lig },

  data() {
    return {
      logo,
      products: [],
      shogen: false,
      sum: [],
      showComp: false,
      ArrIds: [],
    };
  },

  mounted() {
    this.$ax.get(URL).then((res) => {
      this.products = res.data;
      document.body.style.background = "rgb(41, 255, 223)";
      this.sortProduct();
      this.sortprice();
    });
  },

  methods: {
    sortProduct() {
      //   console.log("this.products", this.products);
      let ids = this.$route.params.id.split(",");
      this.ArrIds = ids;
      this.products = this.products.filter((e) => {
        // console.log(e._id);
        return ids.includes(e._id);
      });
      this.shogen = true;
    },
    returncategory(n) {
      if (n === "aronotM") {
        return "ארונות מטבח";
      }
      if (n === "birzeyM") {
        return "ברזי מטבח";
      }
      if (n === "miklahonim") {
        return "מקלחונים";
      }
      if (n === "הכל") {
        return n;
      }
    },
    serchSum() {
      //   console.log("tompoly", this.sum);
      if (this.sum) {
        return this.sum;
      }
    },
    metSum(val) {
      let arr = [];
      this.products.forEach((e) => {
        arr.push(e.price);
      });
      //   console.log(arr);
      let sum = arr.reduce((sumi, e) => {
        return +sumi + +e;
      }, 0);
      //   console.log(sum);

      this.sum = sum;
      this.showComp = true;
      return [` סך הכל: ${sum}`];
    },
    sortprice() {
      let countObj = {};
      this.ArrIds.forEach((item) => {
        countObj[item] = (countObj[item] || 0) + 1;
      });
      this.products.forEach((element, i) => {
        if (element._id in countObj) {
          Object.defineProperty(element, "Some", {
            value: countObj[element._id],
            writable: true,
            enumerable: true,
            configurable: true,
          });
        }
      });
      this.products.forEach((element) => {
        element.priceForInt = element.price;
      });
      this.products.forEach((e) => {
        e.price = e.price * e.Some;
      });
      console.log(this.products);
    },
    send(data) {
      //   console.log("data", data);
      data.products = this.products;
      let da = new Date();
      let sof = `${da.getFullYear()}/${da.getMonth()}/${da.getDate()}`;
      let shaa = `${da.getHours()}:${da.getMinutes()}`;
      this.showComp = false;
      data.Date = { shaa, sof };

      this.$ax.post(URL + "SendData", data).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
<style scoped>
body {
  background: rgb(41, 255, 223);
}
.img {
  border-bottom: 2px solid black;
  width: 100%;
  height: 150px;
  margin-top: 0px;
}
.lig {
  margin-top: 84px;
}
</style>
