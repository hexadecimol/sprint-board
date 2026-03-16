<?php
require_once('WrkTache.php');
class CtrlTache
{
    private $wrk;
    function __construct()
    {
        $this->wrk = new WrkTache();
    }
    function ajouterTache($user, $nom, $column, $kanban): int
    {
        return $this->wrk->newTache($user, $nom, $column, $kanban);
    }

    function loadTaches()
    {
        return $this->wrk->loadTask();
    }
    function getPkByTask($nom, $colonne)
    {
        return $this->wrk->getPk($nom, $colonne);
    }
    function deleteTask($pk)
    {
        return $this->wrk->deleteTask($pk);
    }
    function modifyTaskColumn($pk, $column, $user)
    {
        return $this->wrk->modifyTaskColumn($pk, $column, $user);
    }
    function modifyNameTask($pk, $name, $user)
    {
        return $this->wrk->modifyTaskName($pk, $name, $user);
    }

}



?>