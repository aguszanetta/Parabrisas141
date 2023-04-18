$(document).ready(function() {
    var numero, opcion;
    opcion = 4;
    bandera = '';
    arrayCodModificados = [];
    arrayCodModificadoDel = [];
    busqueda = '';

    tablaTurnos = $('#tablaTurnos').DataTable({
        "ajax": {
            "url": "crudTurnos.php",
            "method": 'POST',
            "data": { opcion: opcion },
            "dataSrc": ""
        },
        "columns": [
            { "data": "numero", "visible": false, "searchable": false },
            {
                "data": "fecha",
                "width": "10%",
                "render": function(data, type, full) {
                    if (type == 'display') {
                        return moment(data).format('DD-MM-YYYY HH:mm');
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
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnDetalle'><i class='material-icons'>info</i></button><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button><button class='btn btn-success btn-sm btnCheck'><i class='material-icons'>check</i></button></div></div>",
                "width": "10%"
            }
        ],
        "pageLength": 25,
        /*"columnDefs": [
            { "width": "10%", "targets": 1 },
            { "width": "10%", "targets": 2 },
            { "width": "10%", "targets": 5 },
            { "width": "10%", "targets": 6 },
        ],*/
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
                extend: 'print',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Turnos Parabrisas 141',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Turnos Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
                title: 'Turnos Parabrisas 141',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL'
            },
        ]
    });

    var fila;
    $('#formTurno').submit(function(e) {
        e.preventDefault();
        fecha = $.trim($('#fecha').val());
        nombre = $.trim($('#nombre').val());
        telefono = $.trim($('#telefono').val());
        mail = $.trim($('#mail').val());
        marca = $.trim($('#listaMarcaTurnos option:selected').text());
        modelo = $.trim($('#listaModeloTurnos option:selected').text());
        dominio = $.trim($('#dominio').val());
        cristal = $.trim($('#listaCristalTurnos- option:selected').text());

        divSiguiente = $.map($('#siguiente > div'), div => div.id);
        divListaCristal = [];
        divListaCodigo = [];
        divSiguienteFiltrado = divSiguiente.filter(Boolean);
        divSiguienteFiltrado.forEach(element => divListaCristal.push("#listaCristalTurnos-" + element.substr(17, 18)));
        divSiguienteFiltrado.forEach(element => divListaCodigo.push("#listaCodigos-" + element.substr(17, 18)));

        cristalFinal = '';
        cristalFinal = cristalFinal + cristal + ', ';

        for (i = 0; i < divListaCristal.length; i++) {
            cristal = $.trim($(divListaCristal[i] + ' option:selected').text());
            cristalFinal = cristalFinal + cristal + ', ';
        }
        cristales = cristalFinal.slice(0, -2);

        codCristalCadena = $.trim($('#listaCodigos- option:selected').text());
        cut = codCristalCadena.split('-');
        codCristal = cut[0];

        codigosFinales = '';
        codigosFinales = codigosFinales + $.trim(codCristal) + ', ';

        for (i = 0; i < divListaCodigo.length; i++) {
            codCristalCadena = $.trim($(divListaCodigo[i] + ' option:selected').text());
            cut = codCristalCadena.split('-');
            codCristal = cut[0];
            codigosFinales = codigosFinales + $.trim(codCristal) + ', ';
        }
        codigos = codigosFinales.slice(0, -2);

        arrayCod = codigos.split(', ');

        compania = $.trim($('#compania option:selected').text());

        var trabajoFinal = '';
        $("#trabajo option:selected").each(function() {
            var trabajoSeleccionado = $(this).text();
            trabajoFinal = trabajoFinal + trabajoSeleccionado + ', ';
        });

        descripcion = $.trim($('#descripcion').val());
        valor = $.trim($('#valor').val());
        efectivo = $('#efectivo').prop('checked');

        if (efectivo == true) {
            efectivo = 'Si';
        } else {
            efectivo = 'No';
        }
        $.ajax({
            url: "crudTurnos.php",
            type: "POST",
            datatype: "json",
            data: {
                numero: numero,
                fecha: fecha,
                nombre: nombre,
                telefono: telefono,
                mail: mail,
                marca: marca,
                modelo: modelo,
                dominio: dominio,
                cristal: cristales,
                codCristal: codigos,
                compania: compania,
                trabajo: trabajoFinal,
                descripcion: descripcion,
                valor: valor,
                efectivo: efectivo,
                opcion: opcion
            },
            success: function(data) {
                tablaTurnos.ajax.reload(null, false);
            }
        });
        if (bandera != 'Editar') {
            for (x = 0; x < arrayCod.length; x++) {
                codString = arrayCod[x].toString();
                setCantidad(codString);
            }
        } else {
            for (i = 0; i < arrayCodModificados.length; i++) {
                if (arrayCodModificados[i] != null) {
                    setCantidad(arrayCodModificados[i]);
                    actualizarPedidos(codCristalActual[i]);
                    console.log("Nuevo:", arrayCodModificados);
                    console.log("Viejo:", codCristalActual);
                    console.log("i:", i);
                }
            }
            for (i = 0; i < arrayCodModificadoDel.length; i++) {
                actualizarPedidos(arrayCodModificadoDel[i]);
            }
        }
        $('#cantidadCristalContenedor').hide();
        $('#modalCRUD').modal('hide');
    });

    //Alta
    $("#btnNuevoTurno").click(function() {
        opcion = 1;
        numero = null;
        bandera = 'Alta';
        $("#formTurno").trigger("reset");
        $(".botonEliminar").trigger("click");
        setidSelectCristal();
        $("#cantidadCristal").hide();
        $('#compania').val('0');
        $('#trabajo').multiselect("deselectAll", false).multiselect("refresh");
        $("#modalForm").css("background-color", "#17a2b8");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Alta de Turno");
        $('#modalCRUD').removeAttr("data-backdrop");
        $('#modalCRUD').removeAttr("data-keyboard");
        $('#modalCRUD').modal('show');
    });

    //Detalle
    $(document).on("click", ".btnDetalle", function() {
        fila = $(this).closest("tr");
        data = $('#tablaTurnos').DataTable().row(fila).data();
        telefono = data['telefono'];
        numero = data['numero'];
        mail = data['mail'];
        cristal = data['cristal'];
        codCristal = data['codCristal'];
        compania = data['compania'];
        trabajo = data['trabajo'];
        $('#info0').html(telefono);
        $('#info1').html(mail);
        $('#info2').html(cristal);
        $('#info21').html(codCristal);
        $('#info3').html(compania);
        $('#info4').html(trabajo.slice(0, -2));
        $("#headerDetalle").css("background-color", "#17a2b8");
        $("#headerDetalle").css("color", "white");
        $("#titleDetalle").text("Detalle");
        $('#modalDetalle').modal('show');
    });

    //Editar        
    $(document).on("click", ".btnEditar", function() {
        opcion = 2;
        bandera = 'Editar';
        fila = $(this).closest("tr");
        data = $('#tablaTurnos').DataTable().row(fila).data();
        numero = data['numero'];
        fecha = data['fecha'];
        nombre = data['nombre'];
        telefono = data['telefono'];
        mail = data['mail'];
        marca = data['marca'];
        modelo = data['modelo'];
        dominio = data['dominio'];
        setidSelectCristal();
        arrayCodModificados = [];
        arrayCodModificadoDel = [];
        cristal = data['cristal'];
        codCristal = data['codCristal'];
        codCristalActual = data['codCristal'].split(', ');
        compania = data['compania'];
        trabajo = data['trabajo'];
        descripcion = data['descripcion'];
        valor = data['valor'];
        efectivo = data['efectivo'];

        if (efectivo == 'Si') {
            $("#efectivo").prop('checked', true);
        } else {
            $("#efectivo").prop('checked', false);
        }

        //Para que no quede vacio el combobox de compañia
        valorCompania = $("#compania option:contains(" + compania + ")").val();
        $("#compania").val(valorCompania);

        //Para que no quede vacio el combobox de trabajo
        trabajosIndividuales = trabajo.slice(0, -2).split(', ');
        $('#trabajo').multiselect("deselectAll", false).multiselect("refresh");
        if (trabajosIndividuales[0] != "") {
            for (i = 0; i < trabajosIndividuales.length; i++) {
                ind = $("#trabajo option:contains(" + trabajosIndividuales[i] + ")").val();
                $("#trabajo").multiselect('select', [ind]);
            };
        };

        //Para que no queden vacios los combobox de marca, modelo y cristal
        valorMarca = $("#listaMarcaTurnos option:contains(" + marca + ")").val();
        $("#listaMarcaTurnos").val(valorMarca);

        $.ajax({
            type: "POST",
            url: 'crudTurnos.php',
            datatype: "json",
            data: { marca: marca, opcion: 10 },
            success: function(data) {
                var i = 0;
                var datos = JSON.parse(data);
                $("#listaModeloTurnos").html("<option  value=>Seleccione</option>");
                while (i < datos.length) {
                    $("#listaModeloTurnos").append("<option value=" + i + ">" + datos[i].modelo + "</option>");
                    i = i + 1;
                };
                valorModelo = $("#listaModeloTurnos option:contains(" + modelo + ")").val();
                $("#listaModeloTurnos").val(valorModelo);
            }
        });

        cristales = cristal.split(', ');
        codigos = codCristal.split(', ');
        n = '';
        for (i = 0; i < cristales.length; i++) {
            if (i == 0) {
                insertarCristal(cristales[i], modelo, n);
                insertarCodigo(marca, modelo, cristales[i], codigos[i], n);
            } else {
                insertarCristal(cristales[i], modelo, i - 1);
                insertarCodigo(marca, modelo, cristales[i], codigos[i], i - 1);
            }

        }

        //$("#btn-agregar").trigger('click');
        //agregarCristal();
        //agregarCristal();
        editarCristal(cristal, codCristal);
        $("#fecha").val(moment(fecha).format('YYYY-MM-DD[T]HH:mm[:00]'));
        $("#nombre").val(nombre);
        $("#telefono").val(telefono);
        $("#mail").val(mail);
        $("#dominio").val(dominio);
        $("#descripcion").val(descripcion);
        $("#valor").val(valor);
        $("#efectivo").val(efectivo);
        $("#modalForm").css("background-color", "#007bff");
        $("#modalForm").css("color", "white");
        $("#titleForm").text("Editar Turno");
        $('#modalCRUD').modal('show');
    });

    //Borrar
    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaTurnos').DataTable().row(fila2).data();
        numero = data['numero'];
        codCristal = data['codCristal'];
        codigosBorrar = codCristal.split(', ');
        opcion = 3; //Eliminar        
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
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion, numero: numero },
                    success: function() {
                        tablaTurnos.row(fila.parents('tr')).remove().draw();
                    }
                });
                for (i = 0; i < codigosBorrar.length; i++) {
                    actualizarPedidos(codigosBorrar[i]);
                }
                Swal.fire(
                    '¡Borrado!',
                    'El registro ha sido borrado.',
                    'success'
                )
            }
        })
    });

    //Check
    $(document).on("click", ".btnCheck", function() {
        fila = $(this);
        fila2 = $(this).closest("tr");
        data = $('#tablaTurnos').DataTable().row(fila2).data();
        numero = data['numero'];
        efectivo = data['efectivo'];
        codCristal = data['codCristal'];
        codigosCheck = codCristal.split(', ');
        opcion = 5; //Pasar a tabla historico 
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro que el turno finalizó?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, fue completado',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion, numero: numero },
                    success: function() {
                        tablaTurnos.row(fila.parents('tr')).remove().draw();
                    }
                });
                for (i = 0; i < codigosCheck.length; i++) {
                    checkCantidad(codigosCheck[i]);
                    actualizarPedidos(codigosCheck[i]);
                }
                Swal.fire(
                    '¡Borrado!',
                    'El registro ha sido enviado a la tabla histórico.',
                    'success'
                );
                if (efectivo == 'Si') {
                    valor = data['valor'];
                    $.ajax({
                        url: "crudTurnos.php",
                        type: "POST",
                        datatype: "json",
                        data: { opcion: 6, valor: valor },
                    });
                }
            }
        })
    });

    $("#btnCaja").click(function() {
        opcion = 7;
        $.ajax({
            url: "crudTurnos.php",
            type: "POST",
            datatype: "json",
            data: { opcion: opcion },
            success: function(response) {
                var datos = JSON.parse(response);
                if (datos[0]["SUM(precio)"] == null) {
                    $("#cantidad").text(0);
                } else {
                    $("#cantidad").text(datos[0]["SUM(precio)"]);
                }
            }
        });
        $("#headerCaja").css("background-color", "white");
        $("#headerCaja").css("color", "white");
        $("#titleCaja").text("Total");
        $('#modalCaja').modal('show');
    });

    $("#btnVaciar").click(function() {
        opcion = 8;
        Swal.fire({
            title: '¿Seguro?',
            text: "¿Estas seguro de vaciar la caja?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borralo',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: opcion },
                    success: function() {
                        $("#cantidad").text(0);
                    }
                });
                Swal.fire(
                    '¡Borrado!',
                    'La caja quedó en $0.',
                    'success'
                )
            }
        })
    });

    //Cargar marca del desplegable TURNOS

    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype: "json",
        data: { opcion: 9 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $('#listaMarcaTurnos').html('<option value=>Seleccione</option>');
            $('#listaModeloTurnos').html('<option value=>Seleccione</option>');
            $("#listaCristalTurnos-").html("<option value=>Seleccione</option>");
            $("#listaCodigos-").html("<option value=>Seleccione</option>");
            $(".botonEliminar").trigger('click');
            setidSelectCristal();
            while (i < datos.length) {
                $('#listaMarcaTurnos').append('<option value=' + i + '>' + datos[i].marca + '</option>');
                i = i + 1;
            };
        }
    });

    $('#trabajo').multiselect({
        maxHeight: 250,
        nonSelectedText: 'Seleccione',
        nSelectedText: 'Seleccionados',
        //numberDisplayed: 5 Cantidad maxima de nombres que muestra
    });

    $('#modalCRUD').on("scroll", function() {
        $(document).click();
    });

    $('#btnTurnosHoy').on("click", function() {
        if (busqueda == 'filtrado') {
            tablaTurnos.columns(1).search('').draw();
            busqueda = 'sinFiltro'
        } else {
            fechaHoy = moment(new Date()).format("YYYY-MM-DD");
            tablaTurnos.columns(1).search(fechaHoy).draw();
            busqueda = 'filtrado'

        }
    });

    $("#btnReload").on("click", function() {
        $('#fechaHoy').val("");
        tablaTurnos.columns(1).search('').draw();
    });

    $('#fechaHoy').on("change", function() {
        fechaElegida = $("#fechaHoy").val();
        tablaTurnos.columns(1).search(fechaElegida).draw();
    });

});

