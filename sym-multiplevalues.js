(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var dataItems = [
		{
			Time: "14-May-19 00:00:00",
			Value: 10
		},
		{
			Time: "14-May-19 05:00:00",
			Value: 20
		}
	]

	var definition = { 
		typeName: "multiplevalues",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				DataShape: "Timeseries",
				Height: 150,
				Width: 150,
				BackgroundColor: "lightskyblue",
				BorderRadius: 10,
				DisplayDigits: 2
			} 
		},
		configOptions: function(){
			return [
				{
					title: "Format Symbol",
					mode: "format"
				}
			];
		}
	}

	symbolVis.prototype.init = function(scope, elem) { 
		scope.dataItems = dataItems;

		this.onDataUpdate = dataUpdate;

		function dataUpdate (data) {
			scope.dataItems = data.Data[0].Values;

			for(var i=0; i < scope.dataItems.length; i++) {
				scope.dataItems[i].Value = scope.dataItems[i].Value.replace(",",".");
			   }

			console.log(scope.dataItems);
			if (data.Data[0].Label) {
				scope.Label = data.Data[0].Label;
				scope.Units = data.Data[0].Units;
			}

		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 