<template>
  <div>
    <el-menu :default-active="activeI">
      <el-menu-item
        index="1"
        class="el-menu-vertical-demo"
        @click="pushT"
        v-if="$route.path === '/'"
      >
        <el-badge
          v-if="ids.length > 0"
          :value="ids.length"
          type="primary"
          style="position: relative; bottom: 3px; left: -5%"
        ></el-badge>

        לתשלום</el-menu-item
      >
      <el-menu-item-group title="קטגוריות" v-if="$route.path === '/'">
        <el-menu-item
          :index="`1-${i}`"
          v-for="(c, i) in category"
          :key="i"
          @click="$emit('filtCategory', c)"
          >{{ returncategory(c) }}</el-menu-item
        >
      </el-menu-item-group>
      <el-menu-item-group title="חיפוש" v-if="$route.path === '/'">
        <el-menu-item index="2">
          <el-input
            v-model="serche"
            placeholder="חפש מוצר"
            @input="inputica"
            @keydown.space.native="onSpacePress"
          ></el-input>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item
        v-if="$route.path !== '/'"
        index="3"
        @click="$route.path !== '/' ? $router.push({ path: '/' }) : ''"
        >חזור לדף הבית</el-menu-item
      >
      <el-menu-item
        index="4"
        class="nanForPhone"
        id="item-default"
        @click="clicLinck('table')"
        v-if="$route.path !== '/'"
        ><a href="#table" ref="table" @click="$emit('drawso')"
          >לפירוט</a
        ></el-menu-item
      >
      <el-menu-item
        index="5"
        id="item-default"
        class="nanForPhone"
        @click="clicLinck('lig')"
        v-if="$route.path !== '/'"
        ><a href="#lig" ref="lig">לתשלום</a></el-menu-item
      >
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "StorOfSabaMenu",
  props: ["category", "ids"],
  data() {
    return {
      activeI: "1",
      icon: "el-icon-caret-bottom",
      serche: "",
      arrD: this.ids,
    };
  },
  watch: {},
  methods: {
    inputica() {
      {
      }
      this.$emit("serchop", this.serche);
    },
    clicLinck(val) {
      if (this.$refs[val]) {
        this.$refs[val].click();
      }
      this.$emit("drawso");
    },
    shaneI() {
      this.$refs.divo.color = "#FFBB5C";
      this.activeI = "3";
      setTimeout(() => {
        this.icon = "el-icon-caret-top";
      }, 400);
    },
    pushT() {
      let idso = this.arrD.join(",");
      if (this.ids.length !== 0) {
        this.$router.push({ path: "/tashlum/" + idso });
      } else {
        this.$message("לא הוספת כלום");
      }
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
    onSpacePress() {
      this.serche += " ";
    },
  },
  mounted() {
    let chil = this.$refs.itemM.$el.children;
    let widtos = 100 / chil.length;
    Array.from(chil).forEach((element) => {
      element.style.width = `${widtos}%`;
    });
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
