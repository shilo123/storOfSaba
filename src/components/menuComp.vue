<template>
  <div>
    <el-menu
      :default-active="activeI"
      class="menu"
      mode="horizontal"
      background-color="rgb(4, 113, 66)"
      text-color="white"
      active-text-color="white"
      ref="itemM"
    >
      <!-- arrData -->
      <el-menu-item
        index="1"
        id="item-default"
        @click="pushT"
        v-if="$route.path === '/'"
      >
        <i class="el-icon-shopping-cart-2" id="IconCss"></i>לתשלום
      </el-menu-item>
      <!-- </el-badge> -->

      <el-menu-item
        index="2"
        id="item-default"
        class="el-icon-s-home"
        @click="$route.path !== '/' ? $router.push({ path: '/' }) : ''"
        >דף הבית</el-menu-item
      >
      <!-- <el-tooltip effect="dark" content="בחר קטגוריה" placement="top"> -->
      <el-submenu
        v-if="$route.path === '/'"
        index="3"
        id="item-default"
        style="font-size: 40px"
        @mouseover="shaneI"
        @mouseleave="icon = 'el-icon-caret-bottom'"
      >
        <div ref="divo" slot="title" style="font-size: 40px; color: white">
          <i :class="icon" style="font-size: 30px; margin-right: 5px"></i>
          קטגוריות
        </div>
        <el-menu-item
          v-for="n in category"
          :key="n"
          index="3"
          class="categoryz"
          @click="$emit('filtCategory', n)"
          >{{ returncategory(n) }}</el-menu-item
        >
      </el-submenu>
      <!-- </el-tooltip> -->
      <el-menu-item
        index="4"
        id="item-default"
        ref="menuItemS"
        v-if="$route.path === '/'"
      >
        <el-input
          v-model="serche"
          placeholder="חפש מוצר"
          @input="$emit('serchop', serche)"
        ></el-input>
        <!-- @input="$emit('serchop', serche)" -->
        <!-- $emit('serchop', serche) -->
      </el-menu-item>
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
      if (n === "הכל") {
        return n;
      }
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
#item-default {
  font-size: 40px;
  text-align: center;
}
.menu {
  margin: 0px;
  position: relative;
  bottom: 10px;
}
body {
  background: rgb(4, 113, 66);
}
.el-menu--horizontal {
  background: #000;
}
.categoryz {
  position: relative;
  /* left: 150px; */
}
#IconCss {
  font-size: 40px;
  position: absolute;
  right: 70%;
  top: 15%;
}
</style>
