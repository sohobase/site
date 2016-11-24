import classnames from 'classnames';
import React, { PropTypes, Component } from 'react';
import style from './Map.css';

class Map extends Component {

  static propTypes = {
    journey: PropTypes.array,
  };

  static defaultProps = {
    journey: [],
  };

  render() {
    return (
      <div className={style.map}>

      </div>
    );
  }
}

export default Map;
