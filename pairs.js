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

			var pictures = ['cards/star.png', 'cards/circle.png', 'cards/rect.png'];
			pictures = pictures.concat(pictures);
			pictures = shuffle(pictures);

			addCardsToDom(pictures);
			


			$(".card").click(function(){
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
						$selected = $(".selected");
						$selected.removeClass("selected");
						$selected.addClass("oog");
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

				if($(".oog").length === pictures.length){
					$("#playground").text("WIN!!!");
				}

				console.log("Selected Cards: ", selectedCards);
			});
		});