$(document).ready(function ()
{

	/***************************************VARIABLES GLOBALES********************************************/

		var cuantasVerduras = [];
		var queVerdura;
		var respuestasContarVerduras = [];

	/*****************************************************************************************************/


	/****************************CANCELAR REDIRECCION ENLACE CREDITOS DE IMAGEN***************************/

		$('.eliminar-redireccion').click(function (event){
			event.preventDefault();
		});

	/*****************************************************************************************************/


	/************************************GENERAR NUMEROS ALETORIOS****************************************/

		function obtenerNumeroAleatorio(rangoMin, rangoMax) {
			return Math.floor(Math.random() * (rangoMax - rangoMin)) + rangoMin;
		}

	/*****************************************************************************************************/


	/**********************************SITUAR CASAS - JUEGO CONTAR CASAS**********************************/

		function crearEtiquetasImagen(num){
			var casas = [];
			var img = "<figure><a href=https://es.pngtree.com class='eliminar-redireccion'><img src='./imagenes/contar-casas/casa.png'></a></figure>";
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


	/********************************SITUAR VERDURAS - JUEGO CONTAR VERDURAS******************************/

		function crearEtiqImgFrutas(num, tipo){
			
			var verduras = [];

			switch (tipo)
			{
				case (0):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/lechuga.png'></figure>";
					cuantasVerduras.push(num);
					break;
				}
				case (1):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/maiz.png'></figure>";
					cuantasVerduras.push(num);
					break;
				}
				case (2):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/patata.png'></figure>";
					cuantasVerduras.push(num);
					break;
				}
				case (3):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/tomate.png'></figure>";
					cuantasVerduras.push(num);
					break;
				}
				case (4):
				{
					var img = "<figure><img src='./imagenes/contar-verduras/zanahoria.png'></figure>";
					cuantasVerduras.push(num);
					break;
				}
			}

			for(var i = 0; i < num; i++)
			{
				verduras.push(img);
			}

			return verduras;
		}

		function colocarFrutas(verduras){
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
					preguntaVerdura = "¿Cuántos Maices hay?";
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

		function mostrarRespuestas(){
			$.each(respuestasContarVerduras, function(index)
			{
				$('#respuestas').append('<p>' + respuestasContarVerduras[index] + '</p>');
			});
		}

		function cargarRespuestas(){

			var valoresAleatorios = [];

			var yaIncluida = false;

			for (var i = 0; i < 10; i++){
				valoresAleatorios.push(i);
			}

			for (var j = 0; j < 4; j++){
				var indice = Math.floor(Math.random()*valoresAleatorios.length);
				var numeroAleat = valoresAleatorios[indice];
				valoresAleatorios.splice(indice, 1);
				respuestasContarVerduras.push(numeroAleat);
			}

			for (var k = 0; k < respuestasContarVerduras.length; k++){
				if(respuestasContarVerduras[k] == cuantasVerduras[queVerdura]){
					yaIncluida = true;
					break;
				}
			}

			if(!yaIncluida){
				var indexResp = Math.floor(Math.random()*respuestasContarVerduras.length);
				respuestasContarVerduras[indexResp] = cuantasVerduras[queVerdura];
			}

			//desordeno el array
			respuestasContarVerduras = respuestasContarVerduras.sort(function() {return Math.random() - 0.5});

			//muestro en la pagina las respuestas
			mostrarRespuestas();

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

			colocarFrutas(verduras);

			imprimirPorConsolaNumVerduras();

			queVerdura = obtenerNumeroAleatorio(0, 5);

			preguntarCuantasVerdurasXHay(queVerdura);

			cargarRespuestas();

		});

	/*****************************************************************************************************/

});