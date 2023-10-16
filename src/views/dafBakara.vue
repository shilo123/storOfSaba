<template>
  <div>
    <el-menu :default-active="activos" ref="itemM" mode="horizontal">
      <el-menu-item index="1">הכל</el-menu-item>
      <el-menu-item index="2">ערוך מוצרים באתר</el-menu-item>
      <el-menu-item index="4">חדש</el-menu-item>
      <el-menu-item index="3">חפש שם</el-menu-item>
    </el-menu>

    <el-table
      :data="data"
      v-if="data ? true : false"
      style="margin-top: 30px"
      border
    >
      <el-table-column label="שם" prop="ishi.Inputshem"></el-table-column>
      <el-table-column label="מייל" prop="ishi.Inputmail"></el-table-column>
      <el-table-column
        label="מספר טלפון"
        prop="ishi.Inputphone"
      ></el-table-column>
      <el-table-column label="כתובת" prop="ishi.InputAdress"></el-table-column>
      <el-table-column label="פריטים שהזמין">
        <template slot-scope="scope">
          {{ serchProducts(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="כנס להזמנה">
        <template slot-scope="scope">
          <el-button type="success" @click="canes(scope.row)" size="medium"
            >כנס להזמנה</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="מחק הזמנה">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row)" size="medium"
            >מחק הזמנה</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="תאריך העסקה">
        <template slot-scope="scope">
          {{ serchDate(scope.row) }}
        </template>
      </el-table-column>
      <!-- / -->
      <!-- <el-table-column label="שם" prop="ishi.Inputshem"></el-table-column> -->
      <!-- <el-table-column label="שם" prop="ishi.Inputshem"></el-table-column> -->
    </el-table>

    <div v-if="shows.showComp">
      <proky v-for="(d, i) in data" :key="i" :dato="d" :num="num"></proky>
    </div>
  </div>
</template>
<script>
import { URL } from "@/URL/url";
import proky from "@/components/ProductOfDafB.vue";
export default {
  components: { proky },
  name: "StorOfSabaDafBakara",
  data() {
    return {
      data: "",
      activos: "1",
      shows: {
        showComp: false,
      },
      num: "",
      //   arrData: [],
    };
  },

  mounted() {
    this.$ax.get(URL + "findPritim").then((res) => {
      //   console.log(res.data);
      this.data = res.data;
      this.num = res.data.length;
      this.shows.showComp = false;
    });
    let chil = this.$refs.itemM.$el.children;
    let widtos = 100 / chil.length;
    Array.from(chil).forEach((element) => {
      element.style.width = `${widtos}%`;
      element.style.textAlign = "center";
      element.style.fontSize = "40px";
    });
  },

  methods: {
    serchProducts(row) {
      //   console.log("prk", row.products);
      let arr = [];
      row.products.forEach((element) => {
        arr.push(element.name);
      });
      arr = arr.join(",");
      return arr;
    },
    canes(row) {
      console.log(row._id);
      this.$router.push({ path: "/pratim/" + row._id });
    },
    del(row) {
      let index = this.data.findIndex((e) => {
        return e._id === row._id;
      });
      this.data.splice(index, 1);
      this.$ax.delete(URL + "Delhazmana/" + row._id);
    },
    serchDate(row) {
      console.log(row.Date);
      let str = "";
      str += row.Date.sof;
      str += "  ";
      str += row.Date.shaa;
      return str;
    },
  },
};
</script>
<style scoped></style>
