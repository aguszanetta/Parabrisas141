<?php require_once "dash_top.php" ?>
<?php
    if(($_SESSION['s_rol'] != "mav")) {
        ob_start(); // Inicia el buffer de salida
        // Todo tu código PHP aquí
        header('Location: login.php'); // Esto no dará error aunque haya contenido antes
        ob_end_clean();
    }
?>

<!---- Contenido Principal ---->
<div class="container-fluid">
	<h1>Turnos</h1>
    
<!--Modal para Cargar Precio-->
      <form id="formPrecio" class="form-sample" action="" method="POST">
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <div id="contentArchivos" class="bg-white my-4 p-0">
                        <div id="wrapperArchivo" class="wrapperArchivo col-lm-2 m-5"> 
                            <input id="archivoListaPrecio" name="archivoListaPrecio" class="file-input" type="file" accept=".csv" hidden="">
                            <!--<i class="fa-solid fa-cloud-arrow-up fa-2xl"></i> 
                            <p class="mb-0">Subir Archivos</p> 
                            <p class="mb-1 mt-0">o</p>-->
                            <button id="btnCargarPrecio" type="button" class="btn btn-orange br7px">Seleccione Archivo</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="empresa" class="form-label text-dark">Lista de Precios</label>
                            <div class="input-group mb-3">
                                <select name="listaPrecio" id="listaPrecio" class="form-select inputForm" required>
                                    <option value="">Lista de Precios</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="fileList">
        </div>
        <div class="modal-footer">
            <button id="btn-eliminarTurno" type="button" class="btn btn-danger me-auto">Eliminar</button>
            <button type="submit" class="btn btn-primary btn-editar">Guardar</button>
        </div>
      </form>  
    </div>
  </div>

<div class="bg-white mt-2 p-2">
    <h3 id="info">Info</h3>
    <h4>Marcas Nuevas</h4>
    <ul id="marcasNuevas">
    </ul>
    <h4>Modelos Nuevos</h4>
    <ul id="modelosNuevos">
    </ul>
    <h4>Cristales Nuevos</h4>
    <ul id="cristalesNuevos">
    </ul>
    <h4>Cristales Baja</h4>
    <ul id="cristalesBaja">
    </ul>
</div>
</div>
<!----------------------------->
</div>
<!-- End of Main Content -->

<!-- Footer -->
<footer class="sticky-footer bg-white">
    <div class="container my-auto">
        <div class="copyright text-center my-auto">
            <span>Copyright &copy; MAV Software - 2024</span>
        </div>
    </div>
</footer>
<!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>-->

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header modalLogout">
            <h5 class="modal-title">¿Listo para salir?</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">Seleccione "Cerrar sesión" a continuación si desea finalizar la sesión.</div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <a class="btn btn-primary decorationNone" href="../database/logout.php" role="button" >Cerrar sesión</a>
        </div>
        </div>
    </div>
</div>
</div>

<!-- Jquery -->
<script src="../libraries/jquery/jquery-3.6.4.min.js"></script>

<!-- Custom Script -->
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>
<script type="text/javascript" src="../js/scriptCargarPrecios.js"></script>

<!-- SweetAlert2 -->
<script src="../libraries/sweetalert2/sweetalert2.all.min.js"></script>

<!-- Fontawesome -->
<script src="../libraries/fontawesome-6.4.0/js/all.min.js" type="text/javascript"></script>

<!-- Bootstrap  -->
<script src="../libraries/bootstrap-5.3.0/js/bootstrap.bundle.min.js"></script>

</body>
</html>