
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

		/******************************/

		/********JUEGO CASAS********/

			var ultimoNumero;
			var arrayPosiciones;
			var arrayMovs;

		/******************************/

		/********JUEGO MONEDAS********/

			var importe, resta, resultadoResta;

		/******************************/

		/**********GENERICAS***********/

			var respuestasGenericas = [];
			var respuestaEscogida;
			var buttonRespEscog;
			var numFallos = 0;
			var tiempoInicio;
			var tiempoFin;
			var tiempoTranscurrido;
			
		/******************************/

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


	/******************************************CARGAR TUTORIAL********************************************/

		/*function obtenerPosicionesIniciales(elem){
			var posElem = elem.offset();
			return posElem;
		}

		function colocarMano(){
			var elementoReferencia = $("body>main>nav>ul>li:first-of-type");
			var numHijos = elementoReferencia.parent().children().length - 1;
			console.log(elementoReferencia);
			posRef = obtenerPosicionesIniciales(elementoReferencia);
			var mano = $(".mano-tutorial");
			posMano = obtenerPosicionesIniciales(mano);
			console.log(posicionAnchura);
			mano.css({
				"top": 0,
				"left": posicionAnchura
			});
		}

		window.setTimeout(colocarMano(), 1);*/

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

		function mostrarRespuestas(){
			$.each(respuestasGenericas, function(index)
			{
				$('#respuestas').append('<button value="' + respuestasGenericas[index] + '" onclick="mostrarMensajeIntento(comprobarRespuesta(this));">' + respuestasGenericas[index] + '</button>');
			});
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
					arrayCasas[currentIndex].src = "./imagenes/contar-casas/establoNaN.png";
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

			var texto_final = "Vamos a contar. Nos encontramos en la casa número 0 y debemos llegar al establo, pero antes tenemos que pasar por todas las casas. Sigue el orden de las casas hasta llegar al establo";			

			responsiveVoice.speak(texto_final, "Spanish Female");

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
						console.log("CORRECTO");
						ctx.beginPath();
						ctx.moveTo(lastClick[0], lastClick[1]);
						clicks++;
					}else{
						console.log("incorrecto");

						var texto_final = "Ese no es el número correcto";
					
						responsiveVoice.speak(texto_final, "Spanish Female");
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
						/*if(clicks<numCasas-1){
							clicks++;
						}*/
					}else{
						console.log("incorrecto");

						var texto_final = "Ese no es el número correcto";
					
						responsiveVoice.speak(texto_final, "Spanish Female");
					}

					if (clicks == numCasas) {
						$('#contenedorResultadosDerecha').prepend("<p class='preguntas'><span>¿Qué número va en la siguiente figura?</span></p><img src='./imagenes/contar-casas/establoNaN.png' alt='establo'>");
						cargarRespuestas(rangoMax);
						$(".mano-tutorial-click").remove();
						$(".contenedor-mano-tutorial").append("<div class='mano-tutorial-respuestas-contar-casas'></div>");
						var texto_final1 = "¿Qué número va en la siguiente figura?";			

						responsiveVoice.speak(texto_final1, "Spanish Female");
					}
				}

			}

		}

			function teclaPulsada(evt)
			{
				console.log(evt);
				if(evt.keyCode == 13){
					console.log("hola");
				}
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

			responsiveVoice.speak(texto_final, "Spanish Female");
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
					preguntaVerdura = "<span>¿Cuántas</span><img src='./imagenes/contar-verduras/patata.png alt='patata''><span>hay?</span>";
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

			responsiveVoice.speak(texto_final, "Spanish Female");

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
						img = "<figure class='imagen-draggable'>";
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
						img = "<figure class='imagen-draggable'>";
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
						img = "<figure class='imagen-draggable'>";
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
						img = "<figure class='imagen-draggable'>";
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
						img = "<figure class='imagen-draggable'>";
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

			var texto_final = "Vamos a sumar. Se hace de noche y tenemos que meter a algunos animales en el corral para que puedan dormir. En el corral hay " + cuantosAnimales + " " + nombreAnimal + ". Mete " + animalesAMeter + ".";

			responsiveVoice.speak(texto_final, "Spanish Female");

		}

		function prepararContinuacionJuegoAnimales(){

			$(".imagen-draggable").draggable("destroy"); //elimino todos los elementos drag de las imagenes

			$("#decirMeterAnimales").remove();

			$(".mano-tutorial-drag").remove();

			$("#respuestas").append("<div class='mano-tutorial-respuestas'></div>");

			var rango = 20;

			preguntarcuantosAnimalesXHay(queAnimal);

			cargarRespuestas(rango);

			var texto_final = "¿Cuánt" + nombreAnimal[nombreAnimal.length - 2] + "s" + " " + nombreAnimal + " " + "hay ahora en total?";	

			responsiveVoice.speak(texto_final, "Spanish Female");

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
					animalesMetidos++;
					actualizarAnimalesMetidos();
					contadorAnimalesAMeter--;
					if(contadorAnimalesAMeter == 0){
						$( ".imagen-droppable" ).droppable('destroy');
						$("#animalesDentro>img").attr("src", './imagenes/sumar/corral-propio-cuadrado-r.png');
						prepararContinuacionJuegoAnimales();
					}
					else{
						var elem = ui.draggable[0];
						$(elem).attr('class','imagen-draggable').draggable('disable'); //desactivo el elemento para que no cambie la cuenta de los que hay que poner de manera erronea
					}
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
			if(!intento){
				var modal = '<div class="modal"><div class="contenido"><p value="' + intento + '" style="margin: auto;">' + mensaje + '</p><div class="contenedor-cerrar-modal contenedor-mano-tutorial"><div class="mano-tutorial-modal"></div><button type="button" class="botones-modal" id="botonModal" onclick="cerrarMensModal(this.parentNode.parentNode.firstChild, this.parentNode.parentNode.parentNode)">Cerrar</button></div></div></div>';
			}
			else{
				var tiempoTrans = cambiarFormato(tiempoTranscurrido);
				var modal = '<div class="modal"><div class="contenido"><p value="' + intento + '">' + mensaje + '</p><div id="estadisticas"><p>Estadísticas:</p><p>Has tardado: ' + tiempoTrans + '.</p><p>Has tenido: ' + numFallos + ' fallos.</p></div><div class="contenedor-cerrar-modal contenedor-mano-tutorial"><div class="mano-tutorial-modal"></div><button type="button" class="botones-modal" id="botonModal" onclick="cerrarMensModal(this.parentNode.parentNode.firstChild, this.parentNode.parentNode.parentNode)">Cerrar</button></div></div></div>';
			}
			if(extraerPagUrlActual() == "contarCasas.html"){
				$(".mano-tutorial-respuestas-contar-casas").remove();
			}
			else{
				$(".mano-tutorial-respuestas").remove();
			}
			$('main').append(modal);
		}

		function mostrarMensajeIntento(intento){

			var pag = extraerPagUrlActual();

			switch (pag)
			{
				case ("contarCasas.html"):
				{
					if(intento){
						var mensModal = "¡MUY BIEN! ¡El siguiente número es el " + ultimoNumero +"!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female");
					}
					else{
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female");
					}
					break;
				}
				case ("contarVerduras.html"):
				{
					if(intento){
						var mensModal = "¡MUY BIEN! ¡Hay " + cuantasVerduras[queVerdura] + " " + nombresVerduras[queVerdura] + "!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female");
					}
					else{
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female");
					}
					break;
				}
				case ("sumar.html"):
				{
					if(intento){
						var mensModal = "¡MUY BIEN! ¡" + cuantosAnimales + " + " + animalesAMeter + " = " + resultadoSuma + "!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female");
					}
					else{
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female");
					}
					break;
				}
				case ("restar.html"):
				{
					if(intento){
						var mensModal = "¡MUY BIEN! ¡" + importe + " - " + resta + " = " + resultadoResta + "!";
						var mensModalAudio = "¡MUY BIEN! ¡" + importe + " menos " + resta + " = " + resultadoResta + "!";
						console.log("NÚMERO DE FALLOS: " + numFallos);
						pararTemporizador();
						var tiempoTrans = cambiarFormato(tiempoTranscurrido);
						console.log("TIEMPO EN COMPLETAR CON ÉXITO EL JUEGO: " + tiempoTrans);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModalAudio, "Spanish Female");
					}
					else{
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
						responsiveVoice.speak(mensModal, "Spanish Female");
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
						$("#respuestas").append("<div class='mano-tutorial-respuestas-contar-casas'></div>");
					}
					else{
						$("#respuestas").append("<div class='mano-tutorial-respuestas'></div>");
					}		
					buttonRespEscog.remove();
				}
			}

	/*****************************************************************************************************/