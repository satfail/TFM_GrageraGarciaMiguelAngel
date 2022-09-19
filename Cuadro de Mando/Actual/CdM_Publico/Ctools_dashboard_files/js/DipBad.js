var lims = {};


/***************************************************************************
 *                      MISC functions && settings                         *
 ***************************************************************************/ 

//Used to format the KPI numbers
lims.addCommas = function(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    x2 = x2.slice(0,3);
    return x1 + x2;
};


//Show or hide elements (charts), depending which measure we choose
lims.changePerspective = function(clickedButton){
    var activeButton = $('.kpiColumn button.active'),
        clickedName = clickedButton.closest('.radioButtonObj').attr('id').split('ButtonObj')[0],
        clickedContainer = $('#' + clickedName + "CenterRow"),
        activeContainer = $('.centerRow.active');
    
    activeContainer.removeClass('active');
    activeButton.removeClass('active');
    clickedButton.addClass('active');
    clickedContainer.addClass('active');
    activeContainer.fadeOut(300, function() {
        clickedContainer.fadeIn(300);
    });
};

//Show or hide elements (dashboard), depending which type char (unit or all)
lims.changePerspective2 = function(clickedButton){
    var activeButton = $('.selectColumn button.active'),  
        clickedName = clickedButton.closest('.radioButtonObj2').attr('id').split('ButtonObj')[0],
        clickedContainer = $('#' + clickedName + "CenterRow"),
        activeContainer = $('.centerRow2.active');
    
    activeContainer.removeClass('active');
    activeButton.removeClass('active');
    activeContainer.addClass('hidden');
    clickedContainer.removeClass('hidden');
    clickedButton.addClass('active');
    clickedContainer.addClass('active');
    activeContainer.fadeOut(300, function() {
        clickedContainer.fadeIn(300);
    });
};

//Show or hide elements (dashboard), depending which type char (unit or all)
lims.changePerspective3 = function(clickedButton){
    var activeButton = $('.refColumn button.active'),  
        clickedName = clickedButton.closest('.radioButtonObj3').attr('id').split('ButtonObj')[0],
        clickedContainer = $('#' + clickedName + "CenterRow"),
        activeContainer = $('.centerRow3.active');
    
    activeContainer.removeClass('active');
    activeButton.removeClass('active');
    clickedButton.addClass('active');
    clickedContainer.addClass('active');
    activeContainer.fadeOut(300, function() {
        clickedContainer.fadeIn(300);
    });
};

lims.changePerspective4 = function(clickedButton){
    var activeButton = $('.packageColumn button.active');  
    clickedName = clickedButton.closest('.colorButtonObj').attr('id').split('ButtonObj')[0];
    activeButton.removeClass('active');
    clickedButton.addClass('active');
//    activeContainer.fadeOut(300, function() {
//        clickedContainer.fadeIn(300);
//    });
};


lims.startPerspective = function() {
    
    var activeContainer1 = $('.centerRow.active');    
    activeContainer1.show();
    var activeContainer2 = $('.centerRow2.active');    
    activeContainer2.show();
    var activeContainer3 = $('.centerRow3.active');    
    activeContainer3.show();
};

lims.delay = function() {
    var activeButton = $('.selectColumn button.active'),  
        clickedName = "executive",
        clickedContainer = $('#' + clickedName + "CenterRow"),
        activeContainer = $('.centerRow2.active');
    
    activeContainer.removeClass('active');
    activeButton.removeClass('active');
    activeContainer.addClass('hidden');
    clickedContainer.removeClass('hidden');
    clickedButton.addClass('active');
    clickedContainer.addClass('active');
    activeContainer.fadeOut(300, function() {
        clickedContainer.fadeIn(300);
    clickedContainer.show();
    });
};

$(document).ready(function() {
    lims.startPerspective();
/*    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) 
    {
        if ((new Date().getTime() - start) > 7000){
            break;
        }
    }
    lims.delay();   */
});

/***************************************************************************
 *                                  Colors                                 *
 ***************************************************************************/ 

//Mapping between product lines and colors
/*lims.productLines_colorMap = {
    "E":     "#22B573",
    "B":     "#66C2A5",
    "S":     "#005CA7",
};*/

/***************************************************************************
 *                                  Charts                                 *
 ***************************************************************************/

/***************************************************************************
 *                                  Line Chart                                 *
 ***************************************************************************/

