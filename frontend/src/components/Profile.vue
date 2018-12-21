<template>
  <div class="profile">
    <div class="close">
      <router-link class="close__link" to="#">
        <img class="close__img" src="@/assets/icons/delete.png">
      </router-link>
    </div>
    <div class="vk">
      <router-link class="vk__link" to="#">
        <img class="vk__img" src="@/assets/icons/vk.png">
      </router-link>
    </div>
    <div class="logout">
      <a @click.prevent="logout" class="logout__link" href="/logout">
        <img class="logout__img" src="@/assets/icons/logout.png">
      </a>
    </div>

    <router-link to="#" class="dossier">Досье</router-link>
    <router-link to="#" class="photo-status">Статус обработки фото</router-link>
    <router-link to="#" class="games">Список игр</router-link>
  </div>
</template>

<script>
import Api from '@/services/Api'

export default {
  components: {
  },
  name: 'Profile',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push({
        path: 'login'
      })
    }
  },
  async created () {
    const res = await Api.getUserByToken()
    this.$store.commit('updateUser', res.data)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/global-vars.scss";

$icons-size: 37px;

.profile {
  display: grid;
  height: 100vh;
}

.close {
  grid-area: close;
}

.vk {
  grid-area: vk;
}

.logout {
  grid-area: logout;
}

.dossier {
  grid-area: dossier;
  color: $color-main-font;
  font-size: 30px;
  font-weight: 100;
  text-decoration: none;
}

.photo-status {
  grid-area: photo-status;
  color: $color-main-font;
  font-size: 30px;
  font-weight: 100;
  text-decoration: none;
}

.games {
  grid-area: games;
  color: $color-main-font;
  font-size: 30px;
  font-weight: 100;
  text-decoration: none;
}

@media (max-width: 768px) {
  .profile {
    box-sizing: border-box;
    padding: $padding-mobile-overlay;
    grid-template-areas:
      "close"
      "vk"
      "logout"
      "gap"
      "dossier"
      "photo-status"
      "games";
    grid-template-rows: repeat(3, 1fr) 4fr repeat(3, 1fr);
    grid-template-columns: 1fr;
  }

  .close {
    text-align: end;
  }

  .vk {
    text-align: end;
  }

  .logout {
    text-align: end;
  }

  .close__img {
    width: $icons-size;
    height: $icons-size;
  }

  .vk__img {
    width: $icons-size;
    height: $icons-size;
  }

  .logout__img {
    width: $icons-size;
    height: $icons-size;
  }
}
</style>
