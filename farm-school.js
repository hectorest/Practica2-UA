
	/***************************************VARIABLES GLOBALES********************************************/

		var nombresVerduras = [];
		var cuantasVerduras = [];
		var queVerdura;
		var respuestasGenericas = [];
		var respuestaEscogida;
		var pRespEscog;
		var fallosContarVerduras = 0;

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

		$('#contarCasas').ready(function(){

			//con estos rangos es como he conseguido que se vea mejor
			var rangoMin = 3;
			var rangoMax = 12;

			var granjas = crearEtiquetasImagen(obtenerNumeroAleatorio(rangoMin, rangoMax));

			colocarCasas(granjas);

		});

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

		function generarRespuestas(){
			var valoresAleatorios = [];

			for (var i = 0; i < 10; i++){
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
			}
		}

		function cargarRespuestas(){

			//genero las respuestas
			generarRespuestas();

			//muestro en la pagina las respuestas
			mostrarRespuestas();

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
					preguntaVerdura = "¿Cuántas Lechugas hay?";
					break;
				}
				case (1):
				{
					preguntaVerdura = "¿Cuántos Maíces hay?";
					break;
				}
				case (2):
				{
					preguntaVerdura = "¿Cuántas Patatas hay?";
					break;
				}
				case (3):
				{
					preguntaVerdura = "¿Cuántos Tomates hay?";
					break;
				}
				case (4):
				{
					preguntaVerdura = "¿Cuántas Zanahorias hay?";
					break;
				}
			}

			$('#contenedorResultados').prepend("<p class='preguntas'>" + preguntaVerdura + "</p>");
		}

		$('#contarVerduras').ready(function(){

			//con estos rangos es como he conseguido que se vea mejor
			var rangoMin = 2;
			var rangoMax = 5;

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

			cargarRespuestas();

		});

	/*****************************************************************************************************/


	/*********************************EVENTOS DRAGGABLE Y DROPPABLE***************************************/

		$( function() {
			$( ".draggable" ).draggable({
				cursor: "pointer"
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
		} );

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
						fallosContarVerduras++;
					}
					break;
				}
			}
			
			return correcto;
		}


	/*****************************************************************************************************/


	/************************************MOSTRAR MENSAJE MODAL INTENTO************************************/

		function crearMensajeModal(mensaje, intento){
			var modal = '<div class="modal"><div class="contenido"><p value="' + intento + '">' + mensaje + '</p><button type="button" class="botones" id="botonModal" onclick="cerrarMensModal(this.parentNode.firstChild, this.parentNode.parentNode);">Cerrar</button></div></div>';
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
						console.log("NÚMERO DE FALLOS: " + fallosContarVerduras);
						crearMensajeModal(mensModal, intento);
					}
					else{
						var mensModal = "¡Sigue intentándolo!";
						console.log(mensModal);
						crearMensajeModal(mensModal, intento);

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
					pRespEscog.remove();
				}
			}

	/*****************************************************************************************************/

