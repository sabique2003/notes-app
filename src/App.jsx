import './App.css';
import { useState, useEffect } from 'react';
import { AddnoteApi, GetnoteApi, DeleteNoteApi, EditNoteApi } from './Services/Allapis';

function App() {
  const [notes, setNotes] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await GetnoteApi();
      setNoteList(response.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await DeleteNoteApi(id);
      if (response.status === 200) {
        alert("Note deleted successfully!");
        fetchNotes(); 
      } else {
        alert("Failed to delete note. Try again!");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note. Please check your server.");
    }
  };

  const addOrUpdateNote = async () => {
    if (!notes.trim()) {
      alert("Note content cannot be empty!");
      return;
    }

    try {
      if (editId) {
        const response = await EditNoteApi(editId, { todo: notes });
        if (response.status === 200) {
          alert("Note updated successfully!");
        } else {
          alert("Failed to update note. Try again!");
        }
      } else {
        const response = await AddnoteApi({ todo: notes });
        if (response.status === 201) {
          alert("Note added successfully!");
        } else {
          alert("Failed to add note. Try again!");
        }
      }

      setNotes('');
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error adding/updating note:", error);
      alert("Error occurred. Please check your server.");
    }
  };

  const startEditing = (note) => {
    setNotes(note.todo); 
    setEditId(note._id); 
  };

  return (
    <div className="container-fluid p-0" style={{ height: '150vh' }}>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center notes-img w-100">
        <textarea
          name="notes"
          id="notes"
          className="form-control w-50 h-25"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button className="button2 mt-3" onClick={addOrUpdateNote}>
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="container mt-4">
        <h3 className="text-center">Your Notes</h3>
        <div className="row p-3">
          {noteList.length > 0 ? (
            noteList.map((note, index) => (
              <div className="col-md-4 mt-3" key={note._id}>
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Note {index + 1}</h5>
                    <p className="card-text">{note.todo}</p>
                    <div className="d-flex justify-content-end gap-3">
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "#054ac2", cursor: "pointer" }}
                        onClick={() => startEditing(note)}
                      />
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#b20a1b", cursor: "pointer" }}
                        onClick={() => deleteNote(note._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-center">No Notes Found</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
