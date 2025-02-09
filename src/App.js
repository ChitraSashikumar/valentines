import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [isInitial, setIsInitial] = useState(true);
  const [response, setReponse] = useState(null);
  const [nahCount, setNahCount] = useState(0);
  const buttonRef = useRef(null);

  const handleButton = () => {
    localStorage.setItem("isInitial", "false");
    setIsInitial(false);
  };
  const responseList = [
    "Really???? 😮",
    "I'll give you another chance 😞",
    "Haha Gotcha! 😜",
  ];
  const handleNo = () => {
    setNahCount((prev) => prev + 1);
    setReponse("no");
    const noButton = buttonRef.current;
    if (nahCount > 2) {
      console.log(nahCount);
      noButton.dispatchEvent(
        new MouseEvent("mouseout", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    }
  };
  const handleYes = () => {
    setReponse("yes");
  };

  const moveButton = () => {
    const noButton = buttonRef.current;

    if (nahCount > 2) {
      let newPosition;
      newPosition = {
        top: Math.random() * (window.innerHeight - noButton.offsetHeight),
        left: Math.random() * (window.innerWidth - noButton.offsetWidth),
      };
      console.log(noButton);
      noButton.style.top = `${newPosition.top}px`;
      noButton.style.left = `${newPosition.left}px`;
    }
  };

  useEffect(() => {
    setIsInitial(localStorage.getItem("isInitial") ? false : true);
  }, [isInitial]);
  useEffect(() => {
    setNahCount(0);
  }, []);

  return (
    <div className="App">
      {isInitial && !response && (
        <div className="firstPage">
          <h1>
            <div className="avin">Hi Avin! </div>
            <span className="avin2"> I have a question for you 💖</span>
          </h1>
          <button className="button lesgo" onClick={handleButton}>
            Less goooo
          </button>
        </div>
      )}
      {!isInitial && (!response || response === "no") && (
        <div className="question-page">
          <h1>💗Will you be my Valentine?💗 </h1>
          <img src="https://media1.tenor.com/m/-zCNtWM7UVgAAAAC/peach-and-goma.gif" />
          <div className="counts" style={{ padding: "20px" }}>
            {nahCount > 0 && nahCount < 3 && responseList[nahCount - 1]}
            {nahCount > 2 && responseList[2]}
          </div>
          <div className="button-group">
            <button className="button yep" onClick={handleYes}>
              Yes!
            </button>
            <button
              ref={buttonRef}
              className="button nope"
              onClick={handleNo}
              onMouseOver={moveButton}
            >
              Nah
            </button>
          </div>
        </div>
      )}
      {!isInitial && response && response === "yes" && (
        <div className="yes-page">
          <h3>Good choice, I must say</h3>
          <img
            src="https://media.tenor.com/W2DS2FXWRKIAAAAi/goma-peach.gif"
            height={300}
          />
        </div>
      )}
    </div>
  );
}

export default App;
