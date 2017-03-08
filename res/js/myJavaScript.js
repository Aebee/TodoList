$(function () {
  //run install.php script. If there is an error, halt javascript from continuing.
    $.ajax({
      type: "POST",
      async: false,
      url: "install.php",
      data: '',
      cache: false,
      success: function(result){
        if (result !== "OK") { alert("Error occured. Database/Table Could not be Created" + result); }
       }
    });
    //initiate tooltip function
    $('[data-toggle="tooltip"]').tooltip();
    //save button function to add tasks todatabase ans validate
    $('#saveBtn').click(function() {
      if ($('#textArea').val().length <= 4 || $('#textArea').val() === ' ') { alert("Invalid input."); return; }
      var str = $('#textArea').val(); var i = 0; var k = 0; var j = 1; var flag = 0; var successfulOperations = 0;
      //if user adds multiple tasks, split by semicolon
      var splittedString = str.split(";");
      while (i < splittedString.length) {
        //find they keyword by and ignore case sensitiviity
        var splitByAWord = splittedString[i].split(/\Wby\W/i);
        while (k < splitByAWord.length) {
          //to flag out if user put just by without anything followed by it
          if (splitByAWord.indexOf("by") < 0) {
            if (isDate(splitByAWord[j])) {
              flag = 0;
            }
            //flag if date format is incorrect or not entered
            else if (isDate(splitByAWord[j]) === false || splitByAWord[j] === undefined) { flag = 1; }
           }
          else { flag = 1; break; }
          if (flag === 0) {
            //to check and separate date from task if multiple "by" written
            var insideLoop = 0; var theTask = ""; var mySqlDateFormat;
            while (insideLoop < splitByAWord.length) {
              if (isDate(splitByAWord[insideLoop])) mySqlDateFormat = splitByAWord[insideLoop].split(".");
              else theTask += splitByAWord[insideLoop] + " ";
              insideLoop++;
            }
            $.ajax({
              type: "POST",
              async: false, //for my if statements otherwise they will excute before the callback is done
              url: "submit_data.php",
              data: 'taskName=' + theTask + '&taskDate=' + mySqlDateFormat[2] + '-' + mySqlDateFormat[1] + '-' + mySqlDateFormat[0],
              cache: false,
              success: function(result){ alert(result); successfulOperations++; }
            });
          }
          k++; j++;
        }
        k = 0; j=1;
        i++;
      }
      if (successfulOperations === 0) alert("Invalid format detected.");
      else if (successfulOperations < splittedString.length && successfulOperations > 0) alert("Some tasks have been added but other(s) had a format issue.\nPlease Check how-to-use tutorial");
      location.reload(true);
    });
    //end of save data button

    //cancel button to clear data and toggle
    $('#cancelBtn').click(function() {
        $('#textArea').val('');
    });

    //retrieve data from php page using Json format
    //initiate tooltip again for the newly created rows
    //replace hashtags with anchors
    $.getJSON("retreive_data.php",function(data){
        if (data.tasks.length === 0) { $('#tableData').hide(); $('#searchField').hide(); $('#lineID').hide(); }
        $.each(data.tasks, function(i,task){
        var newRow = "<tr>"
                    +"<td> <button type='button' class='glyphicon glyphicon-trash btn taskBtn' style='background-color:rgba(238, 238, 238, 0.44); border-radius:30px/10px;' data-toggle='tooltip' data-placement='top' title='Click to Delete Task.' id='deleteBtn-"+task.ID+"'></button></td>"
                    +"<td id='taskdate'>"+task.taskDate+"</td>"
                    +"<td id='taskname'><span class='hashtag'>"+task.taskName+"</span></td>"
                    +"<td> <button type='button' name='markCompleteBtn' class='btn btn-success taskBtn' data-toggle='tooltip' data-placement='top' title='Click to Mark Task as Completed.' id='done-"+task.ID+"'>Task Completed</button></td>"
                    +"</tr>" ;
                    $(newRow).appendTo("#tableData tbody");
                    $('[data-toggle="tooltip"]').tooltip();
          });
          //convert hashtags to links.
          $('#tableData tbody span.hashtag').replaceWith(function() {
            var url = $.trim($(this).text());
            if (url.match("^#")) {
              return '<a class="linkHashTag" style="color:black;" href="' + url + '" role="button">' + url + '</a>';
            }
            else return url;
          });
          filterHashTags();
          bindClickEvent();
    });
    //end of table load data

    //search input function to interactively search while typing
    $("#searchField").keyup(function () {
      if (this.value ==='show-completed-tasks') {
        //to clear table body every time the value is written, otherwise it will append the same data over and over again
        $('#completedTasksTable tbody').html('');
        $.getJSON("tasks_data.php",function(data){
            $.each(data.finishedTasks, function(i,finishedTask){
            var newRow = "<tr>"
                        +"<td>"+finishedTask.taskName+"</td>"
                        +"<td>"+finishedTask.taskDate+"</td>"
                        +"</tr>" ;
                        $(newRow).appendTo("#completedTasksTable tbody");
              });
              if (data.finishedTasks.length > 0) { $('#tasksModal').modal(); deleteFinishedTasksBtn(); }
              $('#searchField').val('').keyup();
        });
       }
        //split the current value of searchInput
        var data = this.value.split(" ");
        //create a jquery object of the rows
        var tableRow = $("#tableBody").find("tr");
        if (this.value == "") {
            tableRow.show();
            return;
        }
        //hide all the rows
        tableRow.hide();
        //Recusively filter the jquery object to get results.
        tableRow.filter(function (i, v) {
            var $t = $(this);
            for (var d = 0; d < data.length; ++d) {
                if ($t.is(":contains('" + data[d] + "')")) {
                    return true;
                }
            }
            return false;
        })
        //show the rows that match.
        .show();
    }).focus(function () {
        this.value = "";
        $(this).css({
            "color": "black"
        });
        $(this).unbind('focus');
    }).css({
        "color": "#C0C0C0"
    });

    //search field input end

    //check date format is valid
    function isDate(str) {
      if (/^[a-zA-Z()]+$/.test(str)) return false;
      var parms = str.split(/[\.]/);
      var yyyy = parseInt(parms[2],10);
      var mm   = parseInt(parms[1],10);
      var dd   = parseInt(parms[0],10);
      var date = new Date(yyyy,mm-1,dd,0,0,0,0);
      return mm === (date.getMonth()+1) &&
             dd === date.getDate() &&
           yyyy === date.getFullYear();
    }
    //end of date validation


    //monitor pressed keys for shortcuts
    var isShift = false;
    $(document).keyup(function (e) {
      if(e.which == 16) isShift=false;
    }).keydown(function (e) {
        if(e.which == 16) isShift=true;
        if(e.which == 84 && isShift == true && Cookies.get('shortcutBoolean') === "true") { $('.collapse').collapse('toggle'); return false; }
        if (e.which == 83 && isShift == true && Cookies.get('shortcutBoolean') === "true") { $('#saveBtn').click(); isShift = false; return false; }
        if (e.which == 67 && isShift == true && Cookies.get('shortcutBoolean') === "true") { $('#cancelBtn').click(); isShift = false; return false; }
        if (e.which == 70 && isShift == true && Cookies.get('shortcutBoolean') === "true") { $('#searchField').focus(); isShift = false; return false; }
    });
    //key monitor end

    //set cookie for one day to allow user to either enable or disable shortcuts to avoid issues with keyboard shortcuts
    if (Cookies.get('shortcutBoolean') === "false") {
          $('#shortcutsBtn').text('Enable Shortcuts');
    }
    if (Cookies.get('shortcutBoolean') === "true") {
          $('#shortcutsBtn').text('Disable Shortcuts');
    }
    //set shortcuts to be enabled by default
    if (Cookies.get('shortcutBoolean') === undefined) { Cookies.set('shortcutBoolean', 'true', { expires: 1 }); $('#shortcutsBtn').text('Disable Shortcuts'); }

    $('#shortcutsBtn').click(function() {
        if (Cookies.get('shortcutBoolean') === "false") {
          Cookies.set('shortcutBoolean', 'true', { expires: 1 });
        } else {
          Cookies.set('shortcutBoolean', 'false', { expires: 1 });
        }
        location.reload();
    });
    //end of cookie

});

