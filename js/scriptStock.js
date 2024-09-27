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
            { "data": "precioFinal", "sortable": false },
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
        },
        //responsive: "true",
        dom: 'Bfrtilp',
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
        ]
    });

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
                console.log("data", data)
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
                    console.log("data", datos)
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
