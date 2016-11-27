import classnames from 'classnames';
import React, { PropTypes, Component } from 'react';
import Colors from '../utils/colors';
import hexToRgba from '../utils/hexToRgba';
import style from './Map.css';

class Map extends Component {

  static propTypes = {
    cities: PropTypes.array,
    journey: PropTypes.array,
  };

  static defaultProps = {
    journey: [],
  };

  constructor(props) {
    super(props);

    this.state = { instance: undefined };
  }

  // -- Lifecycle
  componentDidMount() {
    const {
      cities = [],
      country = 'world',
      journey = {},
      legend = true,
      pois = []
    } = window.sohobase;

    anychart.theme({
      map: {
        unboundRegions: { enabled: true, fill: '#f9f9f9', stroke: '#e9e9e9' },
      },
    });

    const map = anychart.connector();
    map.geoData(anychart.maps[country]);
    map.interactivity().selectionMode('none');

    map.marker(cities.map(city => ({ name: city.name, lat: city.point[0], long: city.point[1] })))
      .type('circle')
      .size(5)
      .fill(Colors.accent)
      .stroke('2 #fff')
      // .hoverStroke('2 #f00')
      .hoverSize(8)
      .selectionMode("none")
      .legendItem(null)
      .labels()
        .position('bottom')
        .fontSize(10)
        .fontWeight('bold')
        // .fontColor('rgba(51, 51, 51, 0.8)')
        .offsetY(-2)
        .offsetX(4)
        .anchor('left');

    map.marker(pois.map(poi => ({ name: poi.name, lat: poi.point[0], long: poi.point[1] })))
      .type('circle')
      .size(3)
      .fill(Colors.secondary)
      .stroke('1 #fff')
      .legendItem(null)
      // .legendItem({ iconType: 'circle', iconSize: 8 })
      .labels()
        .position('bottom')
        .offsetY(-1)
        .fontSize(9)
        .anchor('right');

    Object.keys(journey).map(key => {
      const { color = Colors.accent, route, type = 'air' } = journey[key] || {};

      if (route) {
        map.connector(route)
          .stroke(`1.5 ${hexToRgba(color, 0.5)}`)
          .hoverStroke(`3 ${color}`)
          .name(key)
          // .markers({position: '100%',  size: 4,  fill: '#1976d2',  stroke: '2 #E1E1E1',  type: 'circle'})
          .markers({ size: 12, fill: color })
          // .hoverMarkers({ fill: color })
          .curvature(0.25)
          .legendItem({ iconType: 'circle', iconFill: color, iconSize: 10, fontSize: 10 })
          .tooltip()
            .useHtml(true)
            .fontSize(10)
            .textFormatter(function() {
              return (`<strong>${this.getDataValue('name')}</strong><br/>${this.getDataValue('description')}`);
            });
      }
    });

    map.legend().enabled(legend);

    map.container('map');
    map.draw();
  }

  render() {
    return (<figure id='map' className={style.map} />);
  }
}

export default Map;
