<template>
  <!--
    Everything is wrapped in a label, which acts as a clickable wrapper around a form element.
    In this case, the file input.
  -->
  <label for="photo" class="photo-upload">
    <!-- We can't use a normal button element here, as it would become the target of the label. -->
    <div class="photo-upload__view">
      <!-- Display the filename if a file has been selected. -->
      <img class="photo-upload__img" src="@/assets/icons/upload.png">
      <div v-if="value">{{value.name}}</div>
      <div v-else>Файл не выбран</div>
    </div>
    <input
      id="photo"
      name="photo"
      type="file"
      accept="image/gif, image/jpeg, image/png"
      class="photo-upload__input"
      @change="handleFileChange"
    >
    <!-- Now, the file input that we hide. -->
  </label>
</template>

<script>
export default {
    props: {
    // Using value here allows us to be v-model compatible.
        value: File
    },

    methods: {
        handleFileChange (e) {
            // Whenever the file changes, emit the 'input' event with the file data.
            this.$emit('input', e.target.files[0])
        }
    }

}
</script>

<style lang="scss" scoped>
@import "@/assets/style/global-vars.scss";

.photo-upload {
  cursor: pointer;
}

.photo-upload__img {
  max-width: 85%;
  max-height: 85%;
  margin-right: 10px;
}

.photo-upload__view {
  font-family: "Roboto";
  font-weight: 300;
  color: $color-input-font;
  background-color: $color-input-background;
  border-width: 0;
  box-sizing: border-box;
  height: 44.45px;
}

/* Don't forget to hide the original file input! */
.photo-upload__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.photo-upload:focus-within {
  outline: auto;
}

@media (max-width: 768px) {
  .photo-upload__view {
    text-align: center;
    font-size: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
