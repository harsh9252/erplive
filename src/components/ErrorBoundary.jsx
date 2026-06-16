import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh', width: '100%', backgroundColor: '#f8f9fa' }}>
          <div className="text-center p-5 bg-white rounded shadow-sm" style={{ maxWidth: '600px' }}>
            <h1 className="text-danger mb-4"><i className="isax isax-warning-2"></i> Oops! Something went wrong.</h1>
            {/* <p className="text-muted mb-4">We're sorry,.</p> */}
            {/* {this.state.error && (
              <div className="bg-light p-3 rounded text-start mb-4 overflow-auto" style={{ maxHeight: '200px' }}>
                <code>{this.state.error.toString()}</code>
              </div>
            )} */}
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                <i className="isax isax-refresh me-2"></i>Refresh Page
              </button>
              <Link to="/" className="btn btn-outline-secondary" onClick={() => this.setState({ hasError: false })}>
                <i className="isax isax-home me-2"></i>Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
