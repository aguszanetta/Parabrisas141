<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
    <h1>Clientes</h1>
        <div class="row">
            <div class="col-lg-12">
            <div class="table-responsive">     
                <table id="tablaClientes" class="table table-striped table-bordered table-condensed table-hover">
                    <thead class="text-center">
                        <tr>
                            <th>Num Cliente</th>
                            <th>Razon Social</th>
                            <th>Domicilio</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Contactos</th>
                            <th>Cuit/Cuil</th>
                            <th>Condicion Legal</th>
                            <th>Fecha Alta</th>
                            <th>Observaciones</th>
                            <th>Estado</th>
                            <th>domicilioID</th>
                            <th>idLocalidad</th>
                            <th>idCondicionLegal</th>
                            <th>contacto1</th>
                            <th>contacto2</th>
                            <th>calle</th>
                            <th>numero</th>
                            <th>piso</th>
                            <th>depto</th>
                            <th>referencia</th>
                            <th>codPostal</th>
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
<!--Modal para Cliente-->
<div class="modal fade" id="modalCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header modalColor" id="modalClienteHeader">
        <h5 class="modal-title" id="modalClienteTitle">Cliente</h5>
        <button type="button" class="btn text-white-50 ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-xl"></i></button>  
    </div>
      <form id="formCliente" data-estado="" class="form-sample" action="" method="POST">
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="group" class="form-label text-dark">Razón Social</label>
                            <div class="input-group mb-3">
                                <input id="razonSocial" name="group" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="telefono" class="form-label text-dark">Teléfono</label>
                            <div class="input-group mb-3">
                                <input id="telefono" name="telefono" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="email" class="form-label text-dark">Email</label>
                            <div class="input-group mb-3">
                                <input id="email" name="email" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="contacto1" class="form-label text-dark">Contacto 1</label>
                            <div class="input-group mb-3">
                                <input id="contacto1" name="contacto1" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="contacto2" class="form-label text-dark">Contacto 2</label>
                            <div class="input-group mb-3">
                                <input id="contacto2" name="contacto2" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="cuitCuil" class="form-label text-dark">Cuit/Cuil</label>
                            <div class="input-group mb-3">
                                <input id="cuitCuil" name="cuitCuil" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="condicionLegal" class="form-label text-dark">Condición Legal</label>
                            <div class="input-group mb-3">
                                <select name="condicionLegal" id="condicionLegal" class="form-select inputForm" required>
                                    <option value="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="" class="form-label text-dark">Observaciones</label>
                            <textarea class="form-control inputForm" id="observacion" rows="1"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="calle" class="form-label text-dark">Calle</label>
                            <div class="input-group mb-3">
                                <input id="calle" name="calle" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="numero" class="form-label text-dark">Número</label>
                            <div class="input-group mb-3">
                                <input id="numero" name="numero" type="text" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="piso" class="form-label text-dark">Piso</label>
                            <div class="input-group mb-3">
                                <input id="piso" name="piso" type="text" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="departamento" class="form-label text-dark">Departamento</label>
                            <div class="input-group mb-3">
                                <input id="departamento" name="departamento" type="text" class="form-control inputForm" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="codigoPostal" class="form-label text-dark">Código Postal</label>
                            <div class="input-group mb-3">
                                <input id="codigoPostal" name="calle" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="form-label text-dark">Referencia</label>
                            <textarea class="form-control inputForm" id="referencia" rows="1"></textarea>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="localidad" class="form-label text-dark">Localidad</label>
                            <div class="input-group mb-3">
                                <select name="localidad" id="localidad" class="form-select inputForm" required>
                                    <option value="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-editar" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary btn-editar">Guardar</button>
        </div>
      </form>  
    </div>
  </div>
</div>

<!--Modal para Editar Cliente-->
<div class="modal fade" id="modalEditar" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header modalEditar">
        <h5 class="modal-title">Editar</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="formEditarCantidad" class="form-sample" action="" method="POST">
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
                    <span>Copyright &copy; MAV Software - 2025</span>
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

<!-- jsPDF y AutoTable -->
<script src="../libraries/jsPDF-AutoTable/jspdf.umd.min.js"></script>
<script src="../libraries/jsPDF-AutoTable/jspdf.plugin.autotable.min.js"></script>

<!-- Custom Script -->
<script src="../js/scriptPanel.js"></script>
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>
<script type="text/javascript" src="../js/scriptClientes.js"></script>
<!--<script type="text/javascript" src="../js/script.js"></script>-->

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

<!-- MomentJs -->
<script src="../libraries/moment/moment-with-locales.js"></script>

<!-- Select 2 -->
<script src="../libraries/select2/dist/js/select2.min.js"></script>

</body>

</html>