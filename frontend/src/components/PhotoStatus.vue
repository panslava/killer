<template>
  <div class="photoStatus">
    <div class="status-text">
      <h1 class="status-text__main">{{statusText}}</h1>
      <div
        v-if="$store.state.user.modMesssage"
        class="status-text__comments"
      >{{$store.state.user.modMesssage}}</div>
    </div>
    <div class="exit">
      <a class="exit__link" href="javascript:history.back()">
        <img class="exit__img" src="@/assets/icons/delete.png">
      </a>
    </div>
    <div class="photo">
      <img class="photo__img" :src="$hostname + '/' + $store.state.user.photo">
    </div>
    <div class="status-icon">
      <img class="status-icon__img" v-if="photoState == 1" src="@/assets/icons/question.png">
      <img class="status-icon__img" v-if="photoState == 2" src="@/assets/icons/cancel.png">
      <img class="status-icon__img" v-if="photoState == 3" src="@/assets/icons/ok.png">
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  name: 'PhotoStatus',
  data () {
    return {
      statusText: '',
      photoState: 1,
      statusIcon: 'question.png'
    }
  },
  methods: {
  },
  async created () {
    await this.$store.dispatch('getAndUpdateUser')

    this.photoState = this.$store.state.user.photoState
    console.log(this.photoState)
    if (this.photoState === 1)    {
      this.statusText = 'Фото в модерации'
      this.statusIcon = 'question.png'
    }
    if (this.photoState === 2)    {
      this.statusText = 'Фото не принято'
      this.statusIcon = 'cancel.png'
    }
    if (this.photoState === 3)    {
      this.statusText = 'Фото принято'
      this.statusIcon = 'ok.png'
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/global-vars.scss";

$icons-size: 37px;

.photoStatus {
  display: grid;
  height: 100vh;
  margin: 0;
}

.status-text__main {
  color: $color-main-font;
  font-weight: 100;
}

.status-text {
  grid-area: status-text;
}

.exit {
  grid-area: exit;
}

.photo {
  grid-area: photo;
}

.status-icon {
  grid-area: icon;
  text-align: center;
}

@media (max-width: 768px) {
  .photoStatus {
    box-sizing: border-box;
    padding: $padding-mobile-overlay;
    grid-template-areas:
      "status-text exit"
      "photo photo"
      "icon icon";
    grid-template-rows: max-content 1fr max-content;
    grid-template-columns: 1fr max-content;
  }

  .exit__img {
    width: $icons-size;
    height: $icons-size;
  }

  .photo__img {
    max-height: 100%;
    max-width: 100%;
    background-color: #ffffff;
    -moz-box-shadow: 0 0 8px 0 black;
    -webkit-box-shadow: 0 0 8px 0 black;
    box-shadow: 0 0 8px 0 black;
    // box-shadow: inset 0px 11px 8px -10px #ccc, inset 0px -11px 8px -10px #ccc;
    z-index: 1;
    position: relative;
  }

  .photo {
    display: flex;
    align-items: center;
  }

  .status-icon__img {
    width: 60px;
    height: 60px;
  }
}
</style>
