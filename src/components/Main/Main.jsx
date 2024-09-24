import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";
import { useContext } from "react";
import Clerk from "../Clerk";
// import { useRef } from "react";


function Main() {
  // const fileInputRef = useRef(null);
  // const handleImageClick = () => 
  //   fileInputRef.current.click();
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0]; // Get the selected file
  //   if (file) {
  //     onSent(file); // Call the onSent function with the selected file
  //   }
  // };
  
 
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>

        <Clerk>
</Clerk>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Yash</span>
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
                setInput(
                  "Briefly summarize this concept: urban planning"
                );
                onSent(
                  "Briefly summarize this concept: urban planning"
                );
              }} className="card">
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
              }} className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
              onClick={() => {
                setInput(
                  "Improve the readability of following code"
                );
                onSent(
                  "Improve the readability of following code"
                );
              }} className="card">
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
              placeholder="Enter your prompt here"
            ></input>
            <div>
            <img src={assets.gallery_icon} alt="" />
             {/* <div>
      <input
        type="file"
        id="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input
        accept="image/*" // Accept only image files
        onChange={handleFileChange} // Handle file selection
      />
      <img
        src={assets.gallery_icon}
        alt="Upload"
        style={{ cursor: 'pointer', width: '48px', height: '48px' }} // Style as needed
        onClick={handleImageClick} // Trigger file input on click
      />
    </div> */}
              <img src={assets.mic_icon} alt="" />
              <img
                onClick={() => onSent(input)}
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}
export default Main;
