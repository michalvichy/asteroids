function showSteer() {
	var steer = document.getElementById('steer');

	if(document.getElementById('steer').style.display == 'none' || document.getElementById('steer').style.display == ''){
		document.getElementById('steer').style.display = 'block';
	}
	else if(document.getElementById('steer').style.display == 'block') {
		document.getElementById('steer').style.display = 'none';
	}	
}

function showAuthors() {
	if(document.getElementById('authors').style.display == 'none' || document.getElementById('authors').style.display == ''){
		document.getElementById('authors').style.display = 'block';
	}
	else if(document.getElementById('authors').style.display == 'block') {
		document.getElementById('authors').style.display = 'none';
	}
}


var myDataRef = new Firebase('https://asteroidsv2.firebaseio.com/');
var nickInput = $('#nickInput');
nickInput.keypress(function (event) {
  if (event.keyCode == 13) {
    var nick = nickInput.val();

    var topScore = myDataRef.child(nick);

    topScore.setWithPriority({nick: nick, value: VAR.score}, VAR.score);
    nickInput.val('');
  }
});