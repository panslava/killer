<template>
  <div class="photoStatus">
    <div class="status-text">
      <h1 class="status-text__main">{{statusText}}</h1>
      <div v-if="modMessage" class="status-text__comments">{{modMessage}}</div>
    </div>
    <div class="exit">
      <a class="exit__link" href="javascript:history.back()">
        <img class="exit__img" src="@/assets/icons/delete.png">
      </a>
    </div>
    <div class="photo">
      <div class="photo__wrapper">
        <img class="photo__img" :src="$hostname + '/' + photo">
      </div>
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
    if (this.photoState === 1) {
      this.statusText = 'Фото в модерации'
      this.statusIcon = 'question.png'
    }
    if (this.photoState === 2) {
      this.statusText = 'Фото не принято'
      this.statusIcon = 'cancel.png'
    }
    if (this.photoState === 3) {
      this.statusText = 'Фото принято'
      this.statusIcon = 'ok.png'
    }
  },
  computed: {
    photo () {
      return this.$store.state.user.photo
    },
    modMessage () {
      return this.$store.state.user.modMessage
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

.status-text__comments {
  color: $color-main-font;
  font-weight: 100;
  font-size: 19px;
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

  .photo__img {
    max-height: 100%;
    max-width: 100%;
    // -moz-box-shadow: 0 0 8px 0 black;
    // -webkit-box-shadow: 0 0 8px 0 black;
    // box-shadow: 0 0 8px 0 black;
    position: relative;
    display: inline-block;
    z-index: -1;
  }

  .photo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;
  }

  .status-icon__img {
    width: 60px;
    height: 60px;
  }

  .photo__wrapper {
    line-height: 0; /* ensure no space between bottom */

    display: inline-block; /* don't go wider than image */
    transition: linear 1s all;
    box-shadow: inset 0 30px 100px -5px black, inset 0 -30px 100px -5px black;
  }

  .photo__wrapper:hover {
    box-shadow: none;
  }

  .exit {
    display: flex;
  }

  .exit__img {
    width: $icons-size;
    height: $icons-size;
  }

  .exit__link {
    margin-top: 18px;
  }

  .status-text__main {
    margin-bottom: 10px;
  }

  .status-text {
    padding-left: 1em;
  }
}
</style>
