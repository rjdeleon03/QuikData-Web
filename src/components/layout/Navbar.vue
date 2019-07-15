<template>
  <div class="navbar" v-if="!mustHide">
    <nav class="teal darken-1">
      <div class="container">
        <router-link :to="{ name: 'Home'}" class="brand-logo left">Quik Data</router-link>
        <ul class="right" id="menu">
          <li>
            <a id="burger" class="sidenav-trigger material-icons" data-target="slide-out">menu</a>
          </li>
          <li v-if="user" class="expanded-item">
            <router-link :to="{ name: 'Forms', params : { page_index: 1 }}" v-if="needsRefresh">
              <div class="text-with-icon">
                <div>DNCA Forms</div>
                <div class="material-icons">error</div>
              </div>
            </router-link>
            <router-link :to="{ name: 'Forms', params : { page_index: 1 }}" v-else>
              <div class="text-with-icon">
                <div>DNCA Forms</div>
              </div>
            </router-link>
          </li>
          <li v-if="!user" class="expanded-item">
            <router-link :to="{ name: 'SignUp'}">Sign Up</router-link>
          </li>
          <li v-if="!user" class="expanded-item">
            <router-link :to="{ name: 'Login'}">Login</router-link>
          </li>
          <li v-if="user" class="expanded-item">
            <a class="dropdown-trigger material-icons" data-target="user-dropdown">account_circle</a>
          </li>
        </ul>
      </div>
      <div id="user-dropdown" class="dropdown-content">
        <ul v-if="user">
          <li>
            <a>{{ user.email }}</a>
          </li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <ul id="slide-out" class="sidenav">
      <li v-if="user">
        <a>{{ user.email }}</a>
      </li>
      <li>
        <hr />
      </li>
      <li v-if="user">
        <router-link :to="{ name: 'Forms'}">DNCA Forms</router-link>
      </li>
      <li v-if="!user">
        <router-link :to="{ name: 'SignUp'}">Sign Up</router-link>
      </li>
      <li v-if="!user">
        <router-link :to="{ name: 'Login'}">Login</router-link>
      </li>
      <li v-if="user">
        <a @click="logout">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import ScrollTo from "vue-scrollto";
export default {
  name: "Navbar",
  data() {
    return {
      user: false,
      formsSnapshot: null,
      needsRefresh: false,
      mustHide: false
    };
  },
  created() {
    firebase.auth.onAuthStateChanged(user => {
      this.user = user;
      var navbar = document.querySelector(".navbar");
      if (!navbar) return;
      var sidenav = navbar.querySelector(".sidenav");
      if (sidenav && !M.Sidenav.getInstance(sidenav)) {
        M.Sidenav.init(sidenav, {});
      }
    });
    // firebase.db
    //   .collection("form")
    //   .orderBy("form.dateModified", "desc")
    //   .onSnapshot(snapshot => {
    //     if (this.formsSnapshot) {
    //       try {
    //         this.needsRefresh = true;
    //       } catch (ex) {}
    //     }
    //     this.formsSnapshot = snapshot;
    //   });
  },
  mounted() {
    if (this.$router.currentRoute.name == "Print") {
      this.mustHide = true;
    }
    var navbar = document.querySelector(".navbar");
    var doc = navbar.querySelector("nav .container ul");
    doc.addEventListener(
      "DOMNodeInserted",
      function() {
        var dropdown = document.querySelector(".dropdown-trigger");
        if (dropdown && !M.Dropdown.getInstance(dropdown)) {
          M.Dropdown.init(dropdown, { alignment: "right" });
        }
      },
      false
    );
    // if (!navbar) return;
  },
  methods: {
    logout() {
      firebase.auth.signOut().then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "Print") {
        this.mustHide = true;
        return;
      }
      this.mustHide = false;
    }
  }
};
</script>

<style>
.navbar#slide-out {
  margin: 0 30px;
}
.navbar .container ul#menu {
  display: flex;
}
.navbar .container ul li.expanded-item {
  visibility: hidden;
  width: 0;
}
.navbar .container ul li a.material-icons#burger {
  margin-left: 0;
  margin-right: 0;
  visibility: visible;
  width: auto;
}
.navbar .container ul li a.material-icons {
  display: inline-block;
  vertical-align: middle;
  height: 56px;
  line-height: 56px;
  margin-top: -1px;
}
.navbar .container .dropdown-content {
  top: 56px !important;
  width: auto !important;
  border-radius: 0 0 8px 8px;
}
.navbar .text-with-icon div {
  display: inline-block;
}
.navbar .text-with-icon .material-icons {
  vertical-align: middle;
  margin-top: -1px;
  margin-left: 3px;
  color: #ffa000;
}
@media only screen and (min-width: 601px) {
  .navbar .container ul li a.material-icons {
    height: 64px;
    line-height: 64px;
    margin-top: -2px;
  }
  .navbar .container .dropdown-content {
    top: 64px !important;
  }
  .navbar .container ul li a.material-icons#burger {
    visibility: hidden;
    width: 0;
  }
  .navbar .container ul li.expanded-item {
    visibility: visible;
    width: auto;
  }
  .navbar .text-with-icon .material-icons {
    margin-top: -2px;
  }
}
</style>


