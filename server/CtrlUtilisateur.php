<?php
require_once('WrkUtilisateur.php');
class CtrlUtilisateur
{
    private $wrk;
    function __construct()
    {
        $this->wrk = new WrkUtilisateur();
    }
    function connexion($user, $password)
    {
        return $this->wrk->verifieUtilisateurEtMdp($user, $password);
    }

}



?>