(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

    var dataItem = {
        Time: "05-May-19 00:00:00",
        Value: 10
    }

	var definition = { 
		typeName: "simplevalue",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				Height: 150,
				Width: 150 
			} 
		}
	}

	symbolVis.prototype.init = function(scope, elem) {
        // scope.Time = dataItem.Time;
        // scope.Value = dataItem.Value;
        // scope.dataObject = dataItem;

        this.onDataUpdate = dataUpdate;

        function dataUpdate (data) {
            //console.log(data);
            scope.dataObject = data;
            if (data.Label) {
                scope.label = data.Label;
                scope.units = data.Units;
            }

        };


     };

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 