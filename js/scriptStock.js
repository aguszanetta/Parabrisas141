$(document).ready(function() {
    tablaStock = $('#tablaStock').DataTable({
        "ajax": {
            "url": "crudStock.php",
            "method": 'POST',
            "data": { opcion: 1 },
            "dataSrc": "",
            beforeSend: function() {
                $('#loader').removeClass('hidden')
            },
            complete: function() {
                $('#loader').addClass('hidden')
            },
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
                            $("#marcaStock").append('<option value="' + id + '">' + d + '</option>');
                        });
                }
            });
        },
        "columns": [
            { "data": "idStock", "visible": false },
            { "data": "codigo", "sortable": false, "width": "10%" },
            { "data": "marca", "sortable": false, "width": "15%" },
            { "data": "modelo", "sortable": false, "width": "15%" },
            { "data": "tipo", "sortable": false, "width": "10%" },
            { 
                "data": { "data": "idStock" },
                "sortable": false,
                "width": "20%",
                "render": function(data){
                    arrayDescripcionCompleta = []
                    arrayDescripcionCompleta.push(data.descripcion, data.posicion, data.lado, data.color)
                    arrayDescripcionFiltrada = arrayDescripcionCompleta.filter(e => e != "")
                    descripcionTotal = ""
                    if(arrayDescripcionFiltrada.length > 0){
                        descripcionTotal = arrayDescripcionFiltrada[0]
                        for (i=1; i < arrayDescripcionFiltrada.length; i++) {
                            descripcionTotal += "</br>" + arrayDescripcionFiltrada[i]
                        }
                        return descripcionTotal
                    }else{
                        return "<i>No se encontró descripción</i>"
                    }
                    /*if(data.descripcion && data.posicion && data.lado && data.color){
                        return data.descripcion + "</br>" + data.posicion + "</br>" + data.lado + "</br>" + data.color
                    } else if (data.descripcion && data.posicion && data.lado){
                        return data.descripcion + "</br>" + data.posicion + "</br>" + data.lado
                    } else if (data.descripcion && data.posicion){
                        return data.descripcion + "</br>" + data.posicion
                    } else {
                        return data.descripcion
                    }*/
                }

            },
            { "data": "posicion", "visible": false },
            { "data": "lado", "visible": false },
            { "data": "color", "visible": false },
            { "data": "cantidad", "width": "8%" },
            //{ "data": "precioFinal", "sortable": false, "visible": false },
            { "defaultContent": "<div class='text-center'><button class='btn btn-primary btnEditarStock'><i class='fas fa-pen-to-square'></i></button></div>", "sortable": false, "width": "7%" }
        ],
        "pageLength": 50,
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
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
            "searchBuilder": {
            add: 'Agregar Condición',
            condition: 'Comparación',
            clearAll: 'Limpiar',
            //delete: 'Eliminar',
            deleteTitle: 'Eliminar Condición',
            data: 'Columna',
            //left: 'Izquierda',
            leftTitle: 'Eliminar Subcondición',
            logicAnd: 'Y',
            logicOr: 'O',
            //right: 'Derecha',
            rightTitle: 'Agregar Subcondición',
            title: {
                0: '',
                _: ''
            },
            value: 'Opción',
            valueJoiner: 'entre',
            "conditions": {
                "date": {
                    "after": "Despues",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual a",
                    "notBetween": "No entre",
                    "notEmpty": "No Vacio",
                    "not": "Diferente de"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vacio",
                    "equals": "Igual a",
                    "gt": "Mayor a",
                    "gte": "Mayor o igual a",
                    "lt": "Menor que",
                    "lte": "Menor o igual que",
                    "notBetween": "No entre",
                    "notEmpty": "No vacío",
                    "not": "Diferente de"
                },
                "string": {
                    "contains": "Contiene",
                    "empty": "Vacío",
                    "endsWith": "Termina en",
                    "equals": "Igual a",
                    "notEmpty": "No Vacio",
                    "startsWith": "Empieza con",
                    "not": "Diferente de",
                    "notContains": "No Contiene",
                    "notStartsWith": "No empieza con",
                    "notEndsWith": "No termina con"
                },
                "array": {
                    "not": "Diferente de",
                    "equals": "Igual",
                    "empty": "Vacío",
                    "contains": "Contiene",
                    "notEmpty": "No Vacío",
                    "without": "Sin"
                },
            },
        },
        },
        searchBuilder: {
            columns: [9]
        },
        //responsive: "true",
        dom: 'QBfrtilp',
        buttons: [{
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    format:{
                        header: function ( data, columnIdx ) {
                            if(columnIdx==2){
                                return "Marca"
                            }else if(columnIdx==3){
                                return "Modelo"
                            }else if(columnIdx==4){
                                return "Cristal"
                            }else{
                                return data
                            }
                        }}
                },
                title: 'Stock Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    format:{
                    header: function ( data, columnIdx ) {
                        if(columnIdx==2){
                            return "Marca"
                        }else if(columnIdx==3){
                            return "Modelo"
                        }else if(columnIdx==4){
                            return "Cristal"
                        }else{
                            return data
                        }
                    }}
                },
                title: 'Stock Parabrisas 141',
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
            },
            {
                titleAttr: 'Filtrar',
                text: '<i class="fas fa-filter iconWhite"></i> ',
                className: 'btn btn-icon btn-primary br7px filterSB',
                action: function(e, dt, node, config) {
                    esVisible = $("#tablaStock_wrapper>.dtsb-searchBuilder").is(":visible");
                    if(esVisible){
                        $("#tablaStock_wrapper>.dtsb-searchBuilder").hide()
                    } else {
                        $("#tablaStock_wrapper>.dtsb-searchBuilder").show()
                    }
                }
            },
            {
                titleAttr: 'Limpiar A Pedir',
                text: '<i class="fas fa-trash"></i> ',
                className: 'btn btn-warning btn-icon br7px',
                action: function(e, dt, node, config) {
                    EliminarTodoStock();
                }
            }
        ]
    });

    tablaStock.searchBuilder.container().prependTo(tablaStock.table().container());
    $("#tablaStock_wrapper>.dtsb-searchBuilder").hide();

    $(document).on("click", ".filterSB", function(){
        if($(this).hasClass('btn-primary')){
          $(this).removeClass('btn-primary')
          $(this).addClass('btn-orange')
        }else {
          $(this).removeClass('btn-orange')
          $(this).addClass('btn-primary')
        }
    })

    //Editar      
    $(document).on("click", ".btnEditarStock", function() {
        fila = $(this).closest("tr");
        data = $('#tablaStock').DataTable().row(fila).data();
        idStock = data['idStock'];
        cantidad = data['cantidad'];
        $("#idStock").attr('value', idStock);
        $("#cantidad").val(cantidad);
        $('#modalEditar').modal('show');
        
    });

    $('#formEditarCantidad').submit(function(e){
		e.preventDefault();
		cantidad = $("#cantidad").val();
        idStock = $("#idStock").val();
        
        $.ajax({
            url: "crudStock.php",
            type: "POST",
            datatype: "json",
            data: { idStock: idStock, cantidad: cantidad, opcion: 2 },
            success: function(data) {
                Swal.fire({
                    title: 'Exito',
                    text: 'La cantidad ha sido actualizada correctamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                  }).then( function(){
                    $('#modalEditar').modal('hide');
                    tablaStock.ajax.reload()
                })
            }
        });
	});

    $(document).on("change", "#marcaStock", function() {
        marcaID = $("#marcaStock option:selected").val();
        marcaNombre = $("#marcaStock option:selected").text();
        
        $("#modeloStock").html("<option value=>Modelo</option>");
        $("#cristalStock").html("<option value=>Cristal</option>");
        tablaStock.column(3).search('').draw();
        tablaStock.column(4).search('').draw();

        if(marcaID){
            $.ajax({
                type: "POST",
                url: 'readListaPrecios.php',
                datatype:"json",    
                data:  { marcaID: marcaID, opcion: "modelos" },
                /*beforeSend: function() {
                    $('#loader').removeClass('hidden')
                },
                complete: function() {
                    $('#loader').addClass('hidden')
                },*/
                success: function(data) {
                    var datos = JSON.parse(data);
                    for (let i = 0; i < datos.length; i++) {
                        $("#modeloStock").append("<option value=" + datos[i].idModelo + ">" + datos[i].modelo + "</option>");
                    } 
                    tablaStock.column(2).search(marcaNombre ? '^' + marcaNombre + '$' : '', true, false).draw();
                }
            });
        } else{
            tablaStock.column(2).search('').draw();
        }
	});

    $(document).on("change", "#modeloStock", function() {
        modeloID = $("#modeloStock option:selected").val();
        modeloNombre = $("#modeloStock option:selected").text();
        
        $("#cristalStock").html("<option value=>Cristal</option>");
        tablaStock.column(4).search('').draw();

        if(modeloID){
            $.ajax({
                type: "POST",
                url: 'readListaPrecios.php',
                datatype:"json",    
                data:  { modeloID: modeloID, opcion: "cristales" }, 
                success: function(data) {
                    var datos = JSON.parse(data);
                    for (let i = 0; i < datos.length; i++) {
                        $("#cristalStock").append("<option value=" + i + ">" + datos[i].tipo + "</option>");
                    } 
                    tablaStock.column(3).search(modeloNombre ? '^' + modeloNombre + '$' : '', true, false).draw();
                }
            });
        } else{
            tablaStock.column(3).search('').draw();
        }
	});

    $(document).on("change", "#cristalStock", function() {
        cristalVal = $("#cristalStock option:selected").val();
        cristalNombre = $("#cristalStock option:selected").text();

        if(cristalVal){
            tablaStock.column(4).search(cristalNombre ? '^' + cristalNombre + '$' : '', true, false).draw();
        } else{
            tablaStock.column(4).search('').draw();
        }
	});
 
});

function EliminarTodoStock(){
    Swal.fire({
        title: '¿Seguro?',
        text: "¿Estas seguro de eliminar todos los cristales en stock?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borralo',
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "crudStock.php",
                type: "POST",
                datatype: "json",
                data: { opcion: 3 },
                success: function() {
                    tablaStock.ajax.reload()
                }
            });
            Swal.fire(
                '¡Borrado!',
                'Los registros has sido borrados.',
                'success'
            )
        }
    })
}