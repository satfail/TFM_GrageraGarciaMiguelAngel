// Variables y Objetos globales.
var v_mapa = null;

function cargarMapa(){
	var v_latitud =  38.563269477;
	var v_longitud = -6.346331835;
	var v_zoom = 18;
	
	// Datos de prueba.
	var v_testData = {
		max : 5,
		data : [ {
			lat : 38.563269477,
			lng : -6.346331835,
			count : 10
		},{ 
			lat : 38.571339,
			lng : -6.350635,
			count : 20
		},{ 
			lat : 38.569610,
			lng : -6.329864,
			count : 10
		},{ 
			lat : 38.561838,
			lng : -6.323889,
			count : 20
		},{ 
			lat : 38.555703,
			lng : -6.325883,
			count : 10
		},{ 
			lat : 38.552307,
			lng : -6.341316,
			count : 20
		},{ 
			lat : 38.560152,
			lng : -6.350190,
			count : 10
		},{ 
			lat : 38.562912,
			lng : -6.334940,
			count : 10
		},{ 
			lat : 38.558730,
			lng : -6.337224,
			count : 10
		} ]
	};

	var cfg = {
	  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
	  // if scaleRadius is false it will be the constant radius used in pixels
	  "radius": .007,
	  "maxOpacity": .6, 
	  // scales the radius based on map zoom
	  "scaleRadius": true, 
	  //"scaleRadius": false, 
	  // if set to false the heatmap uses the global maximum for colorization
	  // if activated: uses the data maximum within the current map boundaries 
	  //   (there will always be a red spot with useLocalExtremas true)
	  "useLocalExtrema": true,
	  //"useLocalExtrema": false,
	  // which field name in your data represents the latitude - default "lat"
	  latField: 'lat',
	  // which field name in your data represents the longitude - default "lng"
	  lngField: 'lng',
	  // which field name in your data represents the data value - default "value"
	  valueField: 'count'
	};
	
	// Humanitarian Style.
	var v_base_layer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT',
	    maxZoom: v_zoom
	});
	
	// Layer Mapa de calor.
	var v_heatmapLayer = new HeatmapOverlay(cfg);
	
	
	v_mapa = new L.Map('mapa', {
		center: new L.LatLng(v_latitud, v_longitud),
		zoom: v_zoom,
		layers: [
		    v_base_layer, 
		    v_heatmapLayer
		]
	});
	
	v_heatmapLayer.setData(v_testData);
} 