import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const SeoSetup = () => {
  useEffect(() => {
    console.log('SeoSetup component mounted');
    return () => console.log('SeoSetup component unmounted');
  }, []);

  const [seo, setSeo] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogTitle: '',
    ogDescription: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/seo-setup" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">SEO Setup</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Meta Title</label>
                    <input type="text" className="form-control" name="metaTitle" value={seo.metaTitle} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Meta Keywords</label>
                    <input type="text" className="form-control" name="metaKeywords" value={seo.metaKeywords} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Meta Description</label>
                    <textarea className="form-control" name="metaDescription" value={seo.metaDescription} onChange={handleChange} rows="3" />
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-white">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoSetup;
