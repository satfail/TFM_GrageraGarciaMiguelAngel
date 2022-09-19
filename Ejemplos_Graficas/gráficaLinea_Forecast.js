function f4( data) {
  var fecha = [];
  var datosChartForecast = [];
  var datosChartRespira = [];
  //Mostrar la gráfica al pulsar en un indicador del mapa
  if (data.resultset.length > 0) {
    if ($("#btnGraficaRespira > a").html() == "Datos en Tiempo Real") {
      $("#chartRespira").show();
    }
    //Separar datos de forecast y reales
    var data_aux = data.resultset;
    for (var i = 0; i < data_aux.length; i++) {
      if (data_aux[i][4] === "Forecast") {
        datosChartForecast.push(parseInt(data_aux[i][2])); //Datos de predección
        fecha.push(data_aux[i][1]); // Fecha para el eje x
      } else {
        datosChartRespira.push(data_aux[i][2]); // Datos reales para la serie de datos reales
      }
    }
    //Generar opciones del gráfico
    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      title: {
        text:
          "Serie Temporal del índice de calidad del aire " +
          data_aux[0][3].trim(),
        left: "center",
        textStyle: {
          fontSize: 16,
        },
      },
      legend: {
        top: 25,
      },
      xAxis: {
        type: "category",
        data: fecha,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        name: "AQI",
        nameLocation: "end",
        nameTextStyle: {
          fontWeight: "bold",
        },
        type: "value",
        scale: true,
      },

      series: [
        {
          name: "Datos de la predicción (AQI Forecast)",
          type: "line",
          lineStyle: {
            type: "dashed",
          },
          smooth: true,
          symbol: "none",
          data: datosChartForecast,
        },
        {
          name: "Datos reales medido por la estación RESPIRA (AQI RESPIRA)",
          type: "line",
          smooth: true,
          symbol: "none",
          data: datosChartRespira,
        },
      ],
    };
    //inicializar el gráfico
    var chartDom = document.getElementById("chartResp1"); 
    var myChart3 = echarts.init(chartDom);

    myChart3.setOption(option);
   //Controlar que el gráfico sea responsive
    $(window).on("click", function () {
      if (myChart3 != null && myChart3 != undefined) {
        myChart3.resize();
      }
    });

    $(window).on("resize", function () {
      if (myChart3 != null && myChart3 != undefined) {
        myChart3.resize();
      }
    });
  }
}
