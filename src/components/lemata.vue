<template>
  <div v-if="prod">
    <div>
      <strong>המוצרים:</strong> {{ prod.length > 0 ? arrnames : "טוען..." }}
    </div>
    <br />
    <div>
      <strong>קטגוריות:</strong>{{ prod.length > 0 ? arrcates : "טוען..." }}
    </div>
    <br />
    <div>
      <strong>כולל:</strong>{{ prod.length > 0 ? arrColel : "טוען..." }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["prod"],
  name: "StorOfSabaLemata",

  data() {
    return {
      arrnames: [],
      arrcates: [],
      arrColel: [],
    };
  },

  mounted() {
    setTimeout(() => {
      let arrname = [];
      this.prod.forEach((element) => {
        arrname.push(element.name);
      });
      this.arrnames = arrname.join("/");
      let arrC = [];
      this.prod.forEach((element) => {
        arrC.push(this.returncategory(element.category));
      });
      this.arrcates = arrC.join("/");
      let arrCole = [];
      this.prod.forEach((element) => {
        arrCole.push(element.des);
      });
      this.arrColel = arrCole.join("/");
    }, 1000);
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
