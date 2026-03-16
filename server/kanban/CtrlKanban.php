<?php
require_once('WrkKanban.php');
class CtrlKanban
{
    private $wrk;
    function __construct()
    {
        $this->wrk = new WrkKanban();
    }
    function lireKanban($user)
    {
        return $this->wrk->lireKanban($user);
    }
    function createKanban($name, $user)
    {
        return $this->wrk->createKanban($name, $user);
    }
    function rename($id, $name)
    {
        return $this->wrk->rename($id, $name);
    }
    function delete($id)
    {
        return $this->wrk->delete($id);
    }
    function getTaskOf($id)
    {
        return $this->wrk->getTaskOf($id);
    }

}


