
anychart.onDocumentReady(function () {
    // Defines settings for maps regions (regions bounds are not relevant for this data, so let's make it less contrast)
    var customTheme = {
"map": {
    'unboundRegions': {'enabled': true, 'fill': '#f9f9f9', 'stroke': '#e5e5e5'}
}
    };
    anychart.theme(customTheme);

    // Creates map chart
    map = anychart.connector();

    // Sets settings for map chart
    map.padding([10, 10, 10, 10]);
    map.geoData(anychart.maps.united_kingdom);
    map.interactivity().selectionMode("none");

    // Helper function to create several series
    var createSeries = function (name, data, color) {
// Creates connector series and customizes them
var connectorSeries = map.connector(data)
.startSize(0)
.endSize(0)
.stroke('2 ' + color)
.hoverStroke('1.5 #212121')
.name(name)
.curvature(0);
connectorSeries.legendItem({iconType: "circle", fill: color, iconStroke: '2 #E1E1E1'});

// Customizes tooltips for the destination series
connectorSeries.tooltip({padding: [8, 13, 10, 13]});
connectorSeries.tooltip().title().useHtml(true);
connectorSeries.tooltip().titleFormatter(function(){
    return this.getDataValue('number') + '. <span style="font-size: 13px; color: #E1E1E1">' + this.getDataValue('short') + ' </span>'
});
connectorSeries.tooltip().fontSize(12).fontColor("#fff").textFormatter(function () {
    return this.getDataValue('full');
});
    };

    createSeries('By Rented Car', carData, '#64b5f6');
    createSeries('By Boat', shipData, '#1976d2');
    createSeries('By Airplane', airData, '#ef6c00');

    // Turns on the legend for the sample
    map.legend().enabled(true).padding([0,0,20,0]);

    // Creates marker series for airport names
    var citiesSeries = map.marker(citiesData)
    .type('circle')
    .size(4)
    .hoverSize(4)
    .fill('#64b5f6')
    .hoverFill('#64b5f6')
    .stroke('2 #E1E1E1')
    .hoverStroke('2 #E1E1E1')
    .tooltip(null);

    // Customizes labels for the airport names series
    citiesSeries.labels()
    .enabled(true)
    .position('bottom')
    .fontColor('#263238')
    .offsetY(0)
    .offsetX(5)
    .anchor('left')
    .textFormatter(function () {
        return this.getDataValue('name')
    });
    citiesSeries.legendItem(null);

    // Sets container id for the chart
    map.container('map');

    // Initiates chart drawing
    map.draw();
});
// Sets data for the connector series
var carData = [
    {points: [51.507315, -0.127901, 50.908579, -1.404370, 51.453568, -2.588353], number: 1, short: "From London to Bristol", full: 'On our way to Bristol we stopped in Southampton\nand enjoyed the dinner at restaurant.'},
    {points: [51.453568, -2.588353, 52.484899, -1.890637, 53.474881, -2.249000], number: 2, short: "From Bristol to Manchester", full: 'On our way to Manchester we stopped in Birmingham\nfor one night to have some rest and to walk in Birmingham\'s\ncity center.'},
    {points: [53.474881, -2.249000, 53.403105, -2.999768], number: 3, short: "From Manchester to Liverpool", full: 'The road to Liverpool took just couple of hours,\nso we had plenty time to walk around in Liverpool.'},
    {points: [57.475560, -4.224776, 57.148309, -2.094987, 56.460279, -2.965115, 56.069916, -3.450884, 55.946814, -3.184442], number: 6, short: "From Inverness to Edinburgh", full: 'That was really nice journey though Scotland.\nWe stopped a lot and we met a lot of nice people.\nthe journey took us 3 days.'},
    {points: [55.946814, -3.184442, 54.977230, -1.617702, 53.799611, -1.549131], number: 7, short: "From Edinburgh to Leeds", full: 'On our way from Edinburgh to Leeds we stopped only once\nin beautiful city Newcastle upon Tyne.'},
    {points: [53.799611, -1.549131, 53.234525, -1.421464, 52.954190, -1.158432, 51.507315, -0.127901], number: 8, short: "From Leeds back to London", full: 'On our way back to London from Leeds\nwe made several stops. And we spent a night\nin Nottingham. This part took us three days.'}
];
var shipData = [
    {points: [53.403105, -2.999768, 53.812012, -3.053354, 54.151732, -4.486070, 54.614223, -5.912609], number: 4, short: "From Liverpool to Belfast by boat", full: 'To get from Liverpool to Belfast, we got tickets on a cruise ship.\nThe route of the cruise ship went through Blackpool and Douglas\nand took 3 days.', curvature: 0}
];
var airData = [
    {points: [54.614223, -5.912609, 54.994887, -7.309736, 57.475560, -4.224776], number: 5, short: "Flight from Belfast to Inverness", full: 'There was not any planes from Belfast to Inverness.\nSo we had to flight through Derry.', curvature: 0}
];

// Sets data for the marker series (city names)
var citiesData = [
    {lat: 51.507315, long: -0.127901, name: 'London'},
    {lat: 50.908579, long: -1.404370, name: 'Southampton', label: {fontSize: 10, fontColor: '#7c868e'}},
    {lat: 51.453568, long: -2.588353, name: 'Bristol'},
    {lat: 52.484899, long: -1.890637, name: 'Birmingham', label: {anchor: 'right', fontSize: 10, fontColor: '#7c868e'}},
    {lat: 53.474881, long: -2.249000, name: 'Manchester', label: {anchor: 'rightTop', offsetX: 0, offsetY: 3}},
    {lat: 53.403105, long: -2.999768, name: 'Liverpool', label: {anchor: 'right'}},
    {lat: 53.812012, long: -3.053354, name: 'Blackpool', label: {anchor: 'topRight', fontSize: 10, fontColor: '#7c868e', offsetX: 0, offsetY: -5}, fill: '#1976d2'},
    {lat: 54.151732, long: -4.486070, name: 'Douglas', label: {anchor: 'rightTop', fontSize: 10, fontColor: '#7c868e', offsetX: 0, offsetY: -3}, fill: '#1976d2'},
    {lat: 54.614223, long: -5.912609, name: 'Belfast', fill: '#1976d2'},
    {lat: 54.994887, long: -7.309736, name: 'Derry', label: {anchor: 'right', fontSize: 10, fontColor: '#7c868e'}, fill: '#ef6c00'},
    {lat: 57.475560, long: -4.224776, name: 'Inverness', fill: '#ef6c00'},
    {lat: 57.148309, long: -2.094987, name: 'Aberdeen', label: {fontSize: 10, fontColor: '#7c868e'}},
    {lat: 56.460279, long: -2.965115, name: 'Dundee', label: {fontSize: 10, fontColor: '#7c868e'}},
    {lat: 56.069916, long: -3.450884, name: 'Dunfermline', label: {anchor: 'right', fontSize: 10, fontColor: '#7c868e'}},
    {lat: 55.946814, long: -3.184442, name: 'Edinburgh'},
    {lat: 54.977230, long: -1.617702, name: 'Newcastle upon Tyne', label: {fontSize: 10, fontColor: '#7c868e'}},
    {lat: 53.799611, long: -1.549131, name: 'Leeds', label: {anchor: 'leftTop'}},
    {lat: 53.234525, long: -1.421464, name: 'Chesterfield', label: {fontSize: 10, fontColor: '#7c868e'}},
    {lat: 52.954190, long: -1.158432, name: 'Nottingham', label: {fontSize: 10, fontColor: '#7c868e'}}
];
