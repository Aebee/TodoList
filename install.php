<?php
$servername = "localhost";
$username = "root";
$password = "root";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$result = mysqli_select_db($conn, 'todolist');
//check if database exists. If not, create it and create the table.
if (!$result) {
  $sql = "CREATE DATABASE todolist";
  if ($conn->query($sql) === TRUE) {
    $connectionWithDbName = new mysqli($servername, $username, $password, 'todolist');
    $createTableQuery = "CREATE TABLE tasks (ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                        taskDate date, taskName VARCHAR(30),
                        taskDone VARCHAR(50)
    )";
    if ($connectionWithDbName->query($createTableQuery) === TRUE) {
        echo "OK";
    } else {
        echo "Error creating table: " . $connectionWithDbName->error;
    }
  } else {
      echo "Error creating database: " . $connectionWithDbName->error;
  }
}
//if database exists, then check if the table exists. If it is not, create it.
else if ($result) {
    $connectionWithDbName = new mysqli($servername, $username, $password, 'todolist');
    $executeQuery = "SELECT * from tasks";
    if ($connectionWithDbName->query($executeQuery)) { echo 'OK'; }
    else if (!$connectionWithDbName->query($executeQuery)) {
      $createTableQuery = "CREATE TABLE tasks (ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          taskDate date, taskName VARCHAR(30),
                          taskDone VARCHAR(50)
      )";
      if ($connectionWithDbName->query($createTableQuery) === TRUE) {
          echo "OK";
      } else {
          echo "Error creating table: " . $connectionWithDbName->error;
      }
     }
}

$conn->close();
$connectionWithDbName->close();
?>
