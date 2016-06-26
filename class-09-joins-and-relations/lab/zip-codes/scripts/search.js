(function(module) {
//-------------ALL PAGE STATE CHANGES ARE HERE--------------------
$('#state-select').on('change',function(){
  $this = this;
  selectAllCitiesWithinState($this.value);
});
$('#city-select').on('change',function(e){
  $this = this;
  findCityOnMap($this.value,$('#state-select').val());
});
$('form > input[name="zip"]').on('keydown',function(e){
  if(e.keyCode != 8){
    if(e.keyCode < 48 || e.keyCode > 57){
        toastr.warning('Please enter numeric values only')
        return false;
    }
    else{
      //allow to type
    }
  }
})

$('form > input[type="submit"]').on('click',function(e){
  e.preventDefault();
  var zipVal = $('form > input[name="zip"]').val()
  findCitybyZip(zipVal);
});

selectAllStates = function(){
   webDB.execute([
  {
   "sql": "SELECT DISTINCT state FROM zips ORDER BY state ASC",
   "data": [],
   "success": function(transaction, results){
    var index = (Object.keys(results.rows));
    index.forEach(function(elem){
    //   Data.AllStates.push(results.rows.item(elem));
    $('<option/>',{
      text : results.rows.item(elem).state
      }).appendTo('#state-select');
    });
   }
  }]);
}

var selectAllCitiesWithinState = function(param){
  $('#city-select').empty();
  webDB.execute([
  {
   "sql": "SELECT DISTINCT city FROM zips WHERE state = ? ORDER BY city ASC",
   "data": [param],
   "success": function(transaction, results){
    var index = (Object.keys(results.rows));
    index.forEach(function(elem){
    $('<option/>',{
      text : results.rows.item(elem).city
      }).appendTo('#city-select');
    });
   }
  }]);
}

findCityOnMap = function(city,state){
  var locations = [];
  var cityLocation = [];
  webDB.execute([
  {
   "sql": "SELECT DISTINCT longitude, latitude, city, population FROM zips WHERE city = ? AND state = ?",
   "data": [city,state],
   "success": function(transaction, results){
     var index = (Object.keys(results.rows));
    index.forEach(function(elem){
      cityLocation.push(results.rows.item(elem));
      });
    initMap(cityLocation);
    }
  }]);
}

findCitybyZip = function(param){
  var locations = [];
  var cityLocation = [];
  webDB.execute([
  {
   "sql": "SELECT DISTINCT longitude, latitude, city, population FROM zips WHERE zip = ?",
   "data": [param],
   "success": function(transaction, results){
    if(results.rows.length == 0){
      toastr.error('Your search query returned no matches')
    }
    else{
        var index = (Object.keys(results.rows));
        index.forEach(function(elem){
          cityLocation.push(results.rows.item(elem));
        });
        initMap(cityLocation);
      }
    }
  }]);
}


selectAllStates();
module.Data = Data;
})(window)
