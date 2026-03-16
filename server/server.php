<?php
require_once("CtrlUtilisateur.php");
require_once("CtrlTache.php");
require_once("kanban/CtrlKanban.php");
session_start();
$ctrlUser = new CtrlUtilisateur();
$ctrlTask = new CtrlTache();
$ctrlKanban = new CtrlKanban();
header('Content-Type: application/json');

if (isset($_SERVER['REQUEST_METHOD'])) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $action = $_GET['action'];
            if ($action == 'afficheToutesTaches') {
                if ($_SESSION['User'] != null) {
                    $result = $ctrlTask->loadTaches();
                    $output = []; // Initialisation d'une variable pour stocker le texte
                    foreach ($result as $tache) {
                        if (isset($tache['nom']) && isset($tache['FK_Colonne']) && isset($tache['PK_taches'])) {
                            $output[] = [
                                'nom' => $tache['nom'],
                                'FK_Colonne' => $tache['FK_Colonne'],
                                'PK_taches' => $tache['PK_taches']
                            ];
                        }
                    }
                    header('Content-Type: application/json');
                    echo json_encode($output);
                    break;
                } {
                    http_response_code(401);
                    break;
                }

            }
            if ($action == 'kanbanPerUsers') {

                if ($_SESSION['User'] != null) {
                    $user = $_SESSION['User'];
                    $result = $ctrlKanban->lireKanban($user);
                    echo json_encode($result);
                    break;
                }

            }
            if ($action == 'getTaskOfKanban') {

                if ($_SESSION['User'] != null) {
                    $id = $_GET['id'];
                    $_SESSION['kanban'] = $id;
                    $result = $ctrlKanban->getTaskOf($id);
                    echo json_encode($result);
                    break;
                } else {
                    http_response_code(401);
                    break;
                }

            }
            if ($action == 'deconnexion') {
                session_unset();
                session_destroy();
                break;
            }
            if ($action == 'afficherMail') {
                echo 'maoo.tornare@studentfr.ch';
                break;
            }
            if ($action == 'afficherNom') {
                echo $_SESSION['User'];
                break;
            }

            break;

        case 'POST':
            parse_str(file_get_contents("php://input"), $vars);

            if ($vars['action'] == 'ajouterTache') {
                if ($_SESSION['User'] != null) {
                    $user = $_SESSION['User'];
                    $nom = $vars['nom'];
                    $kanban = $_SESSION['kanban'];
                    $colonne = $vars['colonne'];
                    $result = $ctrlTask->ajouterTache($user, $nom, $colonne, $kanban);
                    $PKArray = $ctrlTask->getPkByTask($nom, $colonne);
                    $PK = $PKArray['0'];
                    echo json_encode([
                        "status" => $result,
                        "nom" => $nom,
                        "colonne" => $colonne,
                        "PK" => $PK
                    ]);
                } else {
                    http_response_code(401);
                }
            }
            if ($vars['action'] == 'connect') {
                $user = $vars['user'];
                $passwd = $vars['password'];

                if ($ctrlUser->connexion($user, $passwd) == 1) {
                    echo '1';
                    $_SESSION['User'] = $user;
                } else if ($ctrlUser->connexion($user, $passwd) == 0) {
                    echo '0';
                    $_SESSION['User'] = $user;
                } else {
                    http_response_code(400);
                    echo '-1';

                }

            }
            if ($vars['action'] == 'createKanban') {
                $name = $vars['name'];
                $user = $_SESSION['User'];
                $result = $ctrlKanban->createKanban($name, $user);
                if ($result != 0) {
                    $response = [
                        'pk' => $result,
                        'name' => $name
                    ];
                    echo json_encode($response);
                } else {
                    echo 0;
                }
            }
            break;

        case 'PUT':
            parse_str(file_get_contents("php://input"), $vars);
            if ($vars['action'] == 'modifierNomTache') {
                if ($_SESSION['User'] != "") {
                    $user = $_SESSION['User'];
                    $nom = $vars['nom'];
                    $PKtache = $vars['tache'];
                    $test = $ctrlTask->modifyNameTask($PKtache, $nom, $user);
                    if ($test == -1) {
                        http_response_code(400);
                        echo -1;
                    } else if ($test == 1) {
                        echo $PKtache . '|' . $nom;
                    } else {
                        //http_response_code(response_code: 400);
                        echo "error interne pour modifier une tâche...";
                    }
                } else {
                    http_response_code(401);
                }
                break;
            }

            if ($vars['action'] == 'modifierColonneTache') {
                if ($_SESSION['User'] != "") {
                    $user = $_SESSION['User'];
                    $PKtache = $vars['tache'];
                    $colonne = $vars['colonne'];
                    $test = $ctrlTask->modifyTaskColumn($PKtache, $colonne, $user);
                    if ($test == -1) {
                        http_response_code(400);
                        echo -1;
                    } else if ($test == 1) {
                        echo $PKtache . '|' . $colonne;
                    } else {
                        //http_response_code(403);
                        echo "error interne pour modifier une tâche...";
                    }
                } else {
                    http_response_code(401);
                }
            }
            if ($vars['action'] == 'renameKanban') {
                $id = $vars['id'];
                $newName = $vars['newName'];
                $test = $ctrlKanban->rename($id, $newName);
                if ($test == 1) {
                    $response = [
                        'pk' => $id,
                        'newName' => $newName
                    ];
                    echo json_encode($response);
                } else {
                    echo 0;
                }
            }
            break;
        case 'DELETE':
            parse_str(file_get_contents("php://input"), $vars);
            if ($_SESSION['User'] != "") {
                if ($vars['action'] == 'supprimerTache') {
                    $pk = $vars['tache'];
                    $test = $ctrlTask->deleteTask($pk);
                    if ($test = 1) {
                        echo $pk;
                    } else {
                        http_response_code(400);
                        echo -1;
                    }
                } else if ($vars['action'] == 'deleteKanban') {
                    $id = $vars['id'];
                    if ($ctrlKanban->delete($id) == 1) {
                        echo $id;
                    } else {
                        echo -1;
                        http_response_code(404);
                    }


                } else {
                    http_response_code(404);
                }
            } else {
                http_response_code(401);
            }

            break;
        default:
            // action pas trouvé
            http_response_code(404);
            break;
    }
}
?>