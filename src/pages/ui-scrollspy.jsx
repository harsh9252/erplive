import React from 'react';

const UiScrollspy = () => {
  return (
    <>
      {/* Page Header */}
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Scrollspy</h6>
        </div>
      </div>

      {/* Scrollspy Example */}
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Navigation</h6>
              <nav
                id="navbar-example3"
                className="h-100 flex-column align-items-stretch pe-4 border-end"
              >
                <nav className="nav nav-pills flex-column">
                  <Link className="nav-link" href="#item-1">
                    Item 1
                  </Link>
                  <nav className="nav nav-pills flex-column">
                    <Link className="nav-link ms-3 my-1" href="#item-1-1">
                      Item 1-1
                    </Link>
                    <Link className="nav-link ms-3 my-1" href="#item-1-2">
                      Item 1-2
                    </Link>
                  </nav>
                  <Link className="nav-link" href="#item-2">
                    Item 2
                  </Link>
                  <Link className="nav-link" href="#item-3">
                    Item 3
                  </Link>
                  <nav className="nav nav-pills flex-column">
                    <Link className="nav-link ms-3 my-1" href="#item-3-1">
                      Item 3-1
                    </Link>
                    <Link className="nav-link ms-3 my-1" href="#item-3-2">
                      Item 3-2
                    </Link>
                  </nav>
                </nav>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div
                data-bs-spy="scroll"
                data-bs-target="#navbar-example3"
                data-bs-smooth-scroll="true"
                className="scrollspy-example-2"
                tabIndex="0"
                style={{ height: '400px', overflowY: 'auto' }}
              >
                <div id="item-1">
                  <h4>Item 1</h4>
                  <p>
                    This is some placeholder content for the scrollspy page. Note that as you scroll
                    down the page, the appropriate navigation link is highlighted. It's repeated
                    throughout the component example. We keep adding some more example copy here to
                    emphasize the scrolling and highlighting.
                  </p>
                  <p>
                    Keep in mind that the JavaScript plugin tries to pick the right element among
                    all that may be visible. Multiple visible scrollspy targets at the same time may
                    cause some issues.
                  </p>
                </div>

                <div id="item-1-1">
                  <h5>Item 1-1</h5>
                  <p>
                    This is some placeholder content for the scrollspy page. Note that as you scroll
                    down the page, the appropriate navigation link is highlighted. It's repeated
                    throughout the component example. We keep adding some more example copy here to
                    emphasize the scrolling and highlighting.
                  </p>
                </div>

                <div id="item-1-2">
                  <h5>Item 1-2</h5>
                  <p>
                    This is some placeholder content for the scrollspy page. Note that as you scroll
                    down the page, the appropriate navigation link is highlighted. It's repeated
                    throughout the component example. We keep adding some more example copy here to
                    emphasize the scrolling and highlighting.
                  </p>
                </div>

                <div id="item-2">
                  <h4>Item 2</h4>
                  <p>
                    This is some placeholder content for the scrollspy page. Note that as you scroll
                    down the page, the appropriate navigation link is highlighted. It's repeated
                    throughout the component example. We keep adding some more example copy here to
                    emphasize the scrolling and highlighting.
                  </p>
                </div>

                <div id="item-3">
                  <h4>Item 3</h4>
                  <p>
                    This is some placeholder content for the scrollspy page. Note that as you scroll
                    down the page, the appropriate navigation link is highlighted. It's repeated
                    throughout the component example. We keep adding some more example copy here to
                    emphasize the scrolling and highlighting.
                  </p>
                </div>

                <div id="item-3-1">
                  <h5>Item 3-1</h5>
                  <p>
                    This is some placeholder content for the scrollspy page. Note that as you scroll
                    down the page, the appropriate navigation link is highlighted. It's repeated
                    throughout the component example. We keep adding some more example copy here to
                    emphasize the scrolling and highlighting.
                  </p>
                </div>

                <div id="item-3-2">
                  <h5>Item 3-2</h5>
                  <p>
                    This is some placeholder content for the scrollspy page. Note that as you scroll
                    down the page, the appropriate navigation link is highlighted. It's repeated
                    throughout the component example. We keep adding some more example copy here to
                    emphasize the scrolling and highlighting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List Group Scrollspy */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">List Group Scrollspy</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div id="list-example" className="list-group">
                    <Link className="list-group-item list-group-item-action" href="#list-item-1">
                      Item 1
                    </Link>
                    <Link className="list-group-item list-group-item-action" href="#list-item-2">
                      Item 2
                    </Link>
                    <Link className="list-group-item list-group-item-action" href="#list-item-3">
                      Item 3
                    </Link>
                    <Link className="list-group-item list-group-item-action" href="#list-item-4">
                      Item 4
                    </Link>
                  </div>
                </div>
                <div className="col-8">
                  <div
                    data-bs-spy="scroll"
                    data-bs-target="#list-example"
                    data-bs-smooth-scroll="true"
                    className="scrollspy-example"
                    tabIndex="0"
                    style={{ height: '300px', overflowY: 'auto' }}
                  >
                    <h4 id="list-item-1">Item 1</h4>
                    <p>
                      This is some placeholder content for the scrollspy page. Note that as you
                      scroll down the page, the appropriate navigation link is highlighted.
                    </p>

                    <h4 id="list-item-2">Item 2</h4>
                    <p>
                      This is some placeholder content for the scrollspy page. Note that as you
                      scroll down the page, the appropriate navigation link is highlighted.
                    </p>

                    <h4 id="list-item-3">Item 3</h4>
                    <p>
                      This is some placeholder content for the scrollspy page. Note that as you
                      scroll down the page, the appropriate navigation link is highlighted.
                    </p>

                    <h4 id="list-item-4">Item 4</h4>
                    <p>
                      This is some placeholder content for the scrollspy page. Note that as you
                      scroll down the page, the appropriate navigation link is highlighted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiScrollspy;
