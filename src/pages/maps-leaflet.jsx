import React, { useEffect } from 'react';

const MapsLeaflet = () => {
  useEffect(() => {
    // Load Leaflet CSS
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = '/assets/plugins/leaflet/leaflet.css';
    document.head.appendChild(leafletCSS);

    // Load Leaflet JS
    const leafletScript = document.createElement('script');
    leafletScript.src = '/assets/plugins/leaflet/leaflet.js';
    leafletScript.async = true;
    leafletScript.onload = () => {
      // Load custom leaflet initialization
      const customScript = document.createElement('script');
      customScript.src = '/assets/js/leaflet.js';
      customScript.async = true;
      document.body.appendChild(customScript);
    };
    document.body.appendChild(leafletScript);

    return () => {
      // Cleanup
      if (leafletCSS.parentNode) {
        leafletCSS.parentNode.removeChild(leafletCSS);
      }
      if (leafletScript.parentNode) {
        leafletScript.parentNode.removeChild(leafletScript);
      }
    };
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Leaflet Maps</h3>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Basic Leaflet Map */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Leaflet Map</div>
            </div>
            <div className="card-body">
              <div id="map" style={{ height: '400px' }}></div>
            </div>
          </div>
        </div>

        {/* Map With Markers, Circles and Polygons */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Map With Markers, Circles and Polygons</div>
            </div>
            <div className="card-body">
              <div id="map1" style={{ height: '400px' }}></div>
            </div>
          </div>
        </div>

        {/* Map With Popup */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Map With Popup</div>
            </div>
            <div className="card-body">
              <div id="map-popup" style={{ height: '400px' }}></div>
            </div>
          </div>
        </div>

        {/* Map With Custom Icon */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Map With Custom Icon</div>
            </div>
            <div className="card-body">
              <div id="map-custom-icon" style={{ height: '400px' }}></div>
            </div>
          </div>
        </div>

        {/* Interactive Choropleth Map */}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Interactive Choropleth Map</div>
            </div>
            <div className="card-body">
              <div id="interactive-map" style={{ height: '400px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapsLeaflet;
