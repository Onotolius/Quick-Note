// states

const dialog = document.getElementById("noteDialog");
const addNoteBtns = document.querySelectorAll(".btn__add");
const themeBtn = document.querySelector(".btn__theme");
const closeDialogBtn = document.querySelector(".btn__close");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const cancelBtn = document.querySelector(".btn__cancel");
const saveNoteBtn = document.querySelector(".btn__save");
const noteForm = document.getElementById("noteForm");
const deleteBtn = document.querySelector("delete-btn");
let currentEditingId = null;
let notes = loadNotes();

// LocalStorage

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.textContent = isDark ? "🌝" : "🌚";
}
function applyTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeBtn.textContent = "🌝";
  }
}

function saveTheme() {
  localStorage.setItem("theme", JSON.stringify());
}

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}
function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

// UI Helpers
function resetForm() {
  noteTitle.value = "";
  noteContent.value = "";
  currentEditingId = null;
}

function openCreateDialog() {
  resetForm();
  dialog.showModal();
}
function openEditDialog(note) {
  noteTitle.value = note.title;
  noteContent.value = note.content;
  currentEditingId = note.id;
  dialog.showModal();
}

function editNote(id) {
  const noteToEdit = notes.find((note) => note.id === id);
  if (!noteToEdit) return;
  openEditDialog(noteToEdit);
}

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");
  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <li class="notes__item notes__item--empty">
      <div class="empty-state">
              <h2>No notes yet</h2>
              <p>Create your first note to get started!<p>
              <button class="btn btn__add">Add Note</button>
      </li>
            `;
    return;
  }
  notesContainer.innerHTML = notes
    .map(
      (note) =>
        `
        <li class="notes__item" data-id=${note.id}>
                <h3 class="notes__title">${note.title}</h3>
                <p class="notes__time">${note.createdAt}</p>
                <p class="notes__content">
                    ${note.content}
                </p>
                <div class="notes__actions">
                  <button class="delete-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <button class="edit-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              </li>
              `,
    )
    .join("");

  const deleteButtons = notesContainer.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".notes__item");
      const id = card.dataset.id;
      deleteNote(id);
    });
  });
  const editButtons = notesContainer.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".notes__item");
      const id = card.dataset.id;
      editNote(id);
    });
  });
}
// Logic

function saveNote(event) {
  event.preventDefault();

  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title && !content) return;
  if (currentEditingId === null) {
    notes.unshift({
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toLocaleDateString(),
    });
  } else {
    const currentIndex = notes.findIndex(
      (note) => note.id === currentEditingId,
    );
    if (currentIndex !== -1) {
      notes[currentIndex].title = title;
      notes[currentIndex].content = content;
    }
    currentEditingId = null;
  }
  saveNotes();
  renderNotes();
  resetForm();
  dialog.close();
}
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

//Listeneres

document.addEventListener("click", function (event) {
  const addNoteBtn = event.target.closest(".btn__add");
  if (!addNoteBtn) return;
  openCreateDialog();
});

closeDialogBtn.addEventListener("click", function () {
  resetForm();
  dialog.close();
});
cancelBtn.addEventListener("click", function () {
  resetForm();
  dialog.close();
});

noteForm.addEventListener("submit", saveNote);

document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  renderNotes();
  themeBtn.addEventListener("click", toggleTheme);
});
