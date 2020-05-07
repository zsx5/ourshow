<template>
<div>
    <p class="tool-desc">输入json数据, 按enter!可以将用驼峰命名的键值转换为下划线命名。 点击蓝色小图标可以复制输出结果</p>
    <div class="tools-view">
        <div class="input-container">
            <textarea type="text" placeholder="输入json数据" v-model="inputMessage" :style="inputStyle" v-on:keyup.enter="transfer"></textarea>
        </div>
        <div class="input-container">
            <div class="input-inner-container">
                <img src="~assets/img/copy.svg" alt="复制" class='copy' @click="copyOutput">
                <textarea id="result" type="text" :style="inputStyle" v-model="outputMessage"  placeholder="输出结果"></textarea>
            </div>
        </div>
    </div>
</div>    
</template>
<script>

export default {
    name: 'Tools',
    data(){
        return {
            width: '300px',
            inputMessage: '',
            outputMessage: ''
        }
    },
    mounted(){
        this.width = window.innerWidth;
    },
    computed: {
        inputStyle(){
            return {
                'width': this.width / 2 + 'px',
                'height': this.width
            }
        }
    },
    methods: {
        transfer(){
            let jsonObj = JSON.parse((this.inputMessage));
            
            let toChange = function(obj){
                let newObj = {};
                for(let key in obj){
                    if(obj[key] instanceof Array){
                        console.log('1',key, obj[key]);
                        let newArray = [];
                        for(var i = 0; i < obj[key].length; i++){
                            newArray.push(toChange(obj[key][i]));
                        }
                        console.log('newArray', newArray);
                        newObj[key.replace(/([A-Z])/, '_$1').toLowerCase()] = newArray;

                    }else if(Object.prototype.toString.call(obj[key]) === '[Object Object]'){
                        console.log('2',key, obj[key]);
                        newObj[key.replace(/([A-Z])/, '_$1').toLowerCase()] = toChange(obj[key]);

                    }else{
                        console.log('3',key, obj[key]);
                        newObj[key.replace(/([A-Z])/, '_$1').toLowerCase()] = obj[key];
                    }
                }
                return newObj;
            }

            this.outputMessage = JSON.stringify(toChange(jsonObj));
        },
        copyOutput(){
            setTimeout(()=>{
                var result = document.getElementById('result');
                result.focus();
                result.select();
                document.execCommand('copy'); //复制到粘贴板上
            }, 100)
        }
    }
}
</script>
<style scoped>
.tool-desc {
    text-align: center;
}
.tools-view {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
.input-container {
    margin-top: 10px;
}
.input-inner-container {
    position: relative;
}
.copy {
    position: absolute;
    top: 0;
    right: -26px;
}
</style>