<?php
    session_start();
    if(isset($_SESSION['s_usuario'])) {
        header("Location: panel.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Login</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" rel="icon" type="image/x-icon" href="../img/favicon.ico">

	<!-- Bootstrap -->
  <link rel="stylesheet" type="text/css" href="../libraries/bootstrap-5.3.0/css/bootstrap.min.css" >

	<!-- Fontawesome -->
    <link rel="stylesheet" type="text/css" href="../libraries/fontawesome-6.4.0/css/all.min.css" >
	<!--<link rel="stylesheet" type="text/css" href="../css/stylesLoginUtil.css">
	<link rel="stylesheet" type="text/css" href="../css/stylesLoginMain.css">-->
	<link rel="stylesheet" type="text/css" href="../css/styles.css">
	<link rel="stylesheet" href="../libraries/sweetalert2/sweetalert2.min.css">
</head>

<body>

<div class="container-scroller-b4">
    <div class="container-fluid page-body-wrapper full-page-wrapper px-0">
      <div id="loginFondo" class="content-wrapper d-flex align-items-center px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-start py-1 px-4 px-sm-5">
              <div class="brand-logo d-flex mt-5 justify-content-center mb-3">
                <img class="wdt-50pct" src="../img/imagotipo-cuadrado-naranja.svg" alt="logo">
              </div>
              <h4 class="text-center fs-4 mb-3">¡Bienvenido!</h4>
              <h6 class="fw-light text-center fs-5 mb-4">Inicia sesión para continuar.</h6>
              <form id="formlogin" class="pt-3" action="" method="POST">
                <div class="form-group mb-3">
                	<input id="usuario" type="text" class="form-control form-control-lg inputForm orangeFocus br4px h-3rem" name="usuario" placeholder="Usuario">
                </div>
                <div class="form-group mb-5">
                  <div class="input-group">
                    <input id="password" type="password" class="form-control form-control-lg inputForm orangeFocus br4px h-3rem" name="password" placeholder="Contraseña">
                    <div id="btn-password" class="input-group-append w-12pct">
                      <span class="input-group-text justify-content-center h-3rem"><i id="eye" class="fa-solid fa-eye fs-110pct"></i></span>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center h-3rem">
                  <button id="btn-login" type="submit" class="btn btn-block btn-orange btn-lg font-weight-medium auth-form-btn w-100">Conectar</button>
                </div>
				        <div class="text-center mt-4 mb-4 font-weight-light">
                    <a href="../index.html" class="volverLogin">Volver</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>

<!-- Jquery -->
<script src="../libraries/jquery/jquery-3.6.4.min.js"></script>
<!-- SweetAlert2 -->
<script src="../libraries/sweetalert2/sweetalert2.all.min.js"></script>
<!-- Custom Script -->
<script src="../js/scriptLogin.js"></script>
<!-- Fontawesome -->
<script src="../libraries/fontawesome-6.4.0/js/all.min.js" type="text/javascript"></script>
<!-- Bootstrap -->
<script src="../libraries/bootstrap-5.3.0/js/bootstrap.min.js" type="text/javascript"></script>

</body>
</html>