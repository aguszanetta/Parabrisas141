$(document).ready(function() {
    empresa = $("#tablaLP").data('empresa')
    /*----------------------------Carga de Tablas----------------------------*/
    tablaLP = $('#tablaLP').DataTable( {
        "ajax":{            
            "url": "../php/readListaPrecios.php", 
            "method": 'POST', 
            "data":{opcion: empresa},
            "dataSrc":""
        },
        orderCellsTop: true,
        fixedHeader: true,
        initComplete: function(){
            this.api()
            .columns()
            .every(function () {
                var column = this;
                //console.log("Columna 1", tablaLP.column(1).data())
                if(column[0][0] == 1 || column[0][0] == 2 || column[0][0] == 3){
                    //console.log("Columna", column)
                    var select = $('<select><option value=""></option></select>')
                        .appendTo($(column.header()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex($(this).val());
                            column.search(val ? '^' + val + '$' : '', true, false).draw();
                            console.log("datita", tablaLP.rows().data())
                            console.log("Cascade 2", tablaLP.search("ALFA ROMEO"))
                        });
    
                    column
                        .data()
                        .unique()
                        .sort()
                        .each(function (d, j) {
                            //console.log(d, j)
                            select.append('<option value="' + d + '">' + d + '</option>');
                        });
                }
            });
        },
            "columns":[
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
            {"data": "totalSinIva"},
            {"data": "totalConIva"},
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
        }
    });
    
    /*----------------------------Modales Detalle Para Lista de Precios----------------------------*/   
    $(document).on("click", ".btnDetalleLP", function(){
        fila = $(this).closest("tr");
        data = $('#tablaLP').DataTable().row(fila).data();
        codigo = data['codigo'];
        descripcion = data['descripcion'];
        color = data['color'];
        $("#info00LP").html(codigo);
        $("#info01LP").html(descripcion);
        $("#info02LP").html(color);          
        $("#headerDetalle").css({"background-color":"#17a2b8","color":"white"});
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
})