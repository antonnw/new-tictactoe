// JavaScript Document	
$(document).ready(function() {
	var currentPlayer = "o";
	var btn = "btn-primary";
	var x = "x";
	var o = "o";
	var count = 0;
	var o_win = 0;
	var x_win = 0;
	var winBoard = [];
	var game_level = prompt("Please enter level ( any, > 3 )", "3");
	var winning_streak = prompt("Winning streak ( 1 > any <= your entered level", game_level);
	
	// Init Board
	createBoard(winBoard, game_level, winning_streak);
	
	// Click on Box
	$('#game li').click(function(){
		if(count == (game_level*game_level)){
			$("#reset").click();
			alert('Its a tie. It will restart.');
		}
		else if($(this).hasClass('disable')){
			alert('Already selected');
		}
		else{
			// Primary Function
			if(checkGame(winBoard, this.id, count, game_level, currentPlayer, btn, winning_streak)){
				alert(currentPlayer + " wins");
				// Add Score
				if(currentPlayer == "o"){
					o_win++;
					$("#o_win").text(o_win);
				}
				else if(currentPlayer == "x"){
					x_win++;
					$("#x_win").text(x_win);
				}
				
				// Reset Board
				winBoard = [];
				for(var i=0; i < game_level; i++){		
					winBoard.push([i]);
					for(var j=0; j < game_level; j++){	
						winBoard[i][j] = "+";
					}
				}
				$("#reset").click();
			}
			console.log(winBoard);
			if(currentPlayer == "o"){
				currentPlayer = "x";
				btn = "btn-info";
			}
			else if(currentPlayer == "x"){
				currentPlayer = "o";
				btn = "btn-primary";
			}
			
			count++;
		}
	});
	
	// Click on Reset Button
	$("#reset").click(function () {
		currentPlayer = "x";
		btn = "btn-info";
		count = 0;
		resetGame();
	});
});

function createBoard(winBoard, game_level, winning_streak) {
	if(winning_streak > game_level){
		alert("Winning streak must be <= game level");
	}
	else{
		// Set Title
		$("#level").text(game_level+" x "+game_level);
		
		// Reset Board
		$("#game").children("li").remove();
			
		// Create Board
		var widthBoard = parseFloat($("#board").width()) * (parseFloat(game_level) + 1);
		$("#board").css("width", widthBoard/3);
		$("#board").css("position", "absolute");
		$("#board").css("left", (screen.width - $("#board").width())/1.9);
		
		// Create Boxes & Declare Two Dimensional Array
		for(var i=0; i < game_level; i++){		
			winBoard.push([i]);
			for(var j=0; j < game_level; j++){	
				winBoard[i][j] = "+";
				var box = '<li id="'+(i+1)+'-'+(j+1)+'" row="'+(i+1)+'" col="'+(j+1)+'" class="btn span1" >+</li>';
				$("#game").append(box);
			}
		}	
	}
}

function resetGame(){
	$("#game li").text("+");
	$("#game li").removeClass('disable')
	$("#game li").removeClass('o')
	$("#game li").removeClass('x')
	$("#game li").removeClass('btn-primary')
	$("#game li").removeClass('btn-info')	
}

function checkGame(winBoard, id, count, game_level, currentPlayer, btn, winning_streak){
	var row = $("#"+id).attr("row");
	var col = $("#"+id).attr("col");
	winBoard[row-1][col-1] = currentPlayer;
	
	$("#"+id).text(currentPlayer);
	$("#"+id).addClass('disable '+currentPlayer+' '+btn);
	
	var check = false;
	
	// Check Horizontal
	var counter_win = 0;
	for(var row=0; row < game_level; row++){
		for(var col=0; col < game_level; col++){
			if(winBoard[row][col] == currentPlayer){
				counter_win++;
			}
			else{
				counter_win = 0;
			}
			if(counter_win == winning_streak){
				check = true;
			}
		}
	}
	
	// Check Vertical
	var counter_win = 0;
	for(var col=0; col < game_level; col++){
		for(var row=0; row < game_level; row++){
			if(winBoard[row][col] == currentPlayer){
				counter_win++;
			}
			else{
				counter_win = 0;
			}
			if(counter_win == winning_streak){
				check = true;
			}
		}
	}
	
	// Check Diagonal L to R - I
	var counter_win = 0;
	var maxLength = game_level - winning_streak + 1;
	for(var start=0; start < maxLength; start++){
		for(var row = start, col=0; row < game_level && col < game_level; row++, col++){
			if(winBoard[row][col] == currentPlayer){
				counter_win++;
			}
			else{
				counter_win = 0;
			}
			if(counter_win == winning_streak){
				check = true;
			}
		}
	}
	
	// Check Diagonal L to R - II
	var counter_win = 0;
	var maxLength = game_level - winning_streak + 1;
	for(var start=1; start < maxLength; start++){
		for(var row = 0, col=start; row < game_level && col < game_level; row++, col++){
			if(winBoard[row][col] == currentPlayer){
				counter_win++;
			}
			else{
				counter_win = 0;
			}
			if(counter_win == winning_streak){
				check = true;
			}
		}
	}
	
	// Check Diagonal R to L - I
	var counter_win = 0;
	var maxLength = game_level - winning_streak + 1;
	for(var start=0; start < maxLength; start++){
		for(var row = start, col= (game_level-1); row < game_level && col >=0; row++, col--){
			if(winBoard[row][col] == currentPlayer){
				counter_win++;
			}
			else{
				counter_win = 0;
			}
			if(counter_win == winning_streak){
				check = true;
			}
		}
	}
	
	// Check Diagonal R to L - II
	var counter_win = 0;
	var maxLength = game_level - winning_streak + 1;
	for(var start=(game_level-2); start > (winning_streak-2); start--){
		for(var row = 0, col=start; row <= (game_level-2) && col >= 0; row++, col--){
			if(winBoard[row][col] == currentPlayer){
				counter_win++;
			}
			else{
				counter_win = 0;
			}
			if(counter_win == winning_streak){
				check = true;
			}
		}
	}
	
	if(check){ return true; }
}