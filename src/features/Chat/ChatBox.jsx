import React, { useEffect, useState, useRef } from "react";
import "./ChatMain.css";

import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUser, fetchMesPeople, fetchMesRoom } from "./thunk";

const ChatBox = ({ scrollRef }) => {
  const { listUser, listMesPeople, toUser, listMesRoom } = useSelector(
      (state) => state.chat
  );
  const { user, socket } = useSelector((state) => state.auth);
  const [newMes, setNewMes] = useState([]);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const [isLogined, setIsLogged] = useState(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [img, setImg]= useState({});

  useEffect(() => {
    if (toUser && toUser?.isRoom === 0 && Array.isArray(listMesPeople)) {
      setNewMes([...listMesPeople]);
    } else if (
        toUser &&
        toUser?.isRoom === 1 &&
        Array.isArray(listMesRoom?.chatData)
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    {
      hasEmoji(content) ? console.log("co") : console.log("khong");
    }
    const sendMes = {
      action: "onchat",
      data: {
        event: "SEND_CHAT",
        data: {
          type: toUser?.isRoom === 0 ? "people" : "room",
          to: toUser.nameUserChat,
          mes: hasEmoji(content) ? encodeURIComponent(content) : content,
        },
      },
    };
    socket.send(JSON.stringify(sendMes));
    setContent("");

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
    return text.startsWith("https://");
  };

  const checkIncludes = (text, smallText) => {
    return text.includes(smallText);
  };

  const replaceText = (text, text1, text2) => {
    return text.replace(text1, text2);
  };

  const handleChangeFile = (evt) => {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      setImg(evt.target.result);
      setContent(evt.target.result)
      // console.log(img);
    };
    // // return formik.setFieldValue("hinhAnh", file);
    // setImg({...file});
    // console.log("hinh anh", file);
    // console.log("img", img);
    // setContent(file);
    // console.log(typeof(content));
  };

  return (
      <section style={{ padding: "0px" }} className="chat">
        <div className="header-chat">
          <i className="icon fa fa-user-o" aria-hidden="true" />
          <p className="name">{toUser?.nameUserChat}</p>
          <i
              className="icon clickable fa fa-ellipsis-h right"
              aria-hidden="true"
          />
        </div>
        <div ref={scrollRef} id="style-11" className="messages-chat">
          {newMes
              ?.slice()
              .reverse()
              .map((item, index) => {
                return (
                    <>
                      {item.name === user.username ? (
                          <div key={item.id} className="message text-only">
                            <div className="response">
                              {/* <p className="text"> {item.mes} </p> */}
                              <p className="text">
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
                                          frameborder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                          allowfullscreen
                                      ></iframe>
                                    </div>
                                ) : (
                                    <span>{decodeURIComponent(item.mes)}</span>
                                )}
                              </p>
                            </div>
                          </div>
                      ) : (
                          <div key={item.id} className="message">
                            <div className="text">
                              <b>{item.name}</b>
                              <p>
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
                                          frameborder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                          allowfullscreen
                                      ></iframe>
                                    </div>
                                ) : (
                                    <span>{decodeURIComponent(item.mes)}</span>
                                )}
                              </p>
                            </div>
                          </div>
                      )}
                    </>
                );
              })}
        </div>
        <div className="footer-chat">
          <form style={{ width: "90%", margin: "auto" }} onSubmit={handleSubmit}>
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
                  <input className="custom-file-input" onChange={handleChangeFile} type="file" />
                </div>
                <button
                    className="chooseIcon"
                    type="button"
                    onClick={toggleEmojiPicker}
                >
                  {showEmojiPicker ? "😊" : "😊"}
                </button>
                <div className="boxEmoji">
                  {showEmojiPicker && <Picker onEmojiClick={handleEmojiSelect} />}
                </div>
              </div>

              <button style={{ width: "10%" }} type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>

              <img
                  style={{ width: "200px", objectFit: "cover" }}
                  src={img}
                  alt="Image"
              ></img>
            </div>
          </form>

        </div>
      </section>
  );
};

export default ChatBox;
