import React, { useEffect } from 'react';

const MapsVector = () => {
  useEffect(() => {
    // Initialize vector maps if library is available
    // This is a placeholder - actual implementation depends on the vector map library
    initializeMaps();
  }, []);

  const initializeMaps = () => {
    // Check if jsvectormap library is loaded
    if (typeof window.JSVectorMap !== 'undefined') {
      try {
        // Initialize basic vector map
        new window.JSVectorMap({
          selector: '#vector-map',
          map: 'world',
          backgroundColor: '#fff',
          regionStyle: {
            initial: {
              fill: '#e4e4e4',
              stroke: '#fff',
              strokeWidth: 1,
            },
            hover: {
              fill: '#4a90e2',
              stroke: '#fff',
              strokeWidth: 1,
            },
          },
        });

        // Initialize US map
        new window.JSVectorMap({
          selector: '#us-map',
          map: 'us_merc_en',
          backgroundColor: '#fff',
          regionStyle: {
            initial: {
              fill: '#e4e4e4',
              stroke: '#fff',
              strokeWidth: 1,
            },
            hover: {
              fill: '#4a90e2',
              stroke: '#fff',
              strokeWidth: 1,
            },
          },
        });

        // Initialize Russia map
        new window.JSVectorMap({
          selector: '#russia-map',
          map: 'russia',
          backgroundColor: '#fff',
          regionStyle: {
            initial: {
              fill: '#e4e4e4',
              stroke: '#fff',
              strokeWidth: 1,
            },
            hover: {
              fill: '#4a90e2',
              stroke: '#fff',
              strokeWidth: 1,
            },
          },
        });

        // Initialize Spain map
        new window.JSVectorMap({
          selector: '#spain-map',
          map: 'spain',
          backgroundColor: '#fff',
          regionStyle: {
            initial: {
              fill: '#e4e4e4',
              stroke: '#fff',
              strokeWidth: 1,
            },
            hover: {
              fill: '#4a90e2',
              stroke: '#fff',
              strokeWidth: 1,
            },
          },
        });

        // Initialize Canada map
        new window.JSVectorMap({
          selector: '#canada-map',
          map: 'canada',
          backgroundColor: '#fff',
          regionStyle: {
            initial: {
              fill: '#e4e4e4',
              stroke: '#fff',
              strokeWidth: 1,
            },
            hover: {
              fill: '#4a90e2',
              stroke: '#fff',
              strokeWidth: 1,
            },
          },
        });
      } catch (error) {
        console.error('Error initializing vector maps:', error);
      }
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Vector Maps</h3>
          </div>
        </div>
      </div>

      {/* Maps Grid */}
      <div className="row">
        {/* Basic Vector Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">Basic Vector Map</div>
            </div>
            <div className="card-body">
              <div id="vector-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Marker Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">Map With Markers</div>
            </div>
            <div className="card-body">
              <div id="marker-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Image Markers Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">Map With Image Markers</div>
            </div>
            <div className="card-body">
              <div id="marker-image-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Lines Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">Map With Lines</div>
            </div>
            <div className="card-body">
              <div id="lines-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* US Vector Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">US Vector Map</div>
            </div>
            <div className="card-body">
              <div id="us-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Russia Vector Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">Russia Vector Map</div>
            </div>
            <div className="card-body">
              <div id="russia-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Spain Vector Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">Spain Vector Map</div>
            </div>
            <div className="card-body">
              <div id="spain-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Canada Vector Map */}
        <div className="col-xl-6">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title">Canada Vector Map</div>
            </div>
            <div className="card-body">
              <div id="canada-map" style={{ height: '400px', width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapsVector;
