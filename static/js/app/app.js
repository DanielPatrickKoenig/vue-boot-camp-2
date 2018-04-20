
import TableTemplate from './templates/tableTemplate.js'
import ChartTemplate from './templates/chartTemplate.js'

const app = new Vue({
  el: '#main',
  data:{
    averages:{},
    totalKey:'TOTAL',
    masterKey:'master',
    
    loadedData:{},
    genreKey:"master",
    regionKey:"TOTAL",
    chartManifest:[
        {
            types:[UTILITY.PIE_BASIC],
            parser:function(d){
                var dataOutput = {};
                for(var _d in d.averages[app.genreKey]){
                    if(_d != app.totalKey){
                        dataOutput[_d] = d.averages[app.genreKey][_d];
                    }
                }
                return dataOutput;
            },
            title:"",
            classes:[]

        },
        {
            types:[UTILITY.LINE],
            parser:function(d){
                var dataOutput = [];
                
                var yearList = [];
                for(var _d in d.years){
                    yearList.push(_d);
                }
                yearList = yearList.sort();
                var regions = [];
                for(var r in d.years[yearList[0]]){
                    if(r != app.totalKey){
                        regions.push(r);
                    }
                    
                }
                for(var j = 0;j<regions.length;j++){
                    var dta = {data:{},name:regions[j]};
                    for(var i = 0;i<yearList.length;i++){
                    //for(var _d in d.years){
                        //var dta = {data:{},name:"TOTAL"};

                        dta.data[yearList[i]] = d.years[yearList[i]][regions[j]];
                       

                        //dataOutput[_d] = d.years[_d]["TOTAL"];
                    }
                    dataOutput.push(dta);
                }
                
                
                
                return dataOutput;
            },
            title:"Sales by Year",
            classes:["half-width"]

        },
        {
            types:[UTILITY.BAR_BASIC],
            parser:function(d){
                var dataOutput = {};
                for(var _d in d.averages){
                    if(_d != app.masterKey){
                        dataOutput[_d] = d.averages[_d][app.regionKey];
                    }
                }
                return dataOutput;
            },
            title:"",
            classes:["time-lapse-line-chart"]

        }
    ],
    refresh:function(updateOutput){
        var _output = updateOutput == undefined ? app.loadedData : updateOutput;
        ChartTemplate.chartTemplate.processChart(app,_output);
    },
    update_prop:function(p,val){
        app[p] = val;
    },
    chartClassName:'simulator-chart'
  },
  delimiters: ['<%', '%>']
});

// use axios for xhr
axios.get(GETDATA)
  .then(response => {
    app.loadedData = response.data;
    app.averages = response.data.averages;

    UTILITY.setVueByID("main",app);
    //ChartTemplate.processChart(app,response.data);
    app.refresh();
  })