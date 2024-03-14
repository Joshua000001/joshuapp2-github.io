document.getElementById('btnAdd').addEventListener('click', function() {
  let itemId = document.getElementById('txtItemId').value;
  let fullName = document.getElementById('txtFullName').value;
  let hours = parseInt(document.getElementById('txtHours').value);

  if (!itemId || !fullName || isNaN(hours)) {
    alert('Please fill all fields correctly.');
    return;
  }

  let tableBody = document.getElementById('tblEmployeeHours').querySelector('tbody');
  let existingEmployeeIds = Array.from(tableBody.querySelectorAll('td:first-child')).map(cell => cell.textContent);

  if (selectedRow) {
    // Check if the edited ID is already used by another row
    let editedItemId = document.getElementById('txtItemId').value;
    if (editedItemId !== selectedRow.cells[0].textContent && existingEmployeeIds.includes(editedItemId)) {
      alert('Employee ID already exists.');
      return;
    }

    // Update the selected row
    let cells = selectedRow.cells;
    cells[0].textContent = itemId;
    cells[1].textContent = fullName;
    cells[2].textContent = hours;

    // Reset selected row
    selectedRow = null;
    document.getElementById('btnAdd').textContent = 'Log Hours';
  } else {
    // Check if the ID already exists when adding a new row
    if (existingEmployeeIds.includes(itemId)) {
      alert('Employee ID already exists.');
      return;
    }

    // Add a new row
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

  calculateTotalHours();
});

document.getElementById('tblEmployeeHours').addEventListener('click', function(event) {
  if (event.target.classList.contains('btnDelete')) {
    // Remove the clicked row
    event.target.closest('tr').remove();
    calculateTotalHours();
  } else if (event.target.classList.contains('btnEdit')) {
    // Populate the input fields with row data
    let cells = event.target.closest('tr').cells;
    document.getElementById('txtItemId').value = cells[0].textContent;
    document.getElementById('txtFullName').value = cells[1].textContent;
    document.getElementById('txtHours').value = cells[2].textContent;

    // Change button text to 'Update'
    document.getElementById('btnAdd').textContent = 'Update';

    // Store the selected row
    selectedRow = event.target.closest('tr');
  }
});

function calculateTotalHours() {
  let totalHours = 0;
  let rows = document.getElementById('tblEmployeeHours').querySelectorAll('tbody tr');
  for (let row of rows) {
    totalHours += parseInt(row.cells[2].textContent);
  }
  document.getElementById('totalHoursValue').innerText = totalHours;
}
