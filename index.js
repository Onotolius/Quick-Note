const dialog = document.getElementById("noteDialog");
const addNoteBtn = document.querySelector(".btn__add");
const themeBtn = document.querySelector(".btn__theme");
const closeDialogBtn = document.querySelector(".btn__close");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const cancelBtn = document.querySelector(".btn__cancel");
const saveNoteBtn = document.querySelector(".btn__save");
const noteForm = document.getElementById("noteForm");
const deleteBtn = document.querySelector("delete-btn");

let notes = loadNotes();

addNoteBtn.addEventListener("click", function () {
  dialog.showModal(); // работает
});
closeDialogBtn.addEventListener("click", function () {
  dialog.close();
});
cancelBtn.addEventListener("click", function () {
  dialog.close();
});

function saveNote(event) {
  event.preventDefault();
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title && !content) return;
  notes.unshift({
    id: Date.now().toString(),
    title: title,
    content: content,
    createdAt: new Date().toLocaleDateString(),
  });
  saveNotes();
  renderNotes();
  noteTitle.value = "";
  noteContent.value = "";
  dialog.close();
}
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

//render

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");
  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <div class="empty-state">
              <h2>No notes yet</h2>
              <p>Create your first note to get started!<p>
              <button class="btn btn__add">Add Note</button>
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
}

noteForm.addEventListener("submit", saveNote);

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
  localStorage.setItem("theme", JSON.stringify()); // пока не знаю
}

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}
function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}
document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  renderNotes();
  themeBtn.addEventListener("click", toggleTheme);
});
