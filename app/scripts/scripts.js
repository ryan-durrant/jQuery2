$(document).ready(function(){

  var listo = [];

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
    localStorage.setItem("listoArr", JSON.stringify(listo));
  };
//Move to inProgress
  $(document).on('click', '#item', function(e){
    e.preventDefault();
    //All this is saying is that we are preventing the default action for the event from being triggered.
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
    localStorage.setItem("listoArr", JSON.stringify(listo));
  });
//move to complete
  $(document).on('click', '#inProgress', function(e){
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
    localStorage.setItem("listoArr", JSON.stringify(listo));
  });
//delete items from the list
$(document).on('click', '#archived', function (e){
  e.preventDefault();
  var task = this;
  advanceTask(task);
});

  $('#newTaskForm').hide();

  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };

  var addTask = function(task){
    if(task){
      task = new Task(task);
      listo.push(task);

      localStorage.setItem("listoArr", JSON.stringify(listo));

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

  if(localStorage.getItem('listoArr')) {
    var dataArr = JSON.parse(localStorage.getItem('listoArr'));
    console.log(dataArr);
    for(var i = 0; i < dataArr.length; i++){
      console.log(dataArr[i].id);
      if (dataArr[i].id === 'new'){
        console.log(this);
      $('#newList').append(
        '<a href="#finish" class"" id="item">' +
        '<li class = "list-group-item">' +
        '<h3>' + dataArr[i].task + '</h3>'+
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
      );
    }
      else if(dataArr[i].id === 'inProgress'){
        $('#currentList').append('<a href="#finish" class"" id="item">' +
        '<li class = "list-group-item">' +
        '<h3>' + dataArr[i].task + '</h3>'+
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>');
      }
      else{
        $('#archivedList').append('<a href="#finish" class"" id="item">' +
        '<li class = "list-group-item">' +
        '<h3>' + dataArr[i].task + '</h3>'+
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>');
      }
    }
  }

});
