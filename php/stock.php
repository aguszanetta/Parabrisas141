<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
    <h1>Stock</h1>
        <div class="row">
            <div class="col-lg-12">
            <div class="table-responsive">     
                <table id="tablaStock" class="table table-striped table-bordered table-condensed table-hover">
                    <thead class="text-center">
                        <tr>
                            <th>idStock</th>
                            <th>Código</th>
                            <th>
                            <select id="marcaStock" class="form-select selectTabla">
                              <option value="" selected>Marca</option>
                            </select>
                            </th>
                            <th>
                            <select id="modeloStock" class="form-select selectTabla">
                              <option value="" selected>Modelo</option>
                            </select>
                            </th>
                            <th>
                            <select id="cristalStock" class="form-select selectTabla">
                              <option value="" selected>Cristal</option>
                            </select>
                            </th>
                            <th>Descripción</th>
                            <th>Posición</th>
                            <th>Lado</th>  
                            <th>Color</th>
                            <th>Cantidad</th>
                            <!--<th>Precio Final</th>-->
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>                
            </div>
            </div>
        </div>  
</div>
<!--Modal para Editar Stock-->
<div class="modal fade" id="modalEditar" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header modalEditar">
        <h5 class="modal-title">Editar</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="formEditarCantidad" class="form-sample" action="" method="POST">
        <input id="idStock" name="idStock" type="number" value=""  hidden>
        <div class="modal-body">
            <div class="row">
                <label for="cantidad" class="form-label text-dark">Cantidad</label>
                <div class="input-group mb-3">
                    <input id="cantidad" name="cantidad" type="number" min="0" class="form-control inputForm" required>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
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

<!-- SweetAlert2 -->
<script src="../libraries/sweetalert2/sweetalert2.all.min.js"></script>

<!-- Custom Script -->
<script src="../js/scriptPanel.js"></script>
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>    
<script type="text/javascript" src="../js/scriptStock.js"></script>

<!-- Fontawesome -->
<script src="../libraries/fontawesome-6.4.0/js/all.min.js" type="text/javascript"></script>

<!-- Bootstrap core JavaScript -->
<script src="../libraries/bootstrap-5.3.0/js/bootstrap.bundle.min.js"></script>

<!-- datatables JS -->
<script type="text/javascript" src="../libraries/DataTables/datatables.min.js"></script>
<script type="text/javascript" src="../libraries/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="../libraries/DataTables/DataTables-1.13.4/js/dataTables.bootstrap5.min.js"></script>

<!-- Search Builder Datatables JS -->
<script src="../libraries/DataTables/SearchBuilder-1.4.2/js/dataTables.searchBuilder.min.js"></script>
<script src="../libraries/DataTables/SearchBuilder-1.4.2/js/searchBuilder.bootstrap5.min.js"></script>
<script src="../libraries/DataTables/DateTime-1.4.0/js/dataTables.dateTime.min.js"></script>

<!-- Botones Datatables JS -->
<script src="../libraries/DataTables/Buttons-2.3.6/js/dataTables.buttons.min.js"></script>
<script src="../libraries/DataTables/Buttons-2.3.6/js/buttons.html5.min.js"></script> 
<script src="../libraries/DataTables/Buttons-2.3.6/js/buttons.print.min.js"></script>
<script src="../libraries/DataTables/JSZip-2.5.0/jszip.min.js"></script>    
<script src="../libraries/DataTables/pdfmake-0.1.36/pdfmake.min.js"></script>    
<script src="../libraries/DataTables/pdfmake-0.1.36/vfs_fonts.js"></script>

</body>

</html>