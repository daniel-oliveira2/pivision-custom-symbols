(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "barchart",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'Table',
				Height: 150,
				Width: 150 
			} 
		}
	}

	function getConfig(){
		return {
			"type": "serial",
			"categoryField": "attribute",
			"startDuration": 1,
			"categoryAxis": {
				"gridPosition": "start"
			},
			"trendLines": [],
			graphs: [
				{
					"ballonText" : "Ballon Text",
					"fillAlphas": 1,
					"id": "AmGraph-1",
					"type": "column",
					"valueField": "value"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"id":"ValuesAxis-1",
					"title": "Axis title"
				}
			],
			"allLabels": [],
			"balloon": {},
			"legend": {
				"enabled": true,
				"useGraphSettings": true
			},
			"titles": [
				{
					"id": "Title-1",
					"size": 15,
					"text": "Chart Title"
				}
			],
			"dataProvider": [
				{
					"attribute": "Attr 1",
					"value": 10
				},
				{
					"attribute": "Attr 2",
					"value": 50
				}
			]
		}
	}



	symbolVis.prototype.init = function(scope, elem) { 
		var container = elem.find('#container')[0];

		container.id = "barChart_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(container.id,getConfig());

		function convertToChart(data, currentDataProvider){
			
			if (data.Rows) {
				if (data.Rows[0].Label) {

					return data.Rows.map(function(item){

						return {
							value: item.Value,
							attribute: item.Label
						}
					});
				} else
				{
					for(var i=0; i < currentDataProvider.length; i++) {
						currentDataProvider[i].value = data.Rows[i].Value;
					}

				}
			}
		}


		this.onDataUpdate = dataUpdate;

		function dataUpdate (data) {
			console.log(data);

			var dataProvider = convertToChart(data, chart.dataProvider);
			chart.dataProvider = dataProvider;
			chart.validateData();
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 