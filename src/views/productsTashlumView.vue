<template>
  <div
    v-if="shogen"
    style="width: 100%; height: 100%; position: absolute"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div>
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
          <el-table-column label="מחק מוצר מהרשימה">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="delPr(scope.row._id)"
                size="medium"
                >מחק</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <lig class="lig" :sumco="serchSum()" v-if="showComp" @siyum="send"></lig>
      <div v-show="!showComp" style="font-size: 80px; text-align: center">
        הפרטים מולאו
      </div>
    </div>
    <div></div>
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
      loading: false,
    };
  },

  mounted() {
    this.loading = true;
    this.$ax.get(URL).then((res) => {
      this.products = res.data;
      // console.log("this.products", this.products);
      document.body.style.background = "rgb(41, 255, 223)";
      this.sortProduct();
      this.sortprice();
      this.loading = false;
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
      this.loading = false;
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
        this.loading = true;
      });
      this.products.forEach((element) => {
        element.priceForInt = element.price;
      });
      this.products.forEach((e) => {
        e.price = e.price * e.Some;
      });
      // console.log(this.products);
    },
    delPr(id) {
      // console.log("products", this.products);
      // console.log(id);
      let index = this.products.findIndex((e) => {
        return e._id === id;
      });
      this.products.splice(index, 1);
      // console.log(index);
    },
    send(data) {
      data.sum = this.sum;
      data.products = this.products;
      this.$ax.post(URL + "sendMail", data).then((res) => {
        console.log(res);
      });
      delete data.ashrai;
      console.log("data", data.products);
      let da = new Date();
      let sof = `${da.getFullYear()}/${da.getMonth()}/${da.getDate()}`;
      let shaa = `${da.getHours()}:${da.getMinutes()}`;
      this.showComp = false;
      data.Date = { shaa, sof };

      this.$ax.post(URL + "SendData", data).then((res) => {
        // console.log(res.data);
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
