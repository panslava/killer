<template>
  <div class="custom-input-overlay">
    <input
      @keyup.enter="submit"
      @input="$emit('input', value)"
      class="custom-input"
      v-model="value"
      :placeholder="placeholder"
      :type="type"
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
    props: ['placeholder', 'type', 'defaultValue'],
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

@media (max-width: 768px) {
  .custom-input {
    text-align: center;
    font-size: 16px;
    padding: 13px;
    width: 100%;
  }
}
</style>
