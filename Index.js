var taskIndex = 0;
function outStorage(){
  var stringActual = 'Actual';
  var stringDone = 'Done';
  var stringRemove = 'Remove';
  for (var i = 0; i < localStorage.length; i++) {
    console.log('Actual')
    if (localStorage.key(i).toUpperCase()===(stringActual).toUpperCase()){
      var jsmassA = [];
      jsmassA = JSON.parse(localStorage.getItem(stringActual));
      recordActual(jsmassA);
    }
  }
  for (var i = 0; i < localStorage.length; i++) {
    console.log('Done');
    if (localStorage.key(i).toUpperCase()===(stringDone).toUpperCase()){
      var jsmassD = [];
      jsmassD = JSON.parse(localStorage.getItem(stringDone));
      recordDone(jsmassD);
    }
  }
  for (var i = 0; i < localStorage.length; i++) {
    console.log('Remove');
    if(localStorage.key(i).toUpperCase()===(stringRemove).toUpperCase()){
      var jsmassR = [];
      jsmassR = JSON.parse(localStorage.getItem(stringRemove));
      recordRemove(jsmassR);
    }
  }
}
function recordActual(jsmassA){
    for (var j = 0; j < jsmassA.length; j++) {
      $('<tr class="newTr"><td>'+jsmassA[j].task+'</td><td>'+jsmassA[j].prior+'</td><td>'+jsmassA[j].opis+'</td></tr>').appendTo($('.Actual'));
    }
}
function recordDone(jsmassD){
    for (var j = 0; j < jsmassD.length; j++) {
      $('<tr class="newTr"><td>'+jsmassD[j].task+'</td><td>'+jsmassD[j].prior+'</td><td>'+jsmassD[j].opis+'</td></tr>').appendTo($('.Done'));
    }
}
function recordRemove(jsmassR){
    for(var j = 0; j < jsmassR.length; j++){
      $('<tr class="newTr"><td>'+jsmassR[j].task+'</td><td>'+jsmassR[j].prior+'</td><td>'+jsmassR[j].opis+'</td></tr>').appendTo($('.Remove'));
    }
}
outStorage();
function formToggle(){
  $('.add_task').slideToggle('fast');
  $('*').removeClass('error');
  $('.add_task input').val("");
}
function switchTask(index){
  $('.title span').eq(index).css('box-shadow','0 0 2px 2px grey');
  if (!$(this).hasClass('active')) {
    $('.cont.active').fadeOut(300,function(){
      $('.cont').eq(index).fadeIn(300);
      $(this).removeClass('active');
      $('.cont').eq(index).addClass('active');
      $('.title h1').removeClass('active');
      $('.title h1').eq(index).addClass('active');
      $('.title span').eq(index).css('box-shadow','1px 1px 1px 1px grey');
    });
  }
}


function inStorage(){
  var inputMass = [];
  var inputColl = 0;
  var obj = {};
  if (localStorage.length===0) {
  var massForObj = [];
  }else{
    var massForObj = JSON.parse(localStorage.getItem('Actual'));
  }
  $('.add_task input').each(function(){
    if ($(this).val().length) {
      $(this).removeClass('error');
      inputMass.push($(this).val());
      inputColl+=1;
    }else{
      $(this).addClass('error');
    }
  });
  if (inputColl===$('.add_task input').length) {
  for (var i = 0; i < $('.add_task input').length; i++) {
    obj[$('.add_task input').eq(i).attr('name')] = $('.add_task input').eq(i).val();
    console.log(obj);
  }
  formToggle();
  massForObj.push(obj)
  console.log(massForObj);
  var string = JSON.stringify(massForObj);
  localStorage.setItem('Actual', string);
  recTable(inputColl,inputMass);
  }
}

function recTable(inputColl,inputMass){
  var numStr = $('.Actual tr').length;
  if (inputColl===$('.add_task input').length) {
    console.log('индекс строки '+numStr)
    $('.add_task input').removeClass('error');
    $('<tr class="newTr"></tr>').appendTo($('.Actual'));
    for (var i = 0; i < $('.add_task input').length; i++) {
    $('<td id="td">'+inputMass[i]+'</td>').appendTo($('.Actual .newTr').eq(numStr));
    console.log(numStr);  
    }
  }
}

