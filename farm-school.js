
	/***************************************VARIABLES GLOBALES********************************************/

		/********JUEGO VERDURAS********/

			var nombresVerduras = [];
			var cuantasVerduras = [];
			var queVerdura;

		/******************************/

		/********JUEGO ANIMALES********/

			var nombreAnimal = "";
			var cuantosAnimales;
			var cuantosAnimalesFuera;
			var animalesAMeter;
			var animalesMetidos = 0;
			var contadorAnimalesAMeter;
			var resultadoSuma;
			var queAnimal;
			var primerAnimal = 0;

		/******************************/

		/********JUEGO CASAS********/

			var ultimoNumero;
			var arrayPosiciones;
			var arrayMovs;
			var numDeCasa;

		/******************************/

		/********JUEGO MONEDAS********/

			var importe, resta, resultadoResta;

		/******************************/

		/**********GENERICAS***********/

			var respuestasGenericas = [];
			var respuestaPorVoz;
			var buttonRespEscog = null;
			var respuestaCorrecta = -1;
			var numFallos = 0;
			var tiempoInicio;
			var tiempoFin;
			var tiempoTranscurrido;
			var respuestasMostradas = false;
			
		/******************************/

	/*****************************************************************************************************/

	/****************************************RECONOCIMIENTO DE VOZ****************************************/

		var recognition;
		var recognizing = false;
		if (!('webkitSpeechRecognition' in window)) {
			alert("¡API no soportada!");
		} else {

			recognition = new webkitSpeechRecognition();
			recognition.lang = "es-VE";
			recognition.continuous = true;
			recognition.interimResults = true;

			recognition.onstart = function() {
				recognizing = true;
				console.log("empezando a escuchar");
			}
			recognition.onresult = function(event) {
			 for (var i = event.resultIndex; i < event.results.length; i++) {
				if(event.results[i].isFinal){
					var texto = event.results[i][0].transcript;
					console.log(texto);
					var evento = new KeyboardEvent("keydown");
					if((extraerPagUrlActual() == "index.html"||extraerPagUrlActual() == "") && texto.indexOf("contar") > -1){
						window.location="contar.html";
					}else if(extraerPagUrlActual() == "contar.html" && texto.indexOf("casas") > -1){
						window.location="contarCasas.html";
					}else if(extraerPagUrlActual() == "contar.html" && texto.indexOf("verduras") > -1){
						window.location="contarVerduras.html";
					}else if((extraerPagUrlActual() == "index.html"||extraerPagUrlActual() == "") && texto.indexOf("sumar") > -1){
						window.location="sumar.html";
					}else if((extraerPagUrlActual() == "index.html"||extraerPagUrlActual() == "") && texto.indexOf("restar") > -1){
						window.location="restar.html";
					}else if((extraerPagUrlActual() == "index.html"||extraerPagUrlActual() == "") && texto.indexOf("créditos") > -1){
						window.location="creditos.html";
					}else if((extraerPagUrlActual() == "index.html"||extraerPagUrlActual() == "") && texto.indexOf("controles") > -1){
						window.location="controles.html";
					}else if((extraerPagUrlActual() == "index.html"||extraerPagUrlActual() == "") && texto.indexOf("adiós") > -1){
						var  texto_final = "Bye bye hasta otro ratito"
						responsiveVoice.speak(texto_final, "Spanish Female", {onend: function(){window.close()}});
					}else if(extraerPagUrlActual() == "contarCasas.html" && texto.indexOf("empezar") > -1){
						Object.defineProperty(evento, "keyCode", {"value" : 32});
						document.dispatchEvent(evento);
					}else if(extraerPagUrlActual() == "contarCasas.html" && (textoAboton(texto).value == (numDeCasa+1))){
						Object.defineProperty(evento, "keyCode", {"value" : 112});
						evento.preventDefault();
						document.dispatchEvent(evento);
					}else if(extraerPagUrlActual() == "sumar.html" && texto.indexOf("meto")>-1){
						Object.defineProperty(evento, "keyCode", {"value" : 32});
						document.dispatchEvent(evento);
						var evento1 = new KeyboardEvent("keydown");
						Object.defineProperty(evento1, "keyCode", {"value" : 37});
						document.dispatchEvent(evento1);
					}else if(texto.indexOf("menú") > -1){
						window.location="index.html";
					}else if(texto.indexOf("ayuda") > -1){
						document.getElementById('btn-ayuda').click();
						if(recognizing){
							reconocerVoz();
						}
						var  texto_final = obtenerAyudaVoz();
						responsiveVoice.speak(texto_final, "Spanish Female", {onend: function(){reconocerVoz();}});
					}else if(texto.indexOf("cerrar") > -1){
						document.getElementById('botonModal').click();
					}else if(extraerPagUrlActual() == "" || extraerPagUrlActual() == "index.html" || extraerPagUrlActual() == "contar.html"){
						var texto_final = texto + " no es una opción del menú. Prueba a decirlo de otra manera";
						if(recognizing){
							reconocerVoz();
						}			
						responsiveVoice.speak(texto_final, "Spanish Female", {onend: function(){reconocerVoz();}});
					}else{
						mostrarMensajeIntento(comprobarRespuesta(textoAboton(texto)));
					}

				}
			
			 }
				
				//texto
			}
		
			recognition.onerror = function(event) {
			}
			recognition.onend = function() {
				recognizing = false;
				console.log("terminó de escuchar, llegó a su fin");
				$('.gif-micro').html('<img alt="micrófono apagado" src="./imagenes/micro/micro-off.png">');
			}

		}

		function reconocerVoz(){

			if (recognizing == false) {
				recognition.start();
				recognizing = true;
				$('.gif-micro').html('<img alt="micrófono escuchando" src="./imagenes/micro/micro.gif">');
			} else {
				recognition.stop();
				recognizing = false;
				$('.gif-micro').html('<img alt="micrófono apagado" src="./imagenes/micro/micro-off.png">');
			}
		}

		function obtenerAyudaVoz(){
			var pag = extraerPagUrlActual(),
				text;
			switch (pag)
			{
				case ("contarCasas.html"):
				{
					text = 	"Para llegar al establo, pulsa en las casas siguiendo el orden correcto. Si quieres utilizar el teclado pulsa espacio para comenzar a controlar con las flechas. También puedes dictar los números, diga empezar para comenzar a contar. Para responder, pulsa sobre la respuesta, utiliza las flechas para desplazarte e intro para contestar o dicta la respuesta correcta";
					break;
				}
				case ("contarVerduras.html"):
				{
					text = 	"Pulsa sobre la respuesta. Con el teclado utiliza las flechas para desplazarte e intro para contestar. Para jugar con voz, dicta la respuesta correcta";
					break;
				}
				case("sumar.html"):
				{
					text = 	"Para meter los animales, arrástralos de uno en uno hasta el corral. Si quieres utilizar el teclado pulsa espacio para seleccionar un animal y flecha izquierda para meterlo. También puedes meterlos diciendo la palabra meto. Para responder la pregunta pulsa sobre la respuesta, utiliza las flechas para desplazarte e intro para contestar o dicta la respuesta correcta";
					break;
				}
				case("restar.html"):
				{
					text = 	"Pulsa sobre la respuesta, utiliza las flechas para desplazarte e intro para contestar o dicta la respuesta correcta";
					break;
				}
			}
			return text;
		}

		function textoAboton(texto){

			var btn = document.createElement("BUTTON");

			if(texto.indexOf('cero')>-1 || ((texto.indexOf('0')>-1 && texto[texto.indexOf('0')-1]!=1) && (texto[texto.indexOf('0')+1]==' ' || texto.indexOf('0')==(texto.length-1)))){
				btn.value = 0;
			}else if(texto.indexOf('uno')>-1 || texto.indexOf('una')>-1 || ((texto.indexOf('1')>-1 && texto[texto.indexOf('1')-1]!=1) && (texto[texto.indexOf('1')+1]==' ' || texto.indexOf('1')==(texto.length-1)))){
				btn.value = 1;
			}else if(texto.indexOf('cerdos')==-1 && (texto.indexOf('dos')>-1 || ((texto.indexOf('2')>-1 && texto[texto.indexOf('2')-1]!=1) && (texto[texto.indexOf('2')+1]==' ' || texto.indexOf('2')==(texto.length-1))))){
				btn.value = 2;
			}else if(texto.indexOf('tres')>-1 || ((texto.indexOf('3')>-1 && texto[texto.indexOf('3')-1]!=1) && (texto[texto.indexOf('3')+1]==' ' || texto.indexOf('3')==(texto.length-1)))){
				btn.value = 3;
			}else if(texto.indexOf('cuatro')>-1 || ((texto.indexOf('4')>-1 && texto[texto.indexOf('4')-1]!=1) && (texto[texto.indexOf('4')+1]==' ' || texto.indexOf('4')==(texto.length-1)))){
				btn.value = 4;
			}else if(texto.indexOf('cinco')>-1 || ((texto.indexOf('5')>-1 && texto[texto.indexOf('5')-1]!=1) && (texto[texto.indexOf('5')+1]==' ' || texto.indexOf('5')==(texto.length-1)))){
				btn.value = 5;
			}else if(texto.indexOf('seis')>-1 || ((texto.indexOf('6')>-1 && texto[texto.indexOf('6')-1]!=1) && (texto[texto.indexOf('6')+1]==' ' || texto.indexOf('6')==(texto.length-1)))){
				btn.value = 6;
			}else if(texto.indexOf('siete')>-1 || ((texto.indexOf('7')>-1 && texto[texto.indexOf('7')-1]!=1) && (texto[texto.indexOf('7')+1]==' ' || texto.indexOf('7')==(texto.length-1)))){
				btn.value = 7;
			}else if(texto.indexOf('ocho')>-1 || ((texto.indexOf('8')>-1 && texto[texto.indexOf('8')-1]!=1) && (texto[texto.indexOf('8')+1]==' ' || texto.indexOf('8')==(texto.length-1)))){
				btn.value = 8;
			}else if(texto.indexOf('nueve')>-1 || ((texto.indexOf('9')>-1 && texto[texto.indexOf('9')-1]!=1) && (texto[texto.indexOf('9')+1]==' ' || texto.indexOf('9')==(texto.length-1)))){
				btn.value = 9;
			}else if(texto.indexOf('diez')>-1 || (texto.indexOf('10')>-1 && texto[texto.indexOf('10')+2]==' ') || texto.indexOf('10')==(texto.length-2)){
				btn.value = 10;
			}else if(texto.indexOf('once')>-1 || (texto.indexOf('11')>-1 && texto[texto.indexOf('11')+2]==' ') || texto.indexOf('11')==(texto.length-2)){
				btn.value = 11;
			}else if(texto.indexOf('doce')>-1 || (texto.indexOf('12')>-1 && texto[texto.indexOf('12')+2]==' ') || texto.indexOf('12')==(texto.length-2)){
				btn.value = 12;
			}else if(texto.indexOf('trece')>-1 || (texto.indexOf('13')>-1 && texto[texto.indexOf('13')+2]==' ') || texto.indexOf('13')==(texto.length-2)){
				btn.value = 13;
			}else if(texto.indexOf('catorce')>-1 || (texto.indexOf('14')>-1 && texto[texto.indexOf('14')+2]==' ') || texto.indexOf('14')==(texto.length-2)){
				btn.value = 14;
			}else if(texto.indexOf('quince')>-1 || (texto.indexOf('15')>-1 && texto[texto.indexOf('15')+2]==' ') || texto.indexOf('15')==(texto.length-2)){
				btn.value = 15;
			}else if(texto.indexOf('dieciséis')>-1 || (texto.indexOf('16')>-1 && texto[texto.indexOf('16')+2]==' ') || texto.indexOf('16')==(texto.length-2)){
				btn.value = 16;
			}else if(texto.indexOf('diecisiete')>-1 || (texto.indexOf('17')>-1 && texto[texto.indexOf('17')+2]==' ') || texto.indexOf('17')==(texto.length-2)){
				btn.value = 17;
			}else if(texto.indexOf('dieciocho')>-1 || (texto.indexOf('18')>-1 && texto[texto.indexOf('18')+2]==' ') || texto.indexOf('18')==(texto.length-2)){
				btn.value = 18;
			}else if(texto.indexOf('diecinueve')>-1 || (texto.indexOf('19')>-1 && texto[texto.indexOf('19')+2]==' ') || texto.indexOf('19')==(texto.length-2)){
				btn.value = 19;
			}else if(texto.indexOf('veinte')>-1 || (texto.indexOf('20')>-1 && texto[texto.indexOf('20')+2]==' ') || texto.indexOf('20')==(texto.length-2)){
				btn.value = 20;
			}
			else{
				btn.value = 1000;
			}

			//Me guardo el valor de la respuesta dicha mediante voz
			respuestaPorVoz = btn.value;

			return btn;
		}

	/*****************************************************************************************************/


	/*****************************BLOQUEAR ORIENTACION PANTALLA - HORIZONTAL******************************/

		$(document).ready(function(){
			function reorient(e) {
				var portrait = (window.orientation % 180 == 0); //orientacion vertical
				if(portrait)
				{
					$("body>main").css("-webkit-transform", "rotate(90deg)");
				}
				else{
					$("body>main").css("-webkit-transform", "");
				}
			}
			window.onorientationchange = reorient;
			window.setTimeout(reorient, 0);
		});

	/*****************************************************************************************************/


	/**********************************TABULADOR - CONTROLES FARM SCHOOL**********************************/

		function abrirPestControlesJuego(event, opcionJuego) {
			
			//Declaramos todas las variables
			var i, controlesTablaTab, controlesTabLink;

			//Obtenemos todos los elementos con la clase controlesTablaTab y los ocultamos
			controlesTablaTab = document.getElementsByClassName("controlesTablaTab");
			for (i = 0; i < controlesTablaTab.length; i++) {
				controlesTablaTab[i].style.display = "none";
			}

			//Obtenemos todos los elementos de la clase controlesTabLink y eliminamos la clase tabActivo de dichos elementos obtenidos
			controlesTabLink = document.getElementsByClassName("controlesTabLink");
			for (i = 0; i < controlesTabLink.length; i++) {
				if(controlesTabLink[i].className != "contar"){
					if(opcionJuego != "contar-casas" && opcionJuego != "contar-verduras"){
						controlesTabLink[i].className = controlesTabLink[i].className.replace("tabActivo", "");
					}
				}
				else{
					controlesTabLink[i].className = controlesTabLink[i].className.replace("tabActivo", "");
				}
			}

			//Mostramos el elemento tabulado actual, anyadiendo la clase tabActivo al elemento pasado como parametro
			console.log(document.getElementById(opcionJuego));
			document.getElementById(opcionJuego).style.display = "block";
			event.currentTarget.className += " tabActivo";

		}

	/*****************************************************************************************************/


	/****************************CANCELAR REDIRECCION ENLACE CREDITOS DE IMAGEN***************************/

		function eliminarRedireccion(event){
			event.preventDefault();
		}
		
	/*****************************************************************************************************/


	/************************************GENERAR NUMEROS ALETORIOS****************************************/

		function obtenerNumeroAleatorio(rangoMin, rangoMax) {
			return Math.floor(Math.random() * (rangoMax - rangoMin)) + rangoMin;
		}

	/*****************************************************************************************************/


	/******************************************CONTADOR DE TIEMPO*****************************************/

		function iniciarTemporizador(){
			tiempoInicio = new Date();
		}

		function pararTemporizador(){
			tiempoFin = new Date();
			tiempoTranscurrido = tiempoFin - tiempoInicio; //obtengo diferencia de tiempo en milisegundos
		}

		function cambiarFormato(tiempoMs){
			var difSeg = Math.floor(tiempoMs / 1000); //me quedo con la parte entera del resultado (convierto de milisegundos a segundos)
			
			var seg = difSeg % 60;
			var min = Math.floor(seg / 60);
			var hr  = Math.floor(seg / 3600);

			var tiempoTrans = hr + 'h ' + min + 'm ' + seg + 's';

			return tiempoTrans;
		}

	/*****************************************************************************************************/


	/******************************************DESORDENAR ARRAY*******************************************/

		function desordenarArray(array){
			array = array.sort(function() {return Math.random() - 0.5}); //desordeno el array
		}

	/*****************************************************************************************************/


	/****************************************CARGAR RESPUESTAS********************************************/

		function colocarFocoRespuestas(){
			$('#respuestas>button:first-of-type').focus();
		}

		function mostrarRespuestas(){
			$.each(respuestasGenericas, function(index)
			{
				$('#respuestas').append('<button id = "resp'+ (index) +'" value="' + respuestasGenericas[index] + '" onclick="mostrarMensajeIntento(comprobarRespuesta(this));">' + respuestasGenericas[index] + '</button>');
			});
			$('#respuestas').append('<button class="gif-micro" onclick="reconocerVoz();">' + '<img alt="micrófono apagado" src="./imagenes/micro/micro-off.png">' + '</button>');
		}

		function generarRespuestas(rango){
			var valoresAleatorios = [];

			for (var i = 0; i < rango; i++){
				valoresAleatorios.push(i);
			}

			for (var j = 0; j < 4; j++){
				var indice = Math.floor(Math.random()*valoresAleatorios.length);
				var numeroAleat = valoresAleatorios[indice];
				valoresAleatorios.splice(indice, 1);
				respuestasGenericas.push(numeroAleat);
			}

			insertarRespuestaCorrecta();
			desordenarArray(respuestasGenericas); //desordeno el array
		}

		function insertar(respCorrecta){
			var yaIncluida = false;
			for (var k = 0; k < respuestasGenericas.length; k++){
				if(respuestasGenericas[k] == respCorrecta){
					yaIncluida = true;
					break;
				}
			}
			if(!yaIncluida){
				var indexResp = Math.floor(Math.random()*respuestasGenericas.length);
				respuestasGenericas[indexResp] = respCorrecta;
			}
		}

		function insertarRespuestaCorrecta(){
			var pag = extraerPagUrlActual();
			switch (pag)
			{
				case ("contarCasas.html"):
				{
					insertar(ultimoNumero);
					break;
				}
				case ("contarVerduras.html"):
				{
					insertar(cuantasVerduras[queVerdura]);
					break;
				}
				case("sumar.html"):
				{
					insertar(resultadoSuma);
					break;
				}
				case("restar.html"):
				{
					insertar(resultadoResta);
					break;
				}
			}
		}

		function cargarRespuestas(rangoRespuestas){

			//genero las respuestas
			generarRespuestas(rangoRespuestas);

			//muestro en la pagina las respuestas
			mostrarRespuestas();

			//pongo el foco a la primera posicion de las respuestas
			colocarFocoRespuestas();

			//cambio el estado de la variable de respuestas mostradas a true para que ya aplique la insercion de la mano tutorial para las respuestas
			respuestasMostradas = true;

		}

	/*****************************************************************************************************/


	/**********************************SITUAR CASAS - JUEGO CONTAR CASAS**********************************/

		function colocarCasas(casas){

			let cv = document.getElementById('cv01'),
				ctx = cv.getContext('2d');

			let anchoImg = 125;
				sepImgFilas=40,
				altoImg = 610/(casas+2),
				sepImgColumnas=0;

			var arrayCasas = new Array(casas);
				arrayPosiciones = new Array(casas);
				arrayMovs = new Array(casas);

				for(let i = 0; i<casas; i++){
					arrayPosiciones[i] = new Array(2);
				}


			let derecha = true,
				x = 0-anchoImg,
				y0 = 610-altoImg,
				y = y0;

			var currentIndex = 0;

			var loadImages = function(){
				if(casas==currentIndex) return false;

				arrayCasas[currentIndex]  = new Image();
				if(currentIndex<casas-1){
					arrayCasas[currentIndex].src = "./imagenes/contar-casas/casa"+currentIndex+".png";
				}else{
					arrayCasas[currentIndex].src = "./imagenes/contar-casas/establoSN.png";
				}

				arrayCasas[currentIndex].onload = function(e){


					if(derecha && x+125>492){
						derecha = false;
					}

					if(!derecha && x-125<0){
						derecha = true;
					}

					if(derecha){
						x = x+125;
						arrayMovs[currentIndex]=0;
					}else{
						x = x-125;
						arrayMovs[currentIndex]=1;
					}

					y = y0-(currentIndex+1)*altoImg;

					if(currentIndex<casas-1){
						arrayPosiciones[currentIndex][0] = x+25;
						arrayPosiciones[currentIndex][1] = y;
						ctx.drawImage(arrayCasas[currentIndex],x+25,y, 95, 95);
						ctx.stroke();
					}else{
						arrayPosiciones[currentIndex][0] = x+25;
						arrayPosiciones[currentIndex][1] = y;
						ctx.drawImage(arrayCasas[currentIndex],x+25,y, 120, 120);
						ctx.stroke();
					}
					loadImages(currentIndex++);
				}
			}

			loadImages(currentIndex);
		}

		function prepararJuegoCasas(){

			//con estos rangos es como he conseguido que se vea mejor
			var rangoMin = 4;
			var rangoMax = 11;

			var numCasas = obtenerNumeroAleatorio(rangoMin, rangoMax);

			ultimoNumero = numCasas-1;

			let cv = document.getElementById('cv01'),
				ctx = cv.getContext('2d');

			var background  = new Image();
			background.src = "./imagenes/contar-casas/fondo-contar-casas.png"; 

			background.onload = function(){
				ctx.drawImage(background,0,0, cv.height, cv.height);
				colocarCasas(numCasas);
			}

			iniciarTemporizador();

			var texto_final = "Vamos a contar. Nos encontramos en la casa número 0 y debemos llegar al establo, pero antes tenemos que pasar por todas las casas. Sigue el orden de las casas hasta llegar al establo.";			

			responsiveVoice.speak(texto_final, "Spanish Female",{onend: function() {reconocerVoz();}});

			var clicks = 0;
			var lastClick = [0, 0, 0, 0];

			cv.onmousedown = function(evt){
				/*console.log(evt.offsetX + ',' + evt.offsetY;*/
				let x = evt.offsetX,
					y = evt.offsetY;

				if(clicks == 0){
					lastClick[0] = x;
					lastClick[1] = y;
					if(x>arrayPosiciones[clicks][0] && x<arrayPosiciones[clicks][0]+95 && y>arrayPosiciones[clicks][1] && y<arrayPosiciones[clicks][1]+95){
						numDeCasa=0;
						console.log("CORRECTO");
						ctx.beginPath();
						ctx.moveTo(lastClick[0], lastClick[1]);
						clicks++;
					}else{
						console.log("incorrecto");

						var texto_final = "Ese no es el número correcto";
					
						responsiveVoice.speak(texto_final, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
				}else if(clicks > 0 && clicks<numCasas){
					lastClick[2] = x;
					lastClick[3] = y;

					ctx.lineWidth = 10;
					ctx.strokeStyle = '#a00';

					if(x>arrayPosiciones[clicks][0] && x<arrayPosiciones[clicks][0]+95 && y>arrayPosiciones[clicks][1] && y<arrayPosiciones[clicks][1]+95){
			    		console.log("CORRECTO");
			    		ctx.lineTo(lastClick[2], lastClick[3]);
						ctx.stroke();
						clicks++;
						numDeCasa++;
					}else{
						console.log("incorrecto");

						var texto_final = "Ese no es el número correcto";
					
						responsiveVoice.speak(texto_final, "Spanish Female", {onend: function() {reconocerVoz();}});
					}

					if (clicks == numCasas) {
						if(recognizing==true){
							reconocerVoz();
						}
						$('#contenedorResultadosDerecha').prepend("<p class='preguntas'><span>¿Qué número va en el establo?</span></p><img src='./imagenes/contar-casas/establoSN.png' alt='establo'>");
						cargarRespuestas(rangoMax);
						$(".mano-tutorial-click").remove();
						$(".contenedor-mano-tutorial").append("<div class='mano-tutorial-respuestas-contar-casas'></div>");
						var texto_final1 = "¿Qué número va en el establo?";
						responsiveVoice.speak(texto_final1, "Spanish Female",{onend: function() {reconocerVoz();}});
						clicks++;
					}
				}

			}

			document.addEventListener("keydown", function teclaPulsada(evt)
			{
				ctx.lineWidth = 10;
				ctx.strokeStyle = '#a00';
				if(evt.keyCode == 32){
					if(clicks == 0){
						console.log("CORRECTO");
						ctx.beginPath();
						ctx.moveTo(arrayPosiciones[clicks][0]+47.5, arrayPosiciones[clicks][1]+65);
						clicks++;
						numDeCasa=0;
						if(recognizing==true){
							reconocerVoz();
						}
						var texto_final1;
						if(numDeCasa==(numCasas-1)){
							texto_final1 = "Has llegado al establo";
						}else{
							texto_final1 = "Estás en la casa "+numDeCasa+" ¿cuál es la siguiente?";
						}	
						responsiveVoice.speak(texto_final1, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
				}
				if(clicks > 0 && clicks<arrayPosiciones.length){
					if(evt.keyCode == 37){
						console.log("izquierda");
						if(arrayPosiciones[clicks][0]<arrayPosiciones[clicks-1][0]){
							console.log("correcto");
							ctx.lineTo(arrayPosiciones[clicks][0]+47.5, arrayPosiciones[clicks][1]+65);
							ctx.stroke();
							clicks++;
							numDeCasa++;
							if(recognizing==true){
								reconocerVoz();
							}
							var texto_final1;
							if(numDeCasa==(numCasas-1)){
								texto_final1 = "Has llegado al establo";
							}else{
								texto_final1 = "Estás en la casa "+numDeCasa+" ¿cuál es la siguiente?";
							}	

							responsiveVoice.speak(texto_final1, "Spanish Female",{onend: function() {reconocerVoz();}});
						}else{
							console.log("incorrecto");
							var texto_final = "Ese no es el camino correcto";
					
							responsiveVoice.speak(texto_final, "Spanish Female");
						}
					}else if(evt.keyCode == 39){
						console.log("derecha");
						if(arrayPosiciones[clicks][0]>arrayPosiciones[clicks-1][0]){
							console.log("correcto");
							ctx.lineTo(arrayPosiciones[clicks][0]+47.5, arrayPosiciones[clicks][1]+65);
							ctx.stroke();
							clicks++;
							if(recognizing==true){
								reconocerVoz();
							}
							var texto_final1;
							if(numDeCasa==(numCasas-1)){
								texto_final1 = "Has llegado al establo";
							}else{
								texto_final1 = "Estás en la casa "+numDeCasa+" ¿cuál es la siguiente?";
							}		

							responsiveVoice.speak(texto_final1, "Spanish Female",{onend: function() {reconocerVoz();}});
						}else{
							console.log("incorrecto");
							var texto_final = "Ese no es el camino correcto";
					
							responsiveVoice.speak(texto_final, "Spanish Female");
						}
					}else if(evt.keyCode == 112){
						evt.preventDefault();
						ctx.lineTo(arrayPosiciones[clicks][0]+47.5, arrayPosiciones[clicks][1]+65);
						ctx.stroke();
						clicks++;
						numDeCasa++;
						if(recognizing==true){
							reconocerVoz();
						}
						var texto_final1;
						if(numDeCasa==(numCasas-1)){
							texto_final1 = "Has llegado al establo";
						}else{
							texto_final1 = "Estás en la casa "+numDeCasa+" ¿cuál es la siguiente?";
						}		

						responsiveVoice.speak(texto_final1, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
				}
				if (clicks == numCasas) {
					if(recognizing==true){
						reconocerVoz();
					}
					$('#contenedorResultadosDerecha').prepend("<p class='preguntas'><span>¿Qué número va a continuación?</span></p><img src='./imagenes/contar-casas/establoSN.png' alt='establo'>");
					cargarRespuestas(rangoMax);
					$(".mano-tutorial-click").remove();
					$(".contenedor-mano-tutorial").append("<div class='mano-tutorial-respuestas-contar-casas'></div>");	
					var texto_final1 = "¿Qué número va a continuación?";
					responsiveVoice.speak(texto_final1, "Spanish Female",{onend: function() {reconocerVoz();}});
					clicks++;
				}
				
			}, false);

		}

		


	/*****************************************************************************************************/


	/**********************************SITUAR MONEDAS - JUEGO RESTAR MONEDAS**********************************/

		function colocarMonedas(cambio, mod){

			let cv = document.getElementById('cv02'),
				ctx = cv.getContext('2d');

			var total = cambio[0] + cambio[1] + cambio[2] + cambio[3];

			var arrayMonedas = new Array(total),
				arrayValMonedas = new Array(total);

			let llevo=0,
				cont=0,
				x0=40.5, y0=125, x1=470.5, y1=125;;

			for(let i=0; i<cambio.length; i++){
				for(let j=llevo; j<llevo+cambio[i]; j++){
					switch (i){
						case 0: arrayValMonedas[cont] = 10;
							break;
						case 1: arrayValMonedas[cont] = 5;
							break;
						case 2: arrayValMonedas[cont] = 2;
							break;
						case 3: arrayValMonedas[cont] = 1;
							break;
					}
					cont++;
				}
				llevo+=cambio[i];
			}

			var currentIndex = 0;

			var loadImages = function(){
				if(total==currentIndex) return false;

				arrayMonedas[currentIndex]  = new Image();

				switch (arrayValMonedas[currentIndex]){
						case 10:
							arrayMonedas[currentIndex].src = "./imagenes/restar/cent10.png";
							break;
						case 5:
							arrayMonedas[currentIndex].src = "./imagenes/restar/cent5.png";
							break;
						case 2:
							arrayMonedas[currentIndex].src = "./imagenes/restar/cent2.png";
							break;
						case 1:
							arrayMonedas[currentIndex].src = "./imagenes/restar/cent1.png";
							break;
					}


				arrayMonedas[currentIndex].onload = function(e){

					if(mod==0){
						if(x0+25 > (20.5+25+305-90)){
							x0=40.5;
							y0+=110;
						}

						if(currentIndex<total){
							ctx.drawImage(arrayMonedas[currentIndex],x0,y0, 80, 80);
							ctx.stroke();
							x0+=25;
						}

						x0+=90.5;
					}else if(mod==1){
						if(x1+25 > (450.5+25+305-90)){
							x1=470.5;
							y1+=110;
						}

						if(currentIndex<total){
							ctx.drawImage(arrayMonedas[currentIndex],x1,y1, 80, 80);
							ctx.stroke();
							x1+=25;
						}

						x1+=90.5;
					}
						
					loadImages(currentIndex++);
				
				}

			}

			loadImages(currentIndex);
		}

		function prepararJuegoMonedas(){
 			
			var rangoMin = 5;
			var rangoMax = 20;

			let cv = document.getElementById('cv02'),
				ctx = cv.getContext('2d');

			var imp = obtenerNumeroAleatorio(rangoMin, rangoMax),
				rest = obtenerNumeroAleatorio(1, imp);

				importe = imp;
				resta = rest;
				resultadoResta = importe-resta;
			 
			console.log("El cambio de la cantidad "+imp);
			 
			// indicamos todas las monedas posibles
			var monedas=Array(10, 5, 2, 1);
			 
			// creamos un array con la misma cantidad de monedas
			// Este array contendra las monedas a devolver
			var cambio=Array(0,0,0,0);
				cambioResta=Array(0,0,0,0);
			 
			// Recorremos todas las monedas
			for(var i=0; i<monedas.length; i++)
			{
			 
			    // Si el importe actual, es superior a la moneda
			    if(imp>=monedas[i])
			    {
			 
			        // obtenemos cantidad de monedas
			        cambio[i]=parseInt(imp/monedas[i]);
			 
			        // actualizamos el valor del importe que nos queda por didivir
			        imp=imp-(cambio[i]*monedas[i]);
			    }
			}
			 
			// Bucle para mostrar el resultado
			for(i=0; i<monedas.length; i++)
			{
			    if(cambioResta[i]>0)
			    {
			       console.log("Hay: "+cambioResta[i]+" monedas de: "+monedas[i]+"€");
			    }
			}

			for(var i=0; i<monedas.length; i++)
			{
			 
			    // Si el importe actual, es superior a la moneda
			    if(rest>=monedas[i])
			    {
			 
			        // obtenemos cantidad de monedas
			        cambioResta[i]=parseInt(rest/monedas[i]);
			 
			        // actualizamos el valor del importe que nos queda por didivir
			        rest=rest-(cambioResta[i]*monedas[i]);
			    }
			}
			 
			// Bucle para mostrar el resultado
			for(i=0; i<monedas.length; i++)
			{
			    if(cambioResta[i]>0)
			    {
			       console.log("Hay: "+cambioResta[i]+" monedas de: "+monedas[i]+"€");
			    }
			}

			ctx.beginPath();
			ctx.strokeStyle = '#8A6300';
			ctx.lineWidth = 4;
			ctx.strokeRect(20.5, 105.5,305,305);
			ctx.strokeRect(455.5, 105.5,305,305);

			ctx.beginPath();
			ctx.lineWidth = 20;
			ctx.moveTo(360, 245.5);
			ctx.lineTo(420, 245.5);
			/*ctx.lineTo(400, 225.5);
			ctx.lineTo(400, 265.5);
			ctx.lineTo(435, 245.5);*/

			ctx.stroke();

			ctx.font = "22px sans-serif"

			var texto = "Tenemos " + importe +" céntimos y nos gastamos " + resta + " céntimos en compras"

			ctx.fillText(texto, 70, 60.5);

			colocarMonedas(cambio, 0);
			colocarMonedas(cambioResta, 1);

			$('#contenedorResultados').prepend("<p class='preguntas'><span>¿Cuánto dinero tendremos después de realizar la compra?</span></p>");
			cargarRespuestas(rangoMax);
			iniciarTemporizador();

			var texto_final = "Vamos a restar. Hemos venido a comprar comida para los animales de la granja. "+texto+"¿Cuánto dinero tendremos después de ralizar la compra?";			

			responsiveVoice.speak(texto_final, "Spanish Female",{onend: function() {reconocerVoz();}});

			

		}

	/*****************************************************************************************************/



	/********************************SITUAR VERDURAS - JUEGO CONTAR VERDURAS******************************/

		function crearEtiqImgFrutas(num, tipo){
			
			var verduras = [];

			switch (tipo)
			{
				case (0):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/lechuga.png' alt='lechuga'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("lechugas");
					break;
				}
				case (1):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/maiz.png' alt='maíz'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("maíces");
					break;
				}
				case (2):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/patata.png' alt='patata'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("patatas");
					break;
				}
				case (3):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/tomate.png' alt='tomate'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("tomates");
					break;
				}
				case (4):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/zanahoria.png' alt='zanahoria'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("zanahorias");
					break;
				}
			}

			for(var i = 0; i < num; i++)
			{
				verduras.push(img);
			}

			return verduras;
		}

		function colocarVerduras(verduras){
			$.each(verduras, function(index)
			{
				$('#contarVerduras>div').append(verduras[index]);
			});
		}

		function imprimirPorConsolaNumVerduras(){
			console.log("VERDURAS");
			console.log("LECHUGAS: " + cuantasVerduras[0]);
			console.log("MAÍZ: " + cuantasVerduras[1]);
			console.log("PATATAS: " + cuantasVerduras[2]);
			console.log("TOMATES: " + cuantasVerduras[3]);
			console.log("ZANAHORIAS: " + cuantasVerduras[4]);
		}

		function preguntarCuantasVerdurasXHay(queVerdura){

			var preguntaVerdura;

			switch (queVerdura)
			{
				case (0):
				{
					preguntaVerdura = "<span>¿Cuántas</span><img src='./imagenes/contar-verduras/lechuga.png' alt='lechuga'><span>hay?</span>";
					break;
				}
				case (1):
				{
					preguntaVerdura = "<span>¿Cuántos</span><img src='./imagenes/contar-verduras/maiz.png' alt='maiz'><span>hay?</span>";
					break;
				}
				case (2):
				{
					preguntaVerdura = "<span>¿Cuántas</span><img src='./imagenes/contar-verduras/patata.png' alt='patata''><span>hay?</span>";
					break;
				}
				case (3):
				{
					preguntaVerdura = "<span>¿Cuántos</span><img src='./imagenes/contar-verduras/tomate.png' alt='tomate'><span>hay?</span>";
					break;
				}
				case (4):
				{
					preguntaVerdura = "<span>¿Cuántas</span><img src='./imagenes/contar-verduras/zanahoria.png' alt='zanahoria'><span>hay?</span>";
					break;
				}
			}

			$('#contenedorResultados').prepend("<p class='preguntas'>" + preguntaVerdura + "</p>");
		}

		function prepararJuegoVerduras(){

			//con estos rangos es como he conseguido que se vea mejor
			var rangoMin = 2;
			var rangoMax = 5;

			var rango = 10;

			var verduras = [];
			var verdurasAux = [];

			for(var i = 0; i < 5; i++)
			{
				verdurasAux = crearEtiqImgFrutas(obtenerNumeroAleatorio(rangoMin, rangoMax), i);
				for(var j = 0; j < verdurasAux.length; j++)
				{
					verduras.push(verdurasAux[j]);
				}
			}

			verduras = verduras.sort(function() {return Math.random() - 0.5}); //desordeno el array de verduras

			colocarVerduras(verduras);

			imprimirPorConsolaNumVerduras();

			queVerdura = obtenerNumeroAleatorio(0, 5);

			preguntarCuantasVerdurasXHay(queVerdura);

			cargarRespuestas(rango);

			activarDragAndDrop();

			iniciarTemporizador();

			var texto_final

			texto_final = "Vamos a contar. Tenemos que averiguar el número total de una de las verduras que hay en nuestro huerto, para poder recogerlas y cocinarlas para la comida.";

			switch(queVerdura){
				case 0: texto_final += ".¿Cuántas lechugas hay?";
					break;
				case 1: texto_final += ".¿Cuántos maíces hay?";
					break;
				case 2: texto_final += ".¿Cuántas patatas hay?";
					break;
				case 3: texto_final += ".¿Cuántos tomates hay?";
					break;
				case 4: texto_final += ".¿Cuántas zanahorias hay?";
					break;
			}

			if(recognizing){
				reconocerVoz();
			}		

			responsiveVoice.speak(texto_final, "Spanish Female",{onend: function() {reconocerVoz();}});

		}

	/*****************************************************************************************************/


	/********************************SITUAR ANIMALES - JUEGO SUMAR ANIMALES*******************************/

		function crearEtiqImgAnimales(num, tipo, dentroOFuera){
			
			var animales = [];

			switch (tipo)
			{
				case (0):
				{
					var img;
					if(dentroOFuera){
						img = "<figure class='imagenes-corral'>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable' tabindex='0'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/caballo.png' alt='caballo'></figure>";
					nombreAnimal = "caballos";
					break;
				}
				case (1):
				{
					var img;
					if(dentroOFuera){
						img = "<figure class='imagenes-corral'>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable' tabindex='0'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/cerdo.png' alt='cerdo'></figure>";
					nombreAnimal = "cerdos";
					break;
				}
				case (2):
				{
					var img;
					if(dentroOFuera){
						img = "<figure class='imagenes-corral'>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable' tabindex='0'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/gallina.png' alt='gallina'></figure>";
					nombreAnimal = "gallinas";
					break;
				}
				case (3):
				{
					var img;
					if(dentroOFuera){
						img = "<figure class='imagenes-corral'>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable' tabindex='0'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/oveja.png' alt='oveja'></figure>";
					nombreAnimal = "ovejas";
					break;
				}
				case (4):
				{
					var img;
					if(dentroOFuera){
						img = "<figure class='imagenes-corral'>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable' tabindex='0'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/vaca.png' alt='vaca'></figure>";
					nombreAnimal = "vacas";
					break;
				}
			}

			for(var i = 0; i < num; i++)
			{
				animales.push(img);
			}

			return animales;
			
		}

		function colocarAnimales(animales, dentroOFuera){
			if(dentroOFuera){
				$.each(animales, function(index)
				{
					$('#animalesDentro').append(animales[index]);
				});
			}
			else{
				$.each(animales, function(index)
				{
					$('#animalesFuera').append(animales[index]);
				});
			}
		}

		function imprimirPorConsolaNumAnimales(){
			console.log("ANIMALES DENTRO:");
			console.log(nombreAnimal + ": " + cuantosAnimales);
			console.log("");
			console.log("ANIMALES FUERA:");
			console.log(nombreAnimal + ": " + cuantosAnimalesFuera);
		}

		function preguntarcuantosAnimalesXHay(queAnimal){

			var preguntaAnimal;

			switch (queAnimal)
			{
				case (0):
				{
					preguntaAnimal = "<span>¿Cuántos</span><img src='./imagenes/sumar/caballo.png' alt='caballo'><span>hay ahora en total?</span>";
					break;
				}
				case (1):
				{
					preguntaAnimal = "<span>¿Cuántos</span><img src='./imagenes/sumar/cerdo.png' alt='cerdo'><span>hay ahora en total?</span>";
					break;
				}
				case (2):
				{
					preguntaAnimal = "<span>¿Cuántas</span><img src='./imagenes/sumar/gallina.png'alt='gallina'><span>hay ahora en total?</span>";
					break;
				}
				case (3):
				{
					preguntaAnimal = "<span>¿Cuántas</span><img src='./imagenes/sumar/oveja.png'alt='oveja'><span>hay ahora en total?</span>";
					break;
				}
				case (4):
				{
					preguntaAnimal = "<span>¿Cuántas</span><img src='./imagenes/sumar/vaca.png'alt='vaca'><span>hay ahora en total?</span>";
					break;
				}
			}

			$('#contenedorResultados').prepend("<p class='preguntas'>" + preguntaAnimal + "</p>");
		}

		function decirAnimalesAMeter(animalesAMeter){
			var meterAnimales;
			var animalesQueSeTienen;
			meterAnimales = "<span>Mete en el corral " + animalesAMeter + "</span>";
			switch (queAnimal)
			{
				case (0):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/caballo.png' alt='caballo'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/caballo.png' alt='caballo'>";
					break;
				}
				case (1):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/cerdo.png' alt='cerdo'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/cerdo.png'alt='cerdo'>";
					break;
				}
				case (2):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/gallina.png' alt='gallina'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/gallina.png' alt='gallina'>";
					break;
				}
				case (3):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/oveja.png' alt='oveja'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/oveja.png' alt='oveja'>";
					break;
				}
				case (4):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/vaca.png' alt='vaca'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/vaca.png' alt='vaca'>";
					break;
				}
			}

			$('#contenedorResultados').prepend("<p class='preguntas' id='decirMeterAnimales'>" + animalesQueSeTienen + meterAnimales + "<span>.</span>" + "</p>");
		}

		function actualizarAnimalesMetidos(){
			document.getElementById("animalesMetidos").innerHTML = animalesMetidos;

			var texto_final = "Has metido: " + animalesMetidos;

			if(recognizing){
				reconocerVoz();
			}		

			responsiveVoice.speak(texto_final, "Spanish Female",{onend: function() {reconocerVoz();}});
		}

		function decirCuantosHaMetido(){

			var animalesEnCorral = "<span>Has metido: <span id='animalesMetidos'>" + animalesMetidos + "</span> </span>";

			switch (queAnimal)
			{
				case (0):
				{
					animalesEnCorral = animalesEnCorral + "<img src='./imagenes/sumar/caballo.png' alt='caballo'>";
					break;
				}
				case (1):
				{
					animalesEnCorral = animalesEnCorral + "<img src='./imagenes/sumar/cerdo.png' alt='cerdo'>";
					break;
				}
				case (2):
				{
					animalesEnCorral = animalesEnCorral + "<img src='./imagenes/sumar/gallina.png' alt='gallina'>";
					break;
				}
				case (3):
				{
					animalesEnCorral = animalesEnCorral + "<img src='./imagenes/sumar/oveja.png' alt='oveja'>";
					break;
				}
				case (4):
				{
					animalesEnCorral = animalesEnCorral + "<img src='./imagenes/sumar/vaca.png' alt='vaca'>";
					break;
				}
			}

			$('#decirMeterAnimales').append(animalesEnCorral);
		}

		function prepararJuegoAnimales(){

			var rangoMin = 0;
			var rangoMax = 5;

			queAnimal = obtenerNumeroAleatorio(rangoMin, rangoMax);
			console.log(queAnimal);

			var animalesDentro = [];

			var establecerRangoMin = obtenerNumeroAleatorio(7, 10);

			var establecerRangoMax = obtenerNumeroAleatorio(7, 10);

			animalesDentro = crearEtiqImgAnimales(obtenerNumeroAleatorio(establecerRangoMin, establecerRangoMax), queAnimal, true);

			var animalesFuera = [];

			animalesFuera = crearEtiqImgAnimales(obtenerNumeroAleatorio(establecerRangoMin, establecerRangoMax), queAnimal, false);

			colocarAnimales(animalesDentro, true);

			colocarAnimales(animalesFuera, false);

			animalesAMeter = obtenerNumeroAleatorio(1, cuantosAnimalesFuera);

			contadorAnimalesAMeter = animalesAMeter;

			resultadoSuma = cuantosAnimales + animalesAMeter;

			imprimirPorConsolaNumAnimales();

			decirAnimalesAMeter(animalesAMeter);

			decirCuantosHaMetido();

			activarDragAndDrop();

			iniciarTemporizador();

			controlJuegoAnimalesMedianteTeclado(); //para controlar la primera parte del juego, unicamente con teclado

			var texto_final = "Vamos a sumar. Se hace de noche y tenemos que meter a algunos animales en el corral para que puedan dormir. En el corral hay " + cuantosAnimales + " " + nombreAnimal + ". Mete " + animalesAMeter + ".";

			responsiveVoice.speak(texto_final, "Spanish Female",{onend: function() {reconocerVoz();}});

		}

		function prepararContinuacionJuegoAnimales(){

			$(".imagen-draggable").removeAttr("tabindex"); //elimino el resto de elementos tabulables antes de eliminar su caracteristica drag

			$(".imagen-draggable").draggable("destroy"); //elimino todos los elementos drag de las imagenes

			$("#decirMeterAnimales").remove();

			$(".mano-tutorial-drag").remove();

			$("#respuestas").append("<div class='mano-tutorial-respuestas'></div>");

			var rango = 20;

			preguntarcuantosAnimalesXHay(queAnimal);

			cargarRespuestas(rango);

			var texto_final = "¿Cuánt" + nombreAnimal[nombreAnimal.length - 2] + "s" + " " + nombreAnimal + " " + "hay ahora en total?";	

			responsiveVoice.speak(texto_final, "Spanish Female",{onend: function() {reconocerVoz();}});

		}

	/*****************************************************************************************************/


	/*****************************JUEGO SUMAR ANIMALES - CONTROLADO CON TECLADO***************************/

		function obtenerMovimientoAnimacionAnimales(indexAnimalFocus){
			var movimiento = -1;
			if(indexAnimalFocus >= 0){
				for(var i = 0; i < 9; i+=3){
					if(i == indexAnimalFocus){
						movimiento = "-85%";
					}
				}
				for(var i = 1; i < 9; i+=3){
					if(i == indexAnimalFocus){
						movimiento = "-90%";
					}
				}
				for(var i = 2; i < 9; i+=3){
					if(i == indexAnimalFocus){
						movimiento = "-110%";
					}
				}
			}
			return movimiento;
		}

		function controlJuegoAnimalesMedianteTeclado(){
			document.addEventListener("keydown", function teclaPulsada(evt){
				var indexAnimalFocus = -1;
				if(evt.keyCode == 32){ //si pulsa el espacio se seleccionara el primer elemento de todos
					console.log("HOLA");
					console.log(primerAnimal);
					if($(":focus").not($("#animalesFuera>figure").eq(primerAnimal))){
						$("#animalesFuera>figure").eq(primerAnimal).focus();
					}
				}
				if(evt.keyCode == 37)
				{
					$("#animalesFuera>figure").each(function(index){
						if($(this).is($(":focus"))){
							indexAnimalFocus = index;
							return false; //para salir del bucle foreach
						}
					});

					if(indexAnimalFocus != -1){ //para evitar que actualice los animales introducidos si no se ha podido meter ninguno
						var toLeft = obtenerMovimientoAnimacionAnimales(indexAnimalFocus);

						$(":focus").animate({
							left: toLeft
						});

						actualizarDragAndDrop($(":focus"));

						$(":focus").removeAttr("tabindex"); //para asegurarme de que elimino la posibilidad de que este elemento tenga foco despues de esta iteracion

						$("#animalesFuera>figure").each(function(index){ //recorro el array de figures con tal de encontrar el primer elemento draggable de dicho array, una vez he introducido un animal en el corral
							if($(this).is($("#animalesFuera>figure[tabindex]").eq(0))){
								primerAnimal = index; //me guardo el indice de dicho primer animal draggable de la lista o array
								return false; //para salir del bucle foreach
							}
						});
					}
				}
			});
		}

	/*****************************************************************************************************/


	/********************************************CARGAR JUEGO*********************************************/

		$(document).ready(function(){

			var nombreUrl = extraerPagUrlActual();

			switch (nombreUrl)
			{
				case("contarCasas.html"):
				{
					prepararJuegoCasas();
					break;
				}
				case("contarVerduras.html"):
				{
					prepararJuegoVerduras();
					break;
				}
				case("sumar.html"):
				{
					prepararJuegoAnimales();
					break;
				}
				case("restar.html"):
				{
					prepararJuegoMonedas();
					break;
				}
			}

		});

	/*****************************************************************************************************/


	/*********************************EVENTOS DRAGGABLE Y DROPPABLE***************************************/

		function actualizarDragAndDrop(elemento){
			if(extraerPagUrlActual() == "sumar.html")
			{	
				animalesMetidos++;
				actualizarAnimalesMetidos();
				contadorAnimalesAMeter--;		
				if(contadorAnimalesAMeter == 0){
					$( ".imagen-droppable" ).droppable('destroy');
					$("#animalesDentro>img").attr("src", './imagenes/sumar/corral-propio-cuadrado-r.png');
					$("#animalesDentro>img").attr("alt", 'corral cerrado');
					prepararContinuacionJuegoAnimales();
					if(recognizing){
						reconocerVoz();
					}
				}
				else{
					var elem = elemento.draggable[0];
					$(elem).attr('class','imagen-draggable').draggable('disable'); //desactivo el elemento para que no cambie la cuenta de los que hay que poner de manera erronea
					$(elem).removeAttr("tabindex"); //para no seguir contando con este elemento a la hora de recorrer la lista producida para el tabulador
				}
			}
		}

		function activarDragAndDrop(){
			$( ".imagen-draggable" ).draggable({
				cursor: "pointer",
				opacity: 0.50,
				containment: $('.contenedorDragAndDrop')
			});
			$( ".imagen-droppable" ).droppable({
				classes:{
        			"ui-droppable-hover": "drop-hover-image",
				},
				drop: function( event, ui ) {
					actualizarDragAndDrop(ui);
					$( this )
						.css("filter", "brightness(100%)")
				},
				out: function( event, ui ) { 
			      $( this )
					.css("filter", "brightness(100%)")
			   	}
			});
		}

	/*****************************************************************************************************/


	/************************************EXTRAER PAGINA URL ACTUAL****************************************/

		function extraerPagUrlActual(){
			var url = location.href;
			var pag = url.split('/');
			pag = pag [pag.length - 1];
			if(pag.includes('#')){
				pag = pag.split('#');
				pag = pag[0];
			}
			return pag;
		}

	/*****************************************************************************************************/


	/****************************************ELIMINAR BOTON POR VOZ***************************************/

		function eliminarBotonPorVoz(){
			var indexDelButton = -1;
			$("#respuestas>button").each(function(index){
				if($(this).attr("value") == respuestaPorVoz){
					indexDelButton = index;
				}
			});
			if(indexDelButton >= 0){
				$("#respuestas>button").eq(indexDelButton).remove();
			}
		}

	/*****************************************************************************************************/


	/*****************************************COMPROBAR RESPUESTA*****************************************/

		function comprobarRespuesta(botonRespuesta){

			var correcto = false;

			//extraemos la pagina web de donde se esta preguntando para comprobar los arrays adecuados en cada caso
			pag = extraerPagUrlActual();

			buttonRespEscog = botonRespuesta;

			var resp = botonRespuesta.value;

			switch (pag)
			{
				case ("contarCasas.html"):
				
					if(resp == ultimoNumero){
						correcto = true;
					}
					else{
						numFallos++;
					}
					break;
				
				case ("contarVerduras.html"):
				
					if(resp == cuantasVerduras[queVerdura]){
						correcto = true;
					}
					else{
						numFallos++;
					}
					break;
				
				case ("sumar.html"):
				
					if(resp == resultadoSuma){
						correcto = true;
					}
					else{
						numFallos++;
					}
					break;
				case ("restar.html"):
				
					if(resp == resultadoResta){
						correcto = true;
					}
					else{
						numFallos++;
					}
					break;
				
			}
			
			return correcto;

		}


	/*****************************************************************************************************/


	/************************************MOSTRAR MENSAJE MODAL INTENTO************************************/

		function crearMensajeModal(mensaje, intento){
			pos=0;
			if(!intento){
				var modal = '<div class="modal"><div class="contenido"><p value="' + intento + '" style="margin: auto;">' + mensaje + '</p><div class="contenedor-cerrar-modal contenedor-mano-tutorial"><div class="mano-tutorial-modal"></div><button type="button" class="botones-modal" id="botonModal" autofocus onclick="cerrarMensModal(this.parentNode.parentNode.firstChild, this.parentNode.parentNode.parentNode);">Cerrar</button></div></div></div>';
			}
			else if(intento == true){
				var tiempoTrans = cambiarFormato(tiempoTranscurrido);
				var modal = '<div class="modal"><div class="contenido"><p value="' + intento + '">' + mensaje + '</p><div id="estadisticas"><p>Estadísticas:</p><p>Has tardado: ' + tiempoTrans + '.</p><p>Has tenido: ' + numFallos + ' fallos.</p></div><div class="contenedor-cerrar-modal contenedor-mano-tutorial"><div class="mano-tutorial-modal"></div><button type="button" class="botones-modal" id="botonModal" autofocus onclick="cerrarMensModal(this.parentNode.parentNode.firstChild, this.parentNode.parentNode.parentNode)">Cerrar</button></div></div></div>';
			}else if(intento=='ayuda'){
				var modal = '<div class="modal"><div class="contenido-modal"><p value="' + intento + '" style="margin: auto;">' + mensaje + '</p><div class="contenedor-cerrar-modal-ayuda contenedor-mano-tutorial"><div class="mano-tutorial-ayuda"></div><button type="button" class="botones-modal" id="botonModal" autofocus onclick="cerrarMensModal(this.parentNode.parentNode.firstChild, this.parentNode.parentNode.parentNode);">Cerrar</button></div></div></div>';
			}
			if(extraerPagUrlActual() == "contarCasas.html"){
				$(".mano-tutorial-respuestas-contar-casas").remove();
			}
			else{
				$(".mano-tutorial-respuestas").remove();
			}
			$('main').append(modal);
			$('.botones-modal').focus(); //por si el autofocus falla, le ponemos el foco al boton una vez aparezca el mensaje
		}

		function mostrarMensajeAyuda(){
			var pag = extraerPagUrlActual(),
				mensModal;

			switch (pag)
			{
				case ("contarCasas.html"):
				{
					mensModal = `<br>
						<b>Táctil/Ratón:</b>
						<br>
						Click en casas por orden para dibujar el camino
						<br>
						Click en respuestas para seleccionarla
						<br>
						<br>
						<b>Teclado:</b>
						<br>
						<b>Espacio:</b> comenzar ruta con teclado
						<br>
						<b>&larr;</b> Avanzar hacia izquierda
						<br>
						<b>&rarr;</b> Avanzar hacia derecha
						<br>
						<b>&larr;</b> y <b>&rarr;</b> Navegar por respuestas
						<br>
						<b>&crarr;</b> Seleccionar respuesta
						<br>
						<br> 
						<b>Voz:</b>
						<br>
						En respuestas responder verbalmente
						<br>
					`;
					break;
				}
				case ("contarVerduras.html"):
				{
					mensModal = `<br>
						<b>Táctil/Ratón:</b>
						<br>
						Click en respuestas para seleccionarla
						<br>
						<br>
						<b>Teclado:</b>
						<br>
						<b>&larr;</b> y <b>&rarr;</b> Navegar por respuestas
						<br>
						<b>&crarr;</b> Seleccionar respuesta
						<br>
						<br> 
						<b>Voz:</b>
						<br>
						En respuestas responder verbalmente
						<br>
					`;
					break;
				}
				case("sumar.html"):
				{	
					mensModal = `<br>
						<b>Táctil/Ratón:</b>
						<br>
						Arrastrar animal hasta el corral
						<br>
						Click en respuestas para seleccionarla
						<br>
						<br>
						<b>Teclado:</b>
						<br>
						Espacio: coger animal
						<br>
						<b>&larr;</b> introducir animal en el corral
						<br>
						<b>&larr;</b> y <b>&rarr;</b> Navegar por respuestas
						<br>
						<b>&crarr;</b> Seleccionar respuesta
						<br>
						<br> 
						<b>Voz:</b>
						<br>
						En respuestas responder verbalmente
						<br>
					`;
					break;
				}
				case("restar.html"):
				{
					mensModal = `<br>
						<b>Táctil/Ratón:</b>
						<br>
						Click en respuestas para seleccionarla
						<br>
						<br>
						<b>Teclado:</b>
						<br>
						<b>&larr;</b> y <b>&rarr;</b> Navegar por respuestas
						<br>
						<b>&crarr;</b> Seleccionar respuesta
						<br>
						<br> 
						<b>Voz:</b>
						<br>
						En respuestas responder verbalmente
						<br>
					`;
					break;
				}
			}
			crearMensajeModal(mensModal, 'ayuda');
		}

		function mostrarMensajeIntento(intento){

			var pag = extraerPagUrlActual();

			switch (pag)
			{
				case ("contarCasas.html"):
				{
					if(intento){
						reconocerVoz();
						var mensModal = "¡MUY BIEN! ¡El siguiente número es el " + ultimoNumero +"!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					else{
						reconocerVoz();
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					break;
				}
				case ("contarVerduras.html"):
				{
					if(intento){
						reconocerVoz();
						var mensModal = "¡MUY BIEN! ¡Hay " + cuantasVerduras[queVerdura] + " " + nombresVerduras[queVerdura] + "!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					else{
						reconocerVoz();
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					break;
				}
				case ("sumar.html"):
				{
					if(intento){
						reconocerVoz();
						var mensModal = "¡MUY BIEN! ¡" + cuantosAnimales + " + " + animalesAMeter + " = " + resultadoSuma + "!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					else{
						reconocerVoz();
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					break;
				}
				case ("restar.html"):
				{
					if(intento){
						reconocerVoz();
						var mensModal = "¡MUY BIEN! ¡" + importe + " - " + resta + " = " + resultadoResta + "!";
						var mensModalAudio = "¡MUY BIEN! ¡" + importe + " menos " + resta + " = " + resultadoResta + "!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModalAudio, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					else{
						reconocerVoz();
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female",{onend: function() {reconocerVoz();}});
					}
					break;
				}
			}
		}

	/*****************************************************************************************************/


	/******************************************CONSEGUIR URL**********************************************/

		function conseguirUrl(){
			var url = location.href;
			url = url.split('/');
			var urlAux;
			for(var i = 0; i < url.length - 1; i++){
				if(i == 0){
					urlAux = url[i];
				}
				else{
					urlAux = urlAux + "/" + url[i];
				}
			}
			url = urlAux;
			return url;
		}

	/****************************************************************************************************/


	/***************************************CERRAR MENSAJE MODAL******************************************/

			function cerrarMensModal(mensaje, mensModal){
				var intento = mensaje.getAttribute("value");
				if(intento == "true"){
					mensModal.remove();
					var url = conseguirUrl();
					location.href = url + "/index.html";
				}
				else{
					mensModal.remove();
					if(extraerPagUrlActual() == "contarCasas.html"){
						if(respuestasMostradas){
							$("#respuestas").append("<div class='mano-tutorial-respuestas-contar-casas'></div>");
						}
					}
					else{
						if(respuestasMostradas){
							$("#respuestas").append("<div class='mano-tutorial-respuestas'></div>");
						}
					}	
					if(respuestaPorVoz >= 0){
						eliminarBotonPorVoz();
					}
					if(buttonRespEscog != null){
						buttonRespEscog.remove();
					}
					colocarFocoRespuestas();
					console.log("he cerrado el modal");
				}
			}

	/*****************************************************************************************************/
	