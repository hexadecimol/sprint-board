class Kanban {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {});

    window.kanbanInstance = this;
    kanbanInstance.chargerTousLesKanbans();
  }
  chargerTousLesKanbans() {
    let serv = new ServiceHttp();
    serv.voirTousLesKanbansParUsers(
      kanbanInstance.chargerKanbanOK,
      kanbanInstance.chargerKanbanNOk
    );
    serv.afficherNom(
      kanbanInstance.chargerNomOK,
      kanbanInstance.chargerKanbanNOk
    );
  }
  chargerNomOK(data) {
    const nouveauNom = data;
    console.log("User est : " + data);
    document.querySelector(".hello strong").textContent = "Bonjour " + data;
  }
  chargerKanbanNOk(data) {
    console.log("Erreur load Kanban");
    window.location.href = "login.html";
    console.log("data vaut " + data);
  }
  chargerKanbanOK(data) {
    console.log("load Kanban okkk");

    if (Array.isArray(data)) {
      data.forEach((kanban) => {
        console.log("ID :", kanban.PK_Kanban);
        console.log("Nom :", kanban.nom);
        kanbanInstance.creerKanbanHtml(kanban.nom, kanban.PK_Kanban);
      });
    }
  }
  createKanban() {
    console.log("create kanban");
    const nom = prompt("Entrez le nouveau nom du Kanban :");
    if (kanbanInstance.verifyTailleTache(nom) == false) {
      return;
    }
    let serv = new ServiceHttp();
    serv.createKanban(
      nom,
      kanbanInstance.createKanbanOk,
      kanbanInstance.renameNOK
    );
  }
  createKanbanOk(data) {
    console.log("Rename is OK, see the datas " + data);
    if (data == 0) {
      console.log("impossible de rename");
    } else {
      // ici on suppose que data est un objet
      const pk = data.pk;
      const nom = data.name;
      kanbanInstance.creerKanbanHtml(nom, pk);
    }
  }
  createKanbanNOK(data) {
    console.log("Rename is NOK, see the datas " + data);
  }

  rename(id) {
    const nouveauNom = prompt("Entrez le nouveau nom du Kanban :");
    if (nouveauNom) {
      if (kanbanInstance.verifyTailleTache(nouveauNom) == false) {
        return;
      }
      console.log(
        "Task " + id + ", will be rename with the new name : " + nouveauNom
      );
      let serv = new ServiceHttp();
      serv.renameKanban(
        id,
        nouveauNom,
        kanbanInstance.renameOk,
        kanbanInstance.renameNOK
      );
    }
  }
  verifyTailleTache(str) {
    if (str.length > 18 || str === null || str == "") {
      window.alert("le nom n'est pas valabe trop long ou nulle !");
      return false;
    } else {
      return true;
    }
  }
  renameOk(data) {
    if (data == 0) {
      console.log("impossible de rename");
    } else {
      // ici on suppose que data est un objet
      const pk = data.pk;
      console.log("PK a enlever coté HTML " + pk);
      const newName = data.newName;
      // Trouver la carte dans le DOM
      const card = document.querySelector(`#kanban-${pk}`);
      if (card) {
        // Modifier le titre (le <h3>)
        const title = card.querySelector("h3");
        if (title) {
          title.textContent = newName;
        }
      } else {
        console.warn(`Carte kanban avec id ${pk} introuvable`);
      }
    }
  }
  renameNOK(data) {
    console.log("Rename is NOK, see the datas " + data);
  }
  suppr(id) {
    console.log("task : " + id + ", will be delete");
    let serv = new ServiceHttp();
    serv.deleteKanban(id, kanbanInstance.supprOk, kanbanInstance.supprNOK);
  }
  supprOk(data) {
    console.log("suppr okkk " + data);
    if (data == -1) {
      console.error("DELETE TASK ERROR");
    } else {
      kanbanInstance.supprimerKanban(data);
    }
  }
  supprNOK(data) {
    console.log("suppr nokkk " + data);
  }

  openKanban(id) {
    sessionStorage.setItem("kanbanId", id);

    // Récupérer le nom depuis le DOM
    const card = document.querySelector(`#kanban-${id}`);
    let name = "Kanban";
    if (card) {
      const titleElement = card.querySelector("h3");
      if (titleElement) {
        name = titleElement.textContent;
      }
    }
    console.log("le nom est : " + name);
    sessionStorage.setItem("kanbanName", name);

    // Rediriger vers la page d’accueil client
    window.location.href = "accueilClient.html";
  }
  getTaskOk(data) {
    console.log("Rename is OK, see the datas " + data);
  }
  getTaskNOK(data) {
    console.log("Rename is NOK, see the datas " + data);
  }
  supprimerKanban(pk) {
    const card = document.querySelector(`#kanban-${pk}`);
    if (card) {
      card.remove();
    } else {
      console.warn(`Carte kanban avec id ${pk} introuvable`);
    }
  }
  creerKanbanHtml(nom, id) {
    const grid = document.querySelector(".kanban-grid");

    if (!grid) {
      console.error("Élément '.kanban-grid' introuvable dans le DOM.");
      return;
    }

    // Création de la carte
    const card = document.createElement("div");
    card.classList.add("kanban-card");
    card.id = `kanban-${id}`;
    card.dataset.id = id;

    // Titre
    const title = document.createElement("h3");
    title.textContent = `${nom}`;

    // Actions
    const actions = document.createElement("div");
    actions.classList.add("card-actions");

    const btnRename = document.createElement("button");
    btnRename.textContent = "Renommer";
    btnRename.classList.add("kanban-rename");
    btnRename.setAttribute("onClick", `kanbanInstance.rename(${id})`);

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Supprimer";
    btnDelete.classList.add("kanban-delete");
    btnDelete.setAttribute("onClick", `kanbanInstance.suppr(${id})`);

    actions.appendChild(btnRename);
    actions.appendChild(btnDelete);

    card.appendChild(title);
    card.appendChild(actions);

    // 👇 Clic sur la carte (sauf si clic sur bouton)
    card.addEventListener("click", function (e) {
      // Ignore si clic sur un bouton
      if (e.target.tagName.toLowerCase() !== "button") {
        kanbanInstance.openKanban(id);
      }
    });

    grid.appendChild(card);
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
}
new Kanban();
