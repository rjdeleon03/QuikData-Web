<template>
  <div class="navbar" v-if="!mustHide">
    <nav class="teal darken-1">
      <div class="container">
        <router-link :to="{ name: 'Home' }" class="brand-logo left"
          >Quik Data</router-link
        >
        <ul class="right" id="menu">
          <li>
            <a
              id="burger"
              class="sidenav-trigger material-icons"
              data-target="slide-out"
              >menu</a
            >
          </li>
          <li v-if="user" class="expanded-item">
            <router-link
              :to="{ name: 'Forms', params: { page_index: 1 } }"
              v-if="needsRefresh"
            >
              <div class="text-with-icon">
                <div>DNCA Forms</div>
                <div class="material-icons">error</div>
              </div>
            </router-link>
            <router-link
              :to="{ name: 'Forms', params: { page_index: 1 } }"
              v-else
            >
              <div class="text-with-icon">
                <div>DNCA Forms</div>
              </div>
            </router-link>
          </li>
          <li v-if="!user" class="expanded-item">
            <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
          </li>
          <li v-if="!user" class="expanded-item">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="user" class="expanded-item">
            <a
              class="dropdown-trigger material-icons"
              data-target="user-dropdown"
              >account_circle</a
            >
          </li>
        </ul>
      </div>
      <div id="user-dropdown" class="dropdown-content">
        <ul v-if="user">
          <li>
            <a>
              {{ user.email }}
              <span v-if="user.isAdmin">(Admin)</span>
            </a>
          </li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <div id="slide-out" class="sidenav">
      <img src="@/assets/temp_bg_side.jpg" alt />
      <div id="email-wrapper" v-if="user">
        <p class="center" id="email-label">You are logged in as</p>
        <p class="center" id="email">
          {{ user.email }}
          <span v-if="user.isAdmin">(Admin)</span>
        </p>
      </div>
      <div id="email-wrapper" v-else>
        <p class="center" id="email-label">You are not logged in.</p>
      </div>
      <hr />
      <ul>
        <li>
          <a @click="goToHome">Home</a>
        </li>
        <li v-if="user">
          <a @click="goToDncaForms">DNCA Forms</a>
        </li>
        <li v-if="!user">
          <a @click="login">Login</a>
        </li>
        <li v-if="!user">
          <a @click="signup">Sign Up</a>
        </li>
        <li v-if="user">
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import firebaseData from "@/firebaseData";
import M from "materialize-css";
export default {
  name: "Navbar",
  data() {
    return {
      user: false,
      formsSnapshot: null,
      needsRefresh: false,
      mustHide: false,
      sideNav: null
    };
  },
  created() {
    firebase.auth.onAuthStateChanged(user => {
      this.user = user;
      var navbar = document.querySelector(".navbar");
      if (!navbar) return;
      var sidenav = navbar.querySelector(".sidenav");
      if (sidenav && !M.Sidenav.getInstance(sidenav)) {
        this.sideNav = M.Sidenav.init(sidenav, {});
      }
      firebaseData.admin.forEach(email => {
        if (user && email === user.email) {
          this.user.isAdmin = true;
        }
      });
    });
  },
  mounted() {
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
    signup() {
      if (this.sideNav) this.sideNav.close();
      this.$router.push({ name: "SignUp" });
    },
    login() {
      if (this.sideNav) this.sideNav.close();
      this.$router.push({ name: "Login" });
    },
    logout() {
      if (this.sideNav) this.sideNav.close();
      if (firebaseData.firebaseSub) firebaseData.firebaseSub();
      firebase.auth.signOut().then(() => {
        this.$router.push({ name: "Login" });
      });
    },
    goToDncaForms() {
      if (this.sideNav) this.sideNav.close();
      this.$router.push({ name: "Forms" });
    },
    goToHome() {
      if (this.sideNav) this.sideNav.close();
      this.$router.push({ name: "Home" });
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
  display: none;
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
.navbar #slide-out #email-wrapper {
  background: #009688;
  margin-top: -6px;
  margin-bottom: -7px;
  padding-bottom: 10px;
  color: white;
}
.navbar #slide-out p {
  margin-top: 0;
  margin-bottom: 0;
}
.navbar #slide-out p#email {
  font-weight: 600;
}
.navbar #slide-out img {
  width: 100%;
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
    display: none;
  }
  .navbar .container ul li.expanded-item {
    visibility: visible;
    width: auto;
    display: block;
  }
  .navbar .text-with-icon .material-icons {
    margin-top: -2px;
  }
}
@media print {
  .navbar {
    display: none;
  }
}
</style>
