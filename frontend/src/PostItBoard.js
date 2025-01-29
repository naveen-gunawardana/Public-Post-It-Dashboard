import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Import Firebase

const PostItBoard = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // Load post-its from Firestore
  useEffect(() => {
    const unsubscribe = db.collection("postits").onSnapshot((snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Add a new post-it
  const addNote = () => {
    if (text.trim() !== "") {
      db.collection("postits").add({
        text,
        color: "#FFD700", // Yellow
        x: Math.random() * 500,
        y: Math.random() * 500,
        timestamp: new Date(),
      });
      setText("");
    }
  };

  return (
    <div className="board">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
      />
      <button onClick={addNote}>Add Post-It</button>
      {notes.map((note) => (
        <div key={note.id} style={{ backgroundColor: note.color, position: "absolute", left: note.x, top: note.y }}>
          {note.text}
        </div>
      ))}
    </div>
  );
};

export default PostItBoard;
