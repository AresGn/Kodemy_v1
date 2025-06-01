<?php
// Configuration de la base de données
// $dsn = "mysql:host=localhost;dbname=u433704782_KodemyFrWeb";
// $username = "u433704782_kodemyfr";
// $password = "kodemyfrPassWord";

$dsn = "mysql:host=localhost;dbname=kodemyfr";
$username = "root";
$password = "";

try {
    // Création de la connexion PDO
    $pdo = new PDO($dsn, $username, $password);
    // Définir le mode d'erreur PDO sur Exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérification si le formulaire a été soumis
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['subscribe'])) {

        $errors = [];

        if (empty($name)) {
            $errors[] = 'Le nom est requis.';
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'L\'email est invalide.';
        }

        if (empty($subject)) {
            $errors[] = 'Le sujet est requis.';
        }

        if (empty($message)) {
            $errors[] = 'Le message est requis.';
        }

        if (!empty($errors)) {
            // Retourne une erreur si des champs sont invalides
            $errorMessage = implode("\\n", $errors);
            echo "<script>alert('$errorMessage'); window.location.href='index.html';</script>";
        } else {

            // Validation 
            $name    = htmlspecialchars(trim($_POST['name']));
            $email   = htmlspecialchars(trim($_POST['email']));
            $subject = htmlspecialchars(trim($_POST['subject']));
            $message = htmlspecialchars(trim($_POST['message']));

            // Vérifier si l'email existe déjà dans la table
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM visitors_emails WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                // Email déjà existant
                echo "<script>alert('Cet email est déjà inscrit. Veuillez choisir un autre email.'); window.location.href='../../index.html';</script>";
            } else {
                // Préparation de la requête SQL pour insérer l'email
                $stmt = $pdo->prepare("INSERT INTO visitors_emails (name, email, subject, message) VALUES (:name, :email, :subject, :message)");
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':subject', $subject);
                $stmt->bindParam(':message', $message);

                // Exécution de la requête
                if ($stmt->execute()) {
                    // Affichage d'une alerte JavaScript pour la réussite
                    echo "<script>alert('Merci pour votre inscription !'); window.location.href='../../index.html';</script>";
                } else {
                    // Affichage d'une alerte JavaScript pour l'erreur
                    echo "<script>alert('Erreur lors de l\\'inscription. Veuillez réessayer.'); window.location.href='../../index.html';</script>";
                }
            }
        }
    }
} catch (PDOException $e) {
    // Affichage d'une alerte JavaScript pour une erreur de connexion
    echo "<script>alert('Erreur de connexion : " . addslashes($e->getMessage()) . "'); window.location.href='index.html';</script>";
}
?>