$(document).ready(function() {
    var numero, opcion;
    opcion = 1;

    tablaHistorico = $('#tablaHistorico').DataTable({
        "ajax": {
            "url": "crudHistorico.php",
            "method": 'POST',
            "data": { opcion: opcion },
            "dataSrc": ""
        },
        "columns": [
            { "data": "numero", "visible": false, "searchable": false },
            {
                "data": "fecha",
                "render": function(data, type, full) {
                    if (type == 'display') {
                        return moment(data).format('DD/MM/YYYY HH:mm');
                    } else {
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                }
            },
            { "data": "nombre" },
            { "data": "telefono", "visible": false },
            { "data": "mail", "visible": false },
            { "data": "marca" },
            { "data": "modelo" },
            { "data": "dominio" },
            { "data": "cristal", "visible": false },
            { "data": "codCristal", "visible": false },
            { "data": "compania", "visible": false },
            { "data": "trabajo", "visible": false },
            { "data": "descripcion" },
            { "data": "valor" },
            { "data": "efectivo" },
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalleHist'><i class='material-icons'>info</i></button></div></div>"
            },
        ],
        "order": [
            [1, "asc"]
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
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
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
                title: 'Historico Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
                title: 'Historico Parabrisas 141',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL'
            },
            {
                extend: 'print',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
                title: 'Historico Parabrisas 141',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
        ]
    });

    var fila;
    //Detalle
    $(document).on("click", ".btnDetalleHist", function() {
        fila = $(this).closest("tr");
        data = $('#tablaHistorico').DataTable().row(fila).data();
        telefono = data['telefono'];
        numero = data['numero'];
        mail = data['mail'];
        cristal = data['cristal'];
        codCristal = data['codCristal']
        compania = data['compania'];
        trabajo = data['trabajo'];
        $('#info0').html(telefono);
        $('#info1').html(mail);
        $('#info2').html(cristal);
        $('#info3').html(codCristal);
        $('#info4').html(compania);
        $('#info5').html(trabajo);
        $("#headerDetalleHist").css("background-color", "#17a2b8");
        $("#headerDetalleHist").css("color", "white");
        $("#titleDetalleHist").text("Detalle");
        $('#modalDetalleHist').modal('show');
    });
});