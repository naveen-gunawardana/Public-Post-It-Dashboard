import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";
import "./App.css"; // Import CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Generate a random bright color for Post-It notes
const getRandomColor = () => {
  const colors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Get the current date in MM/DD/YY format
const getCurrentDate = () => {
  const now = new Date();
  return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear().toString().slice(-2)}`;
};

const PostItBoard = () => {
  const [postIts, setPostIts] = useState([]);
  const boardRef = useRef(null);
  const controlPanelRef = useRef(null);

  useEffect(() => {
    const postItCollection = collection(db, "postits");
    const unsubscribe = onSnapshot(postItCollection, (snapshot) => {
      setPostIts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Add a new post-it slightly above the control panel
  const addPostIt = async () => {
    if (!controlPanelRef.current) return;

    const panelRect = controlPanelRef.current.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const newX = panelRect.left - boardRect.left + panelRect.width / 2 - 75; // Centered horizontally
    const newY = panelRect.top - boardRect.top - 150; // Slightly above

    const newPostIt = {
      text: "",
      x: newX,
      y: newY,
      color: getRandomColor(), // Random color
      locked: false, // Initially editable
      dateCreated: getCurrentDate(), // Add timestamp
    };

    const docRef = await addDoc(collection(db, "postits"), newPostIt);
    setPostIts([...postIts, { id: docRef.id, ...newPostIt }]); // Optimistic update
  };

  // Update post-it position in Firestore
  const updatePostIt = async (id, x, y) => {
    await updateDoc(doc(db, "postits", id), { x, y });
  };

  // Update post-it text in Firestore (only if not locked)
  const updatePostItText = async (id, text) => {
    const postIt = postIts.find((p) => p.id === id);
    if (postIt?.locked) return; // Prevent editing if locked

    await updateDoc(doc(db, "postits", id), { text });
  };

  // Lock post-it after clicking away
  const lockPostIt = async (id) => {
    await updateDoc(doc(db, "postits", id), { locked: true });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Scrollable & Zoomable Background */}
      <div
        ref={boardRef}
        className="board-container"
      >
        {/* Post-Its */}
        {postIts.map((postIt) => (
          <Draggable
            key={postIt.id}
            defaultPosition={{ x: postIt.x, y: postIt.y }}
            onStop={(e, data) => updatePostIt(postIt.id, data.x, data.y)}
          >
            <div
              className="post-it"
              style={{ backgroundColor: postIt.color }}
            >
              <textarea
                value={postIt.text}
                onChange={(e) => updatePostItText(postIt.id, e.target.value)}
                onBlur={() => lockPostIt(postIt.id)} // Lock when clicking away
                className="post-it-text"
                disabled={postIt.locked} // Disable editing if locked
              />
              {/* Timestamp Display */}
              <div className="post-it-timestamp">{postIt.dateCreated}</div>
            </div>
          </Draggable>
        ))}
      </div>

      {/* Centered Control Panel */}
      <div ref={controlPanelRef} className="control-panel">
        <button onClick={addPostIt} className="control-button">
          Create Post-It
        </button>

        {/* GitHub & LinkedIn Links in a row */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="github-link">
            <a href="https://github.com/naveen-gunawardana/Public-Post-It-Dashboard" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
          <div className="linkedin-link">
            <a href="https://www.linkedin.com/in/naveen-gunawardana-b6503231b/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItBoard;
