<?php require_once "dash_top.php" ?>
<!---- Contenido Principal ---->
<div class="container-fluid">
    <h1>Cristales a Pedir</h1>
        <div class="row">
            <div class="col-lg-12">
            <div class="table-responsive">     
                <table id="tablaAPedir" class="table table-striped table-bordered table-condensed table-hover">
                    <thead class="text-center">
                        <tr>
                            <th>idAPedir</th>
                            <th>Código</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Cristal</th>
                            <th>Descripción</th>
                            <th>Posición</th>
                            <th>Lado</th>  
                            <th>Color</th>
                            <th>Cantidad</th>
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

<!--Modal para Agregar Cristal APedir-->
<div class="modal fade" id="modalAgregarCristal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header modalAlta">
        <h5 class="modal-title">Agregar Cristal</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="formAgregarCristal" class="form-sample" action="" method="POST">
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="marca" class="form-label text-dark">Marca</label>
                        <div class="input-group mb-3">
                            <select name="marca" id="marca" class="form-select inputForm" required>
                                <option value="">Marca</option>
                                <option value="1">ALFA ROMEO</option>
                                <option value="2">AUDI</option>
                                <option value="3">BMW</option>
                                <option value="4">CHERY</option>
                                <option value="5">CHEVROLET</option>
                                <option value="6">CITROEN</option>
                                <option value="7">DAEWOO</option>
                                <option value="8">DAIHATSU</option>
                                <option value="9">DODGE/CHRYSLER</option>
                                <option value="10">FIAT</option>
                                <option value="11">FORD</option>
                                <option value="12">HONDA</option>
                                <option value="13">HYUNDAI</option>
                                <option value="14">KIA-ASIA</option>
                                <option value="15">MAZDA</option>
                                <option value="16">MERCEDES BENZ</option>
                                <option value="17">MITSUBISHI</option>
                                <option value="18">NISSAN</option>
                                <option value="19">OPEL</option>
                                <option value="20">PEUGEOT</option>
                                <option value="21">RENAULT</option>
                                <option value="22">ROVER</option>
                                <option value="23">SCANIA</option>
                                <option value="24">SEAT</option>
                                <option value="25">SMART</option>
                                <option value="26">SSANG YONG</option>
                                <option value="27">SUBARU</option>
                                <option value="28">SUZUKI</option>
                                <option value="29">TOYOTA</option>
                                <option value="30">VOLKSWAGEN</option>
                                <option value="31">VOLVO</option>
                            </select>
                        </div>
                    </div>
                </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="modelo" class="form-label text-dark">Modelo</label>
                            <div class="input-group mb-3">
                                <select name="modelo" id="modelo" class="form-select inputForm" required>
                                    <option value="">Modelo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="cristal" class="form-label text-dark">Cristal</label>
                        <div class="mb-3">
                            <select name="cristal" id="cristal" class="form-select inputForm">
                                <option value="">Cristal</option>
                            </select>
                            <p id="alertaAPedir" class="text-danger text-center dispNone"></p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="cantidad" class="form-label text-dark">Cantidad</label>
                    <input id="cantidad" name="cantidad" type="number" min="0" class="form-control inputForm">
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

<!--Modal para Editar APedir-->
<div class="modal fade" id="modalEditar" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header modalEditar">
        <h5 class="modal-title">Editar</h5>
        <button type="button" class="btn text-white-50 ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-xl"></i></button>
      </div>
      <form id="formEditarAPedir" class="form-sample" action="" method="POST">
        <input id="idStock" name="idStock" type="number" value=""  hidden>
        <div class="modal-body">
            <div class="row">
                <label for="aPedir" class="form-label text-dark">Cantidad</label>
                <div class="input-group mb-3">
                    <input id="aPedir" name="aPedir" type="number" min="0" class="form-control inputForm" required>
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

<!--Modal para Detalle APedir-->
<div class="modal fade" id="modalDetalle" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header modalDetalle">
        <h5 class="modal-title" id="titleDetalle">Modal title</h5>
        <button type="button" class="btn text-white-50 ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-xl"></i></button>
      </div>
      <div class="modal-body">
        <div class="table-responsive">
            <table class="table table-hover table-bordered table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Descripción</th>
                        <td id="info00APedir"></td>
                    </tr>
                    <tr>
                        <th scope="row">Posición</th>
                        <td id="info01APedir"></td>
                    </tr>
                    <tr>
                        <th scope="row">Lado</th>
                        <td id="info02APedir"></td>
                    </tr>
                    <tr>
                        <th scope="row">Color</th>
                        <td id="info03APedir"></td>
                    </tr>
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

<!-- Jquery -->
<script src="../libraries/jquery/jquery-3.6.4.min.js"></script>

<!-- Custom Script -->
<script src="../js/scriptPanel.js"></script>
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>
<script type="text/javascript" src="../js/scriptApedir.js"></script>
<script type="text/javascript" src="../js/script.js"></script>

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