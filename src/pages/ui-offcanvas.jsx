import React from 'react';

const UiOffcanvas = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Offcanvas</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Offcanvas</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Offcanvas</h5>
            </div>
            <div className="card-body">
              <p>
                You can use a link with the <code>href</code> attribute, or a button with the{' '}
                <code>data-bs-target</code> attribute. In both cases, the{' '}
                <code>data-bs-toggle="offcanvas"</code> is required.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link
                  className="btn btn-primary"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  Link with href
                </Link>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  Button with data-bs-target
                </button>
              </div>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div className="offcanvas-header">
                  <h4 className="offcanvas-title" id="offcanvasExampleLabel">
                    Offcanvas
                  </h4>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <div></div>
                  Some text as placeholder. In real life you can have the elements you have chosen.
                  Like, text, images, lists, etc.
                </div>
                <h5 className="mt-3">List</h5>
                <ul className="ps-3">
                  <li>Nemo enim ipsam voluptatem quia aspernatur</li>
                  <li>Neque porro quisquam est, qui dolorem</li>
                  <li>Quis autem vel eum iure qui in ea</li>
                </ul>
                <ul className="ps-3">
                  <li>At vero eos et accusamus et iusto odio dignissimos</li>
                  <li>Et harum quidem rerum facilis</li>
                  <li>Temporibus autem quibusdam et aut officiis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Offcanvas Backdrop</h5>
          </div>
          <div className="card-body">
            <p>
              Scrolling the <code>&lt;body&gt;</code> element is disabled when an offcanvas and its
              backdrop are visible. Use the <code>data-bs-scroll</code> attribute to toggle{' '}
              <code>&lt;body&gt;</code> scrolling and <code>data-bs-backdrop</code> to toggle the
              backdrop.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-primary mt-2 mt-md-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
              >
                Enable body scrolling
              </button>
              <button
                className="btn btn-primary mt-2 mt-md-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBackdrop"
                aria-controls="offcanvasWithBackdrop"
              >
                Enable backdrop (default)
              </button>
              <button
                className="btn btn-primary mt-2 mt-md-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions"
                aria-controls="offcanvasWithBothOptions"
              >
                Enable both scrolling & backdrop
              </button>
            </div>
            <div
              className="offcanvas offcanvas-start"
              data-bs-scroll="true"
              data-bs-backdrop="false"
              tabIndex="-1"
              id="offcanvasScrolling"
              aria-labelledby="offcanvasScrollingLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                  Colored with scrolling
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div></div>
                Some text as placeholder. In real life you can have the elements you have chosen.
                Like, text, images, lists, etc.
              </div>
              <h5 className="mt-3">List</h5>
              <ul className="ps-3">
                <li>Nemo enim ipsam voluptatem quia aspernatur</li>
                <li>Neque porro quisquam est, qui dolorem</li>
                <li>Quis autem vel eum iure qui in ea</li>
              </ul>
              <ul className="ps-3">
                <li>At vero eos et accusamus et iusto odio dignissimos</li>
                <li>Et harum quidem rerum facilis</li>
                <li>Temporibus autem quibusdam et aut officiis</li>
              </ul>
            </div>
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
            aria-labelledby="offcanvasWithBackdropLabel"
          >
            <div className="offcanvas-header">
              <h4 className="offcanvas-title" id="offcanvasWithBackdropLabel">
                Offcanvas with backdrop
              </h4>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div></div>
              Some text as placeholder. In real life you can have the elements you have chosen.
              Like, text, images, lists, etc.
            </div>
            <h5 className="mt-3">List</h5>
            <ul className="ps-3">
              <li>Nemo enim ipsam voluptatem quia aspernatur</li>
              <li>Neque porro quisquam est, qui dolorem</li>
              <li>Quis autem vel eum iure qui in ea</li>
            </ul>
            <ul className="ps-3">
              <li>At vero eos et accusamus et iusto odio dignissimos</li>
              <li>Et harum quidem rerum facilis</li>
              <li>Temporibus autem quibusdam et aut officiis</li>
            </ul>
          </div>
        </div>
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-header">
            <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
              Backdroped with scrolling
            </h4>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div></div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like,
            text, images, lists, etc.
          </div>
          <h5 className="mt-3">List</h5>
          <ul className="ps-3">
            <li>Nemo enim ipsam voluptatem quia aspernatur</li>
            <li>Neque porro quisquam est, qui dolorem</li>
            <li>Quis autem vel eum iure qui in ea</li>
          </ul>
          <ul className="ps-3">
            <li>At vero eos et accusamus et iusto odio dignissimos</li>
            <li>Et harum quidem rerum facilis</li>
            <li>Temporibus autem quibusdam et aut officiis</li>
          </ul>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h4 id="offcanvasTopLabel">Offcanvas Top</h4>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div></div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </div>
        <h5 className="mt-3">List</h5>
        <ul className="ps-3">
          <li>Nemo enim ipsam voluptatem quia aspernatur</li>
          <li>Neque porro quisquam est, qui dolorem</li>
          <li>Quis autem vel eum iure qui in ea</li>
        </ul>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h4 id="offcanvasRightLabel">Offcanvas right</h4>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div></div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </div>
        <h5 className="mt-3">List</h5>
        <ul className="ps-3">
          <li>Nemo enim ipsam voluptatem quia aspernatur</li>
          <li>Neque porro quisquam est, qui dolorem</li>
          <li>Quis autem vel eum iure qui in ea</li>
        </ul>
      </div>
      <div
        className="offcanvas offcanvas-bottom"
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title" id="offcanvasBottomLabel">
            Offcanvas bottom
          </h4>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div></div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </div>
        <h5 className="mt-3">List</h5>
        <ul className="ps-3">
          <li>Nemo enim ipsam voluptatem quia aspernatur</li>
          <li>Neque porro quisquam est, qui dolorem</li>
          <li>Quis autem vel eum iure qui in ea</li>
        </ul>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasLeft"
        aria-labelledby="offcanvasLeftLabel"
      >
        <div className="offcanvas-header">
          <h4 id="offcanvasLeftLabel">Offcanvas Left</h4>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div></div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </div>
        <h5 className="mt-3">List</h5>
        <ul className="ps-3">
          <li>Nemo enim ipsam voluptatem quia aspernatur</li>
          <li>Neque porro quisquam est, qui dolorem</li>
          <li>Quis autem vel eum iure qui in ea</li>
        </ul>
      </div>
      <div
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex="-1"
        id="offcanvasDark"
        aria-labelledby="offcanvasDarkLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasDarkLabel">Dark Offcanvas</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div></div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </div>
        <h5 className="mt-3">List</h5>
        <ul className="ps-3">
          <li>Nemo enim ipsam voluptatem quia aspernatur</li>
          <li>Neque porro quisquam est, qui dolorem</li>
          <li>Quis autem vel eum iure qui in ea</li>
        </ul>
      </div>
    </>
  );
};

export default UiOffcanvas;
