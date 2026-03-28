import React from 'react';

const VideoCall = () => {
  return (
    <div className="container-fluid">
      {/* Search and Add People */}
      <div className="d-flex mb-3 right-content align-items-center flex-wrap justify-content-between">
        <div className="me-2 mb-2">
          <div className="input-icon-start position-relative">
            <span className="input-icon-addon">
              <i className="ti ti-search"></i>
            </span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>
        <div className="mb-2">
          <Link href="#" className="btn btn-primary btn-lg d-flex align-items-center">
            <i className="ti ti-circle-plus me-2"></i>Add People
          </Link>
        </div>
      </div>

      {/* Video Call Section */}
      <div className="row">
        <div className="col-xxl-12">
          <div className="single-video d-flex">
            {/* Main Video */}
            <div className="join-video flex-fill">
              <img src="/assets/img/media/video.jpg" className="img-fluid" alt="Video" />

              {/* Chat Active Users */}
              <div className="chat-active-users">
                <div className="video-avatar">
                  <img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="User" />
                  <div className="user-name">
                    <span>Joanne Conner</span>
                  </div>
                </div>
              </div>

              {/* Record Time */}
              <div className="record-item d-flex align-items-center">
                <div className="record-time me-2">
                  <span>40:12</span>
                </div>
                <Link href="#" className="video-expand btnFullscreen">
                  <i className="ti ti-maximize"></i>
                </Link>
              </div>

              {/* Microphone Off */}
              <div className="more-icon">
                <Link href="#" className="mic-off">
                  <i className="bx bx-microphone-off"></i>
                </Link>
              </div>

              {/* Call Controls */}
              <div className="call-overlay-bottom d-flex justify-content-sm-between align-items-center flex-wrap w-100">
                <Link
                  href="#"
                  className="options-icon d-flex align-items-center justify-content-center guest-off rounded"
                >
                  <i className="ti ti-user-off"></i>
                </Link>

                <div className="call-option rounded-pill d-flex justify-content-center align-items-center">
                  <Link
                    href="#"
                    className="options-icon btn-light d-flex justify-content-center align-items-center rounded me-2"
                  >
                    <i className="ti ti-microphone"></i>
                  </Link>
                  <Link
                    href="#"
                    className="options-icon btn-light d-flex justify-content-center align-items-center rounded me-2"
                  >
                    <i className="ti ti-video"></i>
                  </Link>
                  <Link
                    href="#"
                    className="call-icon btn-danger d-flex justify-content-center align-items-center rounded"
                  >
                    <i className="ti ti-phone"></i>
                  </Link>
                  <Link
                    href="#"
                    className="options-icon btn-light d-flex justify-content-center align-items-center rounded mx-2"
                  >
                    <i className="ti ti-volume"></i>
                  </Link>
                  <Link
                    href="#"
                    className="options-icon btn-light d-flex justify-content-center align-items-center rounded"
                  >
                    <i className="ti ti-device-imac-share"></i>
                  </Link>
                </div>

                <Link
                  href="#"
                  className="options-icon bg-light d-flex align-items-center justify-content-center rounded"
                  id="show-message"
                >
                  <i className="ti ti-dots"></i>
                </Link>
              </div>
            </div>

            {/* Chat Section */}
            <div className="right-user-side chat-rooms" id="chat-room">
              <div className="card slime-grp border-0 mb-0">
                {/* Chat Header */}
                <div className="card-header p-3 pb-0 border-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5>Chat</h5>
                    <Link
                      href="#"
                      className="close_profile close_profile4 avatar avatar-sm mb-0 rounded-circle bg-danger"
                    >
                      <i className="ti ti-x"></i>
                    </Link>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="card-body slimscroll p-3">
                  <div>
                    <div className="chat-msg-blk p-0">
                      {/* Message 1 */}
                      <div className="chats">
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                          <img src="/assets/img/users/user-01.jpg" alt="User" />
                        </div>
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Hi Everyone.!</h4>
                          </div>
                          <div className="chat-profile-name d-flex justify-content-end">
                            <h6>10:00 AM</h6>
                          </div>
                        </div>
                      </div>

                      {/* Message 2 - Right */}
                      <div className="chats chats-right">
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Good Morning..! Today we have meeting about the new policy.</h4>
                          </div>
                          <div className="chat-profile-name text-end">
                            <h6>
                              <i className="bx bx-check-double"></i> 10:00
                            </h6>
                          </div>
                        </div>
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 ms-2">
                          <img src="/assets/img/users/user-02.jpg" alt="User" />
                        </div>
                      </div>

                      {/* Message 3 */}
                      <div className="chats">
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                          <img src="/assets/img/users/user-01.jpg" alt="User" />
                        </div>
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Great.! This is the second new product that comes in this week.</h4>
                          </div>
                          <div className="chat-profile-name d-flex justify-content-end">
                            <h6>10:00 AM</h6>
                          </div>
                        </div>
                      </div>

                      {/* Message 4 */}
                      <div className="chats">
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                          <img src="/assets/img/users/user-01.jpg" alt="User" />
                        </div>
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Nice..which category it belongs to?</h4>
                          </div>
                          <div className="chat-profile-name d-flex justify-content-end">
                            <h6>10:00 AM</h6>
                          </div>
                        </div>
                      </div>

                      {/* Message 5 */}
                      <div className="chats">
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                          <img src="/assets/img/users/user-01.jpg" alt="User" />
                        </div>
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Great.! This is the second new product that comes in this week.</h4>
                          </div>
                          <div className="chat-profile-name d-flex justify-content-end">
                            <h6>10:00 AM</h6>
                          </div>
                        </div>
                      </div>

                      {/* Message 6 */}
                      <div className="chats">
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                          <img src="/assets/img/users/user-01.jpg" alt="User" />
                        </div>
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Hi.! Good Morning all.</h4>
                          </div>
                          <div className="chat-profile-name d-flex justify-content-end">
                            <h6>10:00 AM</h6>
                          </div>
                        </div>
                      </div>

                      {/* Message 7 */}
                      <div className="chats">
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                          <img src="/assets/img/users/user-01.jpg" alt="User" />
                        </div>
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Nice..which category it belongs to?</h4>
                          </div>
                          <div className="chat-profile-name d-flex justify-content-end">
                            <h6>10:00 AM</h6>
                          </div>
                        </div>
                      </div>

                      {/* Message 8 - Right */}
                      <div className="chats chats-right">
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Good Morning..! Today we have meeting about the new product.</h4>
                          </div>
                          <div className="chat-profile-name text-end">
                            <h6>
                              <i className="bx bx-check-double"></i> 10:00
                            </h6>
                          </div>
                        </div>
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 ms-2">
                          <img src="/assets/img/users/user-02.jpg" alt="User" />
                        </div>
                      </div>

                      {/* Message 9 */}
                      <div className="chats mb-0">
                        <div className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                          <img src="/assets/img/users/user-01.jpg" alt="User" />
                        </div>
                        <div className="chat-content flex-fill">
                          <div className="message-content">
                            <h4>Great.! This is the second new product that comes in this week.</h4>
                          </div>
                          <div className="chat-profile-name d-flex justify-content-end">
                            <h6>10:00 AM</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Footer */}
                <div className="chat-footer">
                  <form>
                    <div className="smile-col comman-icon">
                      <Link href="#">
                        <i className="far fa-smile"></i>
                      </Link>
                    </div>
                    <div className="attach-col comman-icon">
                      <Link href="#">
                        <i className="fas fa-paperclip"></i>
                      </Link>
                    </div>
                    <div className="micro-col comman-icon">
                      <Link href="#">
                        <i className="bx bx-microphone"></i>
                      </Link>
                    </div>
                    <input
                      type="text"
                      className="form-control chat_form"
                      placeholder="Enter Message....."
                    />
                    <div className="send-chat comman-icon">
                      <Link href="#" className="rounded">
                        <i data-feather="send"></i>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
