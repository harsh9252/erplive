import React from 'react';

const UiScrollbar = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 py-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Scrollbar</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Advanced UI</Link>
            </li>
            <li className="breadcrumb-item active">Scrollbar</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header border-bottom d-flex align-items-center">
              <h4 className="header-title">Default Scroll</h4>
            </div>
            <p className="text-muted m-3">
              Just use data attribute <code>data-simplebar</code> and add{' '}
              <code>max-height: **px</code> oh fix height
            </p>
            <div className="card-body py-0 mb-3" data-simplebar style="max-height: 250px;"></div>
            SimpleBar does only one thing: replace the browser's default scrollbar with a custom
            CSS-styled one without losing performances. Unlike some popular plugins, SimpleBar
            doesn't mimic scroll with Javascript, causing janks and strange scrolling behaviours...
            You keep the awesomeness of native scrolling...with a custom scrollbar!
            <p>
              SimpleBar <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the{' '}
              <strong>native</strong>
              <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar
              visual appearance.
            </p>
            <h5>Design it as you want</h5>
            <p>
              SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you
              want! Or even have multiple style on the same page...or just keep the default style
              ("Mac OS" scrollbar style).
            </p>
            <h5>Lightweight and performant</h5>
            <p>
              Only 6kb minified. SimpleBar doesn't use Javascript to handle scrolling. You keep the
              performances/behaviours of the native scroll.
            </p>
            <h5>Supported everywhere</h5>
            <p className="mb-0">
              SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge,
              IE11.
            </p>
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card">
          <div className="card-header border-bottom d-flex align-items-center">
            <h4 className="header-title">RTL Position</h4>
          </div>
          <div className="card-body pb-0">
            <p className="text-muted">
              Just use data attribute <code>data-simplebar data-simplebar-direction='rtl'</code> and
              add <code>max-height: **px</code> oh fix height
            </p>
          </div>
          <div
            className="card-body py-0 mb-3"
            data-simplebar
            data-simplebar-direction="rtl"
            style="max-height: 250px;"
          ></div>
          SimpleBar does only one thing: replace the browser's default scrollbar with a custom
          CSS-styled one without losing performances. Unlike some popular plugins, SimpleBar doesn't
          mimic scroll with Javascript, causing janks and strange scrolling behaviours... You keep
          the awesomeness of native scrolling...with a custom scrollbar!
          <p>
            SimpleBar <strong>does NOT implement a custom scroll behaviour</strong>. It keeps the{' '}
            <strong>native</strong>
            <code>overflow: auto</code> scroll and <strong>only</strong> replace the scrollbar
            visual appearance.{' '}
          </p>
          <h5>Design it as you want</h5>
          <p>
            SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want!
            Or even have multiple style on the same page...or just keep the default style ("Mac OS"
            scrollbar style).
          </p>
          <h5>Lightweight and performant</h5>
          <p>
            Only 6kb minified. SimpleBar doesn't use Javascript to handle scrolling. You keep the
            performances/behaviours of the native scroll.
          </p>
          <h5>Supported everywhere</h5>
          <p className="mb-0">
            SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge,
            IE11.
          </p>
        </div>
      </div>
    </>
  );
};

export default UiScrollbar;
