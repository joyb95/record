
function validateForm() {
	var date = document.getElementById('date').value;
	var name = document.getElementById('name').value;
	var unit = document.getElementById('unit').value;

	if (date == '') {
		alert('Name is required');
		return false;
	}

	if (name == '') {
		alert('Name is required');
		return false;
	}

	if (unit == '') {
		alert('Unit is required');
		return false;
	}

	return true;
}

function showData() {
	var peopleList;
	if (localStorage.getItem('peopleList') == null) {
		peopleList = [];
	}
	else {
		peopleList = JSON.parse(localStorage.getItem('peopleList'));
	}

	var html = '';

	peopleList.forEach(function (element, index) {
		html += '<tr>';
		html += '<td>' + element.date + '</td>';
		html += '<td>' + element.name + '</td>';
		html += '<td>' + element.unit + '</td>';
		html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
		html += '</tr>';
	});

	document.querySelector('#crudTable tbody').innerHTML = html;
}

// Loads all data when document or page loaded
document.onload = showData();

function AddData() {
	if (validateForm() == true) {
		var date = document.getElementById('date').value;
		var name = document.getElementById('name').value;
		var unit = document.getElementById('unit').value;

		var peopleList;
		if (localStorage.getItem('peopleList') == null) {
			peopleList = [];
		}
		else {
			peopleList = JSON.parse(localStorage.getItem('peopleList'));
		}

		peopleList.push({
			date: date,
			name: name,
			unit: unit,
		});

		localStorage.setItem('peopleList', JSON.stringify(peopleList));
		showData();

		document.getElementById('date').value = '';
		document.getElementById('name').value = '';
		document.getElementById('unit').value = '';
	}
}

function deleteData(index) {
	var peopleList;
	if (localStorage.getItem('peopleList') == null) {
		peopleList = [];
	}
	else {
		peopleList = JSON.parse(localStorage.getItem('peopleList'));
	}

	peopleList.splice(index, 1);
	localStorage.setItem('peopleList', JSON.stringify(peopleList));
	showData();
}

function updateData(index) {
	document.getElementById('Submit').style.display = 'none';
	document.getElementById('Update').style.display = 'block';

	var peopleList;
	if (localStorage.getItem('peopleList') == null) {
		peopleList = [];
	}
	else {
		peopleList = JSON.parse(localStorage.getItem('peopleList'));
	}

	document.getElementById('date').value = peopleList[index].date;
	document.getElementById('name').value = peopleList[index].name;
	document.getElementById('unit').value = peopleList[index].unit;

	document.querySelector('#Update').onclick = function () {
		if (validateForm() == true) {
			peopleList[index].date = document.getElementById('date').value;
			peopleList[index].name = document.getElementById('name').value;
			peopleList[index].unit = document.getElementById('unit').value;

			localStorage.setItem('peopleList', JSON.stringify(peopleList));

			showData();

			document.getElementById('date').value = '';
			document.getElementById('name').value = '';
			document.getElementById('unit').value = '';

			document.getElementById('Submit').style.display = 'block';
			document.getElementById('Update').style.display = 'none';
		}
	};
}
