import React from 'react';

const UiBreadcrumb = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Breadcrumb</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Breadcrumb</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Default Breadcrumb</h5>
            </div>
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 py-2">
                  <li className="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 py-2">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 py-2">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="#">Library</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Breadcrumb with Icons</h5>
            </div>
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-2 mb-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    <i className="ti ti-smart-home fs-16 me-1"></i>Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-2 mb-0">
                  <li className="breadcrumb-item">
                    <Link href="#">
                      <i className="ti ti-smart-home fs-16 me-1"></i>Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-2 mb-0">
                  <li className="breadcrumb-item">
                    <Link href="#">
                      <i className="ti ti-smart-home fs-16 me-1"></i>Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="#">Library</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Arrow Style</h5>
            </div>
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-arrow mb-0 py-2">
                  <li className="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-arrow mb-0 py-2">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-arrow mb-0 py-2">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="#">Library</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Pipe Style</h5>
            </div>
            <div className="card-body">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-pipe py-2 mb-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-pipe py-2 mb-0">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-pipe py-2 mb-0">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="#">Library</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiBreadcrumb;
