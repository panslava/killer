<template>
  <div class="profile">
    <div class="close">
      <img class="close__img" src="@/assets/icons/delete.png">
    </div>
    <div class="vk">
      <img class="vk__img" src="@/assets/icons/vk.png">
    </div>
    <div class="logout">
      <img class="logout__img" src="@/assets/icons/logout.png">
    </div>

    <div class="dossier">Досье</div>
    <div class="photo-status">Статус модерации фото</div>
    <div class="games">Список игр</div>
  </div>
</template>

<script>

export default {
  components: {
  },
  name: 'Profile',
  data () {
    return {
    }
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
}

.photo-status {
  grid-area: photo-status;
  color: $color-main-font;
  font-size: 30px;
  font-weight: 100;
}

.games {
  grid-area: games;
  color: $color-main-font;
  font-size: 30px;
  font-weight: 100;
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
