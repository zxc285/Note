export default class NotesAPI {
    // getAllNotes
    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        console.log(`notes = ${JSON.stringify(notes)}`)
        // ranking by Date
        return notes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1:1; 
        });
    }
 
 
    //saveNote
    static saveNote(noteToSave){
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note=>note.id == noteToSave.id);
        // 該內容已經存在 Updaint, 如果是新的 Editing
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
            // [ id=1, ....]
        }
 
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
 
    }
    
    //updateNote
    static deletNote(deletedNote){
        let notes = NotesAPI.getAllNotes();
        console.log(deletedNote);
        console.log(notes);
        notes = notes.filter(note => note.id != deletedNote.id)
        console.log(notes);
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));        
    }

 }