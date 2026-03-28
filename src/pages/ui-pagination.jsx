import React from 'react';

const UiPagination = () => {
  return (
    <>
      {/* Page Header */}
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Pagination</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="#">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="#">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Pagination</li>
          </ol>
        </div>
      </div>

      {/* Pagination Components */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card card-h-100">
            <div className="card-header">
              <h5 className="card-title">Default Pagination</h5>
            </div>
            <div className="card-body">
              <p>Simple pagination inspired by Rdio, great for apps and search results.</p>
              <nav>
                <ul className="pagination mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Disabled and Active States</h5>
            </div>
            <div className="card-body">
              <p>
                Pagination links are customizable for different circumstances. Use{' '}
                <code>.disabled</code> for links that appear un-clickable and <code>.active</code>{' '}
                to indicate the current page.
              </p>
              <nav aria-label="...">
                <ul className="pagination mb-0">
                  <li className="page-item disabled">
                    <Link className="page-link" href="#" tabIndex="-1">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Alignment</h5>
            </div>
            <div className="card-body">
              <p>Change the alignment of pagination components with flexbox utilities.</p>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <Link className="page-link" href="#" tabIndex="-1">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className="page-item disabled">
                    <Link className="page-link" href="#" tabIndex="-1">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Sizing</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code> .pagination-lg</code> or <code> .pagination-sm</code> for additional
                sizes.
              </p>
              <nav>
                <ul className="pagination pagination-lg">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Custom Icon Pagination</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code> .pagination-boxed</code> for rounded pagination.
              </p>
              <nav>
                <ul className="pagination pagination-boxed">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <i className="ti ti-chevron-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <i className="ti ti-chevron-right align-middle"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul className="pagination pagination-boxed">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <i className="ti ti-arrow-left"></i>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <i className="ti ti-arrow-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul className="pagination pagination-boxed mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <iconify-icon
                        icon="solar:arrow-left-line-duotone"
                        className="fs-18"
                      ></iconify-icon>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <iconify-icon
                        icon="solar:arrow-right-line-duotone"
                        className="fs-18"
                      ></iconify-icon>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Boxed Pagination</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code> .pagination-boxed</code> for rounded pagination.
              </p>
              <nav>
                <ul className="pagination pagination-sm pagination-boxed">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
                <ul className="pagination pagination-boxed">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
                <ul className="pagination pagination-lg pagination-boxed mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Rounded Pagination</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code> .pagination-rounded</code> for rounded pagination.
              </p>
              <nav>
                <ul className="pagination pagination-rounded pagination-boxed mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Soft Pagination</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code> .pagination-rounded</code> for rounded pagination.
              </p>
              <nav>
                <ul className="pagination pagination-soft-primary pagination-boxed mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <i className="ti ti-chevron-left"></i>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <i className="ti ti-chevron-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Custom Color Pagination</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code> .pagination-boxed</code> for rounded pagination.
              </p>
              <nav>
                <ul className="pagination pagination-boxed pagination-primary flex-wrap gap-lg-0 gap-md-0 gap-1">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <i className="ti ti-chevron-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <i className="ti ti-chevron-right align-middle"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul className="pagination pagination-boxed pagination-secondary flex-wrap gap-lg-0 gap-md-0 gap-1">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <i className="ti ti-arrow-left"></i>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <i className="ti ti-arrow-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul className="pagination pagination-boxed pagination-dark mb-0 flex-wrap gap-lg-0 gap-md-0 gap-1">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <iconify-icon
                        icon="solar:arrow-left-line-duotone"
                        className="fs-18"
                      ></iconify-icon>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <iconify-icon
                        icon="solar:arrow-right-line-duotone"
                        className="fs-18"
                      ></iconify-icon>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Gradient Color Pagination</h5>
            </div>
            <div className="card-body">
              <p>
                Add <code> .pagination-boxed</code> for rounded pagination.
              </p>
              <nav>
                <ul className="pagination pagination-boxed pagination-gradient pagination-primary flex-wrap gap-lg-0 gap-md-0 gap-1">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <i className="ti ti-chevron-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <i className="ti ti-chevron-right align-middle"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul className="pagination pagination-boxed pagination-secondary pagination-gradient flex-wrap gap-lg-0 gap-md-0 gap-1">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <i className="ti ti-arrow-left"></i>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <i className="ti ti-arrow-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav>
                <ul className="pagination pagination-boxed pagination-dark pagination-gradient mb-0 flex-wrap gap-lg-0 gap-md-0 gap-1">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <iconify-icon
                        icon="solar:arrow-left-line-duotone"
                        className="fs-18"
                      ></iconify-icon>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      4
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      5
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <iconify-icon
                        icon="solar:arrow-right-line-duotone"
                        className="fs-18"
                      ></iconify-icon>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiPagination;
