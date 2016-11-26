import classnames from 'classnames';
import React, { PropTypes, Component } from 'react';
import style from './Map.css';

class Map extends Component {

  static propTypes = {
    cities: PropTypes.array,
    journey: PropTypes.array,
    legend: PropTypes.bool,
  };

  static defaultProps = {
    journey: [],
    legend: false,
  };

  constructor(props) {
    super(props);

    this.state = { instance: undefined };
  }

  // -- Lifecycle
  componentWillMount() {
    const { cities = [], country, journey = {} } = window.sohobase;
    const map = anychart.connector();

    anychart.theme({
      map: { unboundRegions: {enabled: true, fill: '#E1E1E1', stroke: '#D2D2D2'} },
    });

    map.geoData(anychart.maps[country || 'world']);
    map.interactivity().selectionMode('none');

    Object.keys(journey).map(key => {
      const data = journey[key];

      if (data) {
        console.log('key', key, data);
        const color = '#ef6c00';

        const connectorSeries = map.connector(data)
          .startSize(0)
          .endSize(0)
          // .stroke('2 ' + color)
          // .hoverStroke('1.5 #212121')
          .name(key)
          .markers({})
          // .markers({position: '100%', size: 5, type: 'circle'})
          // .hoverMarkers({position: '100%',  size: 4,  fill: '#455a64', stroke: '2 #455a64', type: 'circle'})
          .curvature(0);
        // connectorSeries.legendItem({ iconType: 'circle', fill: color, iconStroke: '2 #E1E1E1' });

        // Customizes tooltips for the destination series
        connectorSeries.tooltip({padding: [8, 13, 10, 13]});
        connectorSeries.tooltip().title().useHtml(true);
        connectorSeries.tooltip().titleFormatter(function(){
            return this.getDataValue('number') + '. <span style="font-size: 13px; color: #E1E1E1">' + this.getDataValue('short') + ' </span>'
        });
        connectorSeries.tooltip().fontSize(12).fontColor("#fff").textFormatter(function () {
            return this.getDataValue('full');
        });
      }
    });

    const c = cities.map(city => {
      const { name, point, position = 'bottom' } = city;
      return { name, lat: point[0], long: point[1], position };
    });
    map.marker(c)
      .type('circle')
      .size(3)
      .fill('#b69853')
      .stroke('1 #fff')
      // .hoverStroke('2 #f00')
      .hoverSize(8)
      // .selectionMode("none")
      .legendItem(null)
      .labels()
        .enabled(true)
        .position('bottom')
        .fontSize(10)
        .fontWeight('bold')
        // .fontColor('rgba(51, 51, 51, 0.8)')
        .offsetY(-2)
        .offsetX(4)
        .anchor('left');

    map.legend().enabled(true).padding([0, 0, 20, 0]);

    map.container('map');
    map.draw();
  }

  render() {
    return (
      <div className={style.map}>

      </div>
    );
  }
}

export default Map;
