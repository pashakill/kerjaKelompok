<?php

// Menambahkan header CORS untuk mengizinkan akses dari frontend tertentu
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json");

// Tangani preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Konfigurasi database
$host = "localhost";  // Ganti dengan host jika perlu
$user = "root";  // Ganti dengan username database
$password = "";  // Ganti dengan password database
$database = "db_wb1";  // Ganti dengan nama database

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Username and password are required"]);
    exit;
}

$username = $data['username'];
$password_input = $data['password'];  // Ambil password dari input pengguna

// Query untuk memeriksa username dan password
$sql = "SELECT * FROM user WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // Verifikasi password tanpa hashing (Plain Text Matching)
    if ($password_input === $user['password']) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
}

$stmt->close();
$conn->close();
?>
