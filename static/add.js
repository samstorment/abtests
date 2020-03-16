
var min = new Date();
var max = new Date();
var dd = min.getDate();
var mm = min.getMonth()+1; //January is 0!
var yyyy = min.getFullYear();

var minyyyy = yyyy - 1;
var maxyyyy = yyyy + 1;

if(dd < 10){
    dd='0'+dd
} 
if(mm < 10){
    mm='0'+mm
} 

min = minyyyy + '-' + mm + '-' + dd;
max = maxyyyy + '-' + mm + '-' + dd;

document.querySelector("#date-1").setAttribute("min", min);
document.querySelector("#date-1").setAttribute("max", max);


function deleteRow(id) {
    let table = document.querySelector('#dynamic-body');
    let rowToDelete = document.querySelector(`#row-${id}`);
    table.removeChild(rowToDelete);
}

document.addEventListener("DOMContentLoaded", () => {
    let i = 1;
    let addButton = document.querySelector('#add');

    addButton.addEventListener('click', e => {
        i++;
        let table = document.querySelector('#dynamic-body');
        let row = document.createElement('tr');

        row.setAttribute('id', `row-${i}`);
        {
            var rowInnerHTML = 
            `<td>
                <input type="date" class="form-control" name="date-${i}" min="${min}" max="${max}" required>
            </td>
            <td>
                <input type="time" class="form-control" name="start-${i}" required>
            </td>
            <td>
                <input type="time" class="form-control" name="end-${i}" required>
            </td>
            <td>
                <button type="button" class="btn btn-danger" name="delete${i}" id="delete${i}" onClick="deleteRow(${i})"><i class="fa fa-minus"></i></button>
            </td>`;
        }
        row.innerHTML = rowInnerHTML;

        table.appendChild(row);
    });
});