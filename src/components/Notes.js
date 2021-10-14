import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useHistory } from "react-router";

function Notes(props) {
  let history = useHistory();
  const {showAlert} = props;
  const { updateNote } = props;
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      history.push('/login')
    }
  }, []);

  return (
    <div className="container row my-3">
      <h2 className=" my-3t">Your Notes</h2>

      <div className="container">
        {notes.length === 0 && "No Notes to display. "}
      </div>
      {notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />;
      })}
    </div>
  );
}

export default Notes;
