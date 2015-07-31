$(document).ready(function() {

	//changes background for tabs when clicked
$(function() {
  $('#all').click( function() {
    $('#all').css('background-color', 'lawngreen');
		$('#offline').css('background-color', 'white');
		$('#online').css('background-color', 'white');   
    
    $('.online').css('display','block');  $('.offline').css('display','block');
    
  }); //ends #all click function
	
	$('#offline').click( function() {
    $('#offline').css('background-color', 'lawngreen');
		$('#all').css('background-color', 'white');
		$('#online').css('background-color', 'white');
    
   $('.offline').css('display','block'); $('.online').css('display','none');
  });//ends #offline click function
	
	$('#online').click( function() {
    $('#online').css('background-color', 'lawngreen');
		$('#offline').css('background-color', 'white');
		$('#all').css('background-color', 'white');
   
$('.online').css('display','block');  $('.offline').css('display','none');
    
  });//ends #online .click function
});


// some users that stream on twitch tv
var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff"];

  //iterate through all users +display
	users.forEach(function (user) {
		$.getJSON("https://api.twitch.tv/kraken/streams/"+ user +"?callback=?", function(userStream) {
				$.getJSON("https://api.twitch.tv/kraken/channels/"+ user +"?callback=?", function(channel) {
					/*alert(userStream);
          alert(channel);*/
						var topic = '',
								status = '',
                classOnline = '';
						if (userStream.stream === null) {
							status = '<span class="right glyphicon glyphicon-remove"></span>';
              classOnline = 'offline';
						} else {
							status = '<span class="lime right glyphicon glyphicon-signal"></span>';
							topic = "<h2 class='description'>"+userStream.stream.channel.status+"</h2>";
             classOnline = 'online';
						}
				
      //set logo for channel
						if (channel.logo===null){
							channel.logo = "<span class='icon glyphicon glyphicon-expand'>";
						} else {
              channel.logo = "<img src="+channel.logo+" class='user-image'></img>";
            }
//gets user info and appends html
					$('<div id='+ channel.display_name +' class="user '+classOnline+'"></div>').append(channel.logo)
										.append("<h1 class='name'>"+channel.display_name+"</h1>")
										.append(status)
										.append("<h2 class='description'>"+topic+"</h2>")
									.appendTo('#users');
				
          
  $('#online').click( function() {
    
    if(userStream.stream === null){
      document.getElementByID(channel.display_name).style.display = none;
    }
  });
          
          
        });// ends second getJSON
			});// ends first getJSON
							 
	});// ends forEach function
  
  
  // search for channels
 $('#search').keyup(function() {
    var searchVal = $(this).val().toLowerCase();
	 
    $('#users>div').each(function() {
      var text = $(this).text().toLowerCase();
      if (text.indexOf(searchVal) !== -1) {
        $(this).show()
      } else {
        $(this).hide();
      }
 });
	
});
  
}); //ends document.ready