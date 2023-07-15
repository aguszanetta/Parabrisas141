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
            { "data": "codigo", "sortable": false },
            { "data": "marca", "sortable": false },
            { "data": "modelo", "sortable": false },
            { "data": "tipo", "sortable": false },
            { "data": "descripcion", "visible": false },
            { "data": "posicion", "visible": false },
            { "data": "lado", "visible": false },
            { "data": "color", "visible": false },
            { "data": "cantidad" },
            { "data": "precioFinal", "sortable": false },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditarStock'><i class='fas fa-pen-to-square'></i></button><button class='btn btn-info text-white btnDetalleStock'><i class='fas fa-info-circle'></i></button></div></div>", "sortable": false }
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

    //ModalDetalle     
    $(document).on("click", ".btnDetalleStock", function(){
        fila = $(this).closest("tr");
        data = $('#tablaStock').DataTable().row(fila).data();
        descripcion = data['descripcion'];
        posicion = data['posicion'];
        lado = data['lado'];
        color = data['color'];
        $("#info00Stock").html(descripcion);
        $("#info01Stock").html(posicion);
        $("#info02Stock").html(lado);
        $("#info03Stock").html(color);        
        //$("#headerDetalle").css({"background-color":"#17a2b8","color":"white"});
        $("#titleDetalle").text("Detalle");
        $('#modalDetalle').modal('show');
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
