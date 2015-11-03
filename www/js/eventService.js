battelierrecords.factory('eventService', function($rootScope,$timeout) {
  // Might use a resource here that returns a JSON array


  var events = [];

  var   all = function() {
    return events;
  };
  var remove = function(event) {
    events.splice(events.indexOf(event), 1);
  };
  var get = function(id) {
    for (var i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(id)) {
        return events[i];
      }
    }
    return null;
  };
  var add = function(events , event , callback){
        events.push({"id":event.id, "start_time": event.start_time, "end_time": event.end_time, "type": event.type, "Content": event.content, "comment":event.comment });
        callback(events);
  };

  var execOperation = function(ev, i, callback){

     console.log(ev[ev.length - 1]);

     if(ev[ev.length - 1].type == 'Couleur'){
       console.log('################ 1 ##################');
       $rootScope.firstColor = '#'+ev[ev.length - 1].Content;
       $rootScope.$apply();
       console.log($rootScope.firstColor);
       /*
       $timeout(function(){
            console.log('################ 2 ##################');
            console.log(ev[i].content);
            $rootScope.firstColor = '#'+ev[i].Content;
            i++;
            if(i>ev.length -1){
                // i=0;
                //   execOperation(ev, i, callback);
            }else{
                 execOperation(ev, i, callback);
            }
       }, 500);
       */
     }else if(ev[i].type =='Image'){

           $timeout(function(){
               console.log(ev[i].content);
           $rootScope.firstColor ='url("img/'+ev[i].content+'") no-repeat ';
           i++
           if(i>ev.length -1){
          //   i=0;
            // execOperation(ev, i, callback);
           }else{
             execOperation(ev, i, callback);
           }
         }, 2000);

       }
   };
  return {
    all:all,
    remove:remove,
    get:get,
    add:add,
    execOperation:execOperation

  };
});
