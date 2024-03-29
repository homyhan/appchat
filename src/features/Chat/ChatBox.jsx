import React, { useEffect, useState, useRef } from "react";
import "./ChatMain.css";

import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUser, fetchMesPeople, fetchMesRoom } from "./thunk";
import { getWebSocket } from "../../utils/websocket";
import Swal from "sweetalert2";
import { storage } from "../../firebase";

const ChatBox = ({ scrollRef }) => {
  const { listUser, listMesPeople, toUser, listMesRoom } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);
  const [newMes, setNewMes] = useState([]);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const [isLogined, setIsLogged] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [img, setImg] = useState(null);

  const [imageUrl, setImageUrl] = useState("");
  const socket = getWebSocket();

  useEffect(() => {
    if (
      toUser &&
      toUser?.isRoom === 0 &&
      Array.isArray(listMesPeople) &&
      listMesPeople.length !== 0
    ) {
      setNewMes([...listMesPeople]);
    } else if (
      toUser &&
      toUser?.isRoom === 1 &&
      Array.isArray(listMesRoom?.chatData) &&
      listMesRoom.length !== 0
    ) {
      setNewMes([...listMesRoom?.chatData]);
    }
  }, [listMesPeople, toUser, listMesRoom]);

  useEffect(() => {
    socket.onmessage = async (evt) => {
      const res = JSON.parse(evt.data);
      if (!isLogined) {
        console.log("res trong useEff", res);
        await dispatch(fetchListUser(socket));
        setIsLogged(true);
      }
      if (res.event === "SEND_CHAT") {
        console.log("res.data", res.data);
        setNewMes((prevListMes) => [...prevListMes, res.data]);
      }
    };
  }, [socket]);

  const handleImageChange2 = (e) => {
    const imageFile = e.target.files[0];

    // Tạo reference đến nơi lưu trữ ảnh trên Firebase Storage
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${imageFile.name}`);

    // Upload ảnh lên Firebase Storage
    imageRef
      .put(imageFile)
      .then(() => {
        // Lấy đường dẫn công khai của ảnh đã lưu
        imageRef.getDownloadURL().then((url) => {
          setImageUrl(url);
          console.log(url);
          setContent(url);
        });
      })

      .catch((error) => {
        console.error("Lỗi khi tải lên ảnh:", error);
      });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (content === "" || content.split(" ").join("") === "") {
      return Swal.fire({
        text: "Content cannot be left blank",
        icon: "warning",
      });
    }
    const socket = getWebSocket();
    {
      hasEmoji(content) ? console.log("co") : console.log("khong");
    }
    const imageObj = {
      type: "image",
      data: img,
    };
    const imageJson = JSON.stringify(imageObj);
    const sendMes = {
      action: "onchat",
      data: {
        event: "SEND_CHAT",
        data: {
          type: toUser?.isRoom === 0 ? "people" : "room",
          to: toUser.nameUserChat,
          mes: setMessage(),
        },
      },
    };
    socket.send(JSON.stringify(sendMes));
    setContent("");
    setImageUrl("");
    socket.onmessage = (evt) => {
      const res = JSON.parse(evt.data);
      console.log(res);
    };

    console.log(img);

    if (toUser?.isRoom === 0) {
      await dispatch(fetchMesPeople(socket, toUser?.nameUserChat));
    } else {
      await dispatch(fetchMesRoom(socket, toUser?.nameUserChat));
    }
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleEmojiSelect = (emoji) => {
    const selectedEmoji = emoji.emoji;
    setContent(content + selectedEmoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const hasEmoji = (text) => {
    const emojiRegex =
      /[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}]/gu;
    return emojiRegex.test(text);
  };

  const checkURL = (text) => {
    return (
      text?.startsWith("https://") &&
      !text?.startsWith("https://firebasestorage")
    );
  };

  const checkURLImg = (mes) => {
    return (
      mes?.startsWith("https://firebasestorage") && checkIncludes(mes, "images")
    );
  };

  const checkURLFile = (mes) => {
    return (
      mes?.startsWith("https://firebasestorage") && checkIncludes(mes, "file")
    );
  };

  const checkIncludes = (text, smallText) => {
    return text.includes(smallText);
  };

  const replaceText = (text, text1, text2) => {
    return text.replace(text1, text2);
  };

  const setMessage = () => {
    if (hasEmoji(content)) {
      return encodeURIComponent(content);
    } else {
      return content;
    }
  };

  const renderTime = (item) => {
    const date = new Date(item);
    var h = date.getHours() * 1 + 7;
    const m = date.getMinutes() * 1;
    if (h === 24) {
      h = 0;
    } else if (h === 25) {
      h = 1;
    } else if (h === 26) {
      h = 2;
    } else if (h === 27) {
      h = 3;
    } else if (h === 28) {
      h = 4;
    } else if (h === 29) {
      h = 5;
    } else if (h === 30) {
      h = 6;
    } else if (h === 31) {
      h = 7;
    }
    if (m < 10) {
      return h + ":0" + m;
    } else {
      return h + ":" + m;
    }
  };

  const renderDate = (item) => {
    const date = new Date(item);
    const d = date.getDate();
    const m = date.getMonth() * 1 + 1;
    const y = date.getFullYear();
    return d + "/" + m + "/" + y;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Tạo reference đến nơi lưu trữ tệp trên Firebase Storage
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`files/${file.name}`);

    // Upload tệp lên Firebase Storage
    fileRef
      .put(file)
      .then((snapshot) => {
        // Lấy đường dẫn công khai của tệp đã lưu
        return snapshot.ref.getDownloadURL();
      })
      .then((url) => {
        // Đường dẫn công khai của tệp đã tải lên
        console.log("Đường dẫn tệp:", url);
        setContent(url);
      })
      .catch((error) => {
        console.error("Lỗi khi tải lên tệp:", error);
      });
  };

  const nameFile = (mes) => {
    const urlParts = mes.split("/");
    const fileNameWithParams = urlParts[urlParts.length - 1];
    const fileName = fileNameWithParams.split("?")[0];
    return fileName.replace("files%2F", "");
  };

  return (
    <section style={{ padding: "0px" }} className="chat">
      <div className="header-chat">
        <i className="icon fa fa-user-o" aria-hidden="true" />
        <p className="name">{toUser?.nameUserChat}</p>
        {toUser?.isRoom === 1 ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="quantity_mem me-3">
              Member orther: {listMesRoom?.userList?.length}
            </p>
            <button
              style={{
                margin: "0px",
                display: "inline-block",
                width: "50px !important",
              }}
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
        ) : null}
        <div className="text-end">
          <i className="fa-solid fa-phone me-5 pe-3"></i>
          <i
            className="icon clickable fa fa-ellipsis-h right"
            aria-hidden="true"
          />
        </div>
      </div>
      <div ref={scrollRef} id="style-11" className="messages-chat">
        {newMes
          ?.slice()
          .reverse()
          .map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.name === user.username ? (
                  <div key={item.id} className="message text-only">
                    <div className="response">
                      {/* <p className="text"> {item.mes} </p> */}
                      <p
                        style={{
                          color: "white",
                          margin: "0px 35px",
                          fontSize: "12px",
                          textAlign: "right",
                        }}
                      >
                        {renderDate(item?.createAt)}
                      </p>
                      <div className="text">
                        {" "}
                        {checkURL(item.mes) ? (
                          <div>
                            <a target="_blank" href={item.mes}>
                              {item.mes}
                            </a>
                            <iframe
                              width="100%"
                              height="315"
                              src={
                                checkIncludes(
                                  item.mes,
                                  "https://www.youtube.com/"
                                )
                                  ? replaceText(item.mes, "watch?v=", "embed/")
                                  : item.mes
                              }
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <>
                            <span
                              style={
                                item?.mes?.includes(
                                  "https://firebasestorage.googleapis.com"
                                )
                                  ? { display: "none" }
                                  : { display: "block" }
                              }
                            >
                              {decodeURIComponent(item.mes)}
                            </span>{" "}
                            {/* <br /> */}
                          </>
                        )}
                        {checkURLImg(item.mes) ? (
                          <div>
                            <img
                              style={{
                                width: "300px",
                                height: "140px",
                                objectFit: "cover",
                              }}
                              src={item.mes}
                              alt=""
                            />
                          </div>
                        ) : null}
                        {checkURLFile(item.mes) ? (
                          <div>
                            <a href={item.mes} download>
                              <i className="fa-solid fa-download"></i>
                              {nameFile(item.mes)}
                            </a>
                          </div>
                        ) : null}
                        <span style={{ fontSize: "12px" }}>
                          {renderTime(item?.createAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p
                      style={{
                        color: "white",
                        margin: "0px 35px",
                        fontSize: "12px",
                        display: "block",
                      }}
                    >
                      {renderDate(item?.createAt)}
                    </p>
                    <div key={item.id} className="message">
                      <div className="text">
                        <b>{item.name}</b>
                        <div>
                          {checkURL(item.mes) ? (
                            <div>
                              <a target="_blank" href={item.mes}>
                                {item.mes}
                              </a>
                              <iframe
                                width="100%"
                                height="315"
                                src={
                                  checkIncludes(
                                    item.mes,
                                    "https://www.youtube.com/"
                                  )
                                    ? replaceText(
                                        item.mes,
                                        "watch?v=",
                                        "embed/"
                                      )
                                    : item.mes
                                }
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              ></iframe>
                            </div>
                          ) : (
                            <>
                              <span
                                style={
                                  item?.mes?.includes(
                                    "https://firebasestorage.googleapis.com"
                                  )
                                    ? { display: "none" }
                                    : { display: "block" }
                                }
                              >
                                {decodeURIComponent(item.mes)}
                              </span>{" "}
                              {/* <br /> */}
                            </>
                          )}
                          {checkURLImg(item.mes) ? (
                            <div>
                              <img
                                style={{
                                  width: "300px",
                                  height: "140px",
                                  objectFit: "cover",
                                }}
                                src={item.mes}
                                alt=""
                              />
                            </div>
                          ) : null}
                          {checkURLFile(item.mes) ? (
                            <div>
                              <a href={item.mes} download>
                                <i className="fa-solid fa-download"></i>
                                {nameFile(item.mes)}
                              </a>
                            </div>
                          ) : null}
                          <span style={{ fontSize: "12px" }}>
                            {renderTime(item?.createAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
      </div>
      {toUser !== null ? (
        <div className="footer-chat">
          <form
            style={{ width: "90%", margin: "auto" }}
            onSubmit={handleSubmit}
          >
            <div className="d-flex footerContent">
              <div className="inputContent">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="write-message write-content-mes"
                  value={content}
                  onChange={handleChange}
                  placeholder="Type your message here"
                />

                <div className="chooseFile">
                  <label
                    style={{ margin: "0px", padding: "0px", fontSize: "16px" }}
                    className="control-label file_up"
                    htmlFor="attach"
                  >
                    <i className="fa fa-paperclip" aria-hidden="true"></i>Img
                    <input
                      type="file"
                      id="attach"
                      className="optional inputfile"
                      onChange={handleImageChange2}
                      name="attach"
                    />
                  </label>
                </div>

                <div className="chooseFileFile">
                  <input
                    className="custom-file-input"
                    onChange={handleFileChange}
                    type="file"
                  />
                </div>

                <button
                  className="chooseIcon"
                  type="button"
                  onClick={toggleEmojiPicker}
                >
                  {showEmojiPicker ? "😊" : "😊"}
                </button>
                <div className="boxEmoji">
                  {showEmojiPicker && (
                    <Picker onEmojiClick={handleEmojiSelect} />
                  )}
                </div>
              </div>

              <button style={{ width: "10%" }} type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>

              {imageUrl ? (
                <img
                  style={{ width: "200px", objectFit: "cover" }}
                  src={imageUrl}
                  alt="Image"
                ></img>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      ) : (        
        <div className="txt" id="txt">
          {/* <b>F</b><b>A</b><b>L</b><b>L</b><b>D</b><b>O</b><b>W</b><b>N</b> */}
          <b>L</b>
          <b>E</b>
          <b>T</b>
          <b className="me-3">'S</b>
          {/* <b> </b> */}
          <b>C</b>
          <b>H</b>
          <b>A</b>
          <b>T</b>
          {/* <b></b>
          <b>W</b>
          <b>I</b>
          <b>T</b>
          <b>H</b>
          <b></b>
          <b>Y</b>
          <b>O</b>
          <b>U</b>
          <b>R</b>
          <b></b>
          <b>F</b>
          <b>R</b>
          <b>I</b>
          <b>E</b>
          <b>N</b>
          <b>S</b> */}
        </div>
      )}

      {/* Modal LIST MEMBER GR*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                List member orther group
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {listMesRoom?.userList?.map((item, index) => {
                return (
                  <p
                    key={item.id}
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
