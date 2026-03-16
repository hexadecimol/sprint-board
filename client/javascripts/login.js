/*
 * Contrôleur de la vue "index.html"
 *
 * @author Olivier Neuhaus
 * @version 1.0 / 20-SEP-2013
 */
class Login {
  constructor() {
    window.loginJsInstance = this;
    let service = new ServiceHttp();
    service.afficherMail(this.afficherMail, this.afficherMailNok);
    var current = null;
    // a partir de là c'est pour les effets :
    // Animation lorsque le champ 'user' reçoit le focus
    document.querySelector("#user").addEventListener("focus", function (e) {
      // Si une animation est en cours, on la met en pause
      if (current) current.pause();

      // Démarre une nouvelle animation sur les éléments <path> du SVG
      current = anime({
        targets: "path",
        strokeDashoffset: { value: 0, duration: 700, easing: "easeOutQuart" },
        strokeDasharray: {
          value: "240 1386",
          duration: 700,
          easing: "easeOutQuart",
        },
      });
    });

    // Animation lorsque le champ 'password' reçoit le focus
    document.querySelector("#password").addEventListener("focus", function (e) {
      // Si une animation est en cours, on la met en pause
      if (current) current.pause();

      // Démarre une nouvelle animation sur les éléments <path> du SVG
      current = anime({
        targets: "path",
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: "easeOutQuart",
        },
        strokeDasharray: {
          value: "240 1386",
          duration: 700,
          easing: "easeOutQuart",
        },
      });
    });
  }
  afficherMail(data) {
    document.getElementById("mail").innerText = data;
  }
  afficherMailNok(data) {
    document.getElementById("mail").innerText =
      "<impossible d'accéder au server>";
  }

  loginOK(data, text, jqXHR) {
    //
    if (data == 1) {
      window.location.href = "accueilAdmin.html";
    } else if (data == 0) {
      window.location.href = "kanban.html";
      // window.location.href = "accueilClient.html";
    } else {
      console.log("mot de passe incorecct !");
      document.getElementById("motDepasseInfo").innerText =
        "Mot de passe ou utilisateur incorrect";
    }
  }

  loginNOK(data, text, jqXHR) {
    document.getElementById("motDepasseInfo").innerText =
      "Mot de passe ou utilisateur incorrect";
    console.error("errorCallback");
  }

  testLogin() {
    var user = $("#user").val();
    var password = $("#password").val();
    //let client = new accueilClient();
    let service = new ServiceHttp();
    service.connect(user, password, this.loginOK, this.loginNOK);
  }
}
new Login();
