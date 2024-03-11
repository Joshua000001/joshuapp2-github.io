let Execute = document.getElementById("btnExecute");

Execute.addEventListener('click', function() {
    let rowCount = document.getElementById("txtRowCount").value;
    let colCount = document.getElementById("txtColCount").value;
    let tableBody = document.getElementById("div-wrapper");
    let tableContent = "";

    for (let x= 1; x <= rowCount; x++) {
        tableContent += "<tr>";
        for (let j = 1; j <= colCount; j++) {
            let cellValue = x * j;
            tableContent += "<td class='table-none text-white hover 'style=' text-align: center;'>" + cellValue + "</td>";
        }
        tableContent += "</tr>";
    }

    tableBody.innerHTML = tableContent;
});


let Options = "";
for (let opts = 1; opts <= 1000; opts++) {
  Options += "<option value='" + opts + "'>" + opts + "</option>";
}

document.getElementById("selOptions").innerHTML = Options;
