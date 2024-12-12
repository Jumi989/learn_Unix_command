<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST'); 
header('Access-Control-Allow-Headers: Content-Type'); 
header('Content-Type: application/json'); 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "operating";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Modify the SQL query to limit the results to 19 rows
$sql = "SELECT id, command, description, Syntax, example FROM unix_com LIMIT 10";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

$conn->close();

echo json_encode($data);
?> 