//Cargar modelo del desplegable TURNOS, a partir de marca
function getModeloTurnos() {
    //De esta forma al cambiar la marca, no se bugea el cristal siguiente
    $(".botonEliminar").trigger("click");
    marca = $("#listaMarcaTurnos option:selected").text();
    $('#selectCodContenedor').html("");
    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype: "json",
        data: { marca: marca, opcion: 10 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloTurnos").html("<option  value=>Seleccione</option>");
            $("#listaCristalTurnos-").html("<option value=>Seleccione</option>");
            $("#listaCodigos-").html("<option value=>Seleccione</option>");
            $(".botonEliminar").trigger('click');
            setidSelectCristal();
            while (i < datos.length) {
                $("#listaModeloTurnos").append("<option value=" + i + ">" + datos[i].modelo + "</option>");
                i = i + 1;
            };
        }
    });
};

//Cargar cristal del desplegable TURNOS, a partir de modelo
function getMarcaTurnos() {
    modelo = $("#listaModeloTurnos option:selected").text();

    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype: "json",
        data: { modelo: modelo, opcion: 11 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalTurnos-").html("<option value=>Seleccione</option>");
            $("#listaCodigos-").html("<option value=>Seleccione</option>");
            $(".botonEliminar").trigger('click');
            setidSelectCristal();
            while (i < datos.length) {
                $("#listaCristalTurnos-").append("<option value=" + i + ">" + datos[i].cristal + "</option>");
                i = i + 1;
            };

        }
    });
};


