import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";


function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3 ">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.descreption}</p>
          <i className="far mx-2 fa-trash-alt" onClick={()=>{deleteNote(note._id); props.showAlert("success","Note deleted successfully.")}} ></i>
          <i className="far mx-2 fa-edit" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