function ActToRemove(ind){
console.log('Actual to remove  '+ ind);
$('#buttonActualRemove').on('click',function(){
  var ActMass = JSON.parse(localStorage.getItem('Actual'));
if (localStorage.getItem('Remove')) {
  var RemMass = JSON.parse(localStorage.getItem('Remove'));
  }else{
    var RemMass = [];
    }
  var removeEl;
  $('.Actual tr').each(function(){
    if ($('.Actual tr').eq(ind).hasClass('pointTable')){
        removeEl = ActMass.splice(ind,1);
        removeEl = removeEl[0];
        console.log(removeEl);
        RemMass.push(removeEl);
        var remToStor = JSON.stringify(RemMass);
        var actToStor = JSON.stringify(ActMass);
        localStorage.setItem('Actual',actToStor);
        localStorage.setItem('Remove',remToStor);
      $('.pointTable').appendTo($('.Remove'));
      $('.pointTable').removeClass('pointTable');
      console.log("индекс после нажатия кнопки  "+ind);
    }
  });
});
};

function ActToDone(ind){
  console.log('Actual to done  '+ ind);
$('#buttonActualDone').on('click',function(){
  var ActMass = JSON.parse(localStorage.getItem('Actual'));
  if (localStorage.getItem('Done')) {
  var DoneMass = JSON.parse(localStorage.getItem('Done'));
  }else{
    var DoneMass = [];
  }
  var removeEl;
  $('.Actual tr').each(function(){
    if ($('.Actual tr').eq(ind).hasClass('pointTable')){
      removeEl = ActMass.splice(ind,1);
      removeEl = removeEl[0];
      console.log(removeEl);
      DoneMass.push(removeEl);
      var doneToStor = JSON.stringify(DoneMass);
      var actToStor = JSON.stringify(ActMass);
      localStorage.setItem('Actual',actToStor);
      localStorage.setItem('Done',doneToStor);
      $('.pointTable').appendTo($('.Done'));
      $('.pointTable').removeClass('pointTable');
      
    }
  });
});
}

function ActRedact(ind){
console.log('ActRedact foo   '+ind);
$('#buttonActualRedact').on('click',function(){
  var ActMass = JSON.parse(localStorage.getItem('Actual'));
  console.log(ActMass);
  var removeEl;
  $('.Actual tr').each(function(){
    if ($('.Actual tr').eq(ind).hasClass('pointTable')){
      for (var i = 0; i < $('.pointTable td').length; i++) {
        removeEl = ActMass.splice(ind,1);
        removeEl = removeEl[0];
        console.log(removeEl);
        $('.add_task input').eq(0).val(removeEl.task);
        $('.add_task input').eq(1).val(removeEl.prior);
        $('.add_task input').eq(2).val(removeEl.opis);
        var actToStor = JSON.stringify(ActMass);
        localStorage.setItem('Actual',actToStor);
        $('.Actual tr').eq(ind).remove();
        $('.add_task').slideDown('fast');
      }
    }
  });
});
}

function DoneRedact(ind){
console.log('DoneRedact foo   '+ind);
$('#buttonDoneRedact').on('click',function(){
  var DoneMass = JSON.parse(localStorage.getItem('Done'));
  console.log(DoneMass);
  var removeEl;
  $('.Done tr').each(function(){
    if ($('.Done tr').eq(ind).hasClass('pointTable')){
      for (var i = 0; i < $('.pointTable td').length; i++) {
        removeEl = DoneMass.splice(ind,1);
        removeEl = removeEl[0];
        console.log(removeEl);
        $('.add_task input').eq(0).val(removeEl.task);
        $('.add_task input').eq(1).val(removeEl.prior);
        $('.add_task input').eq(2).val(removeEl.opis);
        var doneToStor = JSON.stringify(DoneMass);
        localStorage.setItem('Done',doneToStor);
        $('.Done tr').eq(ind).remove();
        $('.add_task').slideDown('fast');
      }
    }
  });
});
}