//Global lineChart properties 
//(this function is called on the preExecution of the barCharts)
lims.lineChartOptions2 = function() {
    var cd = this.chartDefinition;
    
    //main options
    cd.margins = 0;
    
    //visual options
    cd.plotFrameVisible = false;   //marco del grafico
    cd.legend = true;
    cd.baseAxisBandSizeRatio = 1;
    cd.colorMap = lims.productLines_colorMap;
    
    //axis
    cd.axisLabel_font = " 11px 'Open Sans'";
    
    //ortho axis
    cd.orthoAxisVisible = true; //eje y visible
    cd.orthoAxisGrid = true; //lineas eje y
    cd.orthoAxisGrid_strokeStyle = "#CCC";
    
    //base axis
    cd.baseAxisGrid = true;    
    cd.baseAxisRule_strokeStyle = "#CCC";
    cd.baseAxisLabel_textStyle = "#666";
    cd.baseAxisTooltipEnabled = false;
    
    cd.hoverable = true;
    cd.bar_strokeStyle = null;
};



//Styling the baseAxis labels
lims.yearLabelsOptions2 = function() {
    var cd = this.chartDefinition;
    
    cd.baseAxisTickFormatter = function(value, label) {
        var string = value.substring(24,35);
        var info = string.split('~');
        return info[2] + '-' + info[1] + '-' + info[0];
    };
    
    cd.baseAxisLabel_textAlign = "center";
    cd.baseAxisOverlappedLabelsMode = "leave";
};


//Styling the OrtoAxis labels
lims.orthoLabelsOptions = function() {
    var cd = this.chartDefinition;
    
    cd.orthoAxisTickFormatter = function(value, label) {
        return value.substring(0, 2);
    };
    
    //cd.orthoAxisLabel_textAlign = "center";
   // cd.orthoAxisOverlappedLabelsMode = "leave";
};


//Styling of the lineChart tooltips
lims.kpiTooltipOptions2 = function(prefix) {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = false;
    cd.tooltipOpacity = 0.9;
    
    cd.tooltipFormat = function f(){
        var category = this.getCategory();
        var series =  "pH[A]"; // this.getSeriesLabel();
        var value = this.getValue();
        var string = category.substring(24,35);
        var info = string.split('~');
        var date = info[2] + '-' + info[1] + '-' + info[0];
        //var date = category.substring(24,35);
        var quarter = category.substring(8,9);
        var lineClass = series.split(" ")[0];
        
        return "<div class='tooltipContainer'>" +
    //        "<div class='tooltipTitle'>" + series + "</div>" +  
            "<div class='tooltipSubtitle'>" + date + "</div>" +   
            "<div class='tooltipValue " + lineClass.toLowerCase() + "'>"+value+" "+prefix+"</div>" + 
        "</div>";
    }
};

lims.kpiTerritoryTooltipOptions2 = function() {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = true;
    cd.tooltipOpacity = 0.9;
    
    cd.tooltipFormat = function f(){
        var category = this.getCategory();
        var series = this.getSeries();
        var value = this.getValue();
        var lineClass = series.split(" ")[0];
        
        return "<div class='tooltipContainer'>" +
            "<div class='tooltipTitle'>" + series + "</div>" +  
            "<div class='tooltipSubtitle'>" + category + "</div>" +  
            "<div class='tooltipValue " + lineClass.toLowerCase() + "'>$"+value+"</div>" + 
        "</div>";
    }
};

/***************************************************************************
 *                              Pie Chart                              *
 ***************************************************************************/

lims.kpiTooltipOptionsPie = function(prefix) {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = false;
    cd.tooltipOpacity = 0.9;
    
    cd.tooltipFormat = function f(){
        var category = this.getCategory();
        var series =  this.getSeriesLabel();
        var value = this.getValue().toFixed(2);
        //var string = category.substring(24,35);
        //var info = string.split('~');
        //var date = info[2] + '-' + info[1] + '-' + info[0];
        //var date = category.substring(24,35);
        //var quarter = category.substring(8,9);
       // var lineClass = series.split(" ")[0];
        
        return "<div class='tooltipContainer'>" +
           // "<div class='tooltipTitle'>" + series + "</div>" +  
            "<div class='tooltipSubtitle'>" + category + "</div>" +   
            "<div class='tooltipValue'>"+ value +" " + prefix + "</div>" + 
        "</div>";
    }
};




/***************************************************************************
 *                                 SunBurst Chart                              *
 ***************************************************************************/

