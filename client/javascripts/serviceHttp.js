var BASE_URL = "../server/server.php";
class ServiceHttp {
  constructor() {}

  connect(user, passwd, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "connect",
        user: user,
        password: passwd,
      },
      success: successCallback,
      error: errorCallback,
    });
  }

  ajouterTache(nom, colonne, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "ajouterTache",
        nom: nom,
        colonne: colonne,
      },
      success: successCallback,
      error: errorCallback,
    });
  }

  modifierNomTache(tache, nom, successCallback, errorCallback) {
    $.ajax({
      type: "PUT",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "modifierNomTache",
        tache: tache,
        nom: nom,
      },
      success: successCallback,
      error: errorCallback,
    });
  }

  modifierColonneTache(tache, colonne, successCallback, errorCallback) {
    console.log(tache + " + colonne)," + colonne);
    $.ajax({
      type: "PUT",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "modifierColonneTache",

        tache: tache,
        colonne: colonne,
      },
      success: successCallback,
      error: errorCallback,
    });
  }

  supprimerTache(tache, successCallback, errorCallback) {
    $.ajax({
      type: "DELETE",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "supprimerTache",
        tache: tache,
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  afficherMail(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "afficherMail",
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  afficherNom(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "afficherNom",
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  deconnexion(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL,
      data: {
        action: "deconnexion",
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  voirTouteLesTaches(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: BASE_URL,
      data: {
        action: "afficheToutesTaches",
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  voirTousLesKanbansParUsers(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: BASE_URL,
      data: {
        action: "kanbanPerUsers",
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  createKanban(name, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: BASE_URL,
      data: {
        action: "createKanban",
        name: name,
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  renameKanban(id, newName, successCallback, errorCallback) {
    $.ajax({
      type: "PUT",
      dataType: "json",
      url: BASE_URL,
      data: {
        action: "renameKanban",
        id: id,
        newName: newName,
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  deleteKanban(id, successCallback, errorCallback) {
    $.ajax({
      type: "DELETE",
      dataType: "text",
      url: BASE_URL,
      data: {
        action: "deleteKanban",
        id: id,
      },
      success: successCallback,
      error: errorCallback,
    });
  }
  getTaskOfKanban(idKanban, successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      //dataType: "text",
      url: BASE_URL,
      data: {
        action: "getTaskOfKanban",
        id: idKanban,
      },
      success: successCallback,
      error: errorCallback,
    });
  }
}
