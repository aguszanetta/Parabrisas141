$(document).ready(function() {
var opcion=0;
/*----------------------------Carga de Tablas----------------------------*/
//______________________La Caja______________________//
   dtLaCaja = $('#tablaLP-laCaja').DataTable( {
	    "ajax":{            
	        "url": "../php/readListaPrecios.php", 
	        "method": 'POST', 
	        "data":{opcion:1},
	        "dataSrc":""
	    },
         "columns":[
            {"data": "codigo", "visible": false},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            {"data": "descripcion", "visible": false},
            {"data": "cristal", "sortable": false},
            {"data": "posicion"},
            {"data": "lado"},
            {"data": "color", "visible": false},
            {"data": "preciosiva"},
            {"data": "instalacionsiva"},
            {"data": "totalsiva"},
            {"data": "totalciva"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleLPLaCaja'><i class='material-icons'>info</i></button></div></div>", "sortable": false}
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
//______________________Glasscom______________________//
    dtGlasscom = $('#tablaLP-glasscom').DataTable( {
	    "ajax":{            
	        "url": "../php/readListaPrecios.php", 
	        "method": 'POST', 
	        "data":{opcion:2},
	        "dataSrc":""
	    },
         "columns":[
            //{"data": "codigo", "visible": false},
            {"data": "codigo"},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            //{"data": "descripcion", "visible": false},
            {"data": "descripcion"},
            {"data": "cristal", "sortable": false},
            {"data": "posicion"},
            {"data": "lado"},
            //{"data": "color", "visible": false},
            {"data": "color"},
            {"data": "preciosiva", "visible": false},
            {"data": "instalacionsiva", "visible": false},
            {"data": "totalsiva", "visible": false},
            {"data": "descuentosiva", "visible": false},
            {"data": "precioglasscom", "visible": false},
            {"data": "iva", "visible": false},
            {"data": "finalciva", "visible": false},
          //{"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleLPGlasscom'><i class='material-icons'>info</i></button><button class='btn btn-success btn-sm btnPrecioLPGlasscom'><i class='material-icons'>attach_money</i></button></div></div>", "sortable": false}
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-success btn-sm btnPrecioLPGlasscom'><i class='material-icons'>attach_money</i></button></div></div>", "sortable": false}
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
//______________________Fed Pat______________________//
    dtFedPat = $('#tablaLP-fedPat').DataTable( {
	    "ajax":{            
	        "url": "../php/readListaPrecios.php", 
	        "method": 'POST', 
	        "data":{opcion:3},
	        "dataSrc":""
	    },
         "columns":[
            {"data": "codigo", "visible": false},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            {"data": "descripcion", "visible": false},
            {"data": "cristal", "sortable": false},
            {"data": "posicion"},
            {"data": "lado"},
            {"data": "color", "visible": false},
            {"data": "preciosiva"},
            {"data": "instalacionsiva"},
            {"data": "totalsiva"},
            {"data": "totalciva"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleLPFedPat'><i class='material-icons'>info</i></button></div></div>", "sortable": false}

        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
//______________________Comun______________________//
    dtComun = $('#tablaLP-comun').DataTable( {
	    "ajax":{            
	        "url": "../php/readListaPrecios.php", 
	        "method": 'POST', 
	        "data":{opcion:4},
	        "dataSrc":""
	    },
         "columns":[
            {"data": "codigo", "visible": false},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            {"data": "descripcion", "visible": false},
            {"data": "cristal", "sortable": false},
            {"data": "posicion"},
            {"data": "lado"},
            {"data": "color", "visible": false},
            {"data": "preciosiva"},
            {"data": "instalacionsiva"},
            {"data": "totalsiva"},
            {"data": "totalciva"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleLPComun'><i class='material-icons'>info</i></button></div></div>", "sortable": false}
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        } 
    });
//______________________ALLIANZ-SURA-NACION-MAPFRE______________________//
    dtASNM = $('#tablaLP-allianzSuraNacionMapfre').DataTable( {
	    "ajax":{            
	        "url": "../php/readListaPrecios.php", 
	        "method": 'POST', 
	        "data":{opcion: 1},
	        "dataSrc":""
	    },
         "columns":[
            {"data": "codigo", "visible": false},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            {"data": "descripcion", "visible": false},
            {"data": "tipo", "sortable": false},
            {"data": "posicion"},
            {"data": "lado"},
            {"data": "color", "visible": false},
            {"data": "precioSinIva"},
            {"data": "instalacionSinIva"},
            {"data": "totalSinIva"},
            {"data": "totalConIva"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleLPASNM'><i class='material-icons'>info</i></button></div></div>", "sortable": false}
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
//______________________LaSegunda-Sancor______________________//
    dtLaSegundaSancor = $('#tablaLP-laSegundaSancor').DataTable( {
	    "ajax":{            
	        "url": "../php/readListaPrecios.php", 
	        "method": 'POST', 
	        "data":{opcion:6},
	        "dataSrc":""
	    },
         "columns":[
            {"data": "codigo", "visible": false},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            {"data": "descripcion", "visible": false},
            {"data": "cristal", "sortable": false},
            {"data": "posicion"},
            {"data": "lado"},
            {"data": "color", "visible": false},
            {"data": "preciosiva"},
            {"data": "instalacionsiva"},
            {"data": "totalsiva"},
            {"data": "totalciva"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleLPLaSegundaSancor'><i class='material-icons'>info</i></button></div></div>", "sortable": false}
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }   
    });
//______________________San Cristobal______________________//
    dtSanCristobal = $('#tablaLP-sanCristobal').DataTable( {
	    "ajax":{            
	        "url": "../php/readListaPrecios.php", 
	        "method": 'POST', 
	        "data":{opcion:7},
	        "dataSrc":""
	    },
         "columns":[
            {"data": "codigo", "visible": false},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            {"data": "descripcion", "visible": false},
            {"data": "cristal", "sortable": false},
            {"data": "posicion"},
            {"data": "lado"},
            {"data": "color", "visible": false},
            {"data": "preciosiva"},
            {"data": "instalacionsiva"},
            {"data": "totalsiva"},
            {"data": "totalciva"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleLPSanCristobal'><i class='material-icons'>info</i></button></div></div>", "sortable": false}
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }   
    });
//______________________Particulares______________________//
    dtParticulares = $('#tablaLP-particulares').DataTable( {
        "ajax":{            
            "url": "../php/readListaPrecios.php", 
            "method": 'POST', 
            "data":{opcion:8},
            "dataSrc":""
        },
         "columns":[
            {"data": "codigo"},
            {"data": "descripcion"},
            {"data": "preciolista"},
            {"data": "preciosiva"},
            {"data": "ultimoprecio"}
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }     
    });

/*----------------------------Modales Detalle Para Lista de Precios----------------------------*/   
$(document).on("click", ".btnDetalleLPLaCaja", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-laCaja').DataTable().row(fila).data();
    codigo = data['codigo'];
    descripcion = data['descripcion'];
    color = data['color'];
    $("#info00LPLaCaja").html(codigo);
    $("#info01LPLaCaja").html(descripcion);
    $("#info02LPLaCaja").html(color);          
    $("#headerDetalle").css("background-color", "#17a2b8");
    $("#headerDetalle").css("color", "white" );
    $("#titleDetalle").text("Detalle");
    $('#modalDetalle').modal('show');
});
$(document).on("click", ".btnDetalleLPGlasscom", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-glasscom').DataTable().row(fila).data();
    codigo = data['codigo'];
    descripcion = data['descripcion'];
    color = data['color'];
    $("#info00LPGlasscom").html(codigo);
    $("#info01LPGlasscom").html(descripcion);
    $("#info02LPGlasscom").html(color);          
    $("#headerDetalle").css("background-color", "#17a2b8");
    $("#headerDetalle").css("color", "white" );
    $("#titleDetalle").text("Detalle");
    $('#modalDetalle').modal('show');
});
$(document).on("click", ".btnPrecioLPGlasscom", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-glasscom').DataTable().row(fila).data();
    preciosiva = data['preciosiva'];
    instalacionsiva = data['instalacionsiva'];
    totalsiva = data['totalsiva'];
    descuentosiva = data['descuentosiva'];
    precioglasscom = data['precioglasscom'];
    iva = data['iva'];
    finalciva = data['finalciva'];
    $("#info03LPGlasscom").html(preciosiva);
    $("#info04LPGlasscom").html(instalacionsiva);
    $("#info05LPGlasscom").html(totalsiva);
    $("#info06LPGlasscom").html(descuentosiva);
    $("#info07LPGlasscom").html(precioglasscom);
    $("#info08LPGlasscom").html(iva);
    $("#info09LPGlasscom").html(finalciva);
    $("#headerPrecio").attr('style', 'background-color: #169b6b !important');
    $("#headerPrecio").css("color", "white" );
    $("#titlePrecio").text("Precios");
    $('#modalPrecio').modal('show');
});
$(document).on("click", ".btnDetalleLPFedPat", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-fedPat').DataTable().row(fila).data();
    codigo = data['codigo'];
    descripcion = data['descripcion'];
    color = data['color'];
    $("#info00LPFedPat").html(codigo);
    $("#info01LPFedPat").html(descripcion);
    $("#info02LPFedPat").html(color);          
    $("#headerDetalle").css("background-color", "#17a2b8");
    $("#headerDetalle").css("color", "white" );
    $("#titleDetalle").text("Detalle");
    $('#modalDetalle').modal('show');
});
$(document).on("click", ".btnDetalleLPComun", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-comun').DataTable().row(fila).data();
    codigo = data['codigo'];
    descripcion = data['descripcion'];
    color = data['color'];
    $("#info00LPComun").html(codigo);
    $("#info01LPComun").html(descripcion);
    $("#info02LPComun").html(color);          
    $("#headerDetalle").css("background-color", "#17a2b8");
    $("#headerDetalle").css("color", "white" );
    $("#titleDetalle").text("Detalle");
    $('#modalDetalle').modal('show');
});
$(document).on("click", ".btnDetalleLPASNM", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-allianzSuraNacionMapfre').DataTable().row(fila).data();
    codigo = data['codigo'];
    descripcion = data['descripcion'];
    color = data['color'];
    $("#info00LPASNM").html(codigo);
    $("#info01LPASNM").html(descripcion);
    $("#info02LPASNM").html(color);          
    $("#headerDetalle").css("background-color", "#17a2b8");
    $("#headerDetalle").css("color", "white" );
    $("#titleDetalle").text("Detalle");
    $('#modalDetalle').modal('show');
});
$(document).on("click", ".btnDetalleLPLaSegundaSancor", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-laSegundaSancor').DataTable().row(fila).data();
    codigo = data['codigo'];
    descripcion = data['descripcion'];
    color = data['color'];
    $("#info00LPLaSegundaSancor").html(codigo);
    $("#info01LPLaSegundaSancor").html(descripcion);
    $("#info02LPLaSegundaSancor").html(color);          
    $("#headerDetalle").css("background-color", "#17a2b8");
    $("#headerDetalle").css("color", "white" );
    $("#titleDetalle").text("Detalle");
    $('#modalDetalle').modal('show');
});
$(document).on("click", ".btnDetalleLPSanCristobal", function(){
    fila = $(this).closest("tr");
    data = $('#tablaLP-sanCristobal').DataTable().row(fila).data();
    codigo = data['codigo'];
    descripcion = data['descripcion'];
    color = data['color'];
    $("#info00LPSanCristobal").html(codigo);
    $("#info01LPSanCristobal").html(descripcion);
    $("#info02LPSanCristobal").html(color);          
    $("#headerDetalle").css("background-color", "#17a2b8");
    $("#headerDetalle").css("color", "white" );
    $("#titleDetalle").text("Detalle");
    $('#modalDetalle').modal('show');
});
/*----------------------------Carga de Desplegables----------------------------*/
//___________La Caja Marca___________//
$.ajax({
    type: "POST",
    url: 'readListaPrecios.php',
    datatype:"json",    
    data:  {opcion:9}, 
    success: function(data) {
        var i = 0;
        var datos = JSON.parse(data);
        $("#listaMarcaLaCaja").html("<option value=>Marca</option>");
        while (i < datos.length){
            $("#listaMarcaLaCaja").append("<option value="+i+">"+datos[i].marca+"</option>");
            i=i+1;
        };
    }
});
//___________Glasscom Marca___________//
$.ajax({
    type: "POST",
    url: 'readListaPrecios.php',
    datatype:"json",    
    data:  {opcion: 12}, 
    success: function(data) {
        var i = 0;
        var datos = JSON.parse(data);
        $("#listaMarcaGlasscom").html("<option value=>Marca</option>");
        while (i < datos.length){
            $("#listaMarcaGlasscom").append("<option value="+i+">"+datos[i].marca+"</option>");
            i=i+1;
        };
    }
});
//___________Fed Pat Marca___________//
$.ajax({
    type: "POST",
    url: 'readListaPrecios.php',
    datatype:"json",    
    data:  {opcion: 15}, 
    success: function(data) {
        var i = 0;
        var datos = JSON.parse(data);
        $("#listaMarcaFedPat").html("<option value=>Marca</option>");
        while (i < datos.length){
            $("#listaMarcaFedPat").append("<option value="+i+">"+datos[i].marca+"</option>");
            i=i+1;
        };
    }
});
//___________Comun Marca___________//
$.ajax({
    type: "POST",
    url: 'readListaPrecios.php',
    datatype:"json",    
    data:  {opcion: 18}, 
    success: function(data) {
        var i = 0;
        var datos = JSON.parse(data);
        $("#listaMarcaComun").html("<option value=>Marca</option>");
        while (i < datos.length){
            $("#listaMarcaComun").append("<option value="+i+">"+datos[i].marca+"</option>");
            i=i+1;
        };
    }
});
//___________ALLIANZ-SURA-NACION-MAPFRE Marca___________//
$.ajax({
    type: "POST",
    url: 'readListaPrecios.php',
    datatype:"json",    
    data:  {opcion: 21}, 
    success: function(data) {
        var i = 0;
        var datos = JSON.parse(data);
        $("#listaMarcaASNM").html("<option value=>Marca</option>");
        while (i < datos.length){
            $("#listaMarcaASNM").append("<option value="+i+">"+datos[i].marca+"</option>");
            i=i+1;
        };
    }
});
//___________LaSegunda-Sancor Marca___________//
$.ajax({
    type: "POST",
    url: 'readListaPrecios.php',
    datatype:"json",    
    data:  {opcion: 24}, 
    success: function(data) {
        var i = 0;
        var datos = JSON.parse(data);
        $("#listaMarcaLaSegundaSancor").html("<option value=>Marca</option>");
        while (i < datos.length){
            $("#listaMarcaLaSegundaSancor").append("<option value="+i+">"+datos[i].marca+"</option>");
            i=i+1;
        };
    }
});
//___________San Cristobal Marca___________//
$.ajax({
    type: "POST",
    url: 'readListaPrecios.php',
    datatype:"json",    
    data:  {opcion: 27}, 
    success: function(data) {
        var i = 0;
        var datos = JSON.parse(data);
        $("#listaMarcaSanCristobal").html("<option value=>Marca</option>");
        while (i < datos.length){
            $("#listaMarcaSanCristobal").append("<option value="+i+">"+datos[i].marca+"</option>");
            i=i+1;
        };
    }
});

});
//___________La Caja Modelo___________//
function getModeloLaCaja(){
    marca = $("#listaMarcaLaCaja option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {marca:marca, opcion:10}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloLaCaja").html("<option  value=>Modelo</option>");
            $("#listaCristalLaCaja").html("<option  value=>Cristal</option>");
            while (i < datos.length){
                $("#listaModeloLaCaja").append("<option value="+i+">"+datos[i].modelo+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________Glasscom Modelo___________//
function getModeloGlasscom(){
    marca = $("#listaMarcaGlasscom option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {marca:marca, opcion:13}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloGlasscom").html("<option  value=>Modelo</option>");
            $("#listaCristalGlasscom").html("<option  value=>Cristal</option>");
            while (i < datos.length){
                $("#listaModeloGlasscom").append("<option value="+i+">"+datos[i].modelo+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________Fed Pat Modelo___________//
function getModeloFedPat(){
    marca = $("#listaMarcaFedPat option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {marca:marca, opcion:16}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloFedPat").html("<option  value=>Modelo</option>");
            $("#listaCristalFedPat").html("<option  value=>Cristal</option>");
            while (i < datos.length){
                $("#listaModeloFedPat").append("<option value="+i+">"+datos[i].modelo+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________Comun Modelo___________//
function getModeloComun(){
    marca = $("#listaMarcaComun option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {marca:marca, opcion:19}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloComun").html("<option  value=>Modelo</option>");
            $("#listaCristalComun").html("<option  value=>Cristal</option>");
            while (i < datos.length){
                $("#listaModeloComun").append("<option value="+i+">"+datos[i].modelo+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________ALLIANZ-SURA-NACION-MAPFRE Modelo___________//
function getModeloASNM(){
    marca = $("#listaMarcaASNM option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {marca:marca, opcion:22}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloASNM").html("<option  value=>Modelo</option>");
            $("#listaCristalASNM").html("<option  value=>Cristal</option>");
            while (i < datos.length){
                $("#listaModeloASNM").append("<option value="+i+">"+datos[i].modelo+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________LaSegunda-Sancor Modelo___________//
function getModeloLaSegundaSancor(){
    marca = $("#listaMarcaLaSegundaSancor option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {marca:marca, opcion:25}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloLaSegundaSancor").html("<option  value=>Modelo</option>");
            $("#listaCristalLaSegundaSancor").html("<option  value=>Cristal</option>");
            while (i < datos.length){
                $("#listaModeloLaSegundaSancor").append("<option value="+i+">"+datos[i].modelo+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________San Cristobal Modelo___________//
function getModeloSanCristobal(){
    marca = $("#listaMarcaSanCristobal option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {marca:marca, opcion:28}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloSanCristobal").html("<option  value=>Modelo</option>");
            $("#listaCristalSanCristobal").html("<option  value=>Cristal</option>");
            while (i < datos.length){
                $("#listaModeloSanCristobal").append("<option value="+i+">"+datos[i].modelo+"</option>");
                i=i+1;
            }; 
        }
    });
};

//___________La Caja Cristal___________//
function getMarcaLaCaja(){
    modelo = $("#listaModeloLaCaja option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {modelo:modelo, opcion:11}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalLaCaja").html("<option value=>Cristal</option>");
            while (i < datos.length){
                $("#listaCristalLaCaja").append("<option value="+i+">"+datos[i].cristal+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________Glasscom Cristal___________//
function getMarcaGlasscom(){
    modelo = $("#listaModeloGlasscom option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {modelo:modelo, opcion:14}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalGlasscom").html("<option value=>Cristal</option>");
            while (i < datos.length){
                $("#listaCristalGlasscom").append("<option value="+i+">"+datos[i].cristal+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________Fed Pat Cristal___________//
function getMarcaFedPat(){
    modelo = $("#listaModeloFedPat option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {modelo:modelo, opcion:17}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalFedPat").html("<option value=>Cristal</option>");
            while (i < datos.length){
                $("#listaCristalFedPat").append("<option value="+i+">"+datos[i].cristal+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________Comun Cristal___________//
function getMarcaComun(){
    modelo = $("#listaModeloComun option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {modelo:modelo, opcion:20}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalComun").html("<option value=>Cristal</option>");
            while (i < datos.length){
                $("#listaCristalComun").append("<option value="+i+">"+datos[i].cristal+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________ALLIANZ-SURA-NACION-MAPFRE Cristal___________//
function getMarcaASNM(){
    modelo = $("#listaModeloASNM option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {modelo:modelo, opcion:23}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalASNM").html("<option value=>Cristal</option>");
            while (i < datos.length){
                $("#listaCristalASNM").append("<option value="+i+">"+datos[i].cristal+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________LaSegunda-Sancor Cristal___________//
function getMarcaLaSegundaSancor(){
    modelo = $("#listaModeloLaSegundaSancor option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {modelo:modelo, opcion:26}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalLaSegundaSancor").html("<option value=>Cristal</option>");
            while (i < datos.length){
                $("#listaCristalLaSegundaSancor").append("<option value="+i+">"+datos[i].cristal+"</option>");
                i=i+1;
            }; 
        }
    });
};
//___________San Cristobal Cristal___________//
function getMarcaSanCristobal(){
    modelo = $("#listaModeloSanCristobal option:selected").text();
    $.ajax({
        type: "POST",
        url: 'readListaPrecios.php',
        datatype:"json",    
        data:  {modelo:modelo, opcion:29}, 
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalSanCristobal").html("<option value=>Cristal</option>");
            while (i < datos.length){
                $("#listaCristalSanCristobal").append("<option value="+i+">"+datos[i].cristal+"</option>");
                i=i+1;
            }; 
        }
    });
};
/*----------------------------Filtro de Tablas----------------------------*/
//___________La Caja Filtro___________//
function dropDownLaCaja(){
    setTimeout(function(){
    marca = $("#listaMarcaLaCaja option:selected").text();
    modelo = $("#listaModeloLaCaja option:selected").text();
    cristal = $("#listaCristalLaCaja option:selected").text();
    if (marca === "Marca") {
        dtLaCaja.ajax.reload(null, false);
    }else if( marca != "Marca" & modelo == "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, opcion:30},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtLaCaja.clear().rows.add(datos).draw();  
          }  
        }); 
    }else if( marca != "Marca" & modelo != "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, opcion:31},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtLaCaja.clear().rows.add(datos).draw();  
          }  
        });
    }else if( marca != "Marca" & modelo != "Modelo" & cristal != "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, cristal:cristal, opcion:32},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtLaCaja.clear().rows.add(datos).draw();  
          }  
        });
    }
}, 200);
};
//___________Glasscom Filtro___________//
function dropDownGlasscom(){
    setTimeout(function(){
    marca = $("#listaMarcaGlasscom option:selected").text();
    modelo = $("#listaModeloGlasscom option:selected").text();
    cristal = $("#listaCristalGlasscom option:selected").text();
    if (marca === "Marca") {
        dtGlasscom.ajax.reload(null, false);
    }else if( marca != "Marca" & modelo == "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, opcion:33},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtGlasscom.clear().rows.add(datos).draw();  
          }  
        }); 
    }else if( marca != "Marca" & modelo != "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, opcion:34},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtGlasscom.clear().rows.add(datos).draw();  
          }  
        });
    }else if( marca != "Marca" & modelo != "Modelo" & cristal != "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, cristal:cristal, opcion:35},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtGlasscom.clear().rows.add(datos).draw();  
          }  
        });
    }
}, 200);
};
//___________Fed Pat Filtro___________//
function dropDownFedPat(){
    setTimeout(function(){
    marca = $("#listaMarcaFedPat option:selected").text();
    modelo = $("#listaModeloFedPat option:selected").text();
    cristal = $("#listaCristalFedPat option:selected").text();
    if (marca === "Marca") {
        dtFedPat.ajax.reload(null, false);
    }else if( marca != "Marca" & modelo == "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, opcion:36},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtFedPat.clear().rows.add(datos).draw();  
          }  
        }); 
    }else if( marca != "Marca" & modelo != "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, opcion:37},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtFedPat.clear().rows.add(datos).draw();  
          }  
        });
    }else if( marca != "Marca" & modelo != "Modelo" & cristal != "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, cristal:cristal, opcion:38},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtFedPat.clear().rows.add(datos).draw();  
          }  
        });
    }
}, 200);
};
//___________Comun Filtro___________//
function dropDownComun(){
    setTimeout(function(){
    marca = $("#listaMarcaComun option:selected").text();
    modelo = $("#listaModeloComun option:selected").text();
    cristal = $("#listaCristalComun option:selected").text();
    if (marca === "Marca") {
        dtComun.ajax.reload(null, false);
    }else if( marca != "Marca" & modelo == "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, opcion:39},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtComun.clear().rows.add(datos).draw();  
          }  
        }); 
    }else if( marca != "Marca" & modelo != "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, opcion:40},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtComun.clear().rows.add(datos).draw();  
          }  
        });
    }else if( marca != "Marca" & modelo != "Modelo" & cristal != "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, cristal:cristal, opcion:41},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtComun.clear().rows.add(datos).draw();  
          }  
        });
    }
}, 200);
};
//___________ALLIANZ-SURA-NACION-MAPFRE Filtro___________//
function dropDownASNM(){
    setTimeout(function(){
    marca = $("#listaMarcaASNM option:selected").text();
    modelo = $("#listaModeloASNM option:selected").text();
    cristal = $("#listaCristalASNM option:selected").text();
    if (marca === "Marca") {
        dtASNM.ajax.reload(null, false);
    }else if( marca != "Marca" & modelo == "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, opcion:42},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtASNM.clear().rows.add(datos).draw();  
          }  
        }); 
    }else if( marca != "Marca" & modelo != "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, opcion:43},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtASNM.clear().rows.add(datos).draw();  
          }  
        });
    }else if( marca != "Marca" & modelo != "Modelo" & cristal != "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, cristal:cristal, opcion:44},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtASNM.clear().rows.add(datos).draw();  
          }  
        });
    }
}, 200);
};
//___________LaSegunda-Sancor Filtro___________//
function dropDownLaSegundaSancor(){
    setTimeout(function(){
    marca = $("#listaMarcaLaSegundaSancor option:selected").text();
    modelo = $("#listaModeloLaSegundaSancor option:selected").text();
    cristal = $("#listaCristalLaSegundaSancor option:selected").text();
    if (marca === "Marca") {
        dtLaSegundaSancor.ajax.reload(null, false);
    }else if( marca != "Marca" & modelo == "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, opcion:45},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtLaSegundaSancor.clear().rows.add(datos).draw();  
          }  
        }); 
    }else if( marca != "Marca" & modelo != "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, opcion:46},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtLaSegundaSancor.clear().rows.add(datos).draw();  
          }  
        });
    }else if( marca != "Marca" & modelo != "Modelo" & cristal != "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, cristal:cristal, opcion:47},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtLaSegundaSancor.clear().rows.add(datos).draw();  
          }  
        });
    }
}, 200);
};
//___________San Cristobal Filtro___________//
function dropDownSanCristobal(){
    setTimeout(function(){
    marca = $("#listaMarcaSanCristobal option:selected").text();
    modelo = $("#listaModeloSanCristobal option:selected").text();
    cristal = $("#listaCristalSanCristobal option:selected").text();
    if (marca === "Marca") {
        dtSanCristobal.ajax.reload(null, false);
    }else if( marca != "Marca" & modelo == "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, opcion:48},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtSanCristobal.clear().rows.add(datos).draw();  
          }  
        }); 
    }else if( marca != "Marca" & modelo != "Modelo" & cristal == "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, opcion:49},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtSanCristobal.clear().rows.add(datos).draw();  
          }  
        });
    }else if( marca != "Marca" & modelo != "Modelo" & cristal != "Cristal" ) {
        $.ajax({
          url: "readListaPrecios.php",
          type: "POST",
          datatype:"json",    
          data:  {marca:marca, modelo:modelo, cristal:cristal, opcion:50},    
          success: function(data) {
            var datos = JSON.parse(data);
            dtSanCristobal.clear().rows.add(datos).draw();  
          }  
        });
    }
}, 200);
};