//Global sunburstChart properties 
//(this function is called on the preExecution of the sunburstChart)
lims.sunburstChartOptions = function(colorMap) {    
    var cd = this.chartDefinition;
    
    cd.colorMap = lims.productLines_colorMap;
    cd.valuesVisible = false;
    cd.width = 598;
    cd.slice_strokeStyle = pvc.finished('white');
    cd.slice_lineWidth = pvc.finished(1);
    cd.colorAxisSliceBrightnessFactor = 0;
    cd.hoverable = true;
    //Also Highlight the parent when we are hovering a child
    cd.slice_fillStyle = function(scene) {
        var c = this.delegate();
        return c && scene.isActiveDescendantOrSelf() 
            ? this.finished(c.brighter(.5))
            : c
            ;
    };
};


lims.sunburstTooltipOptions = function(prefix) {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = false;
    cd.tooltipOpacity = 0.9;
    
    cd.tooltipFormat = function f(){

  if(this.scene.group.depth == 1) {
            var category = this.scene.atoms.category.label;
            var value = this.scene.getSize().toFixed(0);
            var lineClass = category.split(" ")[0];

            return "<div class='tooltipContainer'>" +
                "<div class='tooltipTitle'>" + category + "</div>" +
                "<div class='tooltipValue " + lineClass.toLowerCase() + "'>"+value+"</div>" + 
            "</div>";   
            
        } else if(this.scene.group.depth == 2) {
            var category = this.scene.atoms.category.label;
            var category2 = this.scene.atoms.category2.label;
            var value =  this.scene.getSize().toFixed(0); /*lims.addCommas(this.scene.getSize().toFixed(0));*/
            var lineClass = category.split(" ")[0];
            
            return "<div class='tooltipContainer'>" +
                "<div class='tooltipTitle'>" + category2 + "</div>" +  
                "<div class='tooltipSubtitle'>" + category + "</div>" +  
                "<div class='tooltipValue " + lineClass.toLowerCase() + "'>"+value+"</div>" + 
            "</div>"       
        }
    }
    
};
 
/***************************************************************************
 *                                Bar Chart                              *
 ***************************************************************************/

//Global barChart properties 
//(this function is called on the preExecution of the barCharts)
lims.barChartOptions = function() {
    var cd = this.chartDefinition;
    
    //main options
    cd.margins = 0;
    
    //visual options
    cd.plotFrameVisible = false;
    cd.legend = false;
    cd.baseAxisBandSizeRatio = 0.5;
    cd.barStackedMargin = 0;
    cd.colorMap = lims.productLines_colorMap;
    
    //axis
    cd.axisLabel_font = "lighter 11px 'Open Sans'";
    
    //ortho axis
    cd.orthoAxisVisible = true; 
    cd.orthoAxisGrid = true;
    cd.orthoAxisGrid_strokeStyle = "#CCC";
    
    //base axis
    cd.baseAxisGrid = false;    
    cd.baseAxisRule_strokeStyle = "#CCC";
    cd.baseAxisLabel_textStyle = "#666";
    cd.baseAxisTooltipEnabled = false;
    
    cd.hoverable = true;
   // cd.bar_strokeStyle = null;
};

//Highlight all the bar (category) when hovering a serie 
//(this function is also called on the preExecution of the barCharts)
lims.barChartHoverableOptions = function() {
    var cd = this.chartDefinition; 
    
    cd.bar_fillStyle = function(scene) {
        var color = this.delegate();
        if(color) {
            var activeScene = scene.active();
            if(activeScene && scene.getCategory() === activeScene.getCategory()) {
                color = color.brighter(0.5);
            }
        }
        return this.finished(color);
    }; 
};

//Styling of the lineChart tooltips
lims.kpiTooltipOptions3 = function() {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = false;
    cd.tooltipOpacity = 0.9;
    cd.tooltipFormat = function f(){
        var value = this.getValue().toFixed(2);
        var category1 = "";
        var category = this.getCategory();
        var info = category.split('~');
        return "<div class='tooltipContainer'>" +
            "<div class='tooltipSubtitle'>" + info[1] + '-' + info[2] + '-' + info[4] + "</div>" +  
            "<div class='tooltipValue'>"+value+"</div>" + 
        "</div>";
    };
};

