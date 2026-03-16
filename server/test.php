<?php
require_once('configConnexion.php');
//AJOUTER LES INCLUDES NECESSAIRES AUX TEST DES FONCTIONS WORKER
require_once('WrkTache.php');
require_once('WrkUtilisateur.php');


//----------------------------------TESTS CONNEXION Server MySQL et DB---------------------------------------
echo "<h1> TESTS CONNEXION Server MySQL et DB </h1>";
echo "<hr>";

echo 'DB NAME :' .DB_NAME .'<br>';
echo 'DB_HOST :' .DB_HOST .'<br><br>';
try {
	$pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS, array(
		PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
		PDO::ATTR_PERSISTENT => true
     ));
	 echo "<b>Connexion successfull</b> <br>";
} catch (PDOException $e) {
  echo "Erreur !: " . $e->getMessage() . "<br/>";
  die();
}

$attributes = array(
     "CLIENT_VERSION", "CONNECTION_STATUS", "SERVER_VERSION"
);
foreach ($attributes as $val) {
    echo "PDO::ATTR_$val: ";
    echo $pdo->getAttribute(constant("PDO::ATTR_$val")) . "<br>";
}	

//----------------------------------------------------TESTS Database---------------------------------------
echo '<h1> TEST Database '.DB_NAME.'</h1>';
echo "<hr>";
//VALUES TO CHANGE
//VALUES TO CHANGE
$tableName = "t_colonnes";
$columnName = "nom";

echo "<h4>Query simple sur table $tableName</h4>";
$statement = $pdo->query("SELECT * FROM $tableName");
    
  while (($row = $statement->fetch())) {
	echo $row["nom"] . ' - PK : '. $row["PK_Colonnes"]. '<br>';
  };
$pdo=NULL;

//----------------------------------------------------TESTS Fonctions worker---------------------------------------
echo '<h1> TEST Fonctions Worker </h1>';
echo "<hr>";
$tacheManager = new WrkTache;
$userManager = new WrkUtilisateur;
//METHODE TO CHANGE
$results = $tacheManager->loadTask();

echo "Results from wrk tache all taks <br>";
foreach ($results as $result) {
	echo ' task  : ' .$result["PK_taches"] .' ; '.$result["nom"].'<br>';

}	
echo "<br>";


echo "<br><br> Result get all user <br>";
$Usernames = $userManager->loadUserName();
foreach ($Usernames as $name) {
	echo ' nom user  : ' . $name["nom"] . "<br>";

}	






?>

