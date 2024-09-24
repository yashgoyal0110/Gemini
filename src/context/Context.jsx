import { createContext, useState } from "react";
import run from '../config/gemini'

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 100 * index);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            // setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        setPrevPrompts(prev => [...prev, prompt || input]);

        let responseArray = response.split("**");
        let newResponse = "";


        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }


        let newResponseWithBreaks = newResponse.split("*").join("<br/>");


        let newResponseArray = newResponseWithBreaks.split(" ");
        let newResponseFinal = "";
        
        for (let i = 0; i < newResponseArray.length; i++) {
            let nextWord = newResponseArray[i];


            if (nextWord === "-") {
                newResponseFinal += "<li>";
            } else if (nextWord === "<br/>") {
                newResponseFinal += "<br/>";
            } else {
                newResponseFinal += nextWord + " ";
            }

            if (i > 0 && newResponseArray[i - 1] === "-") {
                newResponseFinal += "</li>";
            }

            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    }

    const newChat = () => {
        setInput("");
        setResultData("");
        setRecentPrompt("");
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSent();
        }
    }
    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        handleKeyPress
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
