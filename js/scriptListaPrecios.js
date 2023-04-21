$(document).ready(function() {
    empresa = $("#tablaLP").data('empresa')
    nombreEmpresa= "";
    switch (empresa) {
        case "asnm":    
            nombreEmpresa = "Allianz - Sura - Nación - Mapfre"
            break;
        case "laCaja":    
            nombreEmpresa = "La Caja"
            break;
        case "fedPat":    
            nombreEmpresa = "Federacion Patronal"
            break;
        case "lss":    
            nombreEmpresa = "La Segunda - Sancor"
            break;
        case "sanCristobal":    
            nombreEmpresa = "San Cristobal"
            break;
        case "comun":    
            nombreEmpresa = "Común"
            break;
        /*case "particulares":    
        nombreEmpresa = "Particulares"
        break;
        case "glasscom":    
        nombreEmpresa = "Glasscom"
        break;*/
    }
    /*----------------------------Carga de Tablas----------------------------*/
    tablaLP = $('#tablaLP').DataTable( {
        "ajax":{            
            "url": "../php/readListaPrecios.php", 
            "method": 'POST', 
            "data":{opcion: empresa},
            "dataSrc":"",
            beforeSend: function() {
                $('#loader').removeClass('hidden')
            },
            complete: function() {
                $('#loader').addClass('hidden')
            }
        },
        initComplete: function(){
            this.api()
            .columns()
            .every(function () {
                var column = this;
                if(column[0][0] == 2){
                    column
                        .data()
                        .unique()
                        .sort()
                        .each(function (d, j) {
                            id = parseInt(j)+1
                            $("#marca").append('<option value="' + id + '">' + d + '</option>');
                        });
                }
            });
        },
            "columns":[
            {"data": "idPrecio", "visible": false},
            {"data": "codigo", "sortable": false},
            {"data": "marca", "sortable": false},
            {"data": "modelo", "sortable": false},
            {"data": "tipo", "sortable": false},
            {"data": "descripcion", "visible": false},
            {"data": "posicion", "visible": false},
            {"data": "lado", "visible": false},
            {"data": "color", "visible": false},
            {"data": "precioSinIva", "visible": false},
            {"data": "instalacionSinIva", "visible": false},
            {"data": "totalSinIva", "sortable": false},
            {"data": "totalConIva", "sortable": false},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button type='button' class='btn btn-info btn-sm text-white btnDetalleLP'><i class='fas fa-info-circle'></i></button></div></div>", "sortable": false}
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
        },
        //responsive: "true",
        dom: 'Bfrtilp',
        buttons: [{
            extend: 'excelHtml5',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
            title: 'Lista de Precios - '+ nombreEmpresa +'',
            text: '<i class="fas fa-file-excel"></i> ',
            titleAttr: 'Exportar a Excel',
            className: 'btn btn-success',
        }, {
            extend: 'pdfHtml5',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
            title: 'Lista de Precios - '+ nombreEmpresa +'',
            text: '<i class="fas fa-file-pdf"></i> ',
            titleAttr: 'Exportar a PDF',
            className: 'btn btn-danger',
            orientation: 'landscape',
            PageSize: 'LEGAL',
            customize: function(doc) {
                doc.styles.tableHeader.fillColor = '#ffffff',
                    doc.styles.tableHeader.color = '#000000',
                    doc.styles.tableBodyOdd.fillColor = '#ffffff',
                    doc.content[1].margin = [0, 0, 0, 0], //left, top, right, bottom
                    doc.content[1].layout = {
                        hLineWidth: function(i, node) {
                            return (i === 0 || i === node.table.body.length) ? 2 : 1;
                        },
                        vLineWidth: function(i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                        },
                        hLineColor: function(i, node) {
                            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                        },
                        vLineColor: function(i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                        }
                    };
            },
        }]
    });

    $(document).on("click", ".btnDetalleLP", function(){
        fila = $(this).closest("tr");
        data = $('#tablaLP').DataTable().row(fila).data();
        descripcion = data['descripcion'];
        posicion = data['posicion'];
        lado = data['lado'];
        color = data['color'];
        precioSinIva = data['precioSinIva'];
        instalacionSinIva = data['instalacionSinIva'];
        $("#info00LP").html(descripcion);
        $("#info01LP").html(posicion);
        $("#info02LP").html(lado);
        $("#info03LP").html(color);
        $("#info04LP").html(precioSinIva);
        $("#info05LP").html(instalacionSinIva);          
        //$("#headerDetalle").css({"background-color":"#17a2b8","color":"white"});
        $("#titleDetalle").text("Detalle");
        $('#modalDetalle').modal('show');
    });



    /*$(document).on("click", ".btnDetalleLPGlasscom", function(){
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
    });*/

    $(document).on("change", "#marca", function() {
        marcaID = $("#marca option:selected").val();
        marcaNombre = $("#marca option:selected").text();
        
        $("#modelo").html("<option value=>Modelo</option>");
        $("#cristal").html("<option value=>Cristal</option>");
        tablaLP.column(3).search('').draw();
        tablaLP.column(4).search('').draw();

        if(marcaID){
            $.ajax({
                type: "POST",
                url: 'readListaPrecios.php',
                datatype:"json",    
                data:  { marcaID: marcaID, opcion: "modelos" }, 
                success: function(data) {
                    var datos = JSON.parse(data);
                    for (let i = 0; i < datos.length; i++) {
                        $("#modelo").append("<option value=" + datos[i].idModelo + ">" + datos[i].modelo + "</option>");
                    } 
                    tablaLP.column(2).search(marcaNombre ? '^' + marcaNombre + '$' : '', true, false).draw();
                }
            });
        } else{
            tablaLP.column(2).search('').draw();
        }
	});

    $(document).on("change", "#modelo", function() {
        modeloID = $("#modelo option:selected").val();
        modeloNombre = $("#modelo option:selected").text();
        
        $("#cristal").html("<option value=>Cristal</option>");
        tablaLP.column(4).search('').draw();

        if(modeloID){
            $.ajax({
                type: "POST",
                url: 'readListaPrecios.php',
                datatype:"json",    
                data:  { modeloID: modeloID, opcion: "cristales" }, 
                success: function(data) {
                    var datos = JSON.parse(data);
                    for (let i = 0; i < datos.length; i++) {
                        $("#cristal").append("<option value=" + i + ">" + datos[i].tipo + "</option>");
                    } 
                    tablaLP.column(3).search(modeloNombre ? '^' + modeloNombre + '$' : '', true, false).draw();
                }
            });
        } else{
            tablaLP.column(3).search('').draw();
        }
	});

    $(document).on("change", "#cristal", function() {
        cristalVal = $("#cristal option:selected").val();
        cristalNombre = $("#cristal option:selected").text();

        if(cristalVal){
            tablaLP.column(4).search(cristalNombre ? '^' + cristalNombre + '$' : '', true, false).draw();
        } else{
            tablaLP.column(4).search('').draw();
        }
	});

    $(document).on("click", "#limpiarFiltros", function() {
        $("#marca").html("<option value=>Marca</option>");
        $("#modelo").html("<option value=>Modelo</option>");
        $("#cristal").html("<option value=>Cristal</option>");
        tablaLP.column(2).search('').draw();
        tablaLP.column(3).search('').draw();
        tablaLP.column(4).search('').draw();
	});
})