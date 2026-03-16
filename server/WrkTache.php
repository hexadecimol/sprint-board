<?php
require_once('DBManager.php');
class WrkTache
{
    private $db;
    public function __construct()
    {
        $this->db = new DBManager();
    }

    public function newTache($user, $nom, $column, $kanban)
    {
        $retour = 0;
        $dataUser = $this->db->getUserNom($user);
        if ($dataUser != null && !empty($dataUser)) {
            $userCourant = $dataUser[0];
            if ($userCourant['PK_Utilisateur'] != null) {
                $PK = $userCourant['PK_Utilisateur'];
                $test = $this->db->createTask($nom, $column, $PK, $kanban);
                $retour = $test;
            }
        }
        return $retour;
    }
    public function loadTask():array
    {
        $arrayTache = $this->db->getTaches();
        // $taches = $arrayTache[0];

        return $arrayTache;
    }
    public function getPk($nom, $colonne){
        return $this->db->getPkTache($nom,$colonne);
    }
    public function deleteTask($pk){
        $test =  $this->db->deleteTask($pk);
        if ($test == 1) {
            return $pk;
        } else {
            return -1;
        }
    }
    public function modifyTaskName($pk,$nom,$user):int{
        $PkUser = $this->db->getPkByUser($user);
          return $this->db->modifyTaskName($pk,$nom,$PkUser);
    }
    public function modifyTaskColumn($pk,$column,$user){
        return $this->db->modifyTaskColumn($pk,$column,$user);
    }

}

?>