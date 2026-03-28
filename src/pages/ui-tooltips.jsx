import React from 'react';

const UiTooltips = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Tooltips</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Tooltips</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Tooltips on links</h5>
            </div>
            <div className="card-body">
              <p>Hover over the links below to see tooltips.</p>
              <p className="muted mb-0">
                Placeholder text to demonstrate some{' '}
                <Link
                  href="#"
                  className="text-primary"
                  data-bs-toggle="tooltip"
                  title="Default tooltip"
                >
                  inline links
                </Link>{' '}
                with tooltips. This is now just filler, no killer. Content placed here just to mimic
                the presence of{' '}
                <Link
                  href="#"
                  className="text-primary"
                  data-bs-toggle="tooltip"
                  title="Another tooltip"
                >
                  real text
                </Link>
                . And all that just to give you an idea of how tooltips would look when used in
                real-world situations. So hopefully you've now seen how{' '}
                <Link
                  href="#"
                  className="text-primary"
                  data-bs-toggle="tooltip"
                  title="Another one here too"
                >
                  these tooltips on links
                </Link>{' '}
                can work in practice, once you use them on{' '}
                <Link
                  href="#"
                  className="text-primary"
                  data-bs-toggle="tooltip"
                  title="The last tip!"
                >
                  your own
                </Link>{' '}
                site or project.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Disabled Elements</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Elements with the <code>disabled</code> attribute aren’t interactive, meaning users
                cannot focus, hover, or click them to trigger a tooltip (or popover). As a
                workaround, you’ll want to trigger the tooltip from a wrapper{' '}
                <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code>, ideally made
                keyboard-focusable using <code>tabIndex="0"</code>, and override the{' '}
                <code>pointer-events</code> on the disabled element.
              </p>
              <div>
                <span
                  className="d-inline-block"
                  tabIndex="0"
                  data-bs-toggle="tooltip"
                  title="Disabled tooltip"
                >
                  <button className="btn btn-primary pe-none" type="button" disabled>
                    Disabled button
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Hover Elements</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Elements with the <code>disabled</code> attribute aren’t interactive, meaning users
                cannot focus, hover, or click them to trigger a tooltip (or popover). As a
                workaround, you’ll want to trigger the tooltip from a wrapper{' '}
                <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code>, ideally made
                keyboard-focusable using <code>tabIndex="0"</code>, and override the{' '}
                <code>pointer-events</code> on the disabled element.
              </p>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Hover Only, Not a Focus"
              >
                Hover
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Directions</h5>
            </div>
            <div className="card-body">
              <p>
                Hover over the buttons below to see the four tooltips directions: top, right,
                bottom, and left.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Tooltip on top"
                >
                  Tooltip on top
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Tooltip on bottom"
                >
                  Tooltip on bottom
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  title="Tooltip on left"
                >
                  Tooltip on left
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Tooltip on right"
                >
                  Tooltip on right
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">HTML Tags</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">And with custom HTML added:</p>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="<em>Tooltip<u>with</u><b>HTML</b>"
              >
                Tooltip with HTML
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="tooltip"
                data-bs-trigger="click"
                data-bs-html="true"
                data-bs-placement="bottom"
                title=""
                data-bs-original-title="<em>Tooltip<u>with</u><b>HTML</b>"
              >
                Click Me
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Color Tooltips</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                We set a custom class with ex.
                <code>data-bs-custom-class="primary-tooltip"</code> to scope our background-color
                primary appearance and use it to override a local CSS variable.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-primary"
                  title="This top tooltip is themed via CSS variables."
                >
                  Primary tooltip
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-danger"
                  title="This top tooltip is themed via CSS variables."
                >
                  Danger tooltip
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-info"
                  title="This top tooltip is themed via CSS variables."
                >
                  Info tooltip
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-success"
                  title="This top tooltip is themed via CSS variables."
                >
                  Success tooltip
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-secondary"
                  title="This top tooltip is themed via CSS variables."
                >
                  Secondary tooltip
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-warning"
                  title="This top tooltip is themed via CSS variables."
                >
                  Warning tooltip
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="tooltip-dark"
                  title="This top tooltip is themed via CSS variables."
                >
                  Dark tooltip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiTooltips;
