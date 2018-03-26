<template>
    <div class='root'>
        <div class='label'>
            <slot name='label'>
            </slot>
        </div>
        <div class='block'>
        <input type='text' v-model='text'>
        <div class='shadow'></div>
    </div>
</div>
</template>

<script>
export default {
    name: 'inputText',
    data () {
        return {
            text:this.value
        }
    },
    props: ['value'],
    watch: {
        text(val) {
            this.$emit('input', val)
        }
    }
}
</script>
<style lang="scss" scoped  >
    @import '../utils/var';

    .label {
        color:$font-color--accent;
    }
    input {
        position: absolute;
        top:4px;
        left:4px;
        text-align: center;
        width:315px;
        height:50px;
        color:$font-color--light;
        background-color:$color--bg-accent;
        opacity:0.7;
        border:0px;
        z-index:3
    }
    .shadow {

        z-index:2;
        width:315px;
        height:50px;
        background-color:$color--bg-accent;
        opacity:0.7;
        border:0px;

    }
    .root {
        text-align: center;
    }
    .block {
        position: relative;
        margin:auto;
        width:320px;
        height:55px;

    }





</style>