function DoneToRemove(ind){
console.log('Done foo   '+ind);
$('#buttonDoneRemove').on('click',function(){
   var DoneMass = JSON.parse(localStorage.getItem('Done'));
  if (localStorage.getItem('Remove')) {
    var RemMass = JSON.parse(localStorage.getItem('Remove'));
  }else{
    var RemMass = [];
  }
  var removeEl;
  $('.Done tr').each(function(){
    if ($('.Done tr').eq(ind).hasClass('pointTable')){
      removeEl = DoneMass.splice(ind,1);
      removeEl = removeEl[0];
      console.log(removeEl);
      RemMass.push(removeEl);
      var remToStor = JSON.stringify(RemMass);
      var doneToStor = JSON.stringify(DoneMass);
      localStorage.setItem('Done',doneToStor);
      localStorage.setItem('Remove',remToStor);
      $('.pointTable').appendTo($('.Remove'));
      $('.pointTable').removeClass('pointTable');
    }
  });
});
};

function RemoveToActual(ind){
console.log('Remove foo   '+ind);
$('#buttonRemoveRest').on('click',function(){
  var RemMass = JSON.parse(localStorage.getItem('Remove'));
  if (localStorage.getItem('Actual')) {
  var ActMass = JSON.parse(localStorage.getItem('Actual'));
  }else{
    var ActMass = [];
  }
  var removeEl;
  $('.Remove tr').each(function(){
    if ($('.Remove tr').eq(ind).hasClass('pointTable')){
      removeEl = RemMass.splice(ind,1);
      removeEl = removeEl[0];
      console.log(removeEl);
      ActMass.push(removeEl);
      var remToStor = JSON.stringify(RemMass);
      var actToStor = JSON.stringify(ActMass);
      localStorage.setItem('Actual',actToStor);
      localStorage.setItem('Remove',remToStor);
      $('.pointTable').appendTo($('.Actual'));
      $('.pointTable').removeClass('pointTable');
      
    }
  });
});
}

function Remove(ind){
console.log('Remove foo   '+ind);
$('#buttonRemove').on('click',function(){
  var RemMass = JSON.parse(localStorage.getItem('Remove'));
  var removeEl;
  $('.Remove tr').each(function(){
    if ($('.Remove tr').eq(ind).hasClass('pointTable')){
      removeEl = RemMass.splice(ind,1);
      removeEl = removeEl[0];
      var remToStor = JSON.stringify(RemMass);
      localStorage.setItem('Remove',remToStor);
      $('.pointTable').remove();
      $('.pointTable').removeClass('pointTable'); 
    }
  });
});
}
$('.navigation').on('click','input',function(){
  var index = $(this).index();
    console.log(index);
    $(this).removeAttr('checked');
    if (!$(this).hasClass('visible')) {
      $('.slide.visible').fadeOut('fast',function(){
        $('.slide').eq(index).fadeIn('fast');
        $(this).removeClass('visible');
        $('.slide').eq(index).addClass('visible');
      });
    }else{
      $('.slide').eq(index).show();
    }
})
$('.hero-unit input,#close').on('click',function(){
  formToggle();
});
$("[type='button']").css('outline','none');
$("#add,#close").css('outline','none');


$('.title').on('click','span',function(){
  
  taskIndex = $(this).index();
  console.log('noglobal  '+taskIndex);
  switchTask(taskIndex);
  $('tr').removeClass('pointTable');
});

$('#add').on('click',function(){
  inStorage(this);
});

$('.Actual').on('click','tr',function(){
  var ind = $(this).index();
  console.log('Actual  '+ ind);
  if ($('.Actual tr').eq(ind).hasClass('pointTable')) {
    $('.Actual tr').eq(ind).removeClass('pointTable');
  }else{
    $('.Actual tr').removeClass('pointTable');
    $('.Actual tr').eq(ind).addClass('pointTable');
  }
  ActToRemove(ind);
  ActToDone(ind);
  ActRedact(ind);
});

$('.Done').on('click','tr',function(){
  var ind = $(this).index();
  console.log('Done   '+ind);
  if ($('.Done tr').eq(ind).hasClass('pointTable')) {
    $('.Done tr').eq(ind).removeClass('pointTable'); 
  }else{
    $('.Done tr').removeClass('pointTable');
    $('.Done tr').eq(ind).addClass('pointTable');
  }  
  DoneToRemove(ind);
  DoneRedact(ind);
});

