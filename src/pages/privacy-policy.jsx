import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="mb-3 border-bottom pb-3">
            <h6 className="mb-0">Privacy Policy</h6>
          </div>
          <div className="card mb-0">
            <div className="card-body">
              <p className="mb-3">
                At Kanakku, your privacy is important to us. This Privacy Policy explains how we
                collect, use, disclose, and protect the personal information you provide while using
                our application or visiting our website. We are committed to handling your data with
                transparency and integrity. Whether you're managing finances, tracking expenses, or
                reviewing reports, we ensure that your information remains secure and confidential.
                We only collect data necessary to improve your experience and provide essential
                services. By using Kanakku, you agree to the practices outlined in this policy.
                Please review it carefully to understand how your data is handled and protected.
              </p>
              <h6 className="fs-16 fw-semibold mb-3">Information We Collect</h6>
              <p className="mb-2">We may collect the following types of personal information :</p>
              <p className="mb-2 d-inline-flex align-items-center flex-wrap">
                <i className="fa fa-circle fs-4 me-2"></i>
                <span className="text-dark fw-medium me-1">Personal Information :</span> Name, email
                address, phone number, and user credentials.
              </p>
              <p className="mb-2 d-inline-flex align-items-center flex-wrap">
                <i className="fa fa-circle fs-4 me-2"></i>
                <span className="text-dark fw-medium me-1">Financial Data :</span> Bank details,
                transactions, invoices, payment information
              </p>
              <p className="mb-3 d-inline-flex align-items-center flex-wrap">
                <i className="fa fa-circle fs-4 me-2"></i>
                <span className="text-dark fw-medium me-1">Usage Data :</span> App usage patterns,
                access times, and user activity logs.
              </p>
              <h6 className="fs-16 fw-semibold mb-3">How We Use Your Information</h6>
              <p className="mb-2">We may use the information we collect to :</p>
              <p className="mb-2 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>Manage your Kanakku account securely with
                personalized access and reliable service features.
              </p>
              <p className="mb-2 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>Handle financial transactions and generate
                accurate reports for better money management.
              </p>
              <p className="mb-2 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>Enhance usability and ensure smooth
                performance across all features and devices.
              </p>
              <p className="mb-3 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>Notify you with important updates, special
                offers, and timely customer support assistance.
              </p>
              <h6 className="fs-16 fw-semibold mb-3">Information Sharing and Disclosure</h6>
              <p className="mb-2">We do not sell your data. We may share your information :</p>
              <p className="mb-2 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>With trusted third-party service providers
              </p>
              <p className="mb-2 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>For analytics and reporting (in anonymized
                form)
              </p>
              <p className="mb-3 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>If required by law or to protect rights
              </p>
              <h6 className="fs-16 fw-semibold mb-3">Data Security</h6>
              <p className="mb-3">
                We implement advanced encryption methods and industry-standard security protocols to
                ensure your data remains safe at all times. Our systems are designed to protect
                against unauthorized access, data breaches, misuse, or any form of malicious
                activity. We regularly update our infrastructure and monitor for vulnerabilities to
                maintain a secure environment for all user information stored within Kanakku.
              </p>
              <h6 className="fs-16 fw-semibold mb-3">Cookies and Tracking</h6>
              <p className="mb-3">
                We use cookies to improve the functionality of our platform and provide you with a
                more personalized user experience. Cookies help us analyze usage patterns, remember
                preferences, and optimize performance. You have control over these settings and can
                manage or disable cookies anytime through your browser’s preferences or settings
                panel.
              </p>
              <h6 className="fs-16 fw-semibold mb-3">Your Privacy Rights</h6>
              <p className="mb-2">You may request to:</p>
              <p className="mb-2 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>Access or correct your data
              </p>
              <p className="mb-2 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>Delete your account
              </p>
              <p className="mb-3 d-flex align-items-center">
                <i className="fa fa-circle fs-4 me-2"></i>Opt out of communications
              </p>
              <h6 className="fs-16 fw-semibold mb-3">Changes to This Policy</h6>
              <p>
                We may update this policy periodically. Significant changes will be notified via
                email or within the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
