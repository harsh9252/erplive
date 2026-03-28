import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="main-wrapper auth-bg">
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
            <div className="col-lg-6 mx-auto">
              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill text-center">
                  <div className="mx-auto mb-4">
                    <img
                      src="/assets/img/error-404.svg"
                      className="img-fluid"
                      alt="404 Error"
                      style={{ maxWidth: '400px' }}
                    />
                  </div>
                  <div className="mb-4">
                    <h1 className="display-4 fw-bold text-primary mb-3">404</h1>
                    <h4 className="mb-3">Oops! Page Not Found</h4>
                    <p className="text-muted mb-4">
                      The page you are looking for might have been removed, had its name changed, or
                      is temporarily unavailable.
                    </p>
                  </div>
                  <div className="d-flex justify-content-center gap-3">
                    <Link to="/" className="btn btn-primary">
                      <i className="isax isax-home-2 me-1"></i>
                      Go Home
                    </Link>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => window.history.back()}
                    >
                      <i className="isax isax-arrow-left me-1"></i>
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
