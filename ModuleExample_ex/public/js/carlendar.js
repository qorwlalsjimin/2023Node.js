$(document).ready(function(){

	$( "#datepicker" ).datepicker({
	inline: true
	});

// Hover states on the static widgets
	$( "#dialog-link, #icons li" ).hover(
		function() {
			$( this ).addClass( "ui-state-hover" );
		},
		function() {
			$( this ).removeClass( "ui-state-hover" );
		}
	);  
});


