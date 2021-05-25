

$(document).ready(function(){
	getData();
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});

function getData(){
axios({
	method: 'get',
	url: 'http://localhost:3000/empleados/'
}).then(function(res) {
	
	res.data.message.forEach(element => {
		console.log(element);
		let html ='<tr>'
		+'<td>'
		+	'<span class="custom-checkbox">'
		+		'<input type="checkbox" id="checkbox1" name="options[]" value="1">'
		+		'<label for="checkbox1"></label>'
		+	'</span>'
		+'</td>'
		+'<td>'+ element.nombre +'</td>'
		+'<td>'+ element.apellidos+'</td>'
		+'<td>'+element.telefono+'</td>'
		+'<td>'+element.email+'</td>'
		+'<td>'+element.direccion+'</td>'
		+'<td>'
		+	'<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>'
		+	'<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>'
		+	'</td>'
	+'</tr>'; 
	$('#tablaEmpleados > tbody').append(html);

	});
	
}).catch(function(err) {
	console.log(err);
});
}

function insertData(){
    var name = document.getElementsByName("nombre"); 
    var lastName = document.getElementsByName("apellido");    
    var phone = document.getElementsByName("telefono");    
    var correo = document.getElementsByName("correo");    
    var direccion = document.getElementsByName("direccion");    


	axios({
		method: 'post',
		url: 'http://localhost:3000/empleados/',
		data: {
			nombre: name,
			apellidos: lastName,
			telefono: phone,
			correo: correo,
			direccion: direccion
		}
	}).then(function(res) {
		
		res.data.message.forEach(element => {
			console.log(element);
			let html ='<tr>'
			+'<td>'
			+	'<span class="custom-checkbox">'
			+		'<input type="checkbox" id="checkbox1" name="options[]" value="1">'
			+		'<label for="checkbox1"></label>'
			+	'</span>'
			+'</td>'
			+'<td>'+ element.nombre +'</td>'
			+'<td>'+ element.apellidos+'</td>'
			+'<td>'+element.telefono+'</td>'
			+'<td>'+element.email+'</td>'
			+'<td>'+element.direccion+'</td>'
			+'<td>'
			+	'<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>'
			+	'<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>'
			+	'</td>'
		+'</tr>'; 
		$('#tablaEmpleados > tbody').append(html);
	
		});
		
	}).catch(function(err) {
		console.log(err);
	});
	}

	function removeData(){
		axios({
			method: 'delete',
			url: 'http://localhost:3000/empleados/'
		}).then(function(res) {
			
			res.data.message.forEach(element => {
				console.log(element);
				let html ='<tr>'
				+'<td>'
				+	'<span class="custom-checkbox">'
				+		'<input type="checkbox" id="checkbox1" name="options[]" value="1">'
				+		'<label for="checkbox1"></label>'
				+	'</span>'
				+'</td>'
				+'<td>'+ element.nombre +'</td>'
				+'<td>'+ element.apellidos+'</td>'
				+'<td>'+element.telefono+'</td>'
				+'<td>'+element.email+'</td>'
				+'<td>'+element.direccion+'</td>'
				+'<td>'
				+	'<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>'
				+	'<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>'
				+	'</td>'
			+'</tr>'; 
			$('#tablaEmpleados > tbody').append(html);
		
			});
			
		}).catch(function(err) {
			console.log(err);
		});
		}

		function updateData(){
			var name = document.getElementsByName("nombre"); 
			var lastName = document.getElementsByName("apellido");    
			var phone = document.getElementsByName("telefono");    
			var correo = document.getElementsByName("correo");    
			var direccion = document.getElementsByName("direccion");  
			
			axios({
				method: 'put',
				url: 'http://localhost:3000/empleados/',
				data: {
					nombre: name,
					apellidos: lastName,
					telefono: phone,
					correo: correo,
					direccion: direccion
				}
			}).then(function(res) {
				
				res.data.message.forEach(element => {
					console.log(element);
					let html ='<tr>'
					+'<td>'
					+	'<span class="custom-checkbox">'
					+		'<input type="checkbox" id="checkbox1" name="options[]" value="1">'
					+		'<label for="checkbox1"></label>'
					+	'</span>'
					+'</td>'
					+'<td>'+ element.nombre +'</td>'
					+'<td>'+ element.apellidos+'</td>'
					+'<td>'+element.telefono+'</td>'
					+'<td>'+element.email+'</td>'
					+'<td>'+element.direccion+'</td>'
					+'<td>'
					+	'<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>'
					+	'<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>'
					+	'</td>'
				+'</tr>'; 
				$('#tablaEmpleados > tbody').append(html);
			
				});
				
			}).catch(function(err) {
				console.log(err);
			});
			}
			
			function myFunction() {
				// Declare variables
				var input, filter, td, tr, table, i, txtValue;
				input = document.getElementById('searchBar');
				filter = input.value.toUpperCase();
				table = document.getElementById("tablaEmpleados");
				tr = table.getElementsByTagName('tr');
			  
				// Loop through all list items, and hide those who don't match the search query
				for (i = 0; i < td.length; i++) {
				  td = tr[i].getElementsByTagName("td")[0];
				  txtValue = td.textContent || td.innerText;
				  if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				  } else {
					tr[i].style.display = "none";
				  }
				  
				}
			  }