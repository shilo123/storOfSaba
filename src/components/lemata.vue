<template v-show="products">
  <div>
    <div>
      <strong>המוצרים:</strong> {{ products.length > 0 ? arrnames : "טוען..." }}
    </div>
    <br />
    <div>
      <strong>קטגוריות:</strong>{{ products.length > 0 ? arrcates : "טוען..." }}
    </div>
    <br />
    <div>
      <strong>כולל:</strong>{{ products.length > 0 ? arrColel : "טוען..." }}
    </div>
  </div>
</template>
<script>
import { URL } from "@/URL/url";

export default {
  name: "StorOfSabaLemata",

  data() {
    return {
      products: [],
      arrnames: [],
      arrcates: [],
      arrColel: [],
    };
  },

  mounted() {
    this.$ax.get(URL).then(
      (res) => (this.products = res.data),
      setTimeout(() => {
        let arrname = [];
        this.products.forEach((element) => {
          arrname.push(element.name);
        });
        this.arrnames = arrname.join("/");
        let arrC = [];
        this.products.forEach((element) => {
          arrC.push(this.returncategory(element.category));
        });
        this.arrcates = arrC.join("/");
        let arrCole = [];
        this.products.forEach((element) => {
          arrCole.push(element.des);
        });
        this.arrColel = arrCole.join("/");
      }, 1000)
    );
  },
  methods: {
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
  },
};
</script>
