document.getElementById('btnAdd').addEventListener('click', function() {
    let itemId = document.getElementById('txtItemId').value;
    let fullName = document.getElementById('txtFullName').value;
    let hours = parseInt(document.getElementById('txtHours').value);
  
  
    let tableBody = document.getElementById('tblEmployeeHours').querySelector('tbody');
    let newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${itemId}</td>
      <td>${fullName}</td>
      <td>${hours}</td>
      <td><button class="btn btn-sm btn-danger btnDelete">Remove</button></td>
    `;
  
 
    newRow.addEventListener('click', function() {
      this.classList.toggle('selected');
    });
  
    newRow.querySelector('.btnDelete').addEventListener('click', function() {
      this.closest('tr').remove();
      calculateTotalHours();
    });
  
    calculateTotalHours();
  });
  
  function calculateTotalHours() {
    let totalHours = 0;
    let rows = document.getElementById('tblEmployeeHours').querySelectorAll('tbody tr');
    for (let row of rows) {
      totalHours += parseInt(row.cells[2].textContent || row.cells[2].innerText);
    }
    document.getElementById('totalHoursValue').innerText = totalHours;
  }
  