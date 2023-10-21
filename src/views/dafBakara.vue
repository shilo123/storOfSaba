<template>
  <div
    style="width: 100%; height: 100%; position: absolute"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div>
      <el-menu :default-active="activos" ref="itemM" mode="horizontal">
        <el-menu-item index="1" @click="FilterAll()">כל ההזמנות</el-menu-item>
        <el-menu-item index="2" @click="shows.showComp = true"
          >ערוך מוצרים באתר</el-menu-item
        >
        <el-menu-item index="4" @click="filternew()">
          <el-badge
            :value="serchValue()"
            type="primary"
            style="position: absolute; left: 80%; top: -20px"
          >
          </el-badge>
          הזמנות מהיום
        </el-menu-item>
        <el-menu-item index="3" class="el-menuc" v-show="!shows.showComp">
          <el-input
            v-model="serch"
            :placeholder="holder"
            class="input"
            @input="ta"
          ></el-input>
          <el-select v-model="selectos" placeholder="" class="select">
            <el-option v-for="(o, i) in op" :key="i" :value="o"></el-option>
          </el-select>
        </el-menu-item>
      </el-menu>
      <div v-if="!shows.showComp">
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
          <el-table-column
            label="כתובת"
            prop="ishi.InputAdress"
          ></el-table-column>
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
        </el-table>
      </div>
    </div>
    <div v-if="shows.showComp">
      <el-row :gutter="3" class="row">
        <el-col :span="6" v-for="p in products" :key="p._id">
          <product :product="p"></product>
        </el-col>
        <el-col :span="6" v-if="!shows.showYetzira">
          <div class="hosef">
            <span>
              <el-button
                type="warning"
                plain
                class="hosef-text"
                @click="shows.showYetzira = true"
              >
                הוסף מוצר לחנות
              </el-button>
            </span>
          </div>
        </el-col>
        <el-col :span="6" v-if="shows.showYetzira">
          <el-card class="cox">
            <el-input
              v-model="mosif.nameProduct"
              placeholder="הקלד שם המוצר"
            ></el-input>
            <el-input
              v-model="mosif.desProduct"
              placeholder="הקלד תיאור המוצר"
            ></el-input>
            <el-upload :action="`${url}insertProduct`" :on-success="onFile">
              <el-button type="warning">העלה תמונה</el-button>
            </el-upload>
            <el-input
              v-model="mosif.priceProduct"
              placeholder="הקלד מחיר המוצר"
            ></el-input>
            <el-input
              v-model="mosif.categoryProduct"
              placeholder="שם הקטגוריה"
            ></el-input>
            <el-button
              type="success"
              style="margin-top: 15px"
              @click="hosefProducts"
              >הוסף מוצר</el-button
            >
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { URL } from "@/URL/url";
import product from "@/components/productComp.vue";

