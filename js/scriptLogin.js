$(function(){
	$(document).on("click", "#btn-password", function() {
		eye = $('#eye')[0].classList;
		console.log("entra", eye)
		if ($('#eye')[0].classList[1] == 'fa-eye') {
			$('#eye').attr('class', 'svg-inline--fa fa-eye-slash fs-110pct');
			$('#password').attr('type', 'text');
		} else {
			$('#eye').attr('class', 'svg-inline--fa fa-eye fs-110pct');
			$('#password').attr('type', 'password');
		};
	});

	$('#formlogin').submit(function(e){
		e.preventDefault();
		var usuario = $.trim($("#usuario").val());
		var password = $.trim($("#password").val());
	
		if (usuario.length == "" || password.length == ""){
		  Swal.fire({
			  title: 'Campos incompletos',
			  text: 'Debe ingresar un Usuario y Contraseña para continuar',
			  icon: 'warning',
			  confirmButtonText: 'OK'
			});
		  return false;
		}else{
			$.ajax({
				url:"../database/login.php",
				type:"POST",
				datatipe: "json",
				data: {usuario:usuario, password:password},
				success:function(data){
					if(data == "null"){
						Swal.fire({
						  title: 'Error',
						  text: 'Usuario y/o Contraseña incorrecta',
						  icon: 'error',
						  confirmButtonColor: '#d33',
						   confirmButtonText: 'OK'
						});
					}else{
						console.log(data)
						Swal.fire({
						  title: 'Exito',
						  text: 'Conexión exitosa!',
						  icon: 'success',
						  showConfirmButton: false,
						  timer: 1500,
						}).then( function(){
							window.location.href = "../php/panel.php";
						})
	
					}
				}
			})
		}
	});
})