import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Notes from "./Notes";

function Home(props) {
  const {showAlert} = props
  const context = useContext(noteContext);
  const { editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescreption: "",
    etag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescreption: currentNote.descreption,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescreption, note.etag);
    refClose.current.click();
    showAlert('success',"Note updated successfully.");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={showAlert}  />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={refClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    onChange={onChange}
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescreption" className="form-label">
                    Descreption
                  </label>
                  <input
                    type="text"
                    required
                    value={note.edescreption}
                    onChange={onChange}
                    className="form-control"
                    id="edescreption"
                    name="edescreption"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={note.etag}
                    onChange={onChange}
                    className="form-control"
                    id="etag"
                    name="etag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 3 ||
                  note.edescreption.length < 5 ||
                  note.etag.length < 1
                }
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="container" />
      <Notes updateNote={updateNote} showAlert={showAlert} />
    </>
  );
}

export default Home;
