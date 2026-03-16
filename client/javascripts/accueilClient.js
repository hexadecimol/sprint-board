class accueilClient {
  PKDraguable;
  constructor() {
    this.PKDraguable = 0;

    // Pomodoro variables
    this.pomodoroTime = 25 * 60; // 25 minutes
    this.breakTime = 1 * 60; // 5 minutes
    this.currentTime = this.pomodoroTime;
    this.phase = 1; // 1 = pomodoro, 2 = pause
    this.timerPomodoro = null;
    this.isRunning = false;
    this.timerDisplay = null; // On va setter après le DOM ready
    let lastShakeTime = 0;

    window.accueilClientInstance = this;
    //création d'un écouteur pour lancé mes méthode servant au drag and drop
    document.addEventListener("DOMContentLoaded", () => {
      document
        .querySelectorAll(".task-column1, .task-column2, .task-column3")
        .forEach((column) => {
          column.addEventListener("dragover", accueilClientInstance.dragOver);
          column.addEventListener("drop", accueilClientInstance.drop);
          column.addEventListener("dragend", accueilClientInstance.dragend);
        });
    });
    // this.chargerToutLesTaches();
    document.addEventListener("DOMContentLoaded", () => {
      const kanbanId = sessionStorage.getItem("kanbanId");
      const kanbanName = sessionStorage.getItem("kanbanName");
      document.getElementById("kanbanName").textContent = kanbanName;
      accueilClientInstance.chargerTacheParKanbankanbanId(kanbanId);

      this.timerDisplay = document.getElementById("timerDisplay");
      this.currentTime = this.pomodoroTime; // si tu veux reset à ce moment
      this.updateDisplayPomodoro();
    });
    window.addEventListener("devicemotion", function (event) {
      const acceleration = event.accelerationIncludingGravity;
      const now = Date.now();

      if (!acceleration) return;

      const shakeThreshold = 15; // Ajuste si trop sensible
      const totalAcceleration = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      );

      if (totalAcceleration > shakeThreshold && now - lastShakeTime > 1000) {
        lastShakeTime = now;
        if (
          accueilClientInstance &&
          typeof accueilClientInstance.resetPomodoro === "function"
        ) {
          accueilClientInstance.resetPomodoro();
        }
      }
    });
  }
  creerTacheHtml(nom, colonne, PK) {
    // Création du bouton de tâche
    var taskButton = document.createElement("button");
    taskButton.classList.add("task-button");
    taskButton.setAttribute("data-pk", PK);
    taskButton.setAttribute("data-colonne", colonne);
    taskButton.setAttribute("draggable", "true");
    taskButton.innerText = nom;

    // Création du conteneur des actions (icônes)
    var taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    // Icône Modifier (stylo)
    var editIcon = document.createElement("span");
    editIcon.classList.add("edit");
    editIcon.innerHTML = "✒️";
    editIcon.addEventListener("click", () =>
      accueilClientInstance.modifyTask(PK)
    );

    // Icône Supprimer (poubelle)
    var deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete");
    deleteIcon.innerHTML = "❌";
    deleteIcon.addEventListener("click", () =>
      accueilClientInstance.deleteTask(PK)
    );

    // Ajout des icônes au conteneur
    taskActions.appendChild(editIcon);
    taskActions.appendChild(deleteIcon);

    // Ajout des actions au bouton
    taskButton.appendChild(taskActions);
    // Définir l'événement dragstart avec un délai pour s'assurer que l'élément est bien dans le DOM
    taskButton.addEventListener("dragstart", (event) => {
      // Attendre que l'élément soit bien dans le DOM avant d'exécuter dragStart
      setTimeout(() => {
        accueilClientInstance.dragStart(event);
      }, 0); // Le délai 0 permet de passer à l'exécution suivante dans la pile d'événements
    });

    document.querySelector(".task-column" + colonne).appendChild(taskButton);
  }
  verifyTailleTache(str) {
    if (str.length > 45) {
      window.alert("45 caractère maximum pour une tâche !");
      return false;
    } else {
      return true;
    }
  }
  // Fonction de modification de la tâche
  modifyTask(pk) {
    let newName = prompt("Entrez un nouveau nom pour la tâche:");
    if (newName) {
      if (this.verifyTailleTache(newName) == true) {
        if (pk) {
          let serv = new ServiceHttp();
          serv.modifierNomTache(
            pk,
            newName,
            accueilClientInstance.modifyNomTaskOk,
            accueilClientInstance.modifyNomTaskNok
          );
        }
      }
    }
  }
  modifyNomTaskOk(data) {
    if (data != null) {
      if (data == "nokCo") {
        window.location.href = "login.html";
      } else {
        if (data == -1) {
          console.alert("Erreur, impossible de modifier le nom");
        } else {
          let valeurs = data.split("|"); // Sépare "PK_Tache" et "nom"
          let pk = valeurs[0];
          let nom = valeurs[1];
          let taskButton = document.querySelector(`[data-pk='${pk}']`);
          let colonne = taskButton.getAttribute("data-colonne");
          // je l'enlève et la créé car simplement modifier le text enlève les icone de modifs
          accueilClientInstance.removeTaskHtml(pk);
          accueilClientInstance.creerTacheHtml(nom, colonne, pk);
        }
      }
    }
  }
  modifyNomTaskNok() {
    console.error("Impossible de modifier le nom, liaison js- server");
  }
  deleteTask(pk) {
    // Supprimer le bouton de la tâche du DOM
    let serv = new ServiceHttp();
    serv.supprimerTache(
      pk,
      accueilClientInstance.removeTaskHtml,
      accueilClientInstance.deleteTaskError
    );
  }
  removeTaskHtml(data) {
    if (data != null) {
      if (data == "nokCo") {
        window.location.href = "login.html";
      } else {
        if (data == -1) {
        } else {
          let taskButton = document.querySelector(`[data-pk='${data}']`);
          if (taskButton) {
            taskButton.remove();
          }
        }
      }
    }
  }
  chargerTacheParKanbankanbanId(id) {
    console.log("kanban with the id " + id + ", will be open");
    let serv = new ServiceHttp();
    let accueil = new accueilClient();
    serv.getTaskOfKanban(
      id,
      accueilClientInstance.afficheToutesLesTaches,
      accueilClientInstance.getTaskNOK
    );
  }
  getTaskNOK(data) {
    console.error(
      "Impossible d'afficher toutes les tâches du kanban, data : " + data
    );
  }
  deleteTaskError(data) {
    console.error("Error with delete task, data : " + data);
  }
  logout() {
    let serv = new ServiceHttp();
    serv.deconnexion(this.logoutOK, this.logoutNOK);
  }
  logoutOK(data) {
    window.location.href = "login.html";
  }
  logoutNOK(data) {
    window.alert("Deconnexion ERROR" + data);
  }
  // lancé au chargement de la page
  chargerToutLesTaches() {
    let serv = new ServiceHttp();
    serv.voirTouteLesTaches(
      this.afficheToutesLesTaches,
      this.erreurAfficherTaches
    );
  }

  afficheToutesLesTaches(data) {
    console.log("Affichage des tâches commence, data : " + data);
    if (data) {
      if (data == "nokCo") {
        window.location.href = "login.html";
      } else {
        try {
          let taches = data; // Parse le JSON reçu
          taches.forEach((tache) => {
            let nom = tache.nom;
            let colonne = tache.FK_Colonne;
            let PK = tache.PK_taches;
            accueilClientInstance.creerTacheHtml(nom, colonne, PK);
          });
        } catch (e) {
          console.error("Erreur lors de la conversion JSON :", e);
        }
      }
    }
  }

  erreurAfficherTaches(data) {
    console.error("Impossible d'afficher toutes les tâches");
  }
  newTaskToDo(column) {
    var taskName = prompt("Entrez le nom de la tâche :");
    if (!taskName) return;
    if (this.verifyTailleTache(taskName)) {
      this.saveTaskInDb(taskName, column);
    } else {
    }
  }
  saveTaskInDb(taskname, column) {
    let service = new ServiceHttp();
    service.ajouterTache(taskname, column, this.createTask, this.errorSaveInDb);
  }
  createTask(data, text, jqXHR) {
    if (data != null) {
      if (data == "nokCo") {
        window.location.href = "login.html";
      } else {
        let response = JSON.parse(data); // Convertir le texte en objet JS
        let status = response.status;
        let nom = response.nom;
        let colonne = response.colonne;
        let PK = response.PK;
        if (status == 1) {
          accueilClientInstance.creerTacheHtml(nom, colonne, PK);
        }
      }
    }
  }
  errorSaveInDb() {
    console.error("Taches pas créé en DB ERREUR DATA :");
    console.error(data);
  }

  dragOver(event) {
    event.preventDefault(); // Empêche le comportement par défaut pour permettre le drop
  }

  dragStart(event) {
    let pk = event.target.getAttribute("data-pk");
    let colonne = event.target;
    accueilClientInstance.PKDraguable = pk;
    event.target.classList.add("dragging");
  }
  // je retire l'effet de drag lors de sa fin (pas forcément drop)
  dragend(event) {
    let pk = accueilClientInstance.PKDraguable;
    if (!pk) return;
    let task = document.querySelector(`[data-pk='${pk}']`);
    task.classList.remove("dragging");
  }
  drop(event) {
    event.preventDefault(); // Empêche le comportement par défaut du navigateur
    let pk = accueilClientInstance.PKDraguable;
    if (!pk) return;
    let task = document.querySelector(`[data-pk='${pk}']`);

    // Trouve la colonne cible avec (.task-column1, .task-column2, .task-column3)
    let dropTarget = event.target.closest(
      ".task-column1, .task-column2, .task-column3"
    );
    if (!dropTarget) return; // Sécurité si aucune colonne trouvée

    // Déplace la tâche vers la colonne cible
    dropTarget.appendChild(task);
    task.classList.remove("dragging");

    // Détermine l'index de la colonne
    let pkColonne = dropTarget.cellIndex + 1;

    // Envoie la mise à jour au serveur
    let serv = new ServiceHttp();
    serv.modifierColonneTache(
      pk,
      pkColonne,
      this.modifierColonneTacheOk,
      this.modifierColonneTacheNOk
    );
  }

  modifierColonneTacheOk(data, text, jqXHR) {
    if (data != -1) {
      let valeurs = data.split("|"); // Sépare "nom" , "FK_Colonne" et la "PK"
      let pk = valeurs[0];
      let colonne = valeurs[1];
      let taskButton = document.querySelector(`[data-pk='${pk}']`);
      taskButton.setAttribute("data-colonne", colonne);
    }
  }
  modifierColonneTacheNOk(data, text, jqXHR) {
    console.error("Modifier colonne NOK");
  }

  startPomodoro() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timerPomodoro = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.updateDisplayPomodoro();
      } else {
        this.pausePomodoro();
        this.phase = this.phase === 1 ? 2 : 1;
        this.currentTime =
          this.phase === 1 ? this.pomodoroTime : this.breakTime;
        this.updateDisplayPomodoro();
        // 👉 Vibration à la fin du cycle
        navigator.vibrate(10000);
        let audio = new Audio("images/sound.mp3");
        audio.play();
      }
    }, 1000);
  }

  pausePomodoro() {
    if (!this.isRunning) return;
    clearInterval(this.timerPomodoro);
    this.isRunning = false;
  }

  resetPomodoro() {
    this.pausePomodoro();
    this.phase = this.phase === 1 ? 2 : 1;
    this.currentTime = this.phase === 1 ? this.pomodoroTime : this.breakTime;
    this.updateDisplayPomodoro();
  }

  updateDisplayPomodoro() {
    let minutes = Math.floor(this.currentTime / 60);
    let seconds = this.currentTime % 60;
    let minStr = minutes < 10 ? "0" + minutes : minutes;
    let secStr = seconds < 10 ? "0" + seconds : seconds;

    let timerDisplay = document.getElementById("timerDisplay");
    if (timerDisplay) {
      timerDisplay.textContent = `${minStr}:${secStr}`;
    } else {
      console.warn("timerDisplay is null, can't update timer");
    }
  }
}
// Instancier la classe une seule fois
new accueilClient();