//Carga codigo a partir de marca, modelo y cristal
function getCodigos(id) {
    marca = $("#listaMarcaTurnos option:selected").text();
    modelo = $("#listaModeloTurnos option:selected").text();
    cristal = $("#listaCristalTurnos-" + id + " option:selected").text();

    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype: "json",
        data: { marca: marca, modelo: modelo, cristal: cristal, opcion: 15 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCodigos-" + id).html("<option value=>Seleccione</option>");
            while (i < datos.length) {
                $("#listaCodigos-" + id).append("<option value=" + i + ">" + datos[i].codigo + " - " +
                    datos[i].posicion + " - " +
                    datos[i].lado + " - " +
                    datos[i].color + "</option>");
                i = i + 1;
            };
        }
    });
};

//Carga cantidad a partir del CodCristal
function getCristalTurnos(id) {
    codCristalCadena = $.trim($("#listaCodigos-" + id + " option:selected").text());
    cut = codCristalCadena.split('-');
    codCristal = cut[0];
    if (bandera == 'Editar') {
        if ($.isNumeric(id) == false) {
            arrayCodModificados[0] = codCristal;
        } else {
            arrayCodModificados[id + 1] = codCristal;
        }
    }

    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype: "json",
        data: { codCristal: codCristal, opcion: 12 },
        success: function(data) {
            var datos = JSON.parse(data);
            $("#cantidadCristal-" + id).html("<b id=cantidadCristal" + id + ">Cantidad: " + datos[0]["cantidad"] + "</b>");
            $('#cantidadCristalContenedor-' + id).show();
        }
    });
};

