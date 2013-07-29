function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

function change_colourscheme(fg, bg) {
	var body = document.getElementById("body");
	body.style.backgroundColor = bg;
	body.style.color = fg;
	document.getElementById("prompt").style.color = fg;
}

function get_history() {
	toret = "";
	for ( i =0 ;i < safe_stack.length; i++) {
		toret += "<br>"+safe_stack[i];
	}
	return toret;
}

function clear_screen() {
	document.getElementById("cler").innerHTML = welcome_message;
	return "Clear";
}