export default {
  components: { product },
  name: "StorOfSabaDafBakara",
  data() {
    return {
      url: URL,
      mosif: {
        nameProduct: "",
        desProduct: "",
        priceProduct: "",
        categoryProduct: "",

        Img: "",
      },
      products: "",
      loading: false,
      data: "",
      data2: "",
      activos: "1",
      shows: {
        showComp: false,
        showYetzira: false,
      },
      counter: 0,
      num: "",
      serch: "",
      selectos: "שם",
      holder: "חפש לפי שם...",
      op: ["שם", "מייל", "מספר טלפון", "כתובת", "תאריך"],
      //   arrData: [],
      date: "",
      value: "",
    };
  },
  watch: {
    "shows.showComp"(val) {
      // alert(val);
    },
    activos(val) {
      alert(val);
      if (val === "2") {
        this.shows.showComp = true;
      } else {
        this.shows.showComp = false;
      }
    },
    selectos(val) {
      this.counter = 0;
      console.log(val);
      if (val === "שם") {
        this.holder = `...חפש לפי ${val}`;
      }
      if (val === "מייל") {
        this.holder = `...חפש לפי ${val}`;
      }
      if (val === "מספר טלפון") {
        this.holder = `...חפש לפי ${val}`;
      }
      if (val === "כתובת") {
        this.holder = `...חפש לפי ${val}`;
      }
      if (val === "תאריך") {
        this.holder = `...חפש לפי ${val}`;
      }
    },
    serch(val) {
      console.log(this.data);
      this.data = this.data2;
      if (this.selectos === "שם") {
        this.data = this.data.filter((e) => {
          return e.ishi.Inputshem.includes(val);
        });
      }
      if (this.selectos === "מייל") {
        this.data = this.data.filter((e) => {
          return e.ishi.Inputmail.includes(val);
        });
      }
      if (this.selectos === "מספר טלפון") {
        this.data = this.data.filter((e) => {
          return e.ishi.Inputphone.includes(val);
        });
      }
      if (this.selectos === "כתובת") {
        this.data = this.data.filter((e) => {
          return e.ishi.InputAdress.includes(val);
        });
      }
      if (this.selectos === "תאריך") {
        this.data = this.data.filter((e) => {
          return this.serchT(e).includes(val);
        });
      }

      if (val === "") {
        this.data = this.data2;
      }
    },
  },

  mounted() {
    document.body.style.background = "rgba(35, 33, 33, 0.17)";
    this.$ax.get(URL).then((res) => {
      this.products = res.data;
    });
    let da = new Date();
    let sof = `${da.getFullYear()}/${da.getMonth()}/${da.getDate()}`;
    this.date = sof;
    // console.log(this.date);
    this.loading = true;
    this.$ax.get(URL + "findPritim").then((res) => {
      //   console.log(res.data);
      this.data = res.data;
      this.data2 = res.data;
      this.num = res.data.length;
      this.shows.showComp = false;
      this.loading = false;
      this.data.sort((a, b) => new Date(b.Date.sof) - new Date(a.Date.sof));
      this.data2.sort((a, b) => new Date(b.Date.sof) - new Date(a.Date.sof));
      this.data.forEach((element) => {
        if (element.Date.sof === this.date) {
          element.neW = true;
        } else {
          element.neW = false;
        }
      });
      this.data2.forEach((element) => {
        if (element.Date.sof === this.date) {
          element.neW = true;
        } else {
          element.neW = false;
        }
        // console.log(this.data);
      });
      let arr = [];
      this.data.forEach((element) => {
        if (element.neW) {
          arr.push(element);
        }
      });
      this.value = arr.length;
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
      // console.log(row._id);
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
      // console.log(row.Date);
      let str = "";
      str += row.Date.sof;
      str += "  ";
      str += row.Date.shaa;
      return str;
    },
    serchT(e) {
      let str = "";
      str += e.Date.sof;
      str += "  ";
      str += e.Date.shaa;
      return str;
    },
    ta() {
      if (this.selectos === "תאריך") {
        this.counter++;
        if (this.counter === 4) {
          this.serch += "/";
        }
        if (this.counter === 5) {
          this.serch += "/";
        }
        if (this.serch === "") {
          this.counter = 0;
        }
      }
    },
    filternew() {
      this.shows.showComp = false;
      this.data = this.data.filter((e) => {
        return e.neW;
      });
    },
    FilterAll() {
      this.shows.showComp = false;
      this.data = this.data2;
    },
    serchValue() {
      if (this.value === 0) {
        return "אין הזמנות מהיום";
      } else {
        return this.value;
      }
    },
    onFile(res) {
      this.mosif.Img = res;
    },
    hosefProducts() {
      if (
        this.mosif.nameProduct !== "" &&
        this.mosif.desProduct !== "" &&
        this.mosif.categoryProduct !== "" &&
        this.mosif.priceProduct !== ""
      ) {
        this.$ax.post(URL + "insertos", this.mosif).then((res) => {
          console.log(res);
          this.$message.success({
            dangerouslyUseHTMLString: true,
            message: `<strong>המוצר <i>${this.mosif.nameProduct}</i>נוסף לאתר</strong>`,
          });

          window.location.reload();
        });
      } else {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: `<strong style="font-size:19px"> יש למלא את כל השדות</strong>`,
        });
      }
    },
  },
};
</script>
<style scoped>
.cox {
  border-radius: 16px;
  padding: 0px 30px 30px 30px;
  width: 300px;
  background: #78aca6;
  margin-bottom: 10px;
  margin-left: 0%;
  display: flex;
  flex-direction: column;
  height: auto;
  height: 440px;
  justify-content: space-between;
  position: relative;
  top: 40px;
  justify-content: center; /* מרכז אופקי */
  align-items: center; /* מרכז אנכי */
}
.el-menuc {
  display: flex;
}
.select {
  width: 140px;
}
.hosef {
  position: relative;
  top: 40px;
  height: 100px;
  background: #78aca6;
  display: flex;
  justify-content: center; /* מרכז אופקי */
  align-items: center; /* מרכז אנכי */
  border-radius: 20px;
  height: 440px;
}
.hosef-text {
  font-size: 40px;
  height: 100px;
}
</style>
