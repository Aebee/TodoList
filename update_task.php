<?php
  $connection = mysql_connect("localhost", "root", "root");
  $db = mysql_select_db("todolist", $connection);
  $taskID=$_POST['taskID'];
  $taskUpdate=$_POST['taskUpdate'];
  $query = sprintf("UPDATE tasks SET taskDone='%s' WHERE ID=$taskID", mysql_real_escape_string($taskUpdate));
  $result = mysql_query($query);
  if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}else { echo "Task has been updated Succesfully"; }
  mysql_close($connection); // Connection Closed
?>
