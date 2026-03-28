import React from 'react';

const UiSortable = () => {
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Sortable JS</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card custom-card">
            <div className="card-header">
              <div className="card-title"></div>
              SIMPLE LIST
            </div>
          </div>
          <div className="card-body">
            <ol className="list-group sortable-list list-group-numbered" id="simple-list">
              <li className="list-group-item">Design logo for fictional company</li>
              <li className="list-group-item">Draft 300-word blog post</li>
              <li className="list-group-item">Create project plan with milestones</li>
              <li className="list-group-item">Develop sample interview questions</li>
              <li className="list-group-item">Generate customer feedback for product.</li>
              <li className="list-group-item">Write email template for newsletter.</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="col-xl-8">
        <div className="card custom-card">
          <div className="card-header">
            <div className="card-title">SHARED LISTS</div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-6">
                <ol className="list-group sortable-list list-group-numbered" id="shared-left">
                  <li className="list-group-item">Sketch a website homepage</li>
                  <li className="list-group-item">Plan team-building activity.</li>
                  <li className="list-group-item">Summarize meeting minutes.</li>
                  <li className="list-group-item">Code a simple webpage.</li>
                  <li className="list-group-item">Create survey questions.</li>
                  <li className="list-group-item">Schedule team meeting.</li>
                </ol>
              </div>
              <div className="col-xl-6">
                <ol className="list-group sortable-list list-group-numbered" id="shared-right">
                  <li className="list-group-item">Edit product description.</li>
                  <li className="list-group-item">Brainstorm marketing ideas.</li>
                  <li className="list-group-item">Write slogan for brand.</li>
                  <li className="list-group-item">Update contact information.</li>
                  <li className="list-group-item">Proofread blog post.</li>
                  <li className="list-group-item">Analyze sales data.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiSortable;
