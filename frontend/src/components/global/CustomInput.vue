<template>
  <div class="custom-input-overlay">
    <input
      @keyup.enter="submit"
      @input="$emit('input', value)"
      class="custom-input"
      v-model="value"
      :placeholder="placeholder"
      :type="type"
      autocomplete="on"
      :name="name"
    >
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  data () {
    return {
      value: this.defaultValue
    }
  },
  props: ['placeholder', 'type', 'defaultValue', 'name'],
  methods: {
    submit () {
      console.log('CustomInput submit event')
      this.$emit('submit')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/global-vars.scss";

.custom-input {
  font-family: "Roboto";
  font-weight: 300;
  color: $color-input-font;
  background-color: $color-input-background;
  border-width: 0;
  box-sizing: border-box;
}

.custom-input:-webkit-autofill,
.custom-input:-webkit-autofill:hover,
.custom-input:-webkit-autofill:focus,
.custom-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px $color-input-background inset;
  -webkit-text-fill-color: $color-input-font;
}

@media (max-width: 768px) {
  .custom-input {
    text-align: center;
    font-size: 16px;
    padding: 13px;
    width: 100%;
  }
}
</style>