function actualizarPedidos(cod) {
    $.ajax({
        url: "crudApedir.php",
        type: "POST",
        datatype: "json",
        data: { opcion: 9, codigo: cod },
        success: function(data) {
            datos = JSON.parse(data);
            if (datos[0]["COUNT(1)"] == 1) {
                $.ajax({
                    url: "crudApedir.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: 10, codigo: cod },
                    success: function(data) {
                        datos = JSON.parse(data);
                        if (datos[0]["cantidad"] == 1) {
                            $.ajax({
                                url: "crudApedir.php",
                                type: "POST",
                                data: { opcion: 1, codigo: cod }
                            });
                        } else {
                            cantidad = datos[0]["cantidad"] - 1;
                            $.ajax({
                                url: "crudApedir.php",
                                type: "POST",
                                data: { opcion: 11, codigo: cod, cantidad: cantidad }
                            });
                        }
                    }
                });
            }
        }
    });
};

idSelectCristal = 0;

function agregarCristal() {
    marca = $("#listaMarcaTurnos option:selected").text();
    modelo = $("#listaModeloTurnos option:selected").text();

    if (marca == 'Seleccione' && modelo == 'Seleccione') {
        Swal.fire({
            title: 'Campos incompletos',
            text: 'Debe ingresar una marca y un modelo para continuar',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    } else {
        $('#primerCristal').clone().appendTo('#siguiente');
        $("#siguiente").children().eq(idSelectCristal).attr('id', 'cristalSiguiente-' + idSelectCristal);
        $("#cristalSiguiente-" + idSelectCristal).children().eq(1).children().eq(0).attr({ 'id': 'listaCristalTurnos-' + idSelectCristal, 'onchange': 'getCodigos(' + idSelectCristal + ')' });
        $("#cristalSiguiente-" + idSelectCristal).children().eq(1).children().eq(1).html("<button type='button' class='botonEliminar btn btn-danger btn-md' style='margin-left: 10px;' onclick='eliminarCristal(\"#cristalSiguiente-" + idSelectCristal + "\")'><i class='fas fa-trash'></i></button>");
        $("#cristalSiguiente-" + idSelectCristal).children().eq(2).children().children().eq(1).attr({ 'id': 'listaCodigos-' + idSelectCristal, 'onchange': 'getCristalTurnos(' + idSelectCristal + ')' });
        $("#cristalSiguiente-" + idSelectCristal).children().eq(2).children().children().eq(2).attr('id', 'cantidadCristalContenedor-' + idSelectCristal);
        $("#cantidadCristalContenedor-" + idSelectCristal).children().eq(1).attr('id', 'cantidadCristal-' + idSelectCristal);
        idSelectCristal = idSelectCristal + 1;
    }
}

function editarCristal(cris, cod) {
    n = cod.split(', ');
    for (i = 0; i < n.length - 1; i++) {
        $('#primerCristal').clone().appendTo('#siguiente');
        $("#siguiente").children().eq(idSelectCristal).attr('id', 'cristalSiguiente-' + idSelectCristal);
        $("#cristalSiguiente-" + idSelectCristal).children().eq(1).children().eq(0).attr({ 'id': 'listaCristalTurnos-' + idSelectCristal, 'onchange': 'getCodigos(' + idSelectCristal + ')' });
        $("#cristalSiguiente-" + idSelectCristal).children().eq(1).children().eq(1).html("<button type='button' class='botonEliminar btn btn-danger btn-md' style='margin-left: 10px;' onclick='eliminarCristal(\"#cristalSiguiente-" + idSelectCristal + "\")'><i class='fas fa-trash'></i></button>");
        $("#cristalSiguiente-" + idSelectCristal).children().eq(2).children().children().eq(1).attr({ 'id': 'listaCodigos-' + idSelectCristal, 'onchange': 'getCristalTurnos(' + idSelectCristal + ')' });
        $("#cristalSiguiente-" + idSelectCristal).children().eq(2).children().children().eq(2).attr('id', 'cantidadCristalContenedor-' + idSelectCristal);
        $("#cantidadCristalContenedor-" + idSelectCristal).children().eq(1).attr('id', 'cantidadCristal-' + idSelectCristal);
        idSelectCristal = idSelectCristal + 1;
    }
}

function eliminarCristal(id) {
    codCristalCadena = $.trim($("#listaCodigos-" + id.substr(18, 19) + " option:selected").text());
    cut = codCristalCadena.split('-');
    codCristal = cut[0];
    arrayCodModificadoDel[id.substr(18, 19)] = codCristal;
    $(id).html("");
    $(id).removeAttr('id');
}

function setidSelectCristal() {
    $("#siguiente").empty();
    idSelectCristal = 0;
}

function setCantidad(codString) {
    $.ajax({
        url: "crudApedir.php",
        type: "POST",
        datatype: "json",
        data: { codigo: codString, opcion: 9 },
        success: function(data) {
            var datos = JSON.parse(data);
            if (datos[0]["COUNT(1)"] == 1) {
                //Si el codigo ya esta pedido, sumo 1 a cantidad
                $.ajax({
                    url: "crudApedir.php",
                    type: "POST",
                    datatype: "json",
                    data: { codigo: codString, opcion: 10 },
                    success: function(data) {
                        var datos = JSON.parse(data);
                        cantidad = parseInt(datos[0]["cantidad"]);
                        cantidad2 = cantidad + 1;
                        $.ajax({
                            url: "crudApedir.php",
                            type: "POST",
                            data: { codigo: codString, cantidad: cantidad2, opcion: 11 }
                        });
                    }
                });
            } else {
                //Sino dame la cantidad, si es 0, insertalo en pedidos
                $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { codCristal: codString, opcion: 13 },
                    success: function(data) {
                        var datos = JSON.parse(data);
                        var cantidad = parseInt(datos[0]["cantidad"]);
                        if (cantidad == 0) {
                            $.ajax({
                                url: "crudStock.php",
                                type: "POST",
                                data: { codigo: codString, opcion: 9 }
                            });
                        }
                    }
                });
            }
        }
    });
}

