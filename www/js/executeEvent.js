/*

  ev = liste des evennements
  i = counter


  { "id":1,
  "start_time": "2010-01-01T04:04:00+01:00",
  "end_time": "2010-01-01T04:05:00+01:00",
   "Type": "Color",
   "content": "096A09",
   "comment": "."};

*/



 function execOperation(ev, i, callback){

    console.log(ev[i]);

    if(ev[i].type == 'Couleur'){
      $timeout(function(){
            console.log(ev[i].content);
            $rootScope.firstColor= '#'+ev[i].content;
            i++;
              if(i>ev.length -1){
                // i=0;
                //   execOperation(ev, i, callback);
              }else{
                execOperation(ev, i, callback);
              }
        }, 10000);

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
function addEvent(events, event, callback){
    events.push({"id":event.id, "start_time": event.start_time, "end_time": event.end_time, "type": event.type, "Content": event.content, "comment":event.comment });
    //alert(events);
    callback(events);
}
