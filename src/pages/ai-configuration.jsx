import { useState } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const AiConfiguration = () => {
  const [formData, setFormData] = useState({
    apiKey: '',
    enableAiChatGlobally: true,
    enableAiForAdmin: true,
    enableAiForUsers: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('AI Configuration saved:', formData);
    // Handle form submission here
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      apiKey: '',
      enableAiChatGlobally: true,
      enableAiForAdmin: true,
      enableAiForUsers: true,
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="ai-configuration" />
          </div>

          {/* Main Content */}
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3 pb-3 border-bottom">
              <h6 className="fw-bold mb-0">AI Configuration</h6>
            </div>

            <form onSubmit={handleSubmit}>
              {/* API Key */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">API Key</label>
                  <span className="fs-13">Enter Your API Key</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <input
                      type="text"
                      className="form-control"
                      name="apiKey"
                      value={formData.apiKey}
                      onChange={handleInputChange}
                      placeholder="Enter API Key"
                    />
                  </div>
                </div>
              </div>

              {/* Enable AI Chat Globally */}
              <div className="row align-items-center mb-3">
                <div className="col-9">
                  <label className="form-label d-block mb-0 text-dark">
                    Enable AI Chat Globally
                  </label>
                  <span className="fs-13">Seamless AI Chat Support Across the Globe</span>
                </div>
                <div className="col-3">
                  <div className="d-flex justify-content-end">
                    <div className="form-check form-check-sm form-switch">
                      <input
                        className="form-check-input form-label"
                        type="checkbox"
                        role="switch"
                        name="enableAiChatGlobally"
                        checked={formData.enableAiChatGlobally}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enable AI for Admin */}
              <div className="row align-items-center mb-3">
                <div className="col-9">
                  <label className="form-label d-block mb-0 text-dark">Enable AI for Admin</label>
                  <span className="fs-13">Empower Admins with AI-Driven Automation</span>
                </div>
                <div className="col-3">
                  <div className="d-flex justify-content-end">
                    <div className="form-check form-check-sm form-switch">
                      <input
                        className="form-check-input form-label"
                        type="checkbox"
                        role="switch"
                        name="enableAiForAdmin"
                        checked={formData.enableAiForAdmin}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enable AI for Users */}
              <div className="row align-items-center mb-3">
                <div className="col-9">
                  <label className="form-label d-block mb-0 text-dark">Enable AI for Users</label>
                  <span className="fs-13">Enhance User Experience with AI Assistance</span>
                </div>
                <div className="col-3">
                  <div className="d-flex justify-content-end">
                    <div className="form-check form-check-sm form-switch">
                      <input
                        className="form-check-input form-label"
                        type="checkbox"
                        role="switch"
                        name="enableAiForUsers"
                        checked={formData.enableAiForUsers}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 mt-4 border-top mb-3">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-white me-3"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiConfiguration;
