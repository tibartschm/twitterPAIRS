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
				for(i = 0; i < pictures.length; i = i + 1){
					$("#playground").append("<img id='"+ pictures[i] + "' class='card back' src='cards/back.png'>");
				}
			}

			var flip = function($card){
				if($card.hasClass("back")){
					$card.removeClass("back");
					$card.addClass("front");
					$card.attr("src", $card.attr("id"));
				}else{
					$card.addClass("back");
					$card.removeClass("front");
					$card.attr("src", "cards/back.png");
				}
			};

			var selectedCards = 0;
			var points = 0;

			var pictures = ['cards/star.png', 'cards/circle.png', 'cards/rect.png'];
			pictures = pictures.concat(pictures);
			pictures = shuffle(pictures);

			addCardsToDom(pictures);
			


			$(".card").click(function(){
				var $card = $(this);
				var $selected = $(".selected");
				if($card.hasClass("back")){
					if(selectedCards < 2){
						flip($card);
						$card.addClass("selected");
						selectedCards += 1;
					}else{
						flip($selected);
						$selected.removeClass("selected");
						selectedCards = 0;
					}
				}

				if(selectedCards === 2){
					if($(".selected:last").attr("id") === $(".selected:first").attr("id")){
						$selected = $(".selected");
						$selected.removeClass("selected");
						$selected.addClass("oog");
						selectedCards = 0;
					}else{
						setTimeout(function(){
							$selected = $(".selected");
							$selected.removeClass("selected");
							selectedCards = 0;
							flip($selected);
						}, 1000);
					}

				}

				if($(".oog").length === pictures.length){
					$("#playground").text("WIN!!!");
				}

				console.log("Selected Cards: ", selectedCards);
			});
		});