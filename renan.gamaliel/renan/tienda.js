 var productos = ["zapatilla cafe", "zapatos tacones", "zapatos negros", "zapatos de color", "zapatos de marca", "tenes nike", "Tenis", "zapatos militar", "tacones moda"];
 var precios = [300, 1000, 3000, 3600, 110, 5400, 2100, 660, 250];
 var stock = [5, 10, 15, 20, 10, 6, 4, 1, 2];
 var precioTransporte = [6, 12, 20, "gratis"];
 var IVA = 0.18;
 var uniUser;
 window.onload = function() {
     var DIVS = document.getElementsByName("DIVS");
     for (i in productos) {
         DIVS[i].innerHTML = '</a><div class="etiquetas"><b><span id="pro' + i + '">' + productos[i] + '</span>: <span id="pre' + i + '">' + precios[i] + 'L</span></b></div><div class="stock">Hay en stock <span id="uni' + i + '">' + stock[i] + '</span> unidades,<br/>¿Cuantas quiere?: <input class="uniBien" type="number" id="uniUser' + i + '" name="uniUser" value="0" size="4" /></div>';
     }
     var fecha = new Date();
     var anio = fecha.getFullYear();

     for (var i = 1; i <= 31; i++) {
         document.getElementById("fechaNacimientoDia").innerHTML = document.getElementById("fechaNacimientoDia").innerHTML + '<option value="' + i + '">' + i + '</option>';
     }

     for (var i = anio; i >= (anio - 110); i--) {
         document.getElementById("fechaNacimientoAnio").innerHTML = document.getElementById("fechaNacimientoAnio").innerHTML + '<option value="' + i + '">' + i + '</option>';
     }
     for (var i = 1; i <= 12; i++) {
         document.getElementById("mesTarjeta").innerHTML = document.getElementById("mesTarjeta").innerHTML + '<option value="' + i + '">' + i + '</option>';
     }

     for (var i = anio; i <= (anio + 21); i++) {
         document.getElementById("anioTarjeta").innerHTML = document.getElementById("anioTarjeta").innerHTML + '<option value="' + i + '">' + i + '</option>';
     }
     document.getElementById("botonTotal").onclick = validaLasUnidades;
     document.getElementById("botonDatos").onclick = pideDatos;
     document.getElementById("botonPago").onclick = validaDatosPersonales;
     document.getElementById("botonConfirmar").onclick = validaDatosPago;
 }

 function validaLasUnidades(elEvento) {

     var todoBien = true;
     uniUser = document.getElementsByName("uniUser");


     for (i in productos) {

         if (uniUser[i].value == "" || uniUser[i].value > stock[i] || uniUser[i].value < 0) {

             todoBien = false;
             uniUser[i].className = "uniMal";

             document.getElementById("todo").className = "todoNo";
             document.getElementById("menu").className = "menuNo";
             document.getElementById("divZonaCompra").className = "divZonaCompraNo";
             document.getElementById("divTotal").className = "divsNo";
             document.getElementById("divDatos").className = "divsNo";
             document.getElementById("divPago").className = "divsNo";
             document.getElementById("botonDatos").disabled = true;
             document.getElementById("botonDatos").disabled = true;
             document.getElementById("botonDatos").disabled = true;
             return;
         } else {
             todoBien = true;
             uniUser[i].className = "uniBien";
         }
     }
     if (todoBien) {
         calculaElTotal();
     }
 }

 function calculaElTotal(elEvento) {
     document.getElementById("tablaTotal").innerHTML = '<tr><td class="pro"><b>Producto</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Precio Total</b></td></tr>';
     var carroTotal = 0;
     var numProductos = 0;
     for (i in productos) {

         var tablaTotal = document.getElementById("tablaTotal").innerHTML;
         var preTotal = 0;
         if (uniUser[i].value != 0) {
             numProductos++;
         }


         if (uniUser[i].value != 0) {
             document.getElementById("todo").className = "todoSi";
             document.getElementById("menu").className = "menuSi";
             document.getElementById("divZonaCompra").className = "divZonaCompraSi";
             document.getElementById("divTotal").className = "divsSi";
             document.getElementById("divDatos").className = "divsNo";
             document.getElementById("divPago").className = "divsNo";
             document.getElementById("botonDatos").disabled = false;
             preTotal = precios[i] * uniUser[i].value;
             carroTotal = carroTotal + preTotal;
             document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr class="proCarrito"><td>' + productos[i] + '</td><td>' + uniUser[i].value + '</td><td>' + precios[i] + '</td><td id="preTotal' + i + '" name="preTotal">' + preTotal + '</td></tr>';
         }
     }
     var precioTransporteAPagar;
     if (numProductos <= 2) {
         precioTransporteAPagar = precioTransporte[0];
     } else if (numProductos <= 3) {
         precioTransporteAPagar = precioTransporte[1];
     } else if (numProductos <= 4) {
         precioTransporteAPagar = precioTransporte[2];
     } else if (numProductos >= 5) {
         precioTransporteAPagar = precioTransporte[3];
     }
     var totalTransporte = precioTransporteAPagar;
     if (totalTransporte == "gratis") {
         var totalIVA = (carroTotal * IVA);
         var totalAPagar = carroTotal + totalIVA;
     } else {
         var totalIVA = ((carroTotal + totalTransporte) * IVA);
         var totalAPagar = carroTotal + totalTransporte + totalIVA;
     }
     totalIVA = totalIVA * 100;
     totalIVA = Math.floor(totalIVA);
     totalIVA = totalIVA / 100;
     totalAPagar = totalAPagar * 100;
     totalAPagar = Math.floor(totalAPagar);
     totalAPagar = totalAPagar / 100;
     tablaTotal = document.getElementById("tablaTotal").innerHTML;
     document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr><td> </td> <td></td><td class="preUni"><b>Transporte: </b></td><td class="preTotal"><b>' + totalTransporte + '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>IVA (' + (IVA * 100) + '%): </b></td><td class="preTotal"><b>' + totalIVA + '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>' + totalAPagar + '  LEMPIRAS EXACTOS </b></td></tr>';
 }

 function pideDatos(elEvento) {
     document.getElementById("divDatos").className = "divsSi";
     document.getElementById("divTotal").className = "divsNo";
     document.getElementById("divPago").className = "divsNo";
     document.getElementById("botonPago").disabled = false;
 }

 function validaDatosPersonales(elEvento) {

     var todoBien = true;
     var vNombre = document.getElementById("nombre").value;
     if (vNombre == null || vNombre.length == 0 || /^\s+$/.test(vNombre) || !isNaN(vNombre)) {
         todoBien = false;
         document.getElementById("nombre").className = "textMal";
     } else {
         document.getElementById("nombre").className = "textBien";
     }
     var vFechaNacimientoDia = document.getElementById("fechaNacimientoDia").selectedIndex;
     if (vFechaNacimientoDia == null || vFechaNacimientoDia == 0) {
         todoBien = false;
         document.getElementById("fechaNacimientoDia").className = "textMal";
     } else {
         document.getElementById("fechaNacimientoDia").className = "textBien";
     }
     var vFechaNacimientoMes = document.getElementById("fechaNacimientoMes").selectedIndex;
     if (vFechaNacimientoMes == null || vFechaNacimientoMes == 0) {
         todoBien = false;
         document.getElementById("fechaNacimientoMes").className = "textMal";
     } else {
         document.getElementById("fechaNacimientoMes").className = "textBien";
     }
     var vFechaNacimientoAnio = document.getElementById("fechaNacimientoAnio").selectedIndex;
     if (vFechaNacimientoAnio == null || vFechaNacimientoAnio == 0) {
         todoBien = false;
         document.getElementById("fechaNacimientoAnio").className = "textMal";
     } else {
         document.getElementById("fechaNacimientoAnio").className = "textBien";
     }
     var vMovil = document.getElementById("movil").value;
     if (!(/^\d{9}$/.test(vMovil))) {
         todoBien = false;
         document.getElementById("movil").className = "textMal";
     } else {
         document.getElementById("movil").className = "textBien";
     }
     var vEmail1 = document.getElementById("email1").value;
     var vEmail2 = document.getElementById("email2").value;
     if (!(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail1))) {
         todoBien = false;
         document.getElementById("email1").className = "textMal";
     } else {
         document.getElementById("email1").className = "textBien";
     }

     if (!(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail2))) {
         todoBien = false;
         document.getElementById("email2").className = "textMal";
     } else {
         document.getElementById("email2").className = "textBien";
     }

     if (vEmail1 != vEmail2) {
         todoBien = false;
         document.getElementById("email2").className = "textMal";
     }

     var vViaNombre = document.getElementById("viaNombre").value;
     if (vViaNombre == null || vViaNombre.length == 0 || /^\s+$/.test(vViaNombre) || !isNaN(vViaNombre)) {
         todoBien = false;
         document.getElementById("viaNombre").className = "textMal";
     } else {
         document.getElementById("viaNombre").className = "textBien";
     }

     var vViaNumero = document.getElementById("viaNumero").value;
     if (vViaNumero == "" || isNaN(vViaNumero)) {
         todoBien = false;
         document.getElementById("viaNumero").className = "textMal";
     } else {
         document.getElementById("viaNumero").className = "textBien";
     }

     var vLocalidad = document.getElementById("localidad").value;
     if (vLocalidad == null || vLocalidad.length == 0 || /^\s+$/.test(vLocalidad) || !isNaN(vLocalidad)) {
         todoBien = false;
         document.getElementById("localidad").className = "textMal";
     } else {
         document.getElementById("localidad").className = "textBien";
     }

     var vCodigoPostal = document.getElementById("codigoPostal").value;
     if (vCodigoPostal.length != 5 || vCodigoPostal == "" || isNaN(vCodigoPostal)) {
         todoBien = false;
         document.getElementById("codigoPostal").className = "textMal";
     } else {
         document.getElementById("codigoPostal").className = "textBien";
     }

     var vProvincia = document.getElementById("provincia").selectedIndex;
     if (vProvincia == null || vProvincia == 0) {
         todoBien = false;
         document.getElementById("provincia").className = "textMal";
     } else {
         document.getElementById("provincia").className = "textBien";
     }
     if (todoBien) {
         pideDatosPago();
     } else {
         document.getElementById("botonConfirmar").disabled = true;
     }
 }

 function pideDatosPago(elEvento) {
     document.getElementById("divTotal").className = "divsNo";
     document.getElementById("divDatos").className = "divsNo";
     document.getElementById("divPago").className = "divsSi";
     document.getElementById("botonConfirmar").disabled = false;
 }

 function validaDatosPago(elEvento) {

     var todoBien = true;

     var vTitular = document.getElementById("titular").value;
     if (vTitular == null || vTitular.length == 0 || /^\s+$/.test(vTitular) || !isNaN(vTitular)) {
         todoBien = false;
         document.getElementById("titular").className = "textMal";
     } else {
         document.getElementById("titular").className = "textBien";
     }

     var vTarjetas = document.getElementsByName("tarjetas");
     var seleccionado = false;
     for (var i = 0; i < vTarjetas.length; i++) {
         if (vTarjetas[i].checked) {
             seleccionado = true;
         }
     }
     if (!seleccionado) {
         todoBien = false;
         document.getElementById("alertTipoDeTarjeta").className = "alertTipoDeTarjeta";
     } else {
         document.getElementById("alertTipoDeTarjeta").className = "";
     }


     var vNumeroTarjeta = document.getElementById("numeroTarjeta").value;
     if (vNumeroTarjeta.length != 16 || vNumeroTarjeta == "" || isNaN(vNumeroTarjeta)) {
         todoBien = false;
         document.getElementById("numeroTarjeta").className = "textMal";
     } else {
         document.getElementById("numeroTarjeta").className = "textBien";
     }


     var vCvcTarjeta = document.getElementById("cvcTarjeta").value;
     if (vCvcTarjeta.length != 3 || vCvcTarjeta == "" || isNaN(vCvcTarjeta)) {
         todoBien = false;
         document.getElementById("cvcTarjeta").className = "textMal";
     } else {
         document.getElementById("cvcTarjeta").className = "textBien";
     }


     var vMesTarjeta = document.getElementById("mesTarjeta").selectedIndex;
     if (vMesTarjeta == null || vMesTarjeta == 0) {
         todoBien = false;
         document.getElementById("mesTarjeta").className = "textMal";
     } else {
         document.getElementById("mesTarjeta").className = "textBien";
     }
     var vAnioTarjeta = document.getElementById("anioTarjeta").selectedIndex;
     if (vAnioTarjeta == null || vAnioTarjeta == 0) {
         todoBien = false;
         document.getElementById("anioTarjeta").className = "textMal";
     } else {
         document.getElementById("anioTarjeta").className = "textBien";
     }


     if (todoBien) {
         validaDatosPagoYEnviaCarro();
     }
 }




 function validaDatosPagoYEnviaCarro(elEvento) {
     alert("Gracias por su compra, en 2 horas recivira su pedido\nAhora sera redirigido a la pagina de inicio.");
     window.location.reload()
 }