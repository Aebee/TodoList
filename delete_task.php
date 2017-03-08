<?php
  $connection = mysql_connect("localhost", "root", "root");
  $db = mysql_select_db("todolist", $connection);
  $taskID=$_POST['taskID'];

  if ($taskID == "all") {

    $query = "DELETE FROM tasks WHERE taskDone='done'";
    $result = mysql_query($query);
    if (!$result) {
      $message  = 'Invalid query: ' . mysql_error() . "\n";
      $message .= 'Whole query: ' . $query;
      die($message);
    }else { echo "deleted"; }
    mysql_close($connection); // Connection Closed


  }
  else {
  $query = "DELETE FROM tasks WHERE ID=$taskID";
  $result = mysql_query($query);
  if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
  }else { echo "Task has been removed Succesfully"; }
  mysql_close($connection); // Connection Closed
}
?>
