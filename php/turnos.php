<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
	<h1>Turnos</h1>
    <div id='calendar' class="mb-3"></div>
   
<!--Modal para Turno-->
<div class="modal fade" id="modalTurno" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header modalColor" id="modalTurnoHeader">
        <h5 class="modal-title" id="modalTurnoTitle">Turno</h5>
        <button id="btn-editarTurno" type="button" class="btn text-white-50 ms-auto btn-header"><i class="fa-solid fa-pen-to-square fa-lg"></i></button>
        <button id="btn-finalizarTurno" type="button" class="btn text-white-50 ms-2 btn-header"><i class="fa-solid fa-check fa-lg"></i></button>
        <!--<button type="button" class="btn-close btn-close-white ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"></button>-->
        <button type="button" class="btn text-white-50 ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-xl"></i></button>  
    </div>
      <form id="formTurno" class="form-sample" action="" method="POST">
        <div class="modal-body">
            <div class="row">
                <label for="contacto" class="form-label text-dark">Contacto</label>
                <div class="input-group mb-3">
                    <input id="contacto" name="contacto" type="text" class="form-control inputForm">
                </div>
                <label for="fecha" class="form-label text-dark">Fecha</label>
                <div class="input-group mb-3">
                    <input id="fecha" name="fecha" type="date" class="form-control inputForm" disabled>
                </div>
                <label for="hora" class="form-label text-dark">Hora</label>
                <div class="input-group mb-3">
                    <input id="hora" name="hora" type="time" class="form-control inputForm">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button id="btn-eliminarTurno" type="button" class="btn btn-danger me-auto">Eliminar</button>
            <button id="btn-ok" type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            <button type="button" class="btn btn-secondary btn-editar" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary btn-editar">Guardar</button>
        </div>
      </form>  
    </div>
  </div>
</div>
<!----------------------------->
</div>
<!-- End of Main Content -->

<!-- Footer -->
<footer class="sticky-footer bg-white">
    <div class="container my-auto">
        <div class="copyright text-center my-auto">
            <span>Copyright &copy; MAV Software - 2023</span>
        </div>
    </div>
</footer>
<!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

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
<script src="../js/scriptPanel.js"></script>
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>
<script type="text/javascript" src="../js/scriptTurnos.js"></script>

<!-- SweetAlert2 -->
<script src="../libraries/sweetalert2/sweetalert2.all.min.js"></script>

<!-- Fontawesome -->
<script src="../libraries/fontawesome-6.4.0/js/all.min.js" type="text/javascript"></script>

<!-- Bootstrap  -->
<script src="../libraries/bootstrap-5.3.0/js/bootstrap.bundle.min.js"></script>

<!-- Full Calendar -->
<script src="../libraries/fullcalendar-6.1.5/dist/index.global.min.js"></script>

<!-- MomentJs 
<script src="../libraries/moment/moment.js"></script>-->
</body>
</html>