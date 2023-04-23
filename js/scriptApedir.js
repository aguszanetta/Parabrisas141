$(document).ready(function() {
    tablaAPedir = $('#tablaAPedir').DataTable({
        "ajax": {
            "url": "crudAPedir.php",
            "method": 'POST',
            "data": { opcion: 1 },
            "dataSrc": ""
        },
        "columns": [
            /*{ "data": "codigo" },
            { "data": "marca" },
            { "data": "modelo", "sortable": false },
            { "data": "descripcion" },
            { "data": "cristal", "sortable": false },
            { "data": "posicion" },
            { "data": "lado" },
            { "data": "color" },
            { "data": "cantidad" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-success btn-sm btnSumarPedido'><i class='material-icons'>add</i></button><button class='btn btn-danger btn-sm btnRestarPedido'><i class='material-icons'>remove</i></button><button class='btn btn-secondary btn-sm btnPedido'><i class='material-icons'>delete</i></button></div></div>", "sortable": false }
            */
            { "data": "idStock", "visible": false },
            { "data": "codigo", "sortable": false },
            { "data": "marca", "sortable": false },
            { "data": "modelo", "sortable": false },
            { "data": "tipo", "sortable": false },
            { "data": "descripcion", "visible": false },
            { "data": "posicion", "visible": false },
            { "data": "lado", "visible": false },
            { "data": "color", "visible": false },
            { "data": "cantidad", "sortable": false },
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

    //ModalDetalle     
    $(document).on("click", ".btnDetalleAPedir", function(){
        fila = $(this).closest("tr");
        data = $('#tablatablaAPedir').DataTable().row(fila).data();
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

});