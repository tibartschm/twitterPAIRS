(function( twitter, $, undefined ) {

	var ids = [];
	var imageUrls = [];

	twitter.getFollowerIds = function(name, callback){
		$.ajax({
			url: "https://api.twitter.com/1/followers/ids.json",
			data: "cursor=-1&screen_name=" + name,
			dataType: "jsonp",
			crossDomain: true,
			success: function(data){
				ids = data.ids;
				var i;
				for(i = 0; i < data.ids.length; i += 1){
					console.log(data.ids[i]);
					twitter.getUserImgUrl(data.ids[i], callback);
				}
			}
		});
	};

	twitter.getUserImgUrl = function(id, callback){
		$.ajax({
			url: "https://api.twitter.com/1/users/show.json",
			data: "include_entities=false&user_id=" + id,
			dataType: "jsonp",
			crossDomain: true,
			success: function(data){
				var url = data.profile_image_url.replace("_normal", "_bigger");
				imageUrls.push(url);
				if(imageUrls.length === ids.length){
					callback(imageUrls);
				}
				console.log("User", url);
			}
		});
	};

	twitter.getFollowerImgUrls = function(name, callback){
		twitter.getFollowerIds(name, callback);
	};

}( window.twitter = window.twitter || {}, jQuery ));