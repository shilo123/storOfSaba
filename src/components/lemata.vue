<template v-show="products">
  <div class="posham">
    <div>
      <strong class="head0">המוצרים</strong>
      <div
        class="head01"
        v-html="products.length > 0 ? arrnames : ' טוען... '"
      ></div>
    </div>
    <br />
    <div>
      <strong class="head1">קטגוריות</strong>
      <div
        class="head02"
        v-html="products.length > 0 ? arrcates : 'טוען...'"
      ></div>
    </div>
    <br />
    <div>
      <strong class="head2">כולל</strong>
      <br />
      <div
        class="head03"
        v-html="products.length > 0 ? arrColel : 'טוען...'"
      ></div>
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
          arrname.push(
            `<a href=#${element._id} style="text-decoration: none;font-size:20px">`
          );
          arrname.push(element.name);
          arrname.push("</a>");
        });
        this.arrnames = arrname.join(" <br> ");
        let arrC = [];
        this.products.forEach((element) => {
          if (!arrC.includes(this.returncategory(element.category))) {
            arrC.push(this.returncategory(element.category));
            arrC.push("<br>");
          }
        });
        this.arrcates = arrC.join(" <br> ");
        let arrCole = [];
        this.products.forEach((element) => {
          arrCole.push(element.des);
        });
        this.arrColel = arrCole.join(" <br> <span>/</span>");
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
<!-- <style lang="scss">
@for $i from 1 through 3 {
  .head#{$i} {
    position: absolute;
    left: $i * 10%;
  }
}
</style> -->
<style scoped>
.head0 {
  position: absolute;
  top: 0;
  left: 200px;
  font-size: 30px;
}
.head1 {
  position: absolute;
  top: 0;
  left: 600px;
  font-size: 30px;
}
.head2 {
  position: absolute;
  top: 0;
  left: 1200px;
  font-size: 30px;
}
.head01 {
  position: absolute;
  top: 50px;
  left: 33px;
}
.head02 {
  position: absolute;
  top: 50px;
  left: 600px;
}
.head03 {
  position: absolute;
  top: 50px;
  left: 950px;
  width: 300px;
}
.posham {
  background: rgba(249, 251, 255, 0.455);
  width: 98%;
  text-align: right;
  padding: 10px;
  position: absolute;
  border: 2px solid black;
  left: 10px;
  height: 1090px;
}
a {
  text-decoration: none;
}
</style>
