$(document).ready(function() {
    var opcion = 2;
    var fila;

    tablaApedir = $('#tablaApedir').DataTable({
        "ajax": {
            "url": "crudApedir.php",
            "method": 'POST',
            "data": { opcion: opcion },
            "dataSrc": ""
        },
        "columns": [
            { "data": "codigo" },
            { "data": "marca" },
            { "data": "modelo", "sortable": false },
            { "data": "descripcion" },
            { "data": "cristal", "sortable": false },
            { "data": "posicion" },
            { "data": "lado" },
            { "data": "color" },
            { "data": "cantidad" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-success btn-sm btnSumarPedido'><i class='material-icons'>add</i></button><button class='btn btn-danger btn-sm btnRestarPedido'><i class='material-icons'>remove</i></button><button class='btn btn-secondary btn-sm btnPedido'><i class='material-icons'>delete</i></button></div></div>", "sortable": false }
        ],
        "order": [
            [1, "asc"]
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
        responsive: "true",
        dom: 'Bfrtilp',
        buttons: [{
                extend: 'excelHtml5',
                exportOptions: {
                    //format: { header: function(data, column, row) { return data.substring(data.indexOf("value") + 9, data.indexOf("</option")); } },
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },
                title: 'Pedidos Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    //format: { header: function(data, column, row) { return data.substring(data.indexOf("value") + 9, data.indexOf("</option")); } },
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },
                title: 'Pedidos Parabrisas 141',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger'
            },
            {
                extend: 'print',
                exportOptions: {
                    //format: { header: function(data, column, row) { return data.substring(data.indexOf("value") + 9, data.indexOf("</option")); } },
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },
                title: 'Pedidos Parabrisas 141',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
        ]
    });

    //Sumar      
    $(document).on("click", ".btnSumarPedido", function() {
        fila = $(this).closest("tr");
        data = $('#tablaApedir').DataTable().row(fila).data();
        codigo = data['codigo'];
        cantidad = parseInt(data['cantidad']) + 1;
        $.ajax({
            url: "crudApedir.php",
            type: "POST",
            datatype: "json",
            data: { codigo: codigo, cantidad: cantidad, opcion: 12 },
            success: function(data) {
                tablaApedir.ajax.reload(null, false);
            }
        });

    });
    //Restar      
    $(document).on("click", ".btnRestarPedido", function() {
        fila = $(this).closest("tr");
        data = $('#tablaApedir').DataTable().row(fila).data();
        codigo = data['codigo'];
        cantidad = parseInt(data['cantidad'])
        if (cantidad == 0) {
            Swal.fire({
                title: 'Cantidad en cero',
                text: '¡no se puede restar!',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        } else {
            cantidad = cantidad - 1;
        }
        $.ajax({
            url: "crudApedir.php",
            type: "POST",
            datatype: "json",
            data: { codigo: codigo, cantidad: cantidad, opcion: 12 },
            success: function(data) {
                tablaApedir.ajax.reload(null, false);
            }
        });

    });

    //Borrar
    $(document).on("click", ".btnPedido", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaApedir').DataTable().row(fila2).data();
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
                    url: "crudApedir.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: 1, codigo: codigo },
                    success: function() {
                        tablaApedir.row(fila.parents('tr')).remove().draw();
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