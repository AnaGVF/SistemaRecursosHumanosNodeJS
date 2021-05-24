

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
		+'<td>Facultad de Informática</td>'
		+'<td>igcard@mail.com</td>'
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
