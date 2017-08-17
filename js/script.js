	//Constantes para movimentação
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	//Constante que define o tamanho dos objetos
	var SIZE = 50;		
	//Associação da variável canvas ao elemento canvas
	var canvas = document.querySelector('canvas');
	//Atribuição do contexto 2d à variável contexto
	var contexto = canvas.getContext('2d');
	//Variáveis que controlarão a posição do objeto
	var posX = 50;
	var posY = 50;
	//Variável que determina a cor do objeto
	var objColor = "#00f";
	//Variáveis que estabelecem a posição do bloco preto
	var blockX = canvas.width/2 - 25;
	var blockY = canvas.height/2 - 25;
	//Variáveis que controlam a movimentação
	var mvLeft = mvUP = mvRight = mvDown = false;


	//Atualiza a posição do objeto
	function updateBlock(){
		if(mvLeft){
			posX--;
		}
		if(mvRight){
			posX++;
		}
		if(mvUP){
			posY--;
		}
		if(mvDown){
			posY++;
		}
	}
	
	//Confere colisão e, em caso de colisão, muda a cor do objeto para vermelho
	function colide(){
		if(posX + SIZE > blockX && posX < blockX + SIZE && posY + SIZE > blockY && posY < blockY + SIZE){
			objColor = '#f00';
		}else{
			objColor = '#00f';
		}
	}
	//Entrada de comandos

	//Move o objeto
	window.addEventListener('keydown',keydownHandler,false);
	
	function keydownHandler(e){
		var key = e.keyCode;
		switch (key) {
			case UP:
				mvUP    = true;
				break;
			case DOWN:
				mvDown  = true;
				break;
			case LEFT: 
				mvLeft  = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
		}
	}
	//Para o objeto
	window.addEventListener('keyup',keyupHandler,false);

	function keyupHandler(e){
		var key = e.keyCode;
		switch (key) {
			case UP:
				mvUP    = false;
				break;
			case DOWN:
				mvDown  = false;
				break;
			case LEFT:
				mvLeft  = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
		}
	}

	//desenha na tela
	function draw(){
		contexto.clearRect(0,0,canvas.width,canvas.height);
		contexto.fillStyle = "#000";
		contexto.fillRect(blockX,blockY,SIZE,SIZE);
		contexto.fillStyle = objColor;
		contexto.fillRect(posX,posY,SIZE,SIZE);
	}

	//atualiza os objetos
	function update(){
		updateBlock();
		colide();
		draw();
	}

	//Repetição
	function loop(){
		update();
		window.requestAnimationFrame(loop, canvas);
	}

	loop();