<?php
// Konfigurasi koneksi
$host = "localhost";
$user = "root"; // Ganti dengan username MySQL kamu
$password = ""; // Ganti dengan password MySQL kamu
$database = "db_wb1";

// Buat koneksi
$conn = new mysqli($host, $user, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
echo "Berhasil terhubung ke MySQL!<br>";

// Query contoh
$sql = "SELECT * FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " - Name: " . $row["username"] . "<br>";
    }
} else {
    echo "Tidak ada data.";
}

// Tutup koneksi
$conn->close();
?>