function checkCantidad(codCheck) {
    $.ajax({
        url: "crudTurnos.php",
        type: "POST",
        datatype: "json",
        data: { codCristal: codCheck, opcion: 13 },
        success: function(data) {
            //Baja cantidad de stock
            var datos = JSON.parse(data);
            cantidad = parseInt(datos[0]["cantidad"]);
            if (cantidad > 0) {
                cantidad2 = cantidad - 1;
                $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    data: { codCristal: codCheck, cantidad: cantidad2, opcion: 14 }
                });
            }
        }
    });
}

function insertarCristal(cris, mod, n) {
    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype: "json",
        data: { modelo: mod, opcion: 11 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalTurnos-" + n).html("<option value=>Seleccione</option>");
            while (i < datos.length) {
                $("#listaCristalTurnos-" + n).append("<option value=" + i + ">" + datos[i].cristal + "</option>");
                i = i + 1;
            };
            valorCristal = $("#listaCristalTurnos-" + n + " option:contains(" + cris + ")").val();
            $("#listaCristalTurnos-" + n).val(valorCristal);
        }
    });
}

function insertarCodigo(mar, mod, cris, cod, m) {
    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype: "json",
        data: { marca: mar, modelo: mod, cristal: cris, opcion: 15 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCodigos-" + m).html("<option value=>Seleccione</option>");
            while (i < datos.length) {
                $("#listaCodigos-" + m).append("<option value=" + i + ">" + datos[i].codigo + " - " +
                    datos[i].posicion + " - " +
                    datos[i].lado + " - " +
                    datos[i].color + "</option>");
                i = i + 1;
            };
            valorCodCristal = $("#listaCodigos-" + m + " option:contains(" + cod + ")").val();
            $("#listaCodigos-" + m).val(valorCodCristal);
        }
    });
}