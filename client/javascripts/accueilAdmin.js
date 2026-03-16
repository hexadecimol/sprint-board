class AccueilAdmin {
    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
        });
        window.accueilClientInstance = this;
        this.chargerToutLesTaches();
      // manque de temps durant ce module...
    }
    chargerToutLesTaches() {
        let serv = new ServiceHttp();
        serv.voirTouteLesTaches(this.afficheToutesLesTaches, this.erreurAfficherTaches);
    }
    afficheToutesLesTaches(data, text, jqXHR) {
          if (data != null) {
            if(data == "nokCo"){
                window.location.href = "login.html";
            }else{
            window.alert("Bonjour vrai admin, Les tâches ont bien été chargé, mais cette page est en cours de programmation...")
        }
        }
    }

    erreurAfficherTaches(data) {
        console.error("Impossible d'afficher toutes les tâches, serveur client nok");
    }
   
}
new AccueilAdmin();