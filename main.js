document.getElementById('saveBtn').addEventListener('click', function() {
    const note = document.getElementById('dailyNote').value;
    if (note.trim() === "") {
        alert("Please write something before saving.");
        return;
    }
    saveNote(note);
    document.getElementById('dailyNote').value = "";
    displayNotes();
});

function saveNote(note) {
    const notes = getNotes();
    const date = new Date().toLocaleDateString();
    const id = Date.now(); // Unique ID for each note
    notes.push({ id: id, date: date, content: note });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

function deleteNote(id) {
    let notes = getNotes();
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    const notes = getNotes();
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = "";

    notes.forEach(note => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <strong>${note.date}</strong>
            <p>${note.content}</p>
            <button class="deleteBtn" onclick="deleteNote(${note.id})">Delete</button>
        `;
        entriesDiv.appendChild(entryDiv);
    });
}

window.onload = function() {
    displayNotes();
};
