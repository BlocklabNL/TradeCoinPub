import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import classnames from 'classnames';

import mapStyles from '../../../config/mapStyles';

import './styles.scss';
import LocationPin from './LocationPin';

const createMapOptions = () => ({
  panControl: false,
  mapTypeControl: false,
  scrollwheel: true,
  gestureHandling: 'greedy',
  styles: mapStyles,
  fullscreenControl: false,
  disableDoubleClickZoom: true,
});

const config = require("../../../config.js");

const {
  GEOLOCATION_KEY
} = config.default;

class GoogleMap extends PureComponent {
  map = null;

  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line
      currentZoom: Math.max(props.zoom, 3), // 3 is minimal google maps zoom
    };
  }

  render() {
    const {
      isFullScreen, lon, lat
    } = this.props;
    console.log(this.props)

    return (
      <div
        className={classnames('GoogleMap-Wrapper', {
          'GoogleMap-Wrapper-FullScreen': isFullScreen,
        })}
        id="googleMapContainer"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: GEOLOCATION_KEY }}
          center={[lat, lon]}
          zoom={10}
          debounced
          onChange={
            () => {
              this.setState({
                // eslint-disable-next-line
                currentZoom: this.map && this.map.map_ && this.map.map_.getZoom(),
              });
            }
          }
          rotateControl={false}
          options={createMapOptions}
          ref={(m) => { this.map = m; }}
        >
          <LocationPin lat={lat} lng={lon}/>
        </GoogleMapReact>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.object,
  ),
  center: PropTypes.arrayOf(
    PropTypes.number,
  ),
  zoom: PropTypes.number,
  goTo: PropTypes.func,
  isFullScreen: PropTypes.bool,
};

GoogleMap.defaultProps = {
  markers: [],
  center: undefined,
  zoom: 3,
  goTo: () => {},
  isFullScreen: false,
};

export default GoogleMap;