//function to set filter using hashtag names. taking advantage of search function
function filterHashTags() {
  $('.linkHashTag').click(function() {
    //change value of search field then trigger the keyup event
    $('#searchField').val($(this).text()).removeClass('placeholder').keyup();
    //trigger when it is clicked so that it clears up the filter and avoid issues with placeholder
    $('#searchField').click(function() { $('#searchField').keyup(); });
  });
}
//end of hashtag filter

//bind function

function bindClickEvent() {

  $('.taskBtn').click(function() {
    var splitTaskID = this.id.split("-"); var theThis = this;
    if (splitTaskID[0] === 'done') {
      $.ajax({
        type: "POST",
        url: "update_task.php",
        data: 'taskID=' + splitTaskID[1] + '&taskUpdate=done',
        cache: false,
        success: function(result){
          if (result === 'Task has been updated Succesfully') {
                theThis.closest('tr').remove();
                alert(result);
          }
        }
      });
    }
    else if (splitTaskID[0] ==='deleteBtn') {
      $.ajax({
        type: "POST",
        url: "delete_task.php",
        data: 'taskID=' + splitTaskID[1],
        cache: false,
        success: function(result){
          if (result === 'Task has been removed Succesfully') {
                theThis.closest('tr').remove();
                alert(result);
          }
         }
      });
    }
  });
}

//End of bind function

function deleteFinishedTasksBtn() {
  $("#deleteAllFinishedTasks").click(function() {
    $.ajax({
      type: "POST",
      url: "delete_task.php",
      data: 'taskID=all',
      cache: false,
      success: function(result){
          $('#tasksModal').modal('toggle');
      }
    });
  });
}
