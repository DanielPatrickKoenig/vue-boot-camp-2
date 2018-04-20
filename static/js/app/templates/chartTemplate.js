var chartTemplate = (function(){
    function ChartTemplate(){
        this.processChart = function(v,d){
            $("."+v.chartClassName).each(function(){
                var chartData = v.chartManifest[Number($(this).attr("chart-index"))].parser(d);
                var altPlugin = v.chartManifest[Number($(this).attr("chart-index"))].plugin;
                var shape = v.chartManifest[Number($(this).attr("chart-index"))].shape;
                //var style = shape == undefined ? {title:$(this).attr("title")} : {title:$(this).attr("title"),shape:shape};
                var frames = v.chartManifest[Number($(this).attr("chart-index"))].frames;
                var symbols = v.chartManifest[Number($(this).attr("chart-index"))].symbols;
                var style = {title:$(this).attr("title"),shape:shape,frames:frames,symbols:symbols}
                UTILITY.renderChart(chartData,style,$(this).attr("id"),$(this).attr("chart-types").split(","),altPlugin);
            });
        }
    }
    

    Vue.component('chart-template',{
        data:function(){
            return{}
        },
        //props:['chartManifest','masterKey','genreKey','totalKey','regionKey'],
        props:['v','i','s'],
        template:`<div v-bind:style="s" v-bind:class='assignClasses(v)' v-bind:chart-types='v.types' v-bind:id="generateID()" v-bind:chart-index="i" v-bind:title="v.title"></div>`,
        methods:{
            generateID:function(){
                return "chart"+Math.random().toString().split(".").join("")+"-"+Math.random().toString().split(".").join("")+"-"+Math.random().toString().split(".").join("");
            },
            assignClasses:function(item){
                var cList = ['simulator-chart'];
                if(item.classes!=undefined){
                    for(var i = 0;i<item.classes.length;i++){
                        cList.push(item.classes[i]);
                    }
                }
                return cList.join(" ");
            }
        },
        delimiters: ['<%', '%>']
    })

    return new ChartTemplate();
})();

export default{
    chartTemplate
}