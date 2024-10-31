
<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
    <h1>Lista de Precios La Caja</h1>
    
    <!--<div class="row">
      <div class="col-md-3">
      <select id="marca" class="form-select mb-3">
      <option value="" selected>Seleccione Marca</option>
      </select>
      </div>
      <div class="col-md-3">
        <select id="modelo" class="form-select mb-3">
        <option value="" selected>Seleccione Modelo</option>
        </select>
      </div>
      <div class="col-md-3">
        <select id="cristal" class="form-select mb-3">
          <option value="" selected>Seleccione Cristal</option>
        </select>
      </div>
      <div class="col-md-3">
        <button id="limpiarFiltros" type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button>
      </div>
    </div>-->
	<div class="row">
            <div class="table-responsive">        
                <table id="tablaLP" data-empresa="laCaja" class="table table-striped table-bordered table-condensed table-hover">
                    <thead class="text-center">
                        <tr>
                            <th>idPrecio</th>
                            <th>Código</th>
                            <th>
                            <select id="marca" class="form-select selectTabla">
                              <option value="" selected>Marca</option>
                            </select>
                            </th>
                            <th>
                            <select id="modelo" class="form-select selectTabla">
                              <option value="" selected>Modelo</option>
                            </select>
                            </th>
                            <th>
                            <select id="cristal" class="form-select selectTabla">
                              <option value="" selected>Cristal</option>
                            </select>
                            </th>
                            <!--
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Cristal</th>
                            -->
                            <th>Descripcion</th>
                            <th>Posición</th>
                            <th>Lado</th>  
                            <th>Color</th>
                            <th>Precio S/IVA</th>
                            <th>Instalación S/IVA</th>
                            <th>Total S/IVA</th>
                            <th>Total C/IVA</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
    </div>  
</div>
<!--Modal para Detalle LP-laCaja-->
<div class="modal fade" id="modalDetalle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header modalDetalle">
        <h5 class="modal-title" id="titleDetalle">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="table-responsive">
            <table class="table table-hover table-bordered table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Descripción</th>
                        <td id="info00LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Posición</th>
                        <td id="info01LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Lado</th>
                        <td id="info02LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Color</th>
                        <td id="info03LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Precio Sin Iva</th>
                        <td id="info04LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Instalación Sin Iva</th>
                        <td id="info05LP"></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
      </div>
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

<!-- Jquery -->
<script src="../libraries/jquery/jquery-3.6.4.min.js"></script>

<!-- Custom Script -->
<script src="../js/scriptPanel.js"></script>
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>
<script type="text/javascript" src="../js/scriptListaPrecios.js"></script>

<!-- SweetAlert2 -->
<script src="../libraries/sweetalert2/sweetalert2.all.min.js"></script>

<!-- Fontawesome -->
<script src="../libraries/fontawesome-6.4.0/js/all.min.js" type="text/javascript"></script>

<!-- Bootstrap  -->
<script src="../libraries/bootstrap-5.3.0/js/bootstrap.bundle.min.js"></script>

<!-- datatables JS -->
<script type="text/javascript" src="../libraries/DataTables/datatables.min.js"></script>
<script type="text/javascript" src="../libraries/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="../libraries/DataTables/DataTables-1.13.4/js/dataTables.bootstrap5.min.js"></script>

<!-- Botones Datatables JS -->
<script src="../libraries/DataTables/Buttons-2.3.6/js/dataTables.buttons.min.js"></script>
<script src="../libraries/DataTables/Buttons-2.3.6/js/buttons.html5.min.js"></script> 
<script src="../libraries/DataTables/Buttons-2.3.6/js/buttons.print.min.js"></script>
<script src="../libraries/DataTables/JSZip-2.5.0/jszip.min.js"></script>    
<script src="../libraries/DataTables/pdfmake-0.1.36/pdfmake.min.js"></script>    
<script src="../libraries/DataTables/pdfmake-0.1.36/vfs_fonts.js"></script>

</body>
</html>