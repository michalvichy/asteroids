function allData() {
	var limitData = myDataRef.limit(8);

	limitData.on('child_added', function(snapshot){
		$('.ranking-list').prepend('<tr><th>'+snapshot.val().nick+'</th><th>'+snapshot.val().value+'</th></tr>');
	})
}

window.onload = allData;