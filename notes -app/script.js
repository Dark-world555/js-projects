let notes = JSON.parse(localStorage.getItem("notes")) || [];
let darkMode = localStorage.getItem("darkMode") === 'true';
const notesContainer = document.getElementById("notes-container");
const themeToggleBtn = document.getElementById("theme-toggle");
const addNoteBtn = document.getElementById("add-note-btn");
const saveNoteBtn = document.getElementById("save-note");
const cancelNoteBtn = document.getElementById("cancel-note");
const noteEditor = document.getElementById("note-editor");
const noteTitleInput = document.getElementById("note-title");
const noteContentInput = document.getElementById("note-content");
const foldersContainer = document.getElementById("folders");
const tagsContainer = document.getElementById("tags");

function updateTimeAndDate() {
    const now = new Date();
  
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const day = now.getDay();
    const date = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
  
    // Map days and months
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    // Format time and date
    const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    const formattedDate = `${days[day]}, ${months[month]} ${date}, ${year}`;
  
    // Update HTML
    document.getElementById("time").innerText = `Time: ${formattedTime}`;
    document.getElementById("date").innerText = `Date: ${formattedDate}`;
  }
  
  // Helper function to pad numbers
  function formatNumber(number) {
    return number < 10 ? "0" + number : number;
  }
  
  // Call function once to initialize
  updateTimeAndDate();
  
  // Update time every second
  setInterval(updateTimeAndDate, 1000);
  


// Initialize UI with existing notes
function renderNotes() {
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteElem = document.createElement("div");
    noteElem.classList.add("note");
    noteElem.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
    noteElem.addEventListener('click', () => editNote(note.id));
    notesContainer.appendChild(noteElem);
  });
}

// Add a new note
function addNote() {
  const newNote = {
    id: Date.now(),
    title: '',
    content: '',
    folder: '',
    tags: [],
  };
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
  editNote(newNote.id);
}

// Edit an existing note
function editNote(id) {
  const note = notes.find(n => n.id === id);
  noteTitleInput.value = note.title;
  noteContentInput.value = note.content;
  noteEditor.style.display = "block";
  saveNoteBtn.onclick = () => saveNote(id);
}

// Save the edited note
function saveNote(id) {
  const note = notes.find(n => n.id === id);
  note.title = noteTitleInput.value;
  note.content = noteContentInput.value;
  localStorage.setItem("notes", JSON.stringify(notes));
  noteEditor.style.display = "none";
  renderNotes();
}

// Cancel note editing
function cancelNote() {
  noteEditor.style.display = "none";
}

// Toggle Dark Mode
function toggleDarkMode() {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
  document.body.classList.toggle("dark-mode", darkMode);
}


// Attach Event Listeners
themeToggleBtn.addEventListener("click", toggleDarkMode);
addNoteBtn.addEventListener("click", addNote);
cancelNoteBtn.addEventListener("click", cancelNote);

// Render initial notes
renderNotes();
if (darkMode) {
  document.body.classList.add("dark-mode");
}

function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      // Create note container
      const noteElem = document.createElement("div");
      noteElem.classList.add("note");
      
      // Add note content
      noteElem.innerHTML = `
        <h3>${note.title || "Untitled Note"}</h3>
        <p>${note.content || "No content"}</p>
      `;
  
      // Add delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => deleteNote(note.id);
  
      // Append delete button to note
      noteElem.appendChild(deleteBtn);
  
      // Add event to edit the note on click (except delete button)
      noteElem.addEventListener("click", (event) => {
        if (event.target !== deleteBtn) {
          editNote(note.id);
        }
      });
  
      // Append note element to container
      notesContainer.appendChild(noteElem);
    });
  }

  function deleteNote(id) {
    // Filter out the note with the matching ID
    notes = notes.filter(note => note.id !== id);
  
    // Update localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
  
    // Re-render the notes
    renderNotes();
  }
  
