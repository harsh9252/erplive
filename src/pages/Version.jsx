import React, { useState, useRef } from "react";

const Version = () => {
  const [versions, setVersions] = useState([
    {
      current: "3.3.1",
      releaseDate: "2026-06-05",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Validation, Filter & UI Fixes (05/06/2026)</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary">Company Setup & Settings</h6>
                            <ul>
                                <li>Updated email validation across company forms to strictly disallow hyphens (-) and underscores (_).</li>
                                <li>Fixed the Date Range filter on the Companies page so it properly hides companies without a creation date.</li>
                                <li>Removed the unnecessary checkbox column from the Branch Locations table.</li>
                                <li>Added strict validation to Financial Years to prevent creating overlapping fiscal cycles or duplicate names.</li>
                                <li>Enforced strict boundaries for Financial Years, restricting end dates specifically to March 31st to comply with standard accounting periods.</li>
                                <li>Secured the Roles & Permissions page so that only users with explicit authorization can modify or assign role access levels.</li>
                                <li>Enhanced User Profiling: A user's assigned role (e.g., Admin, Accountant) is now clearly identified and displayed in Profile Page.</li>
                                <li>Fixed the "Blank Screen" error.</li>
                                 <li>Fix Calendar not loaded issue .</li>
                                 
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3 mt-md-0">Dashboard & Financial Reports</h6>
                            <ul>
                                <li>Addressed GST calculation and inter-state logic across Sales, Purchase, and Credit/Debit Notes to accurately compute CGST/SGST/IGST based on place of supply.</li>
                                <li>Clicking "Receivables" or "Payables" from any Dashboard will now open the Outstanding Reports page directly on the correct tab.</li>
                               
                                <li>Resolved Ledger Statement rendering issues</li>
                                <li>Added 'Tax Type' (Taxable, Exempt) selection to item rows in both Add and Edit screens for Sales and Purchase Invoices.</li>
                            </ul>
                        </div>
                       
                    </div>
                </div>
            `,
    },
    {
      current: "3.3.0",
      releaseDate: "2026-06-04",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — General Improvements & Bug Fixes (04/06/2026)</h6>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary">Invoicing & Orders</h6>
                            <ul>
                                <li>Forms now clearly highlight missing information in red directly under the input field, replacing clunky browser popups and making it easier to correct mistakes before saving.</li>
                                <li>Added clear required field warnings for Customer, Vendor, and Date information when creating or editing Sales Orders.</li>
                                <li>Added clear required field warnings for Customer, Vendor, and Date information when creating or editing Purchase Orders.</li>
                                <li>Added clear required field warnings for Customer, Vendor, and Date information when creating or editing Proforma Invoices.</li>
                                <li>When creating a Debit Note, you are now strictly required to link it to a specific Purchase Invoice.</li>
                                <li>When creating a Credit Note, you are now strictly required to link it to a specific Sales Invoice.</li>
                                <li>Fixed a bug in Debit Notes where the 'Purchase Invoice' list would sometimes appear empty even after selecting a Vendor.</li>
                            </ul>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3 mt-md-0">Company Setup & Global Interface</h6>
                            <ul>
                                <li>Fixed an issue in the Company Profile where the City dropdown would sometimes remain empty after selecting a State.</li>
                                <li>Shortened the success message when adding a new company so it looks neater on the screen and doesn't break the layout.</li>
                                <li>Improved the confirmation message when deleting a Vendor so it doesn't disappear instantly, requiring an "OK" click instead.</li>
                                <li>Fixed a global visual issue where the green success checkmarks in pop-up messages looked squished or distorted.</li>
                                <li>Updated the success messages for "saving" and "posting vouchers" to use the new, cleaner checkmark design.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-12">
                            <h6 class="fw-bold border-bottom pb-1 text-primary">Financial Reports & Analytics</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <ul>
                                        <li>Fixed an issue where downloading PDF or Excel files from the Ledger, Balance Sheet, and Trial Balance reports would not work.</li>
                                        <li>Added the ability to download fully functional PDF and Excel reports for Sales Analysis and Purchase Analysis.</li>
                                        <li>Added the ability to download fully functional PDF and Excel reports for Cash Flow and Fund Flow.</li>
                                        <li>Added the ability to download fully functional PDF and Excel reports for Cash/Bank Book and Day Book.</li>
                                        <li>Fixed an issue in the Cash/Bank Book and Day Book where the date range filters were being ignored.</li>
                                        <li>Fixed a text display issue in PDF downloads where the Rupee (₹) symbol was showing incorrectly.</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul>
                                        <li>Adjusted the 'Export' buttons on all report screens so the dropdown menu no longer gets cut off at the right edge of the screen.</li>
                                        <li>Added new filtering options in the Balance Sheet and Outstanding Reports, allowing you to easily search by specific Account Holders and Amount ranges.</li>
                                        <li>Fixed an issue where very long Branch names would overlap with the dropdown arrow on report pages.</li>
                                        <li>Removed unnecessary and non-functional "Column" dropdown menus from the Balance Sheet and Outstanding Reports to make the screen less cluttered.</li>
                                        <li>The summary boxes at the top of financial reports (like Total Assets, Net Worth, Total Debits) will now automatically update their totals as soon as you apply a filter in the sidebar.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "3.2.0",
      releaseDate: "2026-06-03",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Form Data Persistence, Invoicing & UI Standardization (03/06/2026)</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary">Credit Note Enhancements</h6>
                            <ul>
                                <li>Fixed an issue where selecting an "Against Sales Invoice" failed to save correctly when creating or updating a credit note.</li>
                                <li>The item table will now automatically fill in the Unit of Measure (UOM) for products when editing a draft.</li>
                                <li>Removed the redundant UOM column from the return table to make the screen cleaner and easier to read.</li>
                                <li>Fixed the Credit Notes list page so it accurately displays the Return Date and the Linked Invoice number.</li>
                                <li>Fixed an issue where selecting "Against Sales Invoice" failed to load the actual item rows due to missing line-item details in the backend summary.</li>
                            </ul>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3 mt-md-0">Debit Note Enhancements</h6>
                            <ul>
                                <li>Fixed a similar issue where linking a Debit Note to an original Purchase Invoice was failing to save.</li>
                                <li>Upgraded the Edit Debit Note screen to match the Add screen, including a much better product search dropdown.</li>
                                <li>Added dynamic tax columns (IGST or CGST/SGST) that adjust automatically based on the state you select.</li>
                                <li>Added HSN codes and editable descriptions to the product rows for better detail.</li>
                                <li>Removed the UOM column and set the minimum allowed return quantity to 0.1.</li>
                                <li>Fixed the Debit Notes list page to properly display the Return Date and Linked Purchase Invoice columns.</li>
                                <li>Fixed an issue where selecting "Against Purchase Invoice" failed to load the actual item rows due to missing line-item details in the backend summary.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary">Invoicing Enhancements</h6>
                            <ul>
                                <li><b>Sales Invoice:</b> Added strict validation for Unit of Measure (UOM) during invoice creation and edits to ensure data integrity.</li>
                                <li><b>Sales Invoice:</b> HSN Code and UOM now automatically populate immediately upon item selection.</li>
                                <li><b>Sales Invoice:</b> Re-added missing Due Date, Invoice Layout, and Terms & Conditions fields to the Edit Screen.</li>
                                <li><b>Sales Invoice:</b> The Invoice Layout Preview now correctly translates UOM IDs into readable symbols (e.g., PCS, KG).</li>
                                <li><b>Sales Invoice:</b> Typing an invalid date in the Invoice Date field no longer causes the application to crash.</li>
                              
                               
                            </ul>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3 mt-md-0">System & Master Data</h6>
                            <ul>
                                <li><b>Payroll Module:</b> Fixed a server crash that happened when clicking the "Mark as Paid" button for employee payslips.</li>
                                <li><b>Vendor Management:</b> Fixed a visual glitch where the screen would turn completely black and freeze when opening the Add Vendor popup.</li>
                                <li><b>Investments Module:</b> Fixed a bug where editing an investment asset failed to show the previously saved category in the dropdown.</li>
                                <li><b>Vouchers:</b> Fixed a critical issue where created vouchers were visible across all financial years. Vouchers now accurately bind to and filter by the active financial year.</li>
                                <li><b>Branches & Units:</b> Added strict validation to prevent users from saving multiple branches with the exact same Branch Code.</li>
                                <li><b>Auto-numbering Override:</b> In Sales Invoices, manually entering an invoice number now intelligently clears the auto-generated voucher series ID so the system correctly respects your manual input.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "3.1.0",
      releaseDate: "2026-06-02",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Exhaustive Bug Fixes & Improvements (02/06/2026)</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary">Sign Up & Dashboard</h6>
                            <ul>
                                <li>While signing up, if 'remember me' is selected, then on sign out, the email is autofilled.</li>
                                <li>In 'create new' button, sales order icon added.</li>
                                <li>Darkmode: "Yani book" name visibility fixed.</li>
                                <li>Financial Years: Voucher shows in the correct financial year in which it is created.</li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3">Home Screen</h6>
                            <ul>
                                <li>A Branch selection option provided on the Home screen.</li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3">Switch Company</h6>
                            <ul>
                                <li>Dashboard: Removed two '+' signs in add company.</li>
                                <li>Add company: 'access denied' showing in dashboard modules fixed.</li>
                                <li>Add company: Business Nature, TAN No. and CIN No fields added in form.</li>
                                <li>Add company: Email saving with special symbols fixed.</li>
                                <li>Add company: After creating new company, it shows in 'Switch Company' without refreshing.</li>
                                <li>Add company: Company name, legal name and address field saving with "." fixed.</li>
                                <li>View all Companies: Fixed previewing and editing showing the 1st company created.</li>
                                <li>View all Companies: Fixed previewing/editing TAN no and CIN no data visibility.</li>
                                <li>View all Companies: Fixed incorrect number near the home tab and business name on preview.</li>
                                <li>View all Companies: Fixed creating email saving with special symbols.</li>
                                <li>View all Companies: Fixed showing details of 1st company in all companies created.</li>
                                <li>View all Companies: Fixed email being required.</li>
                                <li>View all Companies: Fixed company saving without state, city and state code.</li>
                                <li>View all Companies: Made all fields required while creating a new company.</li>
                                <li>View all Companies: Fixed fields saving with ".".</li>
                                <li>View all Companies: Fixed only company name and legal name showing while editing.</li>
                                <li>View all Companies: In Filter - 'Reset', 'Cancel' and 'Select' buttons fixed.</li>
                                <li>View all Companies: In Filter - 'select all' fixed.</li>
                                <li>View all Companies: In Filter - dummy companies removed.</li>
                                <li>View all Companies: In Filter - Date Range field calendar symbol fixed.</li>
                                <li>View all Companies: In Filter - status field active/inactive selection fixed.</li>
                                <li>View all Companies: Select company option removed.</li>
                                <li>View all Companies: Fixed 'Route not found' when changing status active/inactive.</li>
                                <li>View all Companies: Action box visibility fixed.</li>
                                <li>View all Companies: Long company name data visibility fixed.</li>
                                <li>View all Companies: "Company not found" and 'route not found' on selection fixed.</li>
                                <li>View all Companies: Export - pdf showing 'Business Type' fixed.</li>
                                <li>View all Companies: Success messages for 'add company' and 'view all companies' synced.</li>
                                <li>View all Companies: Indian phone no. validation (6-9 digit vs 0-5 digit/alphabets) fixed across views.</li>
                                <li>View all Companies: CIN and TAN validation errors synced across 'add company' and 'view all companies'.</li>
                                <li>View all Companies: Date filter fixed.</li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3">Company & System Setup</h6>
                            <ul>
                                <li>Company Profile: Fixed wrong GSTIN error message (invalid format).</li>
                                <li>Company Profile: Fixed fields saving with ".".</li>
                                <li>Company Profile: Fixed email saving with special symbols.</li>
                                <li>Company Profile: Email no longer automatically taking User's email.</li>
                                <li>Company Profile: Fixed phone no saving with >10 digits/alphabets.</li>
                                <li>Company Profile: State code editability disabled (automatically filled).</li>
                                <li>Company Profile: Made only Company name required on edit.</li>
                                <li>Company Profile: Fixed "failed to load company profile" error when no company exists.</li>
                                <li>Company Profile: Fixed TAN no and CIN no data visibility after saving.</li>
                                <li>Company Profile: Fixed 'create company' button redirecting incorrectly.</li>
                                <li>Business Nature: Fixed 'code' not updating on edit.</li>
                                <li>Business Nature: Reload button fixed.</li>
                                <li>Business Nature: Fixed saving with ".".</li>
                                <li>Business Nature: Fixed UI alignment for long 'name' and 'description' (edit/delete buttons).</li>
                                <li>Financial Years: Validation added for end date earlier than start date.</li>
                                <li>Financial Years: Tick symbol changed for 'carry forward' and 'deleting'.</li>
                                <li>Financial Years: Action button double-click fixed.</li>
                                <li>Financial Years: Text-'checkbox' removed from form.</li>
                                <li>Financial Years: 'Set as active' updating fixed.</li>
                                <li>Financial Years: Dashboard financial year switching multi-click and success message fixed.</li>
                                <li>Financial Years: Error message for creating financial year without company fixed.</li>
                                <li>Financial Years: Active financial year display after selection fixed.</li>
                                <li>User & Access: Fixed 'super admin' written multiple times.</li>
                                <li>User & Access: 1st user deactivation "Failed to update status" error fixed.</li>
                                <li>User & Access: Phone no validations (not required, starting 0-5 digits, >10 digits, alphabets, ".", validation msg) fixed on create/edit.</li>
                                <li>User & Access: Missing selected assigned role on edit fixed.</li>
                                <li>User & Access: Full name saving with "." error msg fixed.</li>
                            </ul>
                        </div>
                        
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1 text-primary">Voucher Module & Approval</h6>
                            <ul>
                                <li>Voucher headers (Sales, Purchase, Debit, Credit) removed.</li>
                                <li>Voucher Type rule applied.</li>
                                <li>Voucher number auto-generated (Code / Financial Year / Code) with manual entry supported.</li>
                                <li>Approval Workflow: Adding a Remark is mandatory.</li>
                                <li>Approval Workflow: Screen displays Date, Voucher Number, and voucher details.</li>
                                <li>Approval Workflow: Admin permission for approval and reject fixed.</li>
                            </ul>
                            
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3">Ledger Module & Access Control</h6>
                            <ul>
                                <li>Selecting an Under Group dynamically displays relevant Ledger Names.</li>
                                <li>Double-entry disabled while creating ledger.</li>
                                <li>Sub-groups under Ledger Group visibility fixed.</li>
                                <li>Ledger group: Deleting tick icon corrected.</li>
                                <li>Ledger: Phone no validations (alphabets, >10digits, starting 0-5) fixed.</li>
                                <li>The label 'super_admin' appearing multiple times corrected.</li>
                                <li>Admin-assigned permissions accessible to respective users verified.</li>
                            </ul>
                            
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3">Master Data</h6>
                            <ul>
                                <li>Branches/Units: Phone no validations fixed on create.</li>
                                <li>Branches/Units: Email validations (special symbols, format) fixed.</li>
                                <li>Branches/Units: GSTIN and pincode validations fixed.</li>
                                <li>Branches/Units: City data visibility on edit fixed.</li>
                                <li>Branches/Units: Saving with same branch code fixed.</li>
                                <li>Branches/Units: States with no state code selection fixed.</li>
                                <li>Branches/Units: Checkbox select options removed.</li>
                                <li>Branches/Units: Export box data cropping and PDF/Excel downloads fixed.</li>
                                <li>Branches/Units: Preview and search bar functionality fixed.</li>
                                <li>Customer: Email, PAN, GSTIN, mobile no, pincode validations fixed.</li>
                                <li>Customer: 'Standard Payment Terms' validation error msg fixed.</li>
                                <li>Customer: Blank form saving error msg added.</li>
                                <li>Customer: Replaced 'Customer/Company name' with 'customer name' & 'Customer Details'.</li>
                                <li>Customer: Export button and downloaded excel contact no fixed.</li>
                                <li>Customer: Saving DR/CR selection fixed.</li>
                                <li>Vendor: Email, PAN, GSTIN, phone no validations fixed.</li>
                                <li>Vendor: Saving DR/CR selection and 'Liable to TDS Deduction' toggle fixed.</li>
                            </ul>
                            
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3">Accounting and Finance</h6>
                            <ul>
                                <li>Voucher Entry: Date filters fixed.</li>
                                <li>Voucher Entry: 'Auto' removed from voucher no.</li>
                                <li>Voucher Entry: Action options updated.</li>
                                <li>Voucher Entry: Dr/Cr visibility in double entry lines fixed.</li>
                                <li>Voucher Entry: Updating draft voucher and editing voucher fixed.</li>
                                <li>Voucher Entry: Pagination options (10/page, etc.) fixed.</li>
                                <li>Cost Centres: Duplicate entries on multiple clicks fixed.</li>
                                <li>Cost Centres: Edit buttons and category dropdown UI overflows fixed.</li>
                                <li>Cost Centres: Parent center data visibility fixed.</li>
                                <li>Budgets: Ledger account dropdown visibility & deleted master data filtering fixed.</li>
                                <li>Budgets: Budget lines error msgs, 'to date' Period label saving fixed.</li>
                                <li>Budgets: Variance report route, search bar, pagination fixed.</li>
                                <li>Budgets: 'Cancel' and 'create budget' buttons clickable area fixed.</li>
                                <li>Interest Calculation: Deleted customers/vendors no longer showing in Receivables/Payables.</li>
                            </ul>
                            
                            <h6 class="fw-bold border-bottom pb-1 text-primary mt-3">Investments & Inventory</h6>
                            <ul>
                                <li>Portfolio & Investments: Edit/delete button alignments for long category/asset names fixed.</li>
                                <li>Portfolio & Investments: Icon added in 'Total Invested'.</li>
                                <li>Portfolio & Investments: 'Active Holdings' count and Holdings Summary creation/deletion update without refresh.</li>
                                <li>Stock Items: Category_id validation and blank data saving fixed.</li>
                                <li>Stock Items: 'Track Expiry' requirement and validation message fixed.</li>
                                <li>Stock Alert: "Undefined stock alerts triggered" error fixed.</li>
                                <li>Invoice & Billing: Proforma invoice GST% data visibility fixed.</li>
                                <li>Invoice & Billing: Sales Invoice export box cropping and PDF/Excel downloads fixed.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "3.0.0",
      releaseDate: "2026-04-27",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Critical Fixes & Reports Sync (27/04/2026)</h6>
                    <div class="row">
                        <div className="col-md-6">
                            <h6 className="fw-bold border-bottom pb-1">1. Reports & MIS Update</h6>
                            <ul>
                                <li>fixed Trial Balance, Profit & Loss Account, Balance Sheet, and Ledgers.</li>
                                
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold border-bottom pb-1">2. Voucher Entry Enhancements</h6>
                            <ul>
                                <li>Removed Credit and Debit note from voucher entry.</li>
                                <li><b>Validation Messaging:</b> Technical validation errors replaced with proper, descriptive messages explaining exactly why an error occurred.</li>
                            </ul>
                        </div>
                        <div className="col-md-6 mt-2">
                            <h6 className="fw-bold border-bottom pb-1">3. Transactional & Routing Fixes</h6>
                            <ul>
                                <li><b>Blank Screen Fix:</b> Resolved the blank screen issue after saving documents by synchronizing modular routing.</li>
                                <li><b>UOM </b></li>
                                <li> Fixed crash in Debit Note edit mode.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "2.9.0",
      releaseDate: "2026-04-21",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Investments & Branch Management (21/04/2026)</h6>
                    <div class="row">
                        <div className="col-md-6">
                            <h6 className="fw-bold border-bottom pb-1">1. Investments Module</h6>
                            <ul>
                                <li><b>Investments :</b> New multi-tab interface for tracking portfolio holdings, assets, and transactions.</li>
                                <li><b>Service Layer:</b> Implemented full CRUD for Types, Masters, and Transactions.</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold border-bottom pb-1">2. Branch & Navigation</h6>
                            <ul>
                                <li><b>Branch Management:</b> Fully integrated with backend APIs and state-code mapping.</li>
                                <li><b>Sidebar:</b> Added quick links for Investments and Branches.</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold border-bottom pb-1">3. UOM & Reports</h6>
                            <ul>
                                <li><b>UOM:</b> Integrated Unit of Measure management within Inventory systems.</li>
                                <li><b>Ledger Account Report:</b> Integrated official running balance report with date-range filtering.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },

    {
      current: "2.8.0",
      releaseDate: "2026-04-17",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Financials & Reporting (17/04/2026)</h6>
                    <div class="row">
                        <div className="col-md-6">
                            <h6 className="fw-bold border-bottom pb-1">Reports & Bulk Actions</h6>
                            <ul>
                                <li><b>Ledger Statement:</b> New detailed report with date-range filters and PDF/Excel exports.</li>
                                <li><b>Bulk Ledger Creation:</b> Spreadsheet-style interface for batch account creation.</li>
                                <li><b>Job Work:</b> Support for multi-item selection and batch submission.</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold border-bottom pb-1">Critical Fixes</h6>
                            <ul>
                                <li><b>Attendance:</b> Resolved data rendering issues in FullCalendar display.</li>
                                <li><b>Vouchers:</b> Fixed validation errors by automating server-side number generation.</li>
                                <li><b>Parties:</b> Resolved 500 internal error during party registration.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "2.7.0",
      releaseDate: "2026-04-16",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — UI & Routing (16/04/2026)</h6>
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Navigation</h6>
                            <ul>
                                <li><b>Sidebar:</b> New Accordion-style navigation with improved dropdown logic.</li>
                                <li><b>Routing:</b> Synchronized sidebar URLs with modular routing to fix "blank page" issues.</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">System Utilities</h6>
                            <ul>
                                <li><b>Backups:</b> Fixed "Route not found" error for SQL backup downloads.</li>
                                <li><b>Company:</b> Added direct "Create Company" button in management view.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "2.6.0",
      releaseDate: "2026-04-14",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Feature Parity & Lifecycle Maturity (14/04/2026)</h6>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Lifecycle Actions</h6>
                            <ul>
                                <li><b>Sales</b> </li>
                                <li><b>Job Work</b> </li>
                               
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Compliance & Reporting</h6>
                            <ul>
                               
                                <li><b>Payroll Summary</b> </li>
                               
                            </ul>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">System Audit & Inventory</h6>
                            <ul>
                                <li><b>Audit Logs</b> </li>
                                <li><b>Stock Alerts</b> </li>
                                <li><b>Banking</b> 
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "2.5.0",
      releaseDate: "2026-04-13",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Full API Implementation (13/04/2026)</h6>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">GST & Registration</h6>
                            <ul>
                                <li><b>GST Registration Type:</b> Customer/Vendor — Regular, Composition, Unregistered, Consumer, Overseas, SEZ, Deemed Export, Tax Deductor, Input Service Distributor</li>
                                <li><b>Company GSTIN/PAN:</b> Optional fields confirmed</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Inventory Enhancements</h6>
                            <ul>
                                <li><b>Item Types:</b> Stock, Non-Stock, Service, Consumable, Fixed Asset</li>
                                <li><b>Expiry Tracking:</b> Batch-wise with warning days</li>
                                <li><b>Stock Ageing Report:</b> FIFO-based</li>
                                <li><b>HSN/SAC Date-Effective:</b> </li>
                            </ul>
                        </div>
                    </div>
                   
                  
                </div>
            `,
    },
    {
      current: "2.4.0",
      releaseDate: "2026-04-13",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — API Field Updates (13/04/2026)</h6>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Job Work Order Updates</h6>
                            <ul>
                                <li><b>Type Field:</b> Fixed ENUM mismatch (OUT/IN now sent directly)</li>
                                <li><b>Field Renames:</b> sent_date → job_work_date, expected_return → expected_return_date, job_charges → charges</li>
                                <li><b>Warehouse:</b> Added required warehouse_id field</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Payslip & Salary Updates</h6>
                            <ul>
                                <li><b>Field Mapping:</b> gross_earnings, pf_employee, esi_employee, professional_tax</li>
                                <li><b>Pagination:</b> Fixed nested data format handling</li>
                                <li><b>Actions:</b> Replaced confirm with SweetAlert2</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Debit Note</h6>
                            <ul>
                                <li><b>Reason Dropdown:</b> Added reason field with options</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Purchase Order</h6>
                            <ul>
                                <li><b>Auto Number:</b> Removed manual po_number field</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-12">
                            <h6 class="fw-bold border-bottom pb-1">Sidebar</h6>
                            <ul>
                                <li><b>Banking & Payments:</b> Added Bank Accounts, Payment Methods, Payments Received, Payments Made</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
    {
      current: "2.2.0",
      releaseDate: "2026-04-08",
      changes: `
                <div class="mb-3">
                    <h6 class="fw-bold">Atyani ERP — Development Update (08/04/2026)</h6>
                    
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">Core Features & UI</h6>
                            <ul>
                                <li><b>Dark Mode</b></li>
                                <li><b>Rupee Symbol</b></li>
                                <li><b>HSN/SAC Search</b></li>
                                <li><b>Serial Numbers</b></li>
                                <li><b>Audit Logs</b></li>
                                <li><b>Batch Tracking</b></li>
                                <li><b>TDS/TCS Masters</b></li>
                                <li><b>Stock Categories</b></li>
                                <li><b>Stock Alerts</b></li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">System & API Updates</h6>
                            <ul>
                                <li><b>New Backup System</b></li>
                                <li><b>Bugs Fix and ui fix</b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
    },
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
                    
                </div>
            `,
    },
    {
      current: "2.0.0",
      releaseDate: "2026-03-28",
      changes: `
                <div class="mb-3">
                   

                    <div class="row">
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">1. Dashboard</h6>
                            <ul>
                                <li>Dashboard UI redesigned and updated</li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1">2. Company & System Setup</h6>
                            <ul>
                                <li><b>Company Profile:</b> New UI implemented</li>
                                <li><b>Financial Years:</b> New UI implemented</li>
                                <li><b>Users & Access:</b> New UI implemented</li>
                                <li><b>Roles & Permissions:</b> New UI implemented</li>
                                <li><b>Data Backup:</b> New UI implemented</li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1">3. Accounting & Finance</h6>
                            <ul>
                                <li><b>Ledger Groups:</b> New UI implemented</li>
                                <li><b>Ledgers:</b> New UI implemented</li>
                                <li><b>Voucher Entry:</b></li>
                                <li><b>Bank Reconciliation:</b> New UI implemented</li>
                                <li><b>Interest Calculation:</b> New UI implemented</li>
                                <li><b>Cost Centres:</b> New UI implemented</li>
                                <li><b>Budgets:</b> New UI implemented</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold border-bottom pb-1">4. Invoicing & Billing</h6>
                            <ul>
                                <li><b>Sales Invoices:</b> New UI implemented</li>
                                <li><b>Purchase Invoices:</b> New UI implemented</li>
                                <li><b>Credit Notes (Sales Returns):</b> New UI implemented</li>
                                <li><b>Debit Notes (Purchase Returns):</b> New UI implemented</li>
                                <li><b>Proforma Invoices:</b> New UI implemented</li>
                                <li><b>Sales Orders:</b> New UI implemented</li>
                                <li><b>Purchase Orders:</b> New UI implemented</li>
                            </ul>

                            <h6 class="fw-bold border-bottom pb-1">5. Inventory Management</h6>
                            <ul>
                                <li><b>Stock Items:</b> New UI implemented</li>
                                <li><b>Stock Summary:</b> New UI implemented</li>
                                <li><b>Stock Transfer:</b> New UI implemented</li>
                                <li><b>Wastage:</b> New UI implemented</li>
                                <li><b>Stock Verification:</b> New UI implemented</li>
                                <li><b>HSN / SAC Codes:</b> New UI implemented</li>
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
