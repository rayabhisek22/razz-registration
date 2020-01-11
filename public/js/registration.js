var expanded = false;

function showCheckboxes1() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}


	$(document).ready(function(){
				$("#checkboxes").hide();
			  $(".selectBox").click(function(){
			    $("#checkboxes").toggle();
			  });
			});
