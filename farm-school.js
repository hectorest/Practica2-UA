
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
			var contadorAnimalesAMeter;
			var resultadoSuma;
			var queAnimal;

		/******************************/

		/**********GENERICAS***********/

			var respuestasGenericas = [];
			var respuestaEscogida;
			var pRespEscog;
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
				$('#respuestas').append('<p class="draggable" value="' + respuestasGenericas[index] + '">' + respuestasGenericas[index] + '</p>');
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
			}
		}

		function cargarColocarRespuesta(){
			var colocarRespuesta = "<div id='colocarRespuesta' class='droppable'><p class='preguntas'>Coloca aquí la respuesta</p></div>";
			$("#ponerRespuestas").append(colocarRespuesta);
		}

		function cargarRespuestas(rangoRespuestas){

			//genero las respuestas
			generarRespuestas(rangoRespuestas);

			//muestro en la pagina las respuestas
			mostrarRespuestas();

		}

	/*****************************************************************************************************/


	/**********************************SITUAR CASAS - JUEGO CONTAR CASAS**********************************/

		function crearEtiquetasImagen(num){
			var casas = [];
			var img = "<figure><a href='https://es.pngtree.com' class='eliminar-redireccion' onclick='eliminarRedireccion(event);'><img src='./imagenes/contar-casas/casa.png'></a></figure>";
			for(var i = 0; i < num; i++)
			{
				casas.push(img);
			}
			return casas;
		}

		function colocarCasas(casas){
			$.each(casas, function(index)
			{
				$('#contarCasas>div').append(casas[index]);
			});
		}

		function prepararJuegoCasas(){

			//con estos rangos es como he conseguido que se vea mejor
			var rangoMin = 3;
			var rangoMax = 12;

			var granjas = crearEtiquetasImagen(obtenerNumeroAleatorio(rangoMin, rangoMax));

			colocarCasas(granjas);

		}

	/*****************************************************************************************************/


	/********************************SITUAR VERDURAS - JUEGO CONTAR VERDURAS******************************/

		function crearEtiqImgFrutas(num, tipo){
			
			var verduras = [];

			switch (tipo)
			{
				case (0):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/lechuga.png'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("lechugas");
					break;
				}
				case (1):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/maiz.png'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("maíces");
					break;
				}
				case (2):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/patata.png'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("patatas");
					break;
				}
				case (3):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/tomate.png'></figure>";
					cuantasVerduras.push(num);
					nombresVerduras.push("tomates");
					break;
				}
				case (4):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/zanahoria.png'></figure>";
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
					preguntaVerdura = "<span>¿Cuántas</span><img src='./imagenes/contar-verduras/lechuga.png'><span>hay?</span>";
					break;
				}
				case (1):
				{
					preguntaVerdura = "<span>¿Cuántos</span><img src='./imagenes/contar-verduras/maiz.png'><span>hay?</span>";
					break;
				}
				case (2):
				{
					preguntaVerdura = "<span>¿Cuántas</span><img src='./imagenes/contar-verduras/patata.png'><span>hay?</span>";
					break;
				}
				case (3):
				{
					preguntaVerdura = "<span>¿Cuántos</span><img src='./imagenes/contar-verduras/tomate.png'><span>hay?</span>";
					break;
				}
				case (4):
				{
					preguntaVerdura = "<span>¿Cuántas</span><img src='./imagenes/contar-verduras/zanahoria.png'><span>hay?</span>";
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
						img = "<figure>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/caballo.png'></figure>";
					nombreAnimal = "caballos";
					break;
				}
				case (1):
				{
					var img;
					if(dentroOFuera){
						img = "<figure>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/cerdo.png'></figure>";
					nombreAnimal = "cerdos";
					break;
				}
				case (2):
				{
					var img;
					if(dentroOFuera){
						img = "<figure>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/gallina.png'></figure>";
					nombreAnimal = "gallinas";
					break;
				}
				case (3):
				{
					var img;
					if(dentroOFuera){
						img = "<figure>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/oveja.png'></figure>";
					nombreAnimal = "ovejas";
					break;
				}
				case (4):
				{
					var img;
					if(dentroOFuera){
						img = "<figure>";
						cuantosAnimales = num;
					}
					else{
						img = "<figure class='imagen-draggable'>";
						cuantosAnimalesFuera = num;
					}
					img = img + "<img src='./imagenes/sumar/vaca.png'></figure>";
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
					preguntaAnimal = "<span>¿Cuántos</span><img src='./imagenes/sumar/caballo.png'><span>hay ahora en total?</span>";
					break;
				}
				case (1):
				{
					preguntaAnimal = "<span>¿Cuántos</span><img src='./imagenes/sumar/cerdo.png'><span>hay ahora en total?</span>";
					break;
				}
				case (2):
				{
					preguntaAnimal = "<span>¿Cuántas</span><img src='./imagenes/sumar/gallina.png'><span>hay ahora en total?</span>";
					break;
				}
				case (3):
				{
					preguntaAnimal = "<span>¿Cuántas</span><img src='./imagenes/sumar/oveja.png'><span>hay ahora en total?</span>";
					break;
				}
				case (4):
				{
					preguntaAnimal = "<span>¿Cuántas</span><img src='./imagenes/sumar/vaca.png'><span>hay ahora en total?</span>";
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
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/caballo.png'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/caballo.png'>";
					break;
				}
				case (1):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/cerdo.png'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/cerdo.png'>";
					break;
				}
				case (2):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/gallina.png'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/gallina.png'>";
					break;
				}
				case (3):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/oveja.png'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/oveja.png'>";
					break;
				}
				case (4):
				{
					var animalesQueSeTienen = "<span>En el corral hay: " + cuantosAnimales + "</span>" + "<img src='./imagenes/sumar/vaca.png'>" + "<span>.</span>";
					meterAnimales = meterAnimales + "<img src='./imagenes/sumar/vaca.png'>";
					break;
				}
			}

			$('#contenedorResultados').prepend("<p class='preguntas' id='decirMeterAnimales'>" + animalesQueSeTienen + meterAnimales + "</p>");
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

			activarDragAndDropImagenes();

			iniciarTemporizador();

		}

		function prepararContinuacionJuegoAnimales(){

			$(".imagen-draggable").draggable("destroy"); //elimino todos los elementos drag de las imagenes

			$("#decirMeterAnimales").remove();

			var rango = 20;

			preguntarcuantosAnimalesXHay(queAnimal);

			cargarRespuestas(rango);

			cargarColocarRespuesta();

			activarDragAndDrop();
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
			}

		});

	/*****************************************************************************************************/


	/*********************************EVENTOS DRAGGABLE Y DROPPABLE***************************************/

		function activarDragAndDrop(){
			$( ".draggable" ).draggable({
				cursor: "pointer",
				containment: $('#ponerRespuestas')
			});
			$( ".droppable" ).droppable({
				classes:{
        			"ui-droppable-hover": "drop-hover",
				},
				drop: function( event, ui ) {
					pRespEscog = ui.draggable;
					respuestaEscogida = ui.draggable.attr("value");
					var acierto = comprobarRespuesta(respuestaEscogida);
					mostrarMensajeIntento(acierto);
					$( this )
						.css("background-color", "#ffffff")
						.css("color", "#000000")
				},
				out: function( event, ui ) { 
			      $( this )
					.css("background-color", "#AB7C4E")
					.css("color", "#ffffff")
			   	}
			});
		}

		function activarDragAndDropImagenes(){
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

		function comprobarRespuesta(resp){

			var correcto = false;

			//extraemos la pagina web de donde se esta preguntando para comprobar los arrays adecuados en cada caso
			pag = extraerPagUrlActual();

			switch (pag)
			{
				case ("contarCasas.html"):
				{
					break;
				}
				case ("contarVerduras.html"):
				{
					if(resp == cuantasVerduras[queVerdura]){
						correcto = true;
					}
					else{
						numFallos++;
					}
					break;
				}
				case ("sumar.html"):
				{
					if(resp == resultadoSuma){
						correcto = true;
					}
					else{
						numFallos++;
					}
				}
			}
			
			return correcto;
		}


	/*****************************************************************************************************/


	/************************************MOSTRAR MENSAJE MODAL INTENTO************************************/

		function crearMensajeModal(mensaje, intento){
			var modal = '<div class="modal"><div class="contenido"><p value="' + intento + '">' + mensaje + '</p><button type="button" class="botones botones-modal" id="botonModal" onclick="cerrarMensModal(this.parentNode.firstChild, this.parentNode.parentNode);">Cerrar</button></div></div>';
			$('main').append(modal);
		}

		function mostrarMensajeIntento(intento){

			var pag = extraerPagUrlActual();

			switch (pag)
			{
				case ("contarCasas.html"):
				{
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
					}
					else{
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);

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
					}
					else{
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);
					}
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
					pRespEscog.remove();
				}
			}

	/*****************************************************************************************************/

