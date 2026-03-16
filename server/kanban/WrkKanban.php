<?php
require_once(__DIR__ . '/../DBManager.php');

class WrkKanban
{
    private $db;
    public function __construct()
    {
        $this->db = new DBManager();
    }

    function lireKanban($user)
    {
        $dataUser = $this->db->getUserNom($user);
        if ($dataUser != null && !empty($dataUser)) {
            $userCourant = $dataUser[0];
            if ($userCourant['PK_Utilisateur'] != null) {
                $PK = $userCourant['PK_Utilisateur'];
                $test = $this->db->getKanbansByUser($PK);
                if (is_array($test)) {
                    foreach ($test as $kanban) {
                        // echo "--------\n";
                        // echo "ID Kanban : " . $kanban['PK_Kanban'] . "\n";
                        // echo "Nom       : " . $kanban['nom'] . "\n";
                        // Ajoute d'autres champs ici si besoin
                        //  echo "--------\n";
                    }
                } else {

                }
            }
        }
        return $test;
    }
    function createKanban($nameKanban, $user)
    {
        $dataUser = $this->db->getUserNom($user);
        if ($dataUser != null && !empty($dataUser)) {
            $userCourant = $dataUser[0];
            if ($userCourant['PK_Utilisateur'] != null) {
                $PKUser = $userCourant['PK_Utilisateur'];
                return $this->db->createKanban($nameKanban, $PKUser);
            }
        } else {
            return 0;
        }

    }
    function rename($id, $newName)
    {
        return $this->db->renameKanban($id, $newName);
    }
    function delete($id)
    {
        return $this->db->deleteKanban($id);
    }
    function getTaskOf($idKanban)
    {
        $arrayTache = $this->db->getTaskOf($idKanban);
        // $taches = $arrayTache[0];
        return $arrayTache;
    }

}