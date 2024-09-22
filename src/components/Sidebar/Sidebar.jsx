import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
        ></img>
        <div className="new-chat">
          <img onClick = {newChat} src={assets.plus_icon} alt=""></img>
          {extended ? <p onClick = {newChat}>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <a href = "https://gemini.google/advanced/?hl=en-IN" target="_blank"><div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt=""></img>
          {extended ?<p>Help</p>  : null}
        </div></a>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt=""></img>
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt=""></img>
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
