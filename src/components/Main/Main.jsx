import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";
import { useContext } from "react";
import Clerk from "../Clerk";
import { useUser } from "@clerk/clerk-react";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    handleKeyPress,
  } = useContext(Context);

  const { isSignedIn, user } = useUser();

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>

        <Clerk></Clerk>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                {isSignedIn ? (
                  <span>Hello, {user.firstName}</span>
                ) : (
                  <span>Hello.</span>
                )}
              </p>
              <p>How can i help you today?</p>
            </div>
            <div className="cards">
              <div
                onClick={() => {
                  setInput(
                    "Suggest beautiful places to see on an upcoming road trip"
                  );
                  onSent(
                    "Suggest beautiful places to see on an upcoming road trip"
                  );
                }}
                className="card"
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                onClick={() => {
                  setInput("Briefly summarize this concept: urban planning");
                  onSent("Briefly summarize this concept: urban planning");
                }}
                className="card"
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                onClick={() => {
                  setInput(
                    "Brainstorm team bonding activities for our work retreat"
                  );
                  onSent(
                    "Brainstorm team bonding activities for our work retreat"
                  );
                }}
                className="card"
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                onClick={() => {
                  setInput("Improve the readability of following code");
                  onSent("Improve the readability of following code");
                }}
                className="card"
              >
                <p>Improve the readability of following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon2} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyPress}
            ></input>
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img
                onClick={() => onSent(input)}
                src={assets.send_icon}
                alt="Send"
              /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your <a href = "https://support.google.com/gemini/answer/13594961?visit_id=638627716736451617-2919293718&p=privacy_notice&rd=1#privacy_notice" target="_blank"><span id = "privacy">privacy</span></a> and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}
export default Main;
