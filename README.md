# guestmanager

## Description
J'ai choisis le nom de code SprintBoard car mon projet permet de faire des sprints de travail  en étant le plus productif possible et c’est un pannel donc board -> SprintBoard.
C'est application est  une webApp PWA. . La PWA est très pratique car est utilisable sur tout format donc autant
pratique sur téléphone tablette que sur ordinateur.

## Objectif du projet

Dans l’idéal, je souhaite que le projet démarre sur une page de
connexion, avec la possibilité de créer un compte facilement, par un formulaire ou tout autre
moyen.

Pour inclure des fonctionnalités mobiles je veux que lorsque le chrono arrive à 00 : 00 le
téléphone vibre ✅

Une fois connecté, l’utilisateur accède à une page affichant les différents kanbans associés à
son compte. Voici quelques exemples de kanbans que l’on pourrait retrouver : Math,
Français, A30, Projet-1, Perso, Général. ✅

Chaque kanban aura sa propre liste de tâches, réparties dans trois colonnes : To Do, Doing,
et Done. ✅

J’aimerais également intégrer, au-dessus des trois colonnes, un timer basé sur la méthode
Pomodoro. Il s'agirait d’un minuteur de 25 minutes que l’on peut démarrer, mettre en pause,
avec une sonnerie à la fin, suivie d'une pause de 5 minutes, puis une nouvelle alerte. ✅

Implémenter une éventuelle monétisation dans le système d'enregistrement 

Résumé :

⎯ À la fin du timer téléphone vibre ✅
⎯ Si le téléphone est secoué nouvelle phase commence ( 25 min > 5min ) ✅
⎯ Responsive (Format téléphone) ✅
⎯ Système de page de tâches (projet 139, Matu, etc...) -> modifier DB ✅
⎯ Rajouter un timer par page (pouvoir mettre pause, 25min puis 5min de pause...) ✅
⎯ Un système de register (nom, mot de passe, adresse, mail)
⎯ Possibilité de télécharger l’application ✅
⎯ Système de paiement via twint
⎯ Modification personnalisé des valeurs des timers
⎯ Maintenir la session sur une plus longue durée

### Prérequis
- PHP 8.1 ou supérieur
- Composer
- MariaDB ou MySQL
- Serveur web (Apache/Nginx)

### Étapes d'installation
1. **Cloner le dépôt :**
   ```bash
    git clone git@github.com:maoo-tornare/sprint-board.git
    cd sprint-board
    ```

## Manuel d'utilisation

### Accéder à l'application
- Ouvrir l’URL de l’application dans un navigateur web compatible (Chrome, Firefox, Edge).
- Se connecter avec un compte organisateur ou se créer un compte.

### Fonctionnalités principales du 16.03.2026 sur https://sprint.maoo.ch/

#### Pour l'invité'
- Pas encore implémenter (à prévoir la permission de lecture sur un kanban de demo, et drag and drop autoriser)

#### Pour l'utilisateur
- Gérer les kanbans : Créer un kanban, modifier son nom, le supprimer
- Accéder à un kanban : Au clique sur un kanaban affiche la to do list
- Gérer le to do list : Créer une tâche, la modifier, la supprimer, la drag and drop pour changer son état
- Timer : Démmarrer, pause, prochain. Obligatoirement 25min puis 5min
- Session : login, sécurité sur toutes les routes login obligatoire, connexion avec vérification hashé en DB

#### Pour l’admin
- Pas encore implémenter (à prévoir une gestion des colonnes voir des kanbans de son organisation)
