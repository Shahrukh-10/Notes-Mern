import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    descreption: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.descreption, note.tag);
    setNote({ title: "", descreption: "", tag: "" });
    props.showAlert("success","Note added successfully.")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3 mx-3">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            required
            minLength={3}
            value={note.title}
            onChange={onChange}
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descreption" className="form-label">
            Descreption
          </label>
          <input
            type="text"
            required
            value={note.descreption}
            minLength={5}
            onChange={onChange}
            className="form-control"
            id="descreption"
            name="descreption"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            required
            minLength={3}
            value={note.tag}
            onChange={onChange}
            className="form-control"
            id="tag"
            name="tag"
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 3 || note.descreption.length < 5 || note.tag.length < 1}
          onClick={handleClick}
          className="btn btn-primary"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
