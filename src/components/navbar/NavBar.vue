<template>
    <div id="nav-bar" :style="navStyle">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="middle"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "NavBar",
    props: {
        bgColor: {
            type: String,
            default: '#393D49'
        },
        textColor: {
            type: String,
            default: '#000'
        },
        height: {
            type: String,
            default: '59px'
        }
    },
    computed: {
        navStyle(){
            return {
                'background-color': this.bgColor, 
                'color': this.textColor,
                'height': this.height,
                'line-height': this.height
                }
        }
    }
}
</script>
<style scoped>
#nav-bar {
    display: flex;
    justify-content: space-evenly;
}

.left, .middle, .right {
    width: 30%;
}
</style>