<?php
  $mysql_db_hostname = "localhost";
  $mysql_db_user = "root";
  $mysql_db_password = "root";
  $mysql_db_database = "todolist";
  ini_set('display_errors', 1);
  $con = @mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password,
   $mysql_db_database);
  if (!$con) {
   trigger_error('Cannot connect to MySQL: ' . mysqli_connect_error());
  }
  $var = array();
  $sql = "SELECT * FROM tasks WHERE taskDone='done'";
  $result = mysqli_query($con, $sql);
  while($obj = mysqli_fetch_object($result)) {
    $var[] = $obj;
  }
  echo '{"finishedTasks":'.json_encode($var).'}';
?>
