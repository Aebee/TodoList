### Privacy note: Please note that the application uses cookies for saving the "Enable/Disable Shortcut" button state. The cookie expires after 1 hour.

# Todolist Guide
The application is fairly easy to use. The application is used to save your todolist and mark them either done or delete them. It is a useful tool to keep track of your errands. In the following sections, you will know how to use it properly and avoid any possible errors. The following sections are splited into two sections. The first section is for administrator and how to install. And the second, is for users and how to use.
# Admin Manual
The application has been run and tested on Linux machine using LAMP. To run the application using Linux, please copy the application folder into `/var/www/html/`. After that, make sure that apache and MySqli is running. Lastly, please change the username and password into the .php files to match your Mysql username and password.
After changing the password into the php file and copying the application folder into your server path, the application will run and create the required database and/or the table if they were not already created.

## Useful Linux Commands
`sudo /etc/init.d/apache2 start` To start Apache Server.
`sudo /etc/init.d/mysql start` To start Mysql Server.
`sudo chmod 775/664 folder/filename` To change file/folder permission.
> Note: Please note that the application folder inside the html folder should have the permission 775 not 777 as this will cause an error. Also, any jpg/resources should have 664 permission.
# User Manual
## Add Task
> To add a task you can either use keyboard shortcuts or click the + sign. The plus sign (+) can be found under the header. Click on it and a text area and two buttons will appear.
### Adding Multiple Tasks
> You can add multiple tasks at the same time separating them by a semicolon (;) or you could just add one task without using the semicolon.
### Adding Task Format</h4>
> For a single task the format is: taskname by taskdate. Example: Go running by 2.2.2013 `` Please note that date format must be as in the example. Using 2/2/2015, 2-2-2015 or even 2.20.2015, will cause an error and task will not be added to database.`` The date format is day.month.year or d.m.y .` Also, remember that the word "by" is the keyword to add a task. The word must be added between the task name and the task date as shown in the examples.`
### Adding Multiple Tasks
> To add multple tasks, using the following format: taskname by taskdate; secondtaskname by taskdate. Example: Go running by 2.2.2015; do laundry by 2.2.2015.
### HashTags
> Adding a task starts by a hashtag (#) will render it as an anchor in the tasks table. By clicking on it, it will filter or show all tasks that has the same hashtag. To add a task with hashtag, #taskname by 2.2.2015. Example: #go running by 2.2.2015</p>
## Keyboard Shortcuts
> Keyboard shortcuts can be either enabled or disabled. By default shortcuts are enabled. To disable it, there is a button that toggles between enable and disable.
`Available shortcuts are, shift + s to save task/tasks, shift + c will cancel adding the task, shift + f will shift the focus to the search input, and shift + t will open the panel and show textarea to add tasks.`
## Search Input
> Search input should help you filter through your lists. Type the task name and it will be the only task to appear on your list. To show all tasks, empty the search input field -- remove all the letters you have entered.
## Delete Button
> Delete button will completely remove task from the database table, and it cannot be restored.
## Task Done Button
> Task Done button will remove the task from tasks list but it will remain into the database. To show completed task, type "show-completed-tasks" in the search field. This will popup a list of all the tasks that you have completed, and to remove them entirely from the database, click on the button Delete.