$('.Remove').on('click','tr',function(){
  var ind = $(this).index();
  console.log('Remove   '+ind);
  if ($('.Remove tr').eq(ind).hasClass('pointTable')) {
    $('.Remove tr').eq(ind).removeClass('pointTable');
  }else{
    $('.Remove tr').removeClass('pointTable');
    $('.Remove tr').eq(ind).addClass('pointTable');
  }
  RemoveToActual(ind);
  Remove(ind);
});

$(function() {
  
    $('#priorTask').datepicker({ monthNames:
      ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август",  
      "Сентябрь","Октябрь","Ноябрь","Декабрь"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      minDate: "-0"});
     
});

//***********************************************************



// function outStorage(){
// var jsmass = [];
// for (var i = 0; i < localStorage.length; i++) {
//   var key = localStorage.key(i);
//   console.log(key + ' = ' + localStorage[key]);
// }
// var num = $('.Actual tr').length;
// for (var i = 0; i < localStorage.length; i++) {
//     jsmass = JSON.parse(localStorage.getItem('string'+i));
//     console.log(jsmass);
//     $('<tr class="newTr"><td>'+jsmass[0].task+'</td><td>'+jsmass[0].prior+'</td><td>'+jsmass[0].opis+'</td></tr>').appendTo($('.Actual'));
//   }
// }
// outStorage();
// function formToggle(){
//   $('.add_task').slideToggle('fast');
//   $('*').removeClass('error');
//   $('.add_task input').val("");
// }
// function switchTask(index){
//   $('.title span').eq(index).css('box-shadow','0 0 2px 2px grey');
//   if (!$(this).hasClass('active')) {
//     $('.cont.active').fadeOut(300,function(){
//       $('.cont').eq(index).fadeIn(300);
//       $(this).removeClass('active');
//       $('.cont').eq(index).addClass('active');
//       $('.title h1').removeClass('active');
//       $('.title h1').eq(index).addClass('active');
//       $('.title span').eq(index).css('box-shadow','2px 2px 2px 2px grey');
//     });
//   }
// }
// function recMass(){
//   // var date;
//   var inputMass = [];
//   var inputColl = 0;
//   $('.add_task input').each(function(){
//     if ($(this).val().length) {
//       $(this).removeClass('error');
//       inputMass.push($(this).val());
//       inputColl+=1;
//     }else{
//       $(this).addClass('error');
//     }
//     // date = $('#priorTask').datepicker("getDate")
//     //       console.log('Date      '+date);
//     recTable(inputColl,inputMass);
//   }); 
// }
//  function inStorage(inputMass,numStr){
//   var massForObj = [];
//   var obj = {};
//   for (var i = 0; i < $('.add_task input').length; i++) {
//     $('<td id="td">'+inputMass[i]+'</td>').appendTo($('.Actual .newTr').eq(numStr));
//     console.log(numStr);
     
//   }
//   for (var i = 0; i < $('.add_task input').length; i++) {
//     obj[$('.add_task input').eq(i).attr('name')] = $('.add_task input').eq(i).val();
//      console.log(obj);
//   }
//   formToggle();
//   massForObj.push(obj);
//   var string = JSON.stringify(massForObj);
//   var loc = localStorage.setItem('string'+localStorage.length, string); 
//  }

// function recTable(inputColl,inputMass){
//   if (inputColl===$('.add_task input').length) {
//     var numStr = $('.Actual tr').length;
//     console.log('индекс строки '+numStr)
//     $('.add_task input').removeClass('error');
//     $('<tr class="newTr"></tr>').appendTo($('.Actual'));
//     inStorage(inputMass,numStr);
//   }
// }
// function ActToRemove(ind){
// console.log('Actual foo  '+ ind);
// $('#buttonActualRemove').on('click',function(){
//   $('.Actual tr').each(function(){
//     if ($('.Actual tr').eq(ind).hasClass('pointTable')){
//       $('.pointTable').appendTo($('.Remove'));
//       $('.pointTable').removeClass('pointTable');
//       console.log(ind);
//     }
//   });
// });
// };
// function ActToDone(ind){
//   console.log('Actual foo  '+ ind);
// $('#buttonActualDone').on('click',function(){
//   $('.Actual tr').each(function(){
//     if ($('.Actual tr').eq(ind).hasClass('pointTable')){
//       $('.pointTable').appendTo($('.Done'));
//       $('.pointTable').removeClass('pointTable');
      
