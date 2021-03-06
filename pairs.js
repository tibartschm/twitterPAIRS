		$(document).ready(function(){
			var shuffle = function(array){
				var tmp, current, top = array.length;
				if(top) while(--top){
					current = Math.floor(Math.random() * (top + 1));
					tmp = array[current];
					array[current] = array[top];
					array[top] = tmp;
				}
				return array;
			}

			var addCardsToDom = function(pictures){
				var i;
				for(i = 0; i < pictures.length; i += 1){
					$("#playground").flip({
						frontPicture: "cards/back.png",
						backPicture: pictures[i]
					});
				}
			}

			var selectedCards = 0;
			var points = 0;

			$("#submit").click(function(){
				var name = $("#following").attr("value");
				twitter.getFollowerImgUrls(name, function(data){
					var cards = data;
					cards = cards.concat(cards);
					cards = shuffle(cards);
					addCardsToDom(cards);
					$(".card").click(cardClickHandler);
				});
			});

			var cardClickHandler = function(){
				var $card = $(this);
				var $selected = $(".selected");
				if(! $card.hasClass("flipped")){
					if(selectedCards < 2){
						$card.flip();
						$card.addClass("selected");
						selectedCards += 1;
					}
				}

				if(selectedCards === 2){
					var firstImg = $(".selected:first").children(".back").children().attr("src");
					var lastImg =  $(".selected:last").children(".back").children().attr("src");
					if(firstImg === lastImg){
						$("#points").text(++points);
						$selected = $(".selected");
						$selected.removeClass("selected");
						setTimeout(function(){
							$selected.parent().fadeOut(function(){
								$(this).remove();
								if($(".card").length === 0){
									$("#playground").text("WIN!!!");
								}
							});
						}, 1000);
						selectedCards = 0;
					}else{
						setTimeout(function(){
							$selected = $(".selected");
							$selected.removeClass("selected");
							selectedCards = 0;
							$selected.flip();
						}, 1000);
					}

				}
			};
		});