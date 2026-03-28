import React from 'react';

const UiGrid = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Grid System</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Grid System</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Grid Options</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                See how aspects of the Bootstrap grid system work across multiple devices with a
                handy table.
              </p>
              <div className="table-responsive">
                <table className="table table-nowrap table-bordered table-striped mb-0">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-center"></th>
                      Extra small
                      <br />
                      <small>&lt;576px</small>
                      <th className="text-center"></th>
                      Small
                      <br />
                      <small>≥576px</small>
                      <th className="text-center"></th>
                      Medium
                      <br />
                      <small>≥768px</small>
                      <th className="text-center"></th>
                      Large
                      <br />
                      <small>≥992px</small>
                      <th className="text-center"></th>
                      Extra Large
                      <br />
                      <small>≥1200px</small>
                      <th className="text-center"></th>
                      Extra Large
                      <br />
                      <small>≥1400px</small>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="text-nowrap" scope="row">
                        Container <code className="fw-normal">max-width</code>
                      </th>
                      <td>None (auto)</td>
                      <td>540px</td>
                      <td>720px</td>
                      <td>960px</td>
                      <td>1140px</td>
                      <td>1320px</td>
                    </tr>
                    <tr>
                      <th className="text-nowrap" scope="row">
                        Class prefix
                      </th>
                      <td>
                        <code>.col-</code>
                      </td>
                      <td>
                        <code>.col-sm-</code>
                      </td>
                      <td>
                        <code>.col-md-</code>
                      </td>
                      <td>
                        <code>.col-lg-</code>
                      </td>
                      <td>
                        <code>.col-xl-</code>
                      </td>
                      <td>
                        <code>.col-xxl-</code>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-nowrap" scope="row">
                        # of columns
                      </th>
                      <td colspan="6">12</td>
                    </tr>
                    <tr>
                      <th className="text-nowrap" scope="row">
                        Gutter width
                      </th>
                      <td colspan="6">2rem (1rem on left and right)</td>
                    </tr>
                    <tr>
                      <th className="text-nowrap" scope="row">
                        Custom gutters
                      </th>
                      <td colspan="6">Yes</td>
                    </tr>
                    <tr>
                      <th className="text-nowrap" scope="row">
                        Nestable
                      </th>
                      <td colspan="6">Yes</td>
                    </tr>
                    <tr>
                      <th className="text-nowrap" scope="row">
                        Column ordering
                      </th>
                      <td colspan="6">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Grid Example</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                You may use predefined grid classes. Using
                <code>.col-lg-* </code>you can set the grid system.
              </p>
              <div className="grid-structure">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="grid-container"></div>
                    col-lg-12
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-11">
                  <div className="grid-container"></div>
                  col-lg-11
                </div>
              </div>
              <div className="col-lg-1">
                <div className="grid-container"></div>
                col-lg-1
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="grid-container"></div>
              col-lg-10
            </div>
          </div>
          <div className="col-lg-2">
            <div className="grid-container"></div>
            col-lg-2
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="grid-container"></div>
          col-lg-9
        </div>
      </div>
      <div className="col-lg-3">
        <div className="grid-container"></div>
        col-lg-3
      </div>
    </>
  );
};

export default UiGrid;
