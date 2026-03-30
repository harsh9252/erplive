import React, { useState, useRef } from "react";

const Version = () => {
  const [versions, setVersions] = useState([
    {
      current: "2.1.0",
      releaseDate: "2026-03-30",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Frontend Development Update (30/03/2026)</h6>
                    <p class="text-muted mb-2">Today’s progress includes successful completion of all planned frontend integrations and UI updates as per the provided documentation.</p>
                    <ul>
                        <li>The feature branch <b>feature_ERP_30_03_26</b> has been created and updated on GitHub.</li>
                        <li>All APIs mentioned in the provided document have been fully integrated.</li>
                        <li>Additional UI improvements and refinements have been implemented where required.</li>
                        <li>All modules are now functionally connected with backend APIs.</li>
                    </ul>
                    <h6 class="fw-bold">Current Status:</h6>
                    <ul>
                        <li>Development work is completed.</li>
                        <li>The application has now moved to the testing phase for validation and bug identification.</li>
                    </ul>
                    <p class="text-muted">Overall, the system is stable and ready for thorough testing.</p>
                </div>
            `,
    },
    {
      current: "2.0.0",
      releaseDate: "2026-03-28",
      changes: `
                <div class="mb-3">
                    <p class="text-muted mb-2">All UI changes and updates have been implemented as per the Atyani ERP — Frontend Developer document guidelines.</p>
                    <p class="text-muted mb-3">A new repository has been created with the name: <b>Features ERP (28/03/2026)</b>.</p>

                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">1. Dashboard</h6>
                            <ul>
                                <li>Dashboard UI redesigned and updated — <span class="badge bg-success">Completed</span></li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1">2. Company & System Setup</h6>
                            <ul>
                                <li><b>Company Profile:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Financial Years:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Users & Access:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Roles & Permissions:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Data Backup:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1">3. Accounting & Finance</h6>
                            <ul>
                                <li><b>Ledger Groups:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Ledgers:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Voucher Entry:</b> — <span class="badge bg-success">Completed</span></li>
                                <li><b>Bank Reconciliation:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Interest Calculation:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Cost Centres:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Budgets:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">4. Invoicing & Billing</h6>
                            <ul>
                                <li><b>Sales Invoices:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Purchase Invoices:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Credit Notes (Sales Returns):</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Debit Notes (Purchase Returns):</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Proforma Invoices:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Sales Orders:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Purchase Orders:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1">5. Inventory Management</h6>
                            <ul>
                                <li><b>Stock Items:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Stock Summary:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Stock Transfer:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Wastage:</b> New UI implemented — <span class="badge bg-success">Completed</span></li>
                                <li><b>Stock Verification:</b> New UI implemented — <span class="badge bg-warning text-dark">In Progress</span></li>
                                <li><b>HSN / SAC Codes:</b> New UI implemented — <span class="badge bg-warning text-dark">In Progress</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (versionData) => {
    const updated = [versionData, ...versions].slice(0, 2);
    setVersions(updated);
    setShowModal(false);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Version Control</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Version
        </button>
      </div>

      {versions.map((v, idx) => (
        <div key={idx} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">
              Version {v.current}{" "}
              <span className="badge bg-primary">{v.releaseDate}</span>
            </h5>
            <h6>Release Notes:</h6>
            <div dangerouslySetInnerHTML={{ __html: v.changes }} />
          </div>
        </div>
      ))}

      {showModal && (
        <VersionModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
};

const VersionModal = ({ onClose, onSave }) => {
  const [version, setVersion] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [tableFormVisible, setTableFormVisible] = useState(false);
  const [tableRows, setTableRows] = useState(2);
  const [tableCols, setTableCols] = useState(2);

  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [textColor, setTextColor] = useState("#000000");

  const editorRef = useRef(null);

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const insertHTMLAtCaret = (html) => {
    const editor = editorRef.current;
    editor.focus();

    const sel = window.getSelection();
    if (!sel.rangeCount) {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    const range = sel.getRangeAt(0);
    range.deleteContents();

    const temp = document.createElement("div");
    temp.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node;
    while ((node = temp.firstChild)) {
      frag.appendChild(node);
    }
    range.insertNode(frag);

    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    editor.focus();
  };

  const insertTable = () => {
    const rows = parseInt(tableRows, 10);
    const cols = parseInt(tableCols, 10);

    if (!rows || !cols || rows < 1 || cols < 1) return;

    let tableHTML =
      "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    for (let r = 0; r < rows; r++) {
      tableHTML += "<tr>";
      for (let c = 0; c < cols; c++) {
        tableHTML +=
          "<td style='padding:5px; border: 1px solid black;'>&nbsp;</td>";
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</table><br/>";

    insertHTMLAtCaret(tableHTML);
    setTableFormVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const notesContent = editorRef.current.innerHTML;
    onSave({
      current: version || "1.0.0",
      releaseDate: releaseDate || new Date().toISOString().split("T")[0],
      changes: notesContent,
    });
    setVersion("");
    setReleaseDate("");
    editorRef.current.innerHTML = "";
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Version</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Version Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g., 1.4.2"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Release Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Release Notes</label>

                  {/* Toolbar */}
                  <div className="mb-2 d-flex flex-wrap gap-1 align-items-center">
                    {/* Formatting icons */}
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("bold")}
                      title="Bold"
                    >
                      <b>B</b>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("italic")}
                      title="Italic"
                    >
                      <i>I</i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("underline")}
                      title="Underline"
                    >
                      <u>U</u>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("insertUnorderedList")}
                      title="Bullet List"
                    >
                      &#8226;
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("insertOrderedList")}
                      title="Numbered List"
                    >
                      1.
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("insertHorizontalRule")}
                      title="Horizontal Rule"
                    >
                      &#8213;
                    </button>

                    {/* Alignment buttons */}
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("justifyLeft")}
                      title="Align Left"
                    >
                      &#8676;
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("justifyCenter")}
                      title="Align Center"
                    >
                      &#8596;
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("justifyRight")}
                      title="Align Right"
                    >
                      &#8677;
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => format("justifyFull")}
                      title="Justify"
                    >
                      &#8801;
                    </button>

                    {/* Text Color button */}
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => setColorPickerVisible(!colorPickerVisible)}
                      title="Text Color"
                      style={{ position: "relative" }}
                    >
                      <span style={{ color: textColor, fontWeight: "bold" }}>
                        A
                      </span>
                    </button>

                    {/* Color Picker */}
                    {colorPickerVisible && (
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => {
                          setTextColor(e.target.value);
                          format("foreColor", e.target.value);
                        }}
                        onBlur={() => setColorPickerVisible(false)}
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        autoFocus
                      />
                    )}

                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => setTableFormVisible(!tableFormVisible)}
                      title="Insert Table"
                    >
                      &#x2396;
                    </button>
                  </div>

                  {/* Table Input Form */}
                  {tableFormVisible && (
                    <div className="mb-2 d-flex gap-2 align-items-center">
                      <input
                        type="number"
                        min="1"
                        className="form-control form-control-sm"
                        style={{ width: "80px" }}
                        value={tableRows}
                        onChange={(e) => setTableRows(e.target.value)}
                        placeholder="Rows"
                      />
                      <input
                        type="number"
                        min="1"
                        className="form-control form-control-sm"
                        style={{ width: "80px" }}
                        value={tableCols}
                        onChange={(e) => setTableCols(e.target.value)}
                        placeholder="Cols"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={insertTable}
                      >
                        Insert
                      </button>
                    </div>
                  )}

                  {/* Editor */}
                  <div
                    ref={editorRef}
                    contentEditable
                    className="border p-2"
                    style={{ minHeight: "150px", borderRadius: "4px" }}
                  ></div>
                </div>

                <button type="submit" className="btn btn-primary me-2">
                  Save Version
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Version;
