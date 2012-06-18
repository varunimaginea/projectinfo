var ProjectDetailsLoader = {
	load: function(){
		var self = this;
		$.ajax({
			url: '/getProjectDetails.json',
			success: function(response){
				self._fillDetails(response);
			},
			dataType: 'JSON'
		});
	},
	_fillDetails: function(response){
		var accordion = $("#accordion");
		
		$.each(response, function(idx, item){
			console.log(item);
			var h3 = $('<h3>').append($('<a>').attr('href', "#").text(item.project));
			var pDownloadCount = $('<p>').text("Download Count: "+item.download_count);
			var pUpdateDate = $('<p>').text("Update Date: "+item.update_date);
			var pWatchers = $('<p>').text("Watchers: "+item.watchers);
			var svn_url = $('<p>').text("Github url: ").append($("<a>").attr('href', item.url).text(item.url));
			
			var rootDiv = $("<div>");
			var childDiv = $("<div>");
			rootDiv.append(h3);
			childDiv.append(pDownloadCount);
			childDiv.append(pUpdateDate);
			childDiv.append(pWatchers);
			childDiv.append(svn_url);
			rootDiv.append(childDiv);
			accordion.append(rootDiv);
		});
		$("#accordion").accordion({
			event: "mouseover",
			header: "h3"
		});
		$( "#accordion" ).accordion({ animated: 'bounceslide' });
	}
};

