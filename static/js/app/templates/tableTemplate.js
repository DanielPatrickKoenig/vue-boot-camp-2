var tableTemplate = (function(){
    Vue.component('table-template',{
        data:function(){
            return{
                verticalIndex:-1,
                horizontalIndex:-1
            }
        },
        //props:['chartManifest','masterKey','genreKey','totalKey','regionKey'],
        props:['avg','totalKey','refresh','masterKey','regionKey','update_prop'],
        template:`<table class="earnings-table" cellpadding="0" cellspacing="0" border="0">
            <tr v-for="(v,k,i) in avg"  v-if="i==0">
                <td></td><td v-for="(a,k,i) in v" v-if="k!=totalKey" v-on:mouseenter="verticalIndex = i;update_prop('regionKey',k);refresh();"  v-on:mouseleave="verticalIndex = -1;update_prop('regionKey','TOTAL');refresh();"><%k%></td>
            </tr>
            <tr v-for="(v,k,_i) in avg">
                <td v-on:mouseenter="horizontalIndex = _i;update_prop('genreKey',k);refresh();" v-on:mouseleave="horizontalIndex = -1;update_prop('genreKey','master');refresh();" v-bind:style="(_i==horizontalIndex || (horizontalIndex == -1) ? 'opacity:1;' : 'opacity:.2;')"><%k%></td>
                <td v-for="(a,k,i) in v" v-if="k!=totalKey" v-bind:value="a" v-bind:style="(i==verticalIndex || _i==horizontalIndex || (verticalIndex == -1 && horizontalIndex == -1) ? 'opacity:1;' : 'opacity:.2;')">
                    <span>
                        <!-- <%Math.round((a/v[totalKey])*100).toString()+'%'%> -->
                        <%a%>
                            
                    </span>
                </td>
            </tr>
        </table>`,
        delimiters: ['<%', '%>']
    })
})();

export default{
    tableTemplate
}