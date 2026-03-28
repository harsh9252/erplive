import { useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const Sitemap = () => {
  useEffect(() => {
    console.log('Sitemap component mounted');
    return () => console.log('Sitemap component unmounted');
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/sitemap" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Sitemap</h6>
              </div>
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">Generate Sitemap</h6>
                  <p className="text-muted mb-3">Generate an XML sitemap for search engines to crawl your website.</p>
                  <button className="btn btn-primary">Generate Sitemap</button>
                  <hr className="my-4" />
                  <h6 className="mb-3">Current Sitemap</h6>
                  <p className="text-muted mb-2">Last generated: Not available</p>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                    View Sitemap
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
