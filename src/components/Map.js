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

    map.marker(cities)
      .type('circle')
      .size(4)
      .fill('#b69853')
      .stroke('2 #fff')
      .legendItem(null)
      .labels()
        .enabled(true)
        // .position('bottom')
        .fontSize(10)
        .fontWeight('bold')
        // .fontColor('rgba(51, 51, 51, 0.8)')
        // .offsetY(0)
        // .offsetX(5)
        // .anchor('left');

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
