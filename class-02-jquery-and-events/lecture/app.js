//nav handler

//event logger
function logTarget() {
  var $target = $(this).text();
  var $feedback = $('#feedback p:first-child');
  var $newFeedback = $feedback.clone().removeClass('feedback');

  //also show devtools monitorEvents
  console.log($(this));
  $newFeedback.text('You clicked on ' + $target);
  $('#feedback').append($newFeedback);
}

//not delegated - event bound to all the 'li's
//no selector specified in .on() method


//delegated - event is bound to parent
//'li' is specified in .on()


//button handlers



//checkbox handler - change event.
//shows difference between attr & prop
$('input[name=check]').on('change', function() {
  var $checkbox = $(this);
  $('#checked-state').html('.attr( "checked" ): ' + $checkbox.attr("checked") + '<br>.prop( "checked" ): ' + $checkbox.prop("checked"));
}).change();

//select box filtering
