$(document).ready(function(){


  var advanceTask = function(task){
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++){
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
    task.remove();
  };
//Move to inProgress
  $(document).on('click', '#item', function(e){
    e.preventDefault();
    //All this is saying is that we are preventing the default action for the event from being triggered.
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });
//move to complete
  $(document).on('click', '#inProgress', function(e){
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });
//delete items from the list
$(document).on('click', '#archived', function (e){
  e.preventDefault();
  var task = this;
  advanceTask(task);
});

  $('#newTaskForm').hide();

  var listo = [];

  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };

  var addTask = function(task){
    if(task){
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');
        $('#newList').append(
          '<a href="#finish" class"" id="item">' +
          '<li class = "list-group-item">' +
          '<h3>' + task.task + '</h3>'+
          '<span class="arrow pull-right">' +
          '<i class="glyphicon glyphicon-arrow-right">' +
          '</span>' +
          '</li>' +
          '</a>'
        );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  $('#saveNewItem').on('click', function(e){
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  //Opens form
  $('#add-todo').on('click', function(){
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  //Closes form
  $('#cancel').on('click', function(e){
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

function saveToDoList() {
    localStorage.setItem("tasks", listo);
    //saves the whole array, each element in the array is an object that has a task and an id.
}


// function reloadToDo() {
//   filledOutToDo = (localStorage["Filled.out.todo.list"] == "true");
//   if(!filledOutToDo) {
//     return false;
//   }
// }


});
