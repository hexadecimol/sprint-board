<?php
require_once('DBManager.php');
class WrkUtilisateur
{
    private $db;
    public function __construct()
    {
        $this->db = new DBManager();
    }

    public function verifieUtilisateurEtMdp($nom, $password)
    {
        $retour = -1;
        $user = $this->db->getUser($nom);
        if ($user != null && !empty($user)) {
            $userCourant = $user[0];
            $passwordHash = $userCourant['password'];
            if (password_verify($password, $passwordHash)) {
                if ($userCourant['estAdmin'] == 1) {
                    $retour = 1; // L'utilisateur est un admin
                } else {
                    $retour = 0; // L'utilisateur n'est pas un admin
                }
            }

        }
        return $retour;
    }
    public function loadUserName()
    {
        return $this->db->getUsers();
    }


}

?>