import React from 'react';

const UiLightbox = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Lightbox</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Lightbox</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Single Image Lightbox</h5>
            </div>
            <div className="card-body pb-1">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Link href="assets/img/media/img-01.jpg" className="image-popup">
                    <img src="/assets/img/media/img-01.jpg" className="img-fluid" alt="image" />
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link href="assets/img/media/img-02.jpg" className="image-popup">
                    <img src="/assets/img/media/img-02.jpg" className="img-fluid" alt="image" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Image with Description</h5>
            </div>
            <div className="card-body pb-1">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Link
                    href="assets/img/media/img-03.jpg"
                    className="image-popup-desc"
                    data-title="Title 01"
                    data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                  >
                    <img
                      src="/assets/img/media/img-03.jpg"
                      className="img-fluid"
                      alt="work-thumbnail"
                    />
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link
                    href="assets/img/media/img-04.jpg"
                    className="image-popup-desc"
                    data-title="Title 02"
                    data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                  >
                    <img
                      src="/assets/img/media/img-04.jpg"
                      className="img-fluid"
                      alt="work-thumbnail"
                    />
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link
                    href="assets/img/media/img-05.jpg"
                    className="image-popup-desc"
                    data-title="Title 03"
                    data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                  >
                    <img
                      src="/assets/img/media/img-05.jpg"
                      className="img-fluid"
                      alt="work-thumbnail"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiLightbox;
