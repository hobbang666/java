var close_time; 
var close_time2 = 10; 
clearTimeout(close_time); 
close_time = setTimeout("close_window()", 10000);

function show_time() {
  let divClock = document.getElementById('Time');
  divClock.innerText = `${close_time2}초 후 창이 닫힙니다`;
  close_time2--;
  setTimeout(show_time, 1000);
}

function close_window() {
  window.close();
}