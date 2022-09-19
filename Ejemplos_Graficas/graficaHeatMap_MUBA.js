//Es importante saber que estos datos ya llegan ordenados mes y dia desde base datos
function c(data) {
  var data_aux = data.resultset;
  //Función para calcular el máximo de un array
  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }
  var arrayMax = [];
  //Añadimos los datos a un array auxiliar
  for (var i = 0; i < data_aux.length; i++) {
    dato = data_aux[i][1] === null ? 0 : data_aux[i][1];
    arrayMax.push(dato);
  }
  //Función para añadir los datos al calendario
  function getVirtulData(data_aux) {
    var currentYear = new Date().getFullYear();
    var date = +echarts.number.parseDate(currentYear + "-01-01");
    var date2 = "";

    date2 = currentYear + "-12-31";

    var end = +echarts.number.parseDate(date2);
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    var datosCalendar = [];
    var dato = null;
    var i = 0;
    end += dayTime;
    for (var time = date; time < end; time += dayTime) {
      dato = data_aux[i][1] === null ? 0 : data_aux[i][1];
      data.push([
        echarts.format.formatTime("yyyy-MM-dd", time),
        Math.floor(Math.random() * 1000),
      ]);

      datosCalendar.push([
        echarts.format.formatTime("yyyy-MM-dd", time),
        Math.floor(dato),
      ]);

      i++;
    }
    return datosCalendar;
  }
 //opciones para visualizar el heatmap
  optionHeatMapCalendar = {
    tooltip: {
      position: "top",
      formatter: function (p) {
        var format = echarts.format.formatTime("yyyy-MM-dd", p.data[0]);
        return format + " - " + p.data[1] + " personas";
      },
    },
    title: {
      top: 20,
      left: "center",
      text: "Afluencia máxima por día",
      textStyle: {
        fontSize: "16",
        fontWeight: "normal",
      },
    },

    visualMap: {
      min: 0,
      max: getMaxOfArray(arrayMax),
      range: [1, getMaxOfArray(arrayMax)],
      orient: "horizontal",
      left: "center",
      calculable: true,
      top: 60,
      inRange: { color: ["#f2dede", "#c32420"] },
    },
    calendar: [
      {
        top: 140,
        orient: "horizontal",
        range: new Date().getFullYear(),
        cellSize: ["auto", "auto"],
        dayLabel: {
          margin: 10,
          firstDay: 1,
          nameMap: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        },
        monthLabel: {
          position: "start",
          nameMap: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
        },
      },
    ],

    series: [
      {
        type: "effectScatter",
        coordinateSystem: "calendar",
        calendarIndex: 0,
        symbolSize: function (val) {
          return (
            document.getElementById("divChartAforoCalendar").offsetWidth / 100
          );
        },
        data: getVirtulData(data_aux),
      },
    ],
  };

//Inicializar el gráfico
  myChartCalendar = echarts.init(document.getElementById("mainCalendar"));
  myChartCalendar.setOption(optionHeatMapCalendar);

  $(window).on("click", function () {
    if (myChartCalendar != null && myChartCalendar != undefined) {
      myChartCalendar.resize();
  });
}
