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
        <!-- <el-row :gutter="3" class="row">
          <el-col :span="6" v-for="p in products" :key="p._id" class="ell-coll"> -->
        <el-carousel
          autoplay
          height="460px"
          style="
            width: 50%;
            position: relative;
            margin-bottom: 2%;
            height: auto;
            left: 26%;
          "
          :interval="14000"
          type="card"
        >
          <el-carousel-item
            v-for="p in products"
            :key="p._id"
            class="itemCarusel"
          >
            <product :product="p"></product>
          </el-carousel-item>
        </el-carousel>
        <!-- </el-col>
        </el-row> -->
      </div>
      <div class="table">
        <el-table
          id="table"
          :data="products"
          show-summary
          border
          :summary-method="metSum"
          class="tabl"
        >
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
      <lig
        id="lig"
        ref="lig"
        class="lig"
        :sumco="serchSum()"
        v-if="showComp"
        @siyum="send"
        @collHainyanim="ashraio"
      ></lig>
      <div v-show="!showComp" style="font-size: 80px; text-align: center">
        הפרטים מולאו
      </div>
    </div>
    <div></div>
    <div class="itzuvshelhalemata"></div>
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
    document.body.style.height = "1490px";
    this.loading = true;
    this.$ax.get(URL).then((res) => {
      this.products = res.data;
      let moshe = require("@/assets/wardrobe-5969982_1280.jpg");
      document.body.style.background = `url(${moshe})`;
      this.sortProduct();
      this.sortprice();
      this.loading = false;
    });
    window.addEventListener("message", (e) => {
      // console.log("e", e);
      // console.log("e.data", e.data);
      // console.log("e.origin", e.origin);
      if (e.origin !== "https://hen-ya-shivuk.com") {
        return;
      }
      // console.log(e.data);
      if (e.data === "send") {
        if (this.$refs.lig) {
          this.$refs.lig.sendPratim();
        }
      }
      if (e.data === "on") {
        this.$router.push("/");
      }
    });
  },

  methods: {
    BodyOfAshray(form, sum, prodact) {
      let body = {
        key: "f6f86b77a4ff4d9254253cfa7eb854d3462ad4c6d4f2a0c6cd564dc40e2cb68a",
        Local: "He",
        UniqueId: "",
        SuccessUrl: "https://hen-ya-shivuk.com/succes",
        // SuccessUrl: "http://localhost:8080/succes",
        CancelUrl: "",
        CallbackUrl: "",
        PaymentType: "regular",
        CreateInvoice: "false",
        AdditionalText: "",
        ShowCart: "true",
        ThemeColor: "005ebb",
        BitButtonEnabled: "true",
        ApplePayButtonEnabled: "true",
        GooglePayButtonEnabled: "true",
        Installments: {
          Type: "regular",
          MinQuantity: "1",
          MaxQuantity: "12",
        },
        Customer: {
          Email: form.ishi.Inputmail,
          Name: form.ishi.Inputshem,
          PhoneNumber: form.ishi.Inputphone,
          Attributes: {
            HolderId: "none",
            Name: "required",
            PhoneNumber: "required",
            Email: "optional",
          },
        },
        CartItems: [],
        FocusType: "None",
        CardsIcons: {
          ShowVisaIcon: "true",
          ShowMastercardIcon: "true",
          ShowDinersIcon: "true",
          ShowAmericanExpressIcon: "true",
          ShowIsracardIcon: "true",
        },
        IssuerWhiteList: [1, 2, 3, 4, 5, 6],
        BrandWhiteList: [1, 2, 3, 4, 5, 6],
        UseLightMode: "false",
        UseCustomCSS: "false",
        BackgroundColor: "FFFFFF",
        ShowTotalSumInPayButton: "true",
        ForceCaptcha: "false",
      };

      prodact.forEach((element) => {
        let prospo = {
          Amount: element.priceForInt,
          Currency: "ILS",
          Name: element.name,
          Description: element.des,
          Quantity: element.Some,
          Image: element.imageName,
          IsTaxFree: "false",
          AdjustAmount: "false",
        };
        body.CartItems.push(prospo);
      });
      return body;
    },
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
      // console.log("data", data.products);
      let da = new Date();
      let sof = `${da.getFullYear()}/${da.getMonth() + 1}/${da.getDate()}`;
      let shaa = `${da.getHours()}:${da.getMinutes()}`;
      this.showComp = false;
      data.Date = { shaa, sof };

      this.$ax.post(URL + "SendData", data).then((res) => {
        // console.log(res.data);
      });
    },
    async ashraio(form) {
      // console.log(this.products);
      let body = this.BodyOfAshray(form, this.sum, this.products);
      let res = await this.$ax.post(
        "https://pci.zcredit.co.il/webcheckout/api/WebCheckout/CreateSession",
        body
      );
      // console.log(res.data.Data);
      let reso = res.data.Data.SessionUrl;
      this.$refs.lig.theTashlumos(reso);
      if (
        res.data.Data.ReturnMessage ===
        "Input Error - Parameter 'Customer Email' was send with an invalid value"
      ) {
        this.$message.error("מייל לא תקין");
        this.$refs.lig.ERROR("mail");
      } else if (!reso) {
        if (
          res.data.Data.ReturnMessage !==
          "Input Error - Parameter 'Customer Email' was send with an invalid value"
        ) {
          this.$refs.lig.ERROR("כללי");
        }
        return;
      }
      // console.log(this.$refs.lig);
    },
  },
};
</script>
<style scoped>
body {
  background: rgb(161, 152, 141);
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

/* .itemCarusel {
  margin: 0px 20px 0px 20px;
} */
@media screen and (max-width: 1000px) {
  .tabl {
    width: 130%;
    position: relative;
    left: 100px;
    padding: 20px;
    font-size: 20px;
    height: 370px;
  }
}
</style>
