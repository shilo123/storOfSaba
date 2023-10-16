<template>
  <div v-if="data ? true : false">
    <router-link
      to="/Daf-bakara-of-saba-moshe"
      style="position: absolute; top: 0px; z-index: 4000; left: 92%"
      ><el-button type="primary">חזור לדף הקודם</el-button></router-link
    >
    <el-table :data="arrD">
      <el-table-column label="פרטי אשראי">
        <el-table-column label="מספר כרטיס" prop="misparCartis">
        </el-table-column>
        <el-table-column label="תעודת זהות של בעל הכרטיס" prop="tz">
        </el-table-column>
        <el-table-column label="תוקף כרטיס">
          <template slot-scope="scope">{{ serchTokef(scope.row) }}</template>
        </el-table-column>
        <el-table-column label="ספרות אבטחה" prop="cvv"> </el-table-column>
      </el-table-column>
    </el-table>
    <div class="pratim-ishiim">
      <el-table :data="arrI">
        <el-table-column label="פרטים אישיים">
          <el-table-column label="שם המזמין" prop="Inputshem"></el-table-column>
          <el-table-column label="מייל" prop="Inputmail"></el-table-column>
          <el-table-column
            label="מספר טלפון"
            prop="Inputphone"
          ></el-table-column>
          <el-table-column label="כתובת" prop="InputAdress"></el-table-column>
        </el-table-column>
      </el-table>
      <div
        style="
          text-align: center;
          font-size: 40px;
          border-bottom: 3px solid black;
        "
      >
        ₪{{ sum }} :סך הכל
      </div>
      <div
        style="
          font-size: 60px;
          border-bottom: 3px solid black;
          text-align: center;
        "
      >
        המוצרים
      </div>
      <el-card v-for="(pc, i) in data.products" :key="i" class="card">
        <div>{{ pc.name }}</div>
        <div>
          <img :src="mondo(pc)" width="300px" height="300px" />
        </div>
        <div>₪{{ pc.priceForInt }} :מחיר ליחידה</div>
        <div style="font-size: 40px; margin-bottom: 10px">₪{{ pc.price }}</div>
        <div style="font-size: 30px">{{ pc.Some }} :כמות</div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { URL } from "@/URL/url";

export default {
  name: "StorOfSabaPirteyHazmana",

  data() {
    return {
      data: "",
      arrD: {},
      arrI: {},
      n: "",
      sum: "",
    };
  },

  mounted() {
    this.$ax.get(URL + "findPritim").then((res) => {
      console.log(res.data);
      this.data = res.data;
      let id = this.$route.params.id;
      this.data = this.data.find((e) => {
        return e._id === id;
      });
      this.sortSum();
      for (const key in this.data.ashrai) {
        this.arrD[key] = this.data.ashrai[key];
      }
      for (const key in this.data.ishi) {
        this.arrI[key] = this.data.ishi[key];
      }
      this.arrD = [this.arrD];

      this.arrI = [this.arrI];
    });
  },

  methods: {
    serchTokef(row) {
      let str = "";
      str += this.data.ashrai.validity.month;
      str += "/";
      str += this.data.ashrai.validity.year;
      return str;
    },
    mondo(pc) {
      return require(`../assets/${pc.name}.png`);
    },
    sortSum() {
      let sum = this.data.products.reduce((sumo, e) => {
        return sumo + +e.price;
      }, 0);
      //   console.log(sum);
      this.sum = sum;
    },
  },
};
</script>
<style scoped>
.pratim-ishiim {
  margin-top: 15px;
}
.card {
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
}
</style>
