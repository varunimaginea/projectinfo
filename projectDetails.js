var getProjectDetails = function(callback)
{
	var projects = ["mViewer", "bot-bot", "FireFlow", "Matisse", "pancake-ios"];
	
	var getJSONForProject = function(project, callback)
	{
		var getUpdatesAndWatchers = function(project, callback)
		{
			var GitHubApi = require("github"); 
			var github = new GitHubApi({version: "3.0.0"});
			github.repos.get({
				user: "Imaginea", 
				repo: project
			}, function(err, updateWatchersResponse) 
			{
				if(err)
				{
					console.log(err);
				}
				callback(updateWatchersResponse);
			});
		};
		
		var getDownloadCountArray = function(project, callback)
		{
			var GitHubApi = require("github"); 
			var github = new GitHubApi({version: "3.0.0"});
			github.repos.getDownloads({user: "Imaginea", repo: project}, function(err, downloadCountArray) 
			{
				var getTotalDownloadCount = function(downloadsArray)
				{
					if(!downloadsArray || downloadsArray.length == 0)
					{
						return 0;
					}
					var downloadsArrayLength = downloadsArray.length;
					var totalCount = 0;
					for(var i=0;i<downloadsArrayLength;i++)
					{
						totalCount += downloadsArray[i].download_count;
					}
					return totalCount;
				};
				if(err)
				{
					console.log(err);
					callback(-1);
				}
				callback(getTotalDownloadCount(downloadCountArray));
			});
		};
		getUpdatesAndWatchers(project, function(updateWatchersResponse)
		{
			getDownloadCountArray(project, function(downloadCount)
			{
				var updateDate = new Date(updateWatchersResponse.updated_at);
				var updateDateStringValue = updateDate.toLocaleDateString()+" Time: "+updateDate.toTimeString();

				var projectJson = {
					"project": project, 
					"url": updateWatchersResponse.svn_url, 
					"watchers": updateWatchersResponse.watchers,
					"update_date": updateDateStringValue,
					"download_count": downloadCount
				};
				callback(projectJson);
			});
		});
	};
	
	var projectsJsonArray = [];
	var projectsLength = projects.length;
	for(var i=0;i<projectsLength;i++)
	{
		getJSONForProject(projects[i], function(projectJson)
		{
			projectsJsonArray.push(projectJson);
			if(projectsJsonArray.length == projectsLength)
			{
				callback(projectsJsonArray);
			}
		});
	}
};

exports.getProjectDetails = getProjectDetails;
