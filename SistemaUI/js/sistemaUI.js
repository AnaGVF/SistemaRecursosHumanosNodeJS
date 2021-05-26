//const { get } = require("../../routes/empleados");

window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if(localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
    } else {
        window.location.href = "index.html";
    }
}

var employeeSelected;
$(document).ready(function () {
	getData();
	// Activar tooltip
	$('[data-toggle="tooltip"]').tooltip();

	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function () {
		if (this.checked) {
			checkbox.each(function () {
				this.checked = true;
			});
		} else {
			checkbox.each(function () {
				this.checked = false;
			});
		}
	});
	checkbox.click(function () {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
});

function getData() {
	axios({
		method: 'get',
		url: 'http://localhost:3000/empleados/'
	}).then(function (res) {
		
		res.data.message.forEach(element => {
			console.log(element);
			let html = '<tr>'
				+ '<td>'
				+ '<span class="custom-checkbox">'
				+ '<input type="checkbox" id="checkbox1" name="options[]" value="1">'
				+ '<label for="checkbox1"></label>'
				+ '</span>'
				+ '</td>'
				+ '<td>' + element.nombre + '</td>'
				+ '<td>' + element.apellidos + '</td>'
				+ '<td>' + element.telefono + '</td>'
				+ '<td>' + element.email + '</td>'
				+ '<td>' + element.direccion + '</td>'
				+ '<td>'
				+ "<a href='#editEmployeeModal' class='edit' onclick='prepareModalData("+element.id+", this)' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' data-original-title='Edit'></i></a>"
				+ '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>'
				+ '</td>'
				+ '</tr>';
			$('#tablaEmpleados > tbody').append(html);

		});

	}).catch(function (err) {
		console.log(err);
	});
}

function prepareModalData(id, event){
	console.log("click");
	employeeSelected = id;
	$("#editNombre").val($(event).closest('tr').find('td')[1].innerText);
	$("#editApellido").val($(event).closest('tr').find('td')[2].innerText);
	$("#editTelefono").val($(event).closest('tr').find('td')[3].innerText);
	$("#editCorreo").val($(event).closest('tr').find('td')[4].innerText);
	$("#editDireccion").val($(event).closest('tr').find('td')[5].innerText);
}

// Insertar Datos 
function insertData() {
	var name = document.getElementById("Nombre").value;
	var lastName = document.getElementById("Apellido").value;
	var phone = document.getElementById("Telefono").value;
	var correo = document.getElementById("Correo").value;
	var direccion = document.getElementById("Direccion").value;

	axios({
		method: 'post',
		url: 'http://localhost:3000/empleados/create',
		data: {
			nombre: name,
			apellidos: lastName,
			telefono: phone,
			email: correo,
			direccion: direccion
		}
	}).then(function(res) {
		getData();
		$('#addEmployeeModal').modal('hide');		
	}).catch(function (err) {
		console.log(err);
	});
}

// Borrar Datos 
function removeData() {
	var elementoBorrar = document.getElementsByClassName("delete");
	console.log(elementoBorrar);
	axios({
		method: 'delete',
		url: 'http://localhost:3000/empleados/'	
	}).then(function (res) {

	getData();
	$('#deleteEmployeeModal').modal('hide');

	}).catch(function (err) {
		console.log(err);
	});
}

// Modificar Datos 
function updateData() {
		var id = document.getElementById("id");
		var name = document.getElementsByName("nombre");
		var lastName = document.getElementsByName("apellido");
		var phone = document.getElementsByName("telefono");
		var correo = document.getElementsByName("correo");
		var direccion = document.getElementsByName("direccion");
		let url = 'http://localhost:3000/empleados/:'+id+'';
	axios({
		method: 'put',
		url: url,
		data: {
			nombre: name,
			apellidos: lastName,
			telefono: phone,
			correo: correo,
			direccion: direccion
		}
	}).then(function (res) {

	getData();
	$('#editEmployeeModal').modal('hide');	

	}).catch(function (err) {
		console.log(err);
	});
}

function myFunction() {
	// Variables
	var input, filter, td, tr, table, i, txtValue;
	input = document.getElementById('searchBar');
	filter = input.value.toUpperCase();
	table = document.getElementById("tablaEmpleados");
	tr = table.getElementsByTagName('tr');

	// Ciclar todos los items y esconder los que no cumplen con la búsqueda
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[i];
		if (td) {
		  txtValue = td.textContent || td.innerText;
		  if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		  } else {
			tr[i].style.display = "none";
		  }
		}
	  }
}

// Función logout 
function logout() {
	window.localStorage.removeItem('token');	
	window.location.href = "login.html";
}