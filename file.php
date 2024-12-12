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

// Modify the SQL query to get the last 11 rows, ordered by 'id' in descending order
$sql = "SELECT id, command, description, Syntax, example FROM unix_com ORDER BY id DESC LIMIT 11";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Reverse the array to get the rows in ascending order
$data = array_reverse($data);

$conn->close();

echo json_encode($data);
?> 
