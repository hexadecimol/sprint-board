<?php
include_once('configConnexion.php');
class DBManager
{
    private $pdo;
    public function __construct()
    {
        try {
            $this->pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
        } catch (PDOException $e) {
            echo 'Erreur Connexion DB!: ' . $e->getMessage();
            die();
        }


    }
    public function getTaches(): array
    {
        $sql = $this->pdo->prepare("SELECT * FROM t_taches");
        $sql->execute();

        return $sql->fetchAll();
    }
    public function getPkTache($nom, $colonne)
    {
        $PDOStatement = $this->pdo->prepare("SELECT PK_taches FROM t_taches WHERE nom = :nom AND FK_Colonne = :colonne");
        $PDOStatement->execute(['nom' => $nom, 'colonne' => $colonne]);

        return $PDOStatement->fetch();

    }
    public function getUser($user): array
    {
        $sql = $this->pdo->prepare("SELECT * FROM t_utilisateur WHERE nom = :nom");
        $sql->bindParam(':nom', $user, PDO::PARAM_STR);
        $sql->execute();
        return $sql->fetchAll();
    }
    public function getUsers(): array
    {
        $sql = $this->pdo->prepare("SELECT nom FROM t_utilisateur");
        $sql->execute();
        return $sql->fetchAll();
    }

    public function getPkByUser($user): int
    {
        $sql = $this->pdo->prepare("SELECT PK_Utilisateur FROM t_utilisateur WHERE nom = :user");
        $sql->bindParam(':user', $user, PDO::PARAM_STR);
        $sql->execute();
        $result = $sql->fetchColumn(); // Récupère directement la valeur de la colonne
        if ($result !== false) {
            return (int) $result; // Si trouvé, retourne la PK
        } else {
            return -1; // Si non trouvé, retourne -1
        }
    }
    public function getUserNom($user): array
    {
        $sql = $this->pdo->prepare("SELECT * FROM t_utilisateur WHERE nom = :user");
        $sql->bindParam(':user', $user, PDO::PARAM_STR);

        $sql->execute();
        return $sql->fetchAll();
    }

    public function createTask($nom, $column, $user, $kanban): int
    {
        $sql = $this->pdo->prepare(
            "INSERT INTO t_taches (nom, FK_Colonne, FK_Utilisateur, FK_kanban) VALUES (:nom, :column, :user, :kanban)"
        );

        $sql->bindParam(':nom', $nom, PDO::PARAM_STR);
        $sql->bindParam(':column', $column, PDO::PARAM_INT);
        $sql->bindParam(':user', $user, PDO::PARAM_INT);
        $sql->bindParam(':kanban', $kanban, PDO::PARAM_INT);
        if ($sql->execute()) {
            return 1; // Succès
        } else {
            return -1; // Échec
        }
    }

    public function modifyTaskName($pk, $name, $user): int
    {
        // echo 'nom de la tache Db : ' . $name . '/' .' pk vaut : ' . $pk . 'lutili vaut ' . $user;
        $sql = $this->pdo->prepare("UPDATE t_taches SET nom = :nom, FK_Utilisateur = :user WHERE PK_taches = :pk");

        $sql->bindParam(':pk', $pk, PDO::PARAM_INT);
        $sql->bindParam(':nom', $name, PDO::PARAM_STR);
        $sql->bindParam(':user', $user, PDO::PARAM_INT);

        if ($sql->execute()) {
            return 1; // Succès
        } else {
            return -1; // Échec
        }
    }

    public function modifyTaskColumn($pk, $column, $user): int
    {
        $sql = $this->pdo->prepare("UPDATE `t_taches` SET `FK_Colonne` = :column WHERE `PK_taches` = :pk");

        // Lier les paramètres
        $sql->bindParam(':pk', $pk, PDO::PARAM_INT);
       
        //$sql->bindParam(':user', $user, PDO::PARAM_INT);
        $sql->bindParam(':column', $column, PDO::PARAM_INT);

        // Exécution de la requête
        if ($sql->execute()) {
            return 1; // Succès
        } else {
            return -1; // Échec
        }
    }
    public function deleteTask($pk)
    {
        $sql = $this->pdo->prepare("DELETE FROM t_taches WHERE `t_taches`.`PK_taches` = :pk");
        $sql->bindParam(':pk', $pk, PDO::PARAM_INT);

        if ($sql->execute()) {
            return 1;
        } else {
            return 0;
        }
    }

    public function getColonneTache($pk)
    {
        $sql = $this->pdo->prepare("SELECT FK_Colonne FROM t_taches WHERE PK_taches = ':pk'");
        $sql->bindParam(':pk', $pk, PDO::PARAM_INT);

        if ($sql->execute() && $sql->fetchColumn()) {
            return $pk;
        } else {
            return -1;
        }
    }
    public function getKanbansByUser($userId)
    {
        $sql = $this->pdo->prepare("SELECT * FROM t_kanban WHERE FK_Utilisateur = :userId");
        $sql->bindParam(':userId', $userId, PDO::PARAM_INT);

        if ($sql->execute()) {

            return $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return [];
        }
    }
    public function createKanban($nameKanban, $PKUser)
    {
        $sql = $this->pdo->prepare("INSERT INTO t_kanban (nom, FK_Utilisateur) VALUES (:nom, :userId)");
        $sql->bindParam(':nom', $nameKanban, PDO::PARAM_STR);
        $sql->bindParam(':userId', $PKUser, PDO::PARAM_INT);

        if ($sql->execute()) {
            return $this->pdo->lastInsertId();
        } else {
            return 0;
        }
    }

    public function renameKanban($id, $newName)
    {
        $sql = $this->pdo->prepare("UPDATE t_kanban SET nom = :newName WHERE PK_Kanban = :id");
        $sql->bindParam(':newName', $newName, PDO::PARAM_STR);
        $sql->bindParam(':id', $id, PDO::PARAM_INT);

        if ($sql->execute()) {
            return 1;
        } else {
            return 0;
        }
    }

    public function deleteKanban($id)
    {
        $sql = $this->pdo->prepare("DELETE FROM t_kanban WHERE PK_Kanban = :id");
        $sql->bindParam(':id', $id, PDO::PARAM_INT);

        if ($sql->execute()) {
            return 1;
        } else {
            return 0;
        }
    }

    public function getTaskOf($idKanban)
    {
        $sql = $this->pdo->prepare("SELECT * FROM t_taches WHERE FK_Kanban = :idKanban");
        $sql->bindParam(':idKanban', $idKanban, PDO::PARAM_INT);

        if ($sql->execute()) {
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return [];
        }
    }

}
?>