//     }
//   });
// });
// }
// function DoneToRemove(ind){
// console.log('Done foo   '+ind);
// $('#buttonDoneRemove').on('click',function(){
//   $('.Done tr').each(function(){
//     if ($('.Done tr').eq(ind).hasClass('pointTable')){
//       $('.pointTable').appendTo($('.Remove'));
//       $('.pointTable').removeClass('pointTable');
//     }
//   });
// });
// };
// function RemoveToActual(ind){
// console.log('Remove foo   '+ind);
// $('#buttonRemoveRest').on('click',function(){
//   $('.Remove tr').each(function(){
//     if ($('.Remove tr').eq(ind).hasClass('pointTable')){
//       $('.pointTable').appendTo($('.Actual'));
//       $('.pointTable').removeClass('pointTable');
      
//     }
//   });
// });
// }
// function ActRedact(ind){
// console.log('ActRedact foo   '+ind);
// $('#buttonActualRedact').on('click',function(){
//   $('.Actual tr').each(function(){
//     if ($('.Actual tr').eq(ind).hasClass('pointTable')){
//       for (var i = 0; i < $('.pointTable td').length; i++) {
//         $('.add_task input').eq(i).val($('.pointTable td').eq(i).text());
//         $('.add_task').slideDown('fast');
//       }
//       $('.Actual tr').eq(ind).remove();
//         localStorage.removeItem('string'+ind);
//     }
//   });
// });
// }
// function DoneRedact(ind){
// console.log('DoneRedact foo   '+ind);
// $('#buttonDoneRedact').on('click',function(){
//   $('.Done tr').each(function(){
//     if ($('.Done tr').eq(ind).hasClass('pointTable')){
//       for (var i = 0; i < $('.pointTable td').length; i++) {
//         $('.add_task input').eq(i).val($('.pointTable td').eq(i).text());
//         $('.add_task').slideDown('fast');
//       }
//        $('.Done tr').eq(ind).remove();
//     }
//   });
// });
// }
// $('.hero-unit input,#close').on('click',function(){
//   formToggle();
// });
// $("[type='button']").css('outline','none');
// $("#add,#close").css('outline','none');


// $('.title').on('click','span',function(){
//   var taskIndex = 0;
//   taskIndex = $(this).index();
//   console.log('noglobal  '+taskIndex);
//   switchTask(taskIndex);
//   $('tr').removeClass('pointTable');
// });



// $('#add').on('click',function(){
//   recMass(this);
// });

// $('.Actual').on('click','tr',function(){
//   var ind = $(this).index();
//   console.log('Actual  '+ ind);
//   if ($('.Actual tr').eq(ind).hasClass('pointTable')) {
//     $('.Actual tr').eq(ind).removeClass('pointTable');
//   }else{
//     $('.Actual tr').eq(ind).addClass('pointTable');
//     ActToRemove(ind);
//     ActToDone(ind);
//     ActRedact(ind);
//   }
  
// });

// $('.Done').on('click','tr',function(){
//   var ind = $(this).index();
//   console.log('Done   '+ind);
//   if ($('.Done tr').eq(ind).hasClass('pointTable')) {
//     $('.Done tr').eq(ind).removeClass('pointTable'); 
//   }else{
//     $('.Done tr').eq(ind).addClass('pointTable');
//     DoneToRemove(ind);
//     DoneRedact(ind);
//   }
  
// });

// $('.Remove').on('click','tr',function(){
//   var ind = $(this).index();
//   console.log('Remove   '+ind);
//   if ($('.Remove tr').eq(ind).hasClass('pointTable')) {
//     $('.Remove tr').eq(ind).removeClass('pointTable');
//   }else{
//     $('.Remove tr').eq(ind).addClass('pointTable');
//     RemoveToActual(ind);
//   }
// });

// $(function() {
  
//     $('#priorTask').datepicker({ monthNames:
//       ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август",  
//       "Сентябрь","Октябрь","Ноябрь","Декабрь"],
//       dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
//       minDate: "-0"});
     
// });