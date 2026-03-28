import React from 'react';

const FormFileupload = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">File Uploads</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Forms</Link>
            </li>
            <li className="breadcrumb-item active">File Uploads</li>
          </ol>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Dropzone File Upload</h5>
        </div>
        <div className="card-body">
          <p className="text-muted">
            DropzoneJS is an open source library that provides drag’n’drop file uploads with image
            previews.
          </p>
          <form
            action="https://kanakku.dreamstechnologies.com/"
            method="post"
            className="dropzone"
            id="myAwesomeDropzone"
            data-plugin="dropzone"
            data-previews-container="#file-previews"
            data-upload-preview-template="#uploadPreviewTemplate"
          >
            <div className="fallback">
              <input name="file" type="file" multiple />
            </div>
            <div className="dz-message needsclick">
              <i className="ti ti-cloud-upload h1 text-muted"></i>
              <h3>Drop files here or click to upload.</h3>
              <span className="text-muted fs-13">
                (This is just a demo dropzone. Selected files are <strong>not</strong> actually
                uploaded.)
              </span>
            </div>
          </form>
          <div className="dropzone-previews mt-3" id="file-previews"></div>
        </div>
      </div>
      <div className="d-none" id="uploadPreviewTemplate">
        <div className="mt-1 mb-0 shadow-none border">
          <div className="p-2">
            <div className="row align-items-center">
              <div className="col-auto">
                <img
                  data-dz-thumbnail
                  src="#"
                  className="avatar-sm rounded bg-light"
                  alt="User Img"
                />
              </div>
              <div className="col ps-0">
                <Link href="#" className="text-muted fw-bold" data-dz-name></Link>
                <p className="mb-0" data-dz-size></p>
              </div>
              <div className="col-auto">
                <Link href="#" className="btn btn-link btn-lg text-muted" data-dz-remove>
                  <i className="ti ti-x"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormFileupload;
