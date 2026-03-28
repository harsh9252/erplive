import React from 'react';

const UiListGroup = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">List Group</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">List Group</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Basic example</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                The most basic list group is an unordered list with list items and the proper
                classes. Build upon it with the options that follow, or with your own CSS as needed.
              </p>
              <ul className="list-group">
                <li className="list-group-item">
                  <i className="ti ti-brand-slack me-1 align-middle fs-18"></i> Slack Collaboration
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-nextcloud me-1 align-middle fs-18"></i> Nextcloud File
                  Sharing
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-zoom me-1 align-middle fs-18"></i> Zoom Video Meetings
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-stripe me-1 align-middle fs-18"></i> Stripe Billing
                  System
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Active Items</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Add <code>.active</code> to a <code>.list-group-item</code> to indicate the current
                active selection.
              </p>
              <ul className="list-group">
                <li className="list-group-item active">
                  <i className="ti ti-brand-slack me-1 align-middle fs-18"></i> Slack Collaboration
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-nextcloud me-1 align-middle fs-18"></i> Nextcloud File
                  Sharing
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-zoom me-1 align-middle fs-18"></i> Zoom Video Meetings
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-notion me-1 align-middle fs-18"></i> Notion Workspace
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-stripe me-1 align-middle fs-18"></i> Stripe Billing
                  System
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Disabled Items</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code>.disabled</code> to a <code>.list-group-item</code> to make it
                <em>appear</em> disabled.
              </p>
              <ul className="list-group">
                <li className="list-group-item disabled" aria-disabled="true">
                  <i className="ti ti-brand-slack me-1 align-middle fs-18"></i> Slack Collaboration
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-nextcloud me-1 align-middle fs-18"></i> Nextcloud File
                  Sharing
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-zoom me-1 align-middle fs-18"></i> Zoom Video Meetings
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-notion me-1 align-middle fs-18"></i> Notion Workspace
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-stripe me-1 align-middle fs-18"></i> Stripe Billing
                  System
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Links and Buttons</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Use <code>&lt;a&gt;</code>s or
                <code>&lt;button&gt;</code>s to create <em>actionable</em> list group items with
                hover, disabled, and active states by adding
                <code>.list-group-item-action</code>.
              </p>
              <div className="list-group">
                <Link href="#" className="list-group-item list-group-item-action active">
                  <i className="ti ti-brand-slack me-1 align-middle fs-18"></i> Slack Collaboration
                </Link>
                <Link href="#" className="list-group-item list-group-item-action">
                  <i className="ti ti-brand-nextcloud me-1 align-middle fs-18"></i> Nextcloud File
                  Sharing
                </Link>
                <button type="button" className="list-group-item list-group-item-action">
                  <i className="ti ti-brand-zoom me-1 align-middle fs-18"></i> Zoom Video Meetings
                </button>
                <button type="button" className="list-group-item list-group-item-action">
                  <i className="ti ti-brand-notion me-1 align-middle fs-18"></i> Notion Workspace
                </button>
                <Link
                  href="#"
                  className="list-group-item list-group-item-action disabled"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  <i className="ti ti-brand-stripe me-1 align-middle fs-18"></i> Stripe Billing
                  System
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Flush</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Add <code>.list-group-flush</code> to remove some borders and rounded corners to
                render list group items edge-to-edge in a parent container (e.g., cards).
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <i className="ti ti-brand-slack me-1 align-middle fs-18"></i> Slack Collaboration
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-nextcloud me-1 align-middle fs-18"></i> Nextcloud File
                  Sharing
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-zoom me-1 align-middle fs-18"></i> Zoom Video Meetings
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-notion me-1 align-middle fs-18"></i> Notion Workspace
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-stripe me-1 align-middle fs-18"></i> Stripe Billing
                  System
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Numbered</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Numbers are generated by <code>counter-reset</code> on the <code>&lt;ol&gt;</code>,
                and then styled and placed with a<code>::before</code> psuedo-element on the{' '}
                <code>&lt;li&gt;</code> with
                <code>counter-increment</code> and <code>content</code>.
              </p>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">SmartOne Admin</div>
                    SmartOne Admin
                  </div>
                  <span className="badge bg-primary rounded-pill">865</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">SmartOne React Admin</div>
                    SmartOne React Admin
                  </div>
                  <span className="badge bg-primary rounded-pill">140</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Angular Version</div>
                    Angular Version
                  </div>
                  <span className="badge bg-primary rounded-pill">85</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Contextual Classes</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Use contextual classes to style list items with a stateful background and color.
              </p>
              <ul className="list-group">
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item list-group-item-primary">
                  A simple primary list group item
                </li>
                <li className="list-group-item list-group-item-secondary">
                  A simple secondary list group item
                </li>
                <li className="list-group-item list-group-item-success">
                  A simple success list group item
                </li>
                <li className="list-group-item list-group-item-danger">
                  A simple danger list group item
                </li>
                <li className="list-group-item list-group-item-warning">
                  A simple warning list group item
                </li>
                <li className="list-group-item list-group-item-info">
                  A simple info list group item
                </li>
                <li className="list-group-item list-group-item-light">
                  A simple light list group item
                </li>
                <li className="list-group-item list-group-item-dark">
                  A simple dark list group item
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Contextual Classes with Link</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Use contextual classes to style list items with a stateful background and color.
              </p>
              <div className="list-group">
                <Link href="#" className="list-group-item list-group-item-action">
                  Darius ac facilities in
                </Link>
                <Link
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-primary"
                >
                  A simple primary list group item
                </Link>
                <Link
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  A simple secondary list group item
                </Link>
                <Link
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-success"
                >
                  A simple success list group item
                </Link>
                <Link
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-danger"
                >
                  A simple danger list group item
                </Link>
                <Link
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-warning"
                >
                  A simple warning list group item
                </Link>
                <Link href="#" className="list-group-item list-group-item-action list-group-item-info">
                  A simple info list group item
                </Link>
                <Link
                  href="#"
                  className="list-group-item list-group-item-action list-group-item-light"
                >
                  A simple light list group item
                </Link>
                <Link href="#" className="list-group-item list-group-item-action list-group-item-dark">
                  A simple dark list group item
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Custom content</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Add nearly any HTML within, even for linked list groups like the one below, with the
                help of flexbox utilities.
              </p>
              <div className="list-group">
                <Link href="#" className="list-group-item list-group-item-action active">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="fs-16 mb-1">List group item heading</h5>
                    <small>3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <small>Donec id elit non mi porta.</small>
                </Link>
                <Link href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="fs-16 mb-1">List group item heading</h5>
                    <small className="text-muted">3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <small className="text-muted">Donec id elit non mi porta.</small>
                </Link>
                <Link href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="fs-16 mb-1">List group item heading</h5>
                    <small className="text-muted">3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                    varius blandit.
                  </p>
                  <small className="text-muted">Donec id elit non mi porta.</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Horizontal</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code>.list-group-horizontal</code> to change the layout of list group items
                from vertical to horizontal across all breakpoints. Alternatively, choose a
                responsive variant <code>.list-group-horizontal-{sm | md | lg | xl | xxl}</code> to
                make a list group horizontal starting at that breakpoint’s <code>min-width</code>.
              </p>
              <ul className="list-group list-group-horizontal mb-3">
                <li className="list-group-item">
                  <i className="ti ti-brand-slack me-1 align-middle fs-18"></i> Slack
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-zoom me-1 align-middle fs-18"></i> Zoom
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-trello me-1 align-middle fs-18"></i> Trello
                </li>
              </ul>
              <ul className="list-group list-group-horizontal-sm mb-3">
                <li className="list-group-item">
                  <i className="ti ti-brand-notion me-1 align-middle fs-18"></i> Notion
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-stripe me-1 align-middle fs-18"></i> Stripe
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-dropbox me-1 align-middle fs-18"></i> Dropbox
                </li>
              </ul>
              <ul className="list-group list-group-horizontal-md">
                <li className="list-group-item">
                  <i className="ti ti-brand-github me-1 align-middle fs-18"></i> GitHub
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-discord me-1 align-middle fs-18"></i> Discord
                </li>
                <li className="list-group-item">
                  <i className="ti ti-brand-asana me-1 align-middle fs-18"></i> Asana
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">With Badges</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Add badges to any list group item to show unread counts, activity, and more with the
                help of some utilities.
              </p>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center"></li>
                New Task Assignments
                <span className="badge bg-primary rounded-pill">5</span>
                <li className="list-group-item d-flex justify-content-between align-items-center"></li>
                Upcoming Meetings
                <span className="badge bg-success rounded-pill">3</span>
                <li className="list-group-item d-flex justify-content-between align-items-center"></li>
                System Notifications
                <span className="badge bg-danger rounded-pill">15+</span>
                <li className="list-group-item d-flex justify-content-between align-items-center"></li>
                Completed Projects
                <span className="badge bg-success rounded-pill">8</span>
                <li className="list-group-item d-flex justify-content-between align-items-center"></li>
                Overdue Tasks
                <span className="badge bg-warning rounded-pill">2</span>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Checkboxes and Radios</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Place Bootstrap’s checkboxes and radios within list group items and customize as
                needed. You can use them without
                <code>&lt;label&gt;</code>s, but please remember to include an
                <code>aria-label</code> attribute and value for accessibility.
              </p>
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    id="firstCheckbox"
                  />
                  <label className="form-check-label" htmlFor="firstCheckbox">
                    First checkbox
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    id="secondCheckbox"
                  />
                  <label className="form-check-label" htmlFor="secondCheckbox">
                    Second checkbox
                  </label>
                </li>
              </ul>
              <ul className="list-group mt-2">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="listGroupRadio"
                    value=""
                    id="firstRadio"
                    checked
                  />
                  <label className="form-check-label" htmlFor="firstRadio">
                    First radio
                  </label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="radio"
                    name="listGroupRadio"
                    value=""
                    id="secondRadio"
                  />
                  <label className="form-check-label" htmlFor="secondRadio">
                    Second radio
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiListGroup;
