$(document).ready(function() {
    tablaAPedir = $('#tablaAPedir').DataTable({
        "ajax": {
            "url": "crudAPedir.php",
            "method": 'POST',
            "data": { opcion: 1 },
            "dataSrc": ""
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
            { "data": "aPedir" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditarAPedir'><i class='fas fa-pen-to-square'></i></button><button class='btn btn-info text-white btnDetalleAPedir'><i class='fas fa-info-circle'></i></button></div></div>", "sortable": false }
        ],
        /*"order": [
            [1, "asc"]
        ],*/
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
        responsive: "true",
        dom: 'Bfrtilp',
        buttons: [{
                titleAttr: 'Agregar Cristal a Pedir',
                text: '<i class="fas fa-plus"></i> ',
                className: 'btn btn-orange btn-icon br7px',
                action: function(e, dt, node, config) {
                    $("#formAgregarCristal").trigger("reset");
                    $('#modalAgregarCristal').modal('show');
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                },
                title: 'Cristales a Pedir - Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                },
                title: 'Cristales a Pedir - Parabrisas 141',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [60, 0, 0, 0], //left, top, right, bottom
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

    $('#formAgregarCristal').submit(function(e){
		e.preventDefault();
        cristalID = $("#cristal option:selected").val();
        aPedir = $("#cantidad").val();
        $.ajax({
            url: "crudApedir.php",
            type: "POST",
            datatype: "json",
            data: { cristalID: cristalID, aPedir: aPedir, opcion: 3 },
            success: function(data) {
                Swal.fire({
                    title: 'Exito',
                    text: 'Se ha agregado el cristal correctamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                  }).then( function(){
                    $('#modalAgregarCristal').modal('hide');
                    tablaAPedir.columns().search("");
                    tablaAPedir.ajax.reload();
                })
            }
        });
	});

    //Editar      
    $(document).on("click", ".btnEditarAPedir", function() {
        fila = $(this).closest("tr");
        data = $('#tablaAPedir').DataTable().row(fila).data();
        idStock = data['idStock'];
        aPedir = data['aPedir'];
        $("#idStock").attr('value', idStock);
        $("#aPedir").val(aPedir);
        $('#modalEditar').modal('show');
        
    });

    $('#formEditarAPedir').submit(function(e){
		e.preventDefault();
		aPedir = $("#aPedir").val();
        idStock = $("#idStock").val();
        
        $.ajax({
            url: "crudApedir.php",
            type: "POST",
            datatype: "json",
            data: { idStock: idStock, aPedir: aPedir, opcion: 2 },
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
                    tablaAPedir.ajax.reload()
                })
            }
        });
	});

    //ModalDetalle     
    $(document).on("click", ".btnDetalleAPedir", function(){
        fila = $(this).closest("tr");
        data = $('#tablaAPedir').DataTable().row(fila).data();
        descripcion = data['descripcion'];
        posicion = data['posicion'];
        lado = data['lado'];
        color = data['color'];
        $("#info00APedir").html(descripcion);
        $("#info01APedir").html(posicion);
        $("#info02APedir").html(lado);
        $("#info03APedir").html(color);        
        //$("#headerDetalle").css({"background-color":"#17a2b8","color":"white"});
        $("#titleDetalle").text("Detalle");
        $('#modalDetalle').modal('show');
    });


    //Borrar
    $(document).on("click", ".btnPedido", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaAPedir').DataTable().row(fila2).data();
        codigo = data['codigo'];
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro de borrar el turno?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borralo',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudAPedir.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: 1, codigo: codigo },
                    success: function() {
                        tablaAPedir.row(fila.parents('tr')).remove().draw();
                    }
                });
                Swal.fire(
                    '¡Borrado!',
                    'El registro ha sido borrado.',
                    'success'
                )
            }
        })
    });

    $(document).on("change", "#cristal", function() {
        cristal = $("#cristal option:selected").text();
        codigo =  cristal.split(' — ')[0];
        existeCristal = tablaAPedir.columns(1).search(codigo).rows({search:'applied'}).data()[0];
        if(existeCristal){
            $("#alertaAPedir").html("Ya existe el cristal en la tabla (" + existeCristal.aPedir + ")")
            $("#alertaAPedir").show()
        } else {
            $("#alertaAPedir").hide()
        }
      });

});