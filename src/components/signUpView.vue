<template>
  <div class="all">
    <el-button type="primary" @click="auto" v-if="false"
      >מילוי אוטומטי</el-button
    >
    <el-button type="primary" @click="del" v-if="false">מחיקת הכל</el-button>
    <div class="stepo" ref="step">
      <el-button
        type="primary"
        class="but"
        @click="active !== 0 ? (active = active - 1) : (active = 0)"
        size="mini"
        v-if="active > 0"
      >
        <i class="el-icon-back"></i>חזור לשלב הקודם</el-button
      >
      <el-steps
        :space="360"
        :active="active"
        finish-status="success"
        class="st"
      >
        <el-step title="פרטים אישיים"></el-step>
        <el-step title="פרטי אשראי"></el-step>
        <el-step title="סיום"></el-step>
      </el-steps>
      <el-button
        type="success"
        class="posi"
        v-if="bul && active === 1 && shogen2 && false"
        ref="butco"
        @click="next"
        >לחץ כאן אם סיימת</el-button
      >
    </div>
    <div v-show="showform" class="docytocy">
      <el-form :model="ElFrom" class="from" :rules="rules" ref="from" id="lig">
        <!-- / -->
        <div class="pratim-Ishiim" v-if="active === 0">
          <el-form-item
            class="fronItem"
            prop="ishi.Inputshem"
            label="שם מלא"
            ref="ishi.Inputshem"
          >
            <el-input
              v-model="ElFrom.ishi.Inputshem"
              placeholder="הקלד שם מלא"
              class="input"
            ></el-input>
          </el-form-item>

          <el-form-item
            class="fronItem"
            prop="ishi.Inputmail"
            label="מייל"
            ref="ishi.Inputmail"
          >
            <el-input
              v-model="ElFrom.ishi.Inputmail"
              placeholder="הקלד אמייל"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="fronItem"
            prop="ishi.Inputphone"
            label="מספר טלפון"
            ref="ishi.Inputphone"
          >
            <el-input
              v-model="ElFrom.ishi.Inputphone"
              placeholder="הקלד מספר טלפון"
              maxlength="15"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="fronItem"
            prop="ishi.InputAdress"
            label="כתובת"
            ref="ishi.InputAdress"
          >
            <el-input
              v-model="ElFrom.ishi.InputAdress"
              placeholder="הקלד כתובת"
            ></el-input>
          </el-form-item>
        </div>
        <!-- / -->
        <!-- v-if="active === 1" -->
        <div class="pirtey-ashray" v-if="false">
          <el-form-item
            class="fronItem"
            prop="ashrai.misparCartis"
            label="מספר כרטיס"
            ref="ashrai.misparCartis"
          >
            <el-input
              @input="plusRevahh"
              v-model="ElFrom.ashrai.misparCartis"
              placeholder="מספר כרטיס"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="fronItem"
            id="tokef"
            prop="vis"
            label="תוקף כרטיס"
            ref=""
          >
            <el-select
              v-model="ElFrom.ashrai.validity.year"
              placeholder="שנה"
              class="year"
            >
              <el-option
                v-for="os in op.optionYear"
                :key="os"
                :value="os"
              ></el-option>
            </el-select>
            <el-select
              v-model="ElFrom.ashrai.validity.month"
              placeholder="חודש"
              class="month"
            >
              <el-option
                v-for="opo in op.optionMonth"
                :key="opo"
                :value="opo"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="fronItem"
            prop="ashrai.cvv"
            label="cvv"
            ref="ashrai.cvv"
          >
            <el-input
              v-model="ElFrom.ashrai.cvv"
              placeholder="cvv"
              maxlength="3"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="fronItem"
            prop="ashrai.tz"
            label="תעודת זהות"
            ref="ashrai.tz"
          >
            <el-input
              v-model="ElFrom.ashrai.tz"
              placeholder="תעודת זהות של בעל הכרטיס"
            ></el-input>
          </el-form-item>
          <el-form-item class="fronItem" style="border: 2px solid black">
            <el-input v-model="sumo" placeholder="" disabled> </el-input>
          </el-form-item>
        </div>
        <iframe
          class="iframos"
          v-if="active === 1 && shogen2"
          :src="urlo"
          ref="ifro"
        ></iframe>
        <!-- / -->
        <div v-if="active === 2"></div>
        <!-- / -->
        <el-form-item class="fronItem" v-if="active !== 1">
          <el-button type="success" style="width: 100%" @click="next">
            {{ serchname() }}
            <i class="el-icon-right"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { URL } from "@/URL/url";

