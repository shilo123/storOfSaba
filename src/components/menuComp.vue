<template>
  <div>
    <el-menu
      :default-active="activeI"
      class="menu"
      mode="horizontal"
      background-color="rgba(205, 104, 70)"
      text-color="white"
      active-text-color="white"
      ref="itemM"
    >
      <!-- arrData -->
      <el-menu-item
        class="letashlum"
        index="1"
        id="item-default"
        @click="pushT"
        v-if="$route.path === '/'"
      >
        <i class="el-icon-shopping-cart-2" id="IconCss"></i>לתשלום
        <el-badge
          v-if="ids.length > 0"
          :value="ids.length"
          style="position: relative; bottom: 20px"
        ></el-badge>
      </el-menu-item>
      <!-- </el-badge> -->

      <el-menu-item
        index="2"
        id="item-default"
        class="el-icon-s-home nanForPhone"
        @click="$route.path !== '/' ? $router.push({ path: '/' }) : ''"
        >לדף הבית</el-menu-item
      >
      <el-menu-item
        index="4"
        class="nanForPhone"
        id="item-default"
        @click="clicLinck('table')"
        v-if="$route.path !== '/'"
        ><a href="#table" ref="table">לפירוט</a></el-menu-item
      >
      <el-menu-item
        index="5"
        id="item-default"
        class="nanForPhone"
        @click="clicLinck('lig')"
        v-if="$route.path !== '/'"
        ><a href="#lig" ref="lig">לתשלום</a></el-menu-item
      >
      <!-- <el-tooltip effect="dark" content="בחר קטגוריה" placement="top"> -->
      <el-submenu
        class="cates"
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
        class="inputac"
        index="4"
        id="item-default"
        ref="menuItemS"
        v-if="$route.path === '/'"
      >
        <el-input
          v-model="serche"
          placeholder="חפש מוצר"
          @input="inputica"
          @keydown.space.native="onSpacePress"
        ></el-input>
        <!-- @input="$emit('serchop', serche)" -->
        <!-- $emit('serchop', serche) -->
      </el-menu-item>
      <el-menu-item index="6" class="OnlyPhone" v-if="window.innerWidth <= 400">
        <el-input
          v-if="$route.path === '/'"
          class="inputoca"
          v-model="serche"
          placeholder="חפש מוצר"
          @input="inputica"
          @keydown.space.native="onSpacePress"
        ></el-input>
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
      window,
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
#item-default {
  font-size: 40px;
  text-align: center;
}
.menu {
  margin: 0px;
  position: relative;
  bottom: 50px;
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
  right: 73%;
  top: 15%;
}
a {
  text-decoration: none;
}
.OnlyPhone {
  display: none;
}

/* @media screen and (max-width: 1000px) {
  .menu {
    width: 109%;
    position: relative;
    left: 20px;
  }
  #item-default {
    font-size: 42px;
    width: 20%;
  }
  #IconCss {
    display: none;
  }
  .cates {
    position: relative;
    right: -40px;
  }
  .inputac {
    position: relative;
    left: 48px;
  }
} */
@media screen and (max-width: 400px) {
  #item-default {
    font-size: 22px;
    width: 50%;
  }
  .cates {
    display: none;
  }
  .inputac {
    display: none;
  }
  #IconCss {
    display: none;
  }
  .letashlum {
    display: none;
  }
  .el-icon-s-home {
    position: relative;
    left: 90px;
  }
  .nanForPhone {
    display: none;
  }
  .OnlyPhone {
    display: inline;
  }
  .inputoca {
    width: 410%;
  }
}
@media screen and (max-width: 530px) and (min-width: 400px) {
  #item-default {
    font-size: 22px;
    width: 50%;
  }
  .cates {
    display: none;
  }
  .inputac {
    display: none;
  }
  #IconCss {
    display: none;
  }
  .letashlum {
    display: none;
  }
  .el-icon-s-home {
    position: relative;
    left: 90px;
  }
  .nanForPhone {
    display: none;
  }
  .OnlyPhone {
    display: inline;
  }
  .inputoca {
    width: 410%;
  }
}
</style>
