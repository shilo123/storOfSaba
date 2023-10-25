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
    <div v-show="shows.showComp">
      <button ref="bamba" v-show="false">click</button>
      <el-row :gutter="3" class="row">
        <el-col :span="6" v-for="p in products" :key="p._id">
          <product :product="p" @dellocall="delL"></product>
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
              clearable
            ></el-input>
            <el-input
              v-model="mosif.desProduct"
              placeholder="הקלד תיאור המוצר"
              clearable
            ></el-input>
            <el-upload :action="`${url}insertProduct`" :on-success="onFile">
              <el-button type="warning">העלה תמונה</el-button>
            </el-upload>
            <el-input-number
              style="width: 100%"
              controls-position="right"
              v-model="mosif.priceProduct"
              placeholder="הקלד מחיר המוצר"
              clearable
            ></el-input-number>
            <el-input
              v-model="mosif.categoryProduct"
              placeholder="שם הקטגוריה"
              @focus="shows.showOpCates = true"
              @blur="asyncfilter"
              clearable
            ></el-input>
            <div class="triangle" v-show="shows.showOpCates"></div>
            <div
              class="opCates"
              v-for="c in category"
              :key="c"
              v-show="shows.showOpCates"
              @click="bodek(c)"
            >
              <span style="position: relative; top: 21%">{{ c }}</span>
            </div>
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
      inp: "",
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
        showOpCates: false,
      },
      category2: [],
      category: [],
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
    "mosif.categoryProduct"(val) {
      this.category = this.category2;
      this.category = this.category.filter((e) => {
        return e.includes(val);
      });
      if (this.category.length === 0) {
        this.shows.showOpCates = false;
      } else {
        this.shows.showOpCates = true;
        this.category.forEach((element) => {
          if (val === element) {
            this.shows.showOpCates = false;
          } else {
            this.shows.showOpCates = true;
          }
        });
      }
    },
    "shows.showComp"(val) {
      // alert(val);
    },
    activos(val) {
      // alert(val);
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
    this.$ax.get(URL).then((res) => {
      setTimeout(() => {
        this.glila();
      }, 1000);
      if (sessionStorage.getItem("customReload") === "true") {
        this.funckmafil();
        sessionStorage.removeItem("customReload");
        setTimeout(() => {
          this.shows.showComp = true;
          this.activos = "2";
          this.glila();
        }, 1000);
      } else {
        // אם המשתמש הגיע לכאן לא דרך הפונקציה hosefProducts, אז הפעל את הפונקציה funckmafil בהוק המונטד
        this.$nextTick(() => {
          this.funckmafil();
        });
      }
      this.shows.showComp = this.$store.state.ifshow;
      let Dop = res.data;
      this.category.push("כללי");
      Dop.forEach((element) => {
        this.category.push(this.returncategory(element.category));
      });
      this.category = this.category.filter((e, i, arr) => {
        return arr.indexOf(e) === i;
      });
      this.category2 = this.category;
      // console.log(this.category);
    });
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
  updated() {},
  methods: {
    glila() {
      let button = this.$refs.bamba;
      button.click();

      window.scrollTo(0, document.body.scrollHeight);
    },
    asyncfilter() {
      setTimeout(() => {
        this.shows.showOpCates = false;
      }, 330);
    },
    bodek(c) {
      this.mosif.categoryProduct = c;
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
      if (n !== "aronotM" || n !== "birzeyM" || n !== "miklahonim") {
        return n;
      }
      if (n === "הכל") {
        return n;
      }
    },
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
    funckmafil() {
      this.$store.commit("Sifshow", this.shows.showComp);
      this.shows.showComp = true;
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
          // sessionStorage.setItem("reloaded", "true");
          sessionStorage.setItem("customReload", "true");
          window.location.reload();
          // if (sessionStorage.getItem("reloaded") === "true") {
          //   this.funckmafil();
          //   sessionStorage.removeItem("reloaded"); // נקה את הפריט כדי שהקוד לא יתבצע בכל פעם שהדף נטען
          // }
        });
      } else {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: `<strong style="font-size:19px"> יש למלא את כל השדות</strong>`,
        });
      }
    },
    delL(id) {
      let i = this.products.findIndex((e) => e._id === id);
      this.products.splice(i, 1);
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
.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgb(255, 255, 255); /* שימוש ב-border-top במקום border-bottom */
  position: relative;
  left: 48%;
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
.opCates {
  margin-bottom: 4px;
  background: white;
  height: 30px;
  text-align: center;
  border-radius: 17px;
}
.opCates:hover {
  cursor: pointer;
  margin-bottom: 4px;
  background: rgb(198, 195, 195);
  height: 30px;
  color: rgb(30, 255, 0);
  text-align: center;
  border-radius: 17px;
}
</style>