lims.yearLabelsOptions3 = function() {
    var cd = this.chartDefinition;
    
    cd.baseAxisTickFormatter = function(value, label) {
        //var string = value.substring(24,35);
        var info = value.split('~');
        if (info[4]===undefined){
            return info[1] + '-' + info[3];            
        }else if (info[2]===""){
            return info[1] + '-' + info[4];
        }
        else {
            return info[2] + "-" + info[4];
        }
    };
    cd.baseAxisLabel_textAlign = "center";
    cd.baseAxisOverlappedLabelsMode = "leave";
};
    


/***************************************************************************
 *                                  Other Chart por revisar                                 *
 ***************************************************************************/




//Used by Treemap chart, to simulate the "colorMap" property 
//(this property exists in the other charts, but currently it is not working for Treemap)
//JIRA: http://jira.pentaho.com/browse/CDF-452
function createMappedColorScheme(colorMap) {
    function mappedColorScheme() {  // colorScheme / color scale factory
        var scale = function(key) {
            return pv.color(colorMap[key] || 'transparent');
        };
        return pv.copyOwn(scale, pv.Scale.common);
    }
    
    return mappedColorScheme;
}

lims.treemapChartOptions = function() {    
    var cd = this.chartDefinition;
    var colorMap = lims.productLines_colorMap;
    
    cd.valuesVisible = false;
    cd.width = 598;
    cd.legend = false;
    cd.colorMode = "bySelf";
    cd.colors    = createMappedColorScheme(colorMap);
    cd.colorRole =  'category2';
    cd.ascendant_lineWidth = pvc.finished(3);
    cd.ascendant_strokeStyle = pvc.finished('#FFF');
    cd.leaf_lineWidth = pvc.finished(0.5);
    cd.leaf_strokeStyle = pvc.finished('#FFF');
    cd.hoverable = true;
    
    //Mdify the on-hover highlighting effect (change the bright)
    cd.leaf_fillStyle = function(scene) {
        if (scene.isActive) return this.finished(this.delegate().brighter(.5));
        else return this.delegate();
    };
    
};

//Styling the baseAxis labels
lims.yearLabelsOptions = function() {
    var cd = this.chartDefinition;
    
    cd.baseAxisTickFormatter = function(value, label) {
        return "Q" + value.substring(8, 9);
    };
    
    cd.baseAxisLabel_textAlign = "center";
    cd.baseAxisOverlappedLabelsMode = "leave";
};


//Styling of the barChart tooltips
lims.kpiTooltipOptions = function(prefix) {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = true;
    cd.tooltipOpacity = 1;
    
    cd.tooltipFormat = function f(){
        var category = this.getCategory();
        var series = this.getSeriesLabel();
        var value = lims.addCommas(this.getValue().toFixed(0));
        var year = category.substring(0,4);
        var quarter = category.substring(8,9);
        var lineClass = series.split(" ")[0];
        
        return "<div class='tooltipContainer'>" +
            "<div class='tooltipTitle'>" + series + "</div>" +  
            "<div class='tooltipSubtitle'>" + year + ", Q" + quarter + "</div>" +  
            "<div class='tooltipValue " + lineClass.toLowerCase() + "'>"+prefix+value+"</div>" + 
        "</div>";
    }
};

lims.kpiTerritoryTooltipOptions = function() {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = true;
    cd.tooltipOpacity = 1;
    
    cd.tooltipFormat = function f(){
        var category = this.getCategory();
        var series = this.getSeries();
        var value = lims.addCommas(this.getValue().toFixed(0));
        var lineClass = series.split(" ")[0];
        
        return "<div class='tooltipContainer'>" +
            "<div class='tooltipTitle'>" + series + "</div>" +  
            "<div class='tooltipSubtitle'>" + category + "</div>" +  
            "<div class='tooltipValue " + lineClass.toLowerCase() + "'>$"+value+"</div>" + 
        "</div>";
    }
};


lims.treemapTooltipOptions = function() {
    var cd = this.chartDefinition;
    
    cd.tooltipArrowVisible = false;
    cd.tooltipFollowMouse = true;
    cd.tooltipOpacity = 1;
    
    cd.tooltipFormat = function f(){
        var line = this.getCategory();
        var region = this.scene.atoms.category.label;
        var value = lims.addCommas(this.getSize().toFixed(0));
        var lineClass = line.split(" ")[0];
        
        return "<div class='tooltipContainer'>" +
            "<div class='tooltipTitle'>" + line + "</div>" +  
            "<div class='tooltipSubtitle'>" + region + "</div>" +  
            "<div class='tooltipValue " + lineClass.toLowerCase() + "'>$"+value+"</div>" + 
        "</div>";
    }
};