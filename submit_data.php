<?php
  $connection = mysql_connect("localhost", "root", "root");
  $db = mysql_select_db("todolist", $connection);
  $taskName=$_POST['taskName'];
  $taskDate=$_POST['taskDate'];
  $query = mysql_query("insert into tasks(taskName, taskDate, taskDone) values ('$taskName', '$taskDate', 'none')");
  echo "Task has been added Succesfully";
  mysql_close($connection); // Connection Closed
?>