export default {
  name: "StorOfSabaSignUpView",
  props: ["sumco"],
  data() {
    return {
      bul: false,
      urlo: null,
      shogen2: false,
      count: 0,
      showform: true,
      sumo: "סכום לתשלום :" + this.sumco,
      active: 0,
      ElFrom: {
        ishi: {
          Inputmail: "",
          Inputshem: "",
          Inputphone: "",
          InputAdress: "",
        },
        ashrai: {
          misparCartis: "",
          validity: {
            year: "",
            month: "",
          },
          cvv: "",
          tz: "",
        },
      },
      op: {
        optionYear: [
          "20",
          "21",
          "22",
          "23",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        optionMonth: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
      },
      rules: {
        "ishi.Inputmail": [
          {
            required: true,
            validator: (rule, val, cb) => {
              if (val === "") {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },

          {
            validator: (rule, val, cb) => {
              if (val.indexOf("@") === -1) {
                cb(new Error("מייל לא תקין נסה שוב"));
                this.harhev(rule);
                return true;
              } else {
                cb();
                this.hacten(rule);
                return false;
              }
            },
            message: "כתובת מייל לא תקינה",
            trigger: "blur",
          },
        ],
        "ishi.Inputshem": [
          {
            required: true,
            validator: (rule, val, cb) => {
              if (val === "") {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },
        ],
        "ishi.Inputphone": [
          {
            required: true,
            validator: (rule, val, cb) => {
              if (val === "") {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },
          {
            validator: (rule, val, cb) => {
              console.log(val.length);
              if (val.lenght === 10) {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "מספר טלפון הוא 10 מספרים בלבד",
            trigger: "blur",
          },

          ,
        ],
        "ishi.InputAdress": [
          {
            required: true,
            validator: (rule, val, cb) => {
              if (val === "") {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },
          ,
        ],
        "ashrai.misparCartis": [
          {
            required: true,
            validator: (rule, val, cb) => {
              if (val === "") {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },
          ,
        ],
        // ...,
        // year: [{ required: true, message: "שדה השנה הוא חובה", trigger: "blur" }],
        // month: [{ required: true, message: "שדה החודש הוא חובה", trigger: "blur" }],
        // ...
        "ashrai.cvv": [
          {
            required: true,
            validator: (rule, val, cb) => {
              if (val === "") {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },
          {
            validator: (rule, val, cb) => {
              if (val.lenght > 3) {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },

          ,
        ],
        "ashrai.tz": [
          {
            required: true,
            validator: (rule, val, cb) => {
              if (val === "") {
                cb(new Error("שתוק"));
                this.harhev(rule);
              } else {
                cb();
                this.hacten(rule);
              }
            },
            message: "שדה זה חובה",
            trigger: "blur",
          },
          ,
        ],
      },
    };
  },
  watch: {
    active(val) {
      if (val === 1) {
        setTimeout(() => {
          this.bul = this.active === 1 && this.shogen2;
          if (!this.urlo) this.bul = this.urlo;
        }, 4000);
      }
    },
    sumo(val) {
      alert();
    },
  },
  mounted() {
    //
    this.sidurfrom();
    // let el = this.$refs.butco.$el;
  },

  methods: {
    sortLabel(Efrom) {
      let c = Efrom.children[0].children;
      if (c.length !== 5) {
        Array.from(c).forEach((element) => {
          element.children[0].style.width = "auto";
          element.children[0].style.position = "absolute";
          // element.children[0].style.left = "-70px";
          element.children[1].style.display = "inline-block";
          element.children[1].style.width = "100%";
        });
      }
    },
    plusRevahh() {
      this.count++;
      // console.log("this.count", this.count);
      if (this.count === 4) {
        this.ElFrom.ashrai.misparCartis += " ";
        this.count = 0;
      }
    },
    harhev(r) {
      let shelanu = r.field;
      let el = this.$refs[shelanu].$el;
      el.style.marginBottom = "23px";
    },
    hacten(r) {
      let shelanu = r.field;
      let el = this.$refs[shelanu].$el;
      el.style.marginBottom = "0px";
    },
    auto() {
      this.ElFrom.ishi.Inputmail = "haz.shilo@gmail.com";
      this.ElFrom.ishi.Inputshem = "יסמעל הנייה";
      this.ElFrom.ishi.Inputphone = "0503112247";
      this.ElFrom.ishi.InputAdress = "מעגלים";
      this.ElFrom.ashrai.misparCartis = "2342 234 234 2342";
      this.ElFrom.ashrai.cvv = "123";
      this.ElFrom.ashrai.tz = "933942738249";
      this.ElFrom.ashrai.validity.year = "26";
      this.ElFrom.ashrai.validity.month = "04";
    },
    del() {
      this.$ax.delete(URL + "delco");
    },
    next() {
      this.sidurfrom();
      this.$refs.from.validate((valid) => {
        if (valid) {
          this.active++;
          if (this.active === 1) {
            this.$emit("collHainyanim", this.ElFrom);
          }

          if (this.active > 2) {
            this.active = 0;
            this.sendPratim();
          }
        } else {
          return false;
        }
      });
    },
    sendPratim() {
      // if (
      //   this.ElFrom.ashrai.validity.year === "" &&
      //   this.ElFrom.ashrai.validity.month === ""
      // ) {
      //   this.$message.error("לא מלאת תוקף כרטיס");
      //   this.active = 1;
      //   this.sidurfrom();
      // } else {
      if (this.ElFrom.ishi.Inputshem) {
        this.$emit("siyum", this.ElFrom);
      } // this.$message.success("");
    },

    sidurfrom() {
      let Estep = this.$refs.step;
      let Efrom = this.$refs.from.$el;
      Estep.style.width = "100%";
      Estep.style.padding = " 20px";
      Estep.style.position = "relative";
      Estep.style.left = `${Efrom.offsetLeft - 100}px`;

      // this.pompa = Efrom;
      this.sortLabel(Efrom);
    },
    serchname() {
      if (this.active === 2) {
        return "שלח";
      } else {
        return "עבור לשלב הבא";
      }
    },
    theTashlumos(url) {
      this.urlo = url;
      this.shogen2 = true;
    },
    ERROR(val) {
      if (val === "mail") {
        setTimeout(() => {
          this.active = 0;
        }, 1000);
      }
      if (val === "כללי") {
        this.$message.error("נסה שוב");
        setTimeout(() => {
          this.active = 0;
        }, 1000);
      }
    },
  },
};
</script>
<style>
.sf {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.from {
  border: 3px solid black;
  width: 40%;
  position: absolute;
  left: 30%;
  margin-top: 35px;
}
.fronItem {
  margin: 0px;
  background: white;
}
#tokef {
  width: 100%;
  display: flex;
  background: rgb(255, 255, 255);
}
.but {
  position: absolute;
  left: -138px;
}
.iframos {
  width: 170%;
  height: 760px;
  position: absolute;
  right: -25%;
}
.posi {
  position: absolute;
  width: 51%;
  height: 50px;
  right: 54%;
  z-index: 2;
}
/* .fronItem .el-form-item__label {
  background: #000;
} */
@media screen and (max-width: 400px) {
  .stepo {
    display: none;
  }
  .docytocy {
    width: 142%;
    position: absolute;
    right: 5%;
    height: 800px;
    /* background: rgba(0, 0, 0, 0.496); */
    top: 2350px;
    z-index: 200;
  }
  .st {
    background: rgba(0, 0, 0, 0.496);
    top: 190px;
    position: relative;
    right: 190px;
  }
  .but {
    display: none;
  }
  .iframos {
    width: 100%;
    right: -9px;
  }
}
</style>
<style>
input::placeholder {
  text-align: right;
}
</style>
