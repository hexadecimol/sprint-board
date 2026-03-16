// Create online/offline indicator
const statusIndicator = document.createElement("div");
statusIndicator.style.position = "fixed";
statusIndicator.style.bottom = "20px";
statusIndicator.style.right = "20px";
statusIndicator.style.width = "15px";
statusIndicator.style.height = "15px";
statusIndicator.style.borderRadius = "50%";
statusIndicator.style.zIndex = "9999";
statusIndicator.style.boxShadow = "0 0 6px rgba(0,0,0,0.3)";
document.body.appendChild(statusIndicator);

// Create popup
const popup = document.createElement("div");
popup.textContent = "🔴 Non connecté (Read only)";
popup.style.position = "fixed";
popup.style.bottom = "20px";
popup.style.left = "50%";
popup.style.transform = "translateX(-50%)";
popup.style.background = "#ff4d4d";
popup.style.color = "white";
popup.style.padding = "10px 20px";
popup.style.borderRadius = "8px";
popup.style.fontFamily = "Arial, sans-serif";
popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
popup.style.zIndex = "9999";
popup.style.display = "none";
document.body.appendChild(popup);

// Helper to disable/enable elements
function toggleElements(disable) {
  // Appliquer classe read-only pour gestion CSS
  if (disable) {
    document.body.classList.add("read-only");
  } else {
    document.body.classList.remove("read-only");
  }

  // Bouton "Nouveau Kanban"
  document.querySelectorAll(".btn-create").forEach((el) => {
    el.disabled = disable;
    el.style.opacity = disable ? "0.5" : "1";
    el.style.pointerEvents = disable ? "none" : "auto";
    el.title = disable ? "Connexion requise" : "";
  });

  // Boutons Renommer / Supprimer
  document.querySelectorAll(".kanban-rename, .kanban-delete").forEach((btn) => {
    btn.disabled = disable;
    btn.style.opacity = disable ? "0.5" : "1";
    btn.style.pointerEvents = disable ? "none" : "auto";
    btn.title = disable ? "Connexion requise" : "";
  });

  // Bouton Soumettre (login)
  const submitBtn = document.getElementById("submit");
  if (submitBtn) {
    submitBtn.disabled = disable;
    submitBtn.style.opacity = disable ? "0.5" : "1";
    submitBtn.style.pointerEvents = disable ? "none" : "auto";
    submitBtn.title = disable ? "Connexion requise" : "";
  }

  // Boutons "ajouter une tâche"
  document.querySelectorAll(".add-task").forEach((btn) => {
    btn.disabled = disable;
    btn.style.opacity = disable ? "0.5" : "1";
    btn.style.pointerEvents = disable ? "none" : "auto";
    btn.title = disable ? "Connexion requise" : "";
  });

  // Désactivation du drag & drop des tâches
  document.querySelectorAll(".task-button").forEach((task) => {
    if (disable) {
      task.setAttribute("draggable", "false");
    } else {
      task.setAttribute("draggable", "true");
    }
  });
}

// Update UI based on connection status
function updateConnectionStatus() {
  console.log("Update connexion Status load !!");
  if (navigator.onLine) {
    statusIndicator.style.backgroundColor = "green";
    popup.style.display = "none";
    toggleElements(false);
  } else {
    statusIndicator.style.backgroundColor = "red";
    popup.style.display = "block";
    toggleElements(true);
  }
}

// Listen for connection changes
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

// Initial check
window.addEventListener("load", updateConnectionStatus);
