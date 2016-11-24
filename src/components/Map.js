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
    const map = anychart.connector();

    map.geoData(anychart.maps.japan);
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
