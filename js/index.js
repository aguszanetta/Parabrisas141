function menuToggler() {
    if ($("#menu-lateral").hasClass("show")) {
        $("#menu-lateral").removeClass("show");
    } else {
        $("#menu-lateral").addClass("show");
    };
}

recaptcha("home", nada);

function recaptcha(action, callback) {
    grecaptcha.ready(function() {
        grecaptcha.execute('6LfqBLQUAAAAAGSdIr5eherstYCwqxhHVwvS1em-', {
            action: action
        }).then(function(token) {
            var response = token;
            var accion = "recaptcha";
            $.ajax({
                type: 'GET',
                url: "api.php",
                data: {
                    accion: accion,
                    response: response
                },
                contentType: 'application/json;',
                dataType: 'json',
                success: function(respuesta) {
                    if (respuesta.success == true && respuesta.score > 0.5) {
                        callback();
                    } else {
                        mostrarMensajeError("En este momento no se puede realizar la acción", "Danger");
                    };
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        });
    });
}

$("#contacto").click(function() {
    var nombre = $("#contacto-nombre").val();
    var email = $("#contacto-email").val();
    var telefono = $("#contacto-telefono").val();
    var mensaje = $("#contacto-mensaje").val();

    var errores = 0;

    if (nombre == "") {
        errores++;
        mostrarMensajeError("El campo Nombre es obligatorio", "danger");
    };

    if (telefono == "") {
        errores++;
        mostrarMensajeError("El campo Teléfono es obligatorio", "danger");
    };

    if (email == "") {
        errores++;
        mostrarMensajeError("El campo Email es obligatorio", "danger");
    };

    if (mensaje == "") {
        errores++;
        mostrarMensajeError("El campo Mensaje es obligatorio", "danger");
    };

    if (errores == 0) {
       recaptcha("contacto", enviarContacto);
    };

})

function nada() {

}

function enviarContacto() {
    console.log("Entra")
    var contenido = $("#contacto").html();

    $("#contacto").html('<i class="fas fa-cog fa-spin"></i> Enviando...');

    var nombre = $("#contacto-nombre").val();
    var email = $("#contacto-email").val();
    var telefono = $("#contacto-telefono").val();
    var mensaje = $("#contacto-mensaje").val();

    var accion = "enviarcontacto";
    $.ajax({
        type: 'GET',
        url: "api.php",
        data: {
            accion: accion,
            nombre: nombre,
            email: email,
            telefono: telefono,
            mensaje: mensaje,
        },
        contentType: 'application/json;',
        dataType: 'json',
        success: function(respuesta) {
            if (respuesta.resultado == true) {
                mostrarMensajeError("Su contacto ha sido enviado", "success");
                $("#contacto-nombre").val("");
                $("#contacto-email").val("");
                $("#contacto-telefono").val("");
                $("#contacto-mensaje").val("");
                $("#contacto").html(contenido);
            } else {
                mostrarMensajeError("En este momento no se puede realizar la acción", "danger");
                $("#contacto").html(contenido);
            };
        },
        error: function(xhr, textStatus, errorThrown, respuesta) {
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
            console.log(respuesta);
            $("#contacto").html(contenido);
        }
    });

}

function mostrarMensajeError(mensaje, tipo) {
    toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "6000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    }

    switch (tipo) {
        case "danger":
            toastr["error"](mensaje, "Error");
            break;
        case "success":
            toastr["success"](mensaje, "Éxito");
            break;
    }
}