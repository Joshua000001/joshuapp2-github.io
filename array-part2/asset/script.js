document.addEventListener('DOMContentLoaded', function () {
  let selectedRow = null;
  let originalItemId = null;

  document.getElementById('btnAdd').addEventListener('click', function() {
    let itemId = document.getElementById('txtItemId').value;
    let fullName = document.getElementById('txtFullName').value;
    let hours = parseInt(document.getElementById('txtHours').value);

    let tableBody = document.getElementById('tblEmployeeHours').querySelector('tbody');
    let existingEmployeeIds = Array.from(tableBody.querySelectorAll('td:first-child')).map(cell => cell.textContent);

    if (selectedRow) {
      let editedItemId = document.getElementById('txtItemId').value;
      if (editedItemId !== originalItemId && existingEmployeeIds.includes(editedItemId)) {
        alert('Employee ID already exists.');
        return;
      }

      updateRow(selectedRow, itemId, fullName, hours);
      selectedRow = null;
      document.getElementById('btnAdd').textContent = 'Log Hours';
    } else {
      if (existingEmployeeIds.includes(itemId)) {
        alert('Employee ID already exists.');
        return;
      }

      addRow(tableBody, itemId, fullName, hours);
    }

    calculateTotalHours();
  });

  document.getElementById('tblEmployeeHours').addEventListener('click', function(event) {
    if (event.target.classList.contains('btnDelete')) {
      deleteRow(event.target.closest('tr'));
    } else if (event.target.classList.contains('btnEdit')) {
      editRow(event.target.closest('tr'));
    }
  });

  function updateRow(row, itemId, fullName, hours) {
    let cells = row.cells;
    cells[1].textContent = fullName;
    cells[2].textContent = hours;
  }

  function addRow(tableBody, itemId, fullName, hours) {
    let newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${itemId}</td>
      <td>${fullName}</td>
      <td>${hours}</td>
      <td><button class="btn btn-sm btn-danger btnDelete">Remove</button></td>
      <td><button class="btn btn-sm btn-primary btnEdit">Edit</button></td>
    `;

    newRow.addEventListener('click', function() {
      this.classList.toggle('selected');
      selectedRow = this;
    });
  }

  function deleteRow(row) {
    row.remove();
    calculateTotalHours();
  }

  function editRow(row) {
    let cells = row.cells;
    document.getElementById('txtItemId').value = cells[0].textContent;
    document.getElementById('txtFullName').value = cells[1].textContent;
    document.getElementById('txtHours').value = cells[2].textContent;

    document.getElementById('btnAdd').textContent = 'Update';
    selectedRow = row;
    originalItemId = cells[0].textContent;
  }

  function calculateTotalHours() {
    let totalHours = 0;
    let rows = document.getElementById('tblEmployeeHours').querySelectorAll('tbody tr');
    for (let row of rows) {
      totalHours += parseInt(row.cells[2].textContent);
    }
    document.getElementById('totalHoursValue').innerText = totalHours;
  }
});

