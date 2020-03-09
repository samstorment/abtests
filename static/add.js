
// $(document).ready(function(){  
//     var i=1;  
//     $('#add').click(function(){  
//         i++;  
//         $('#dynamic_field').append('<tr id="row'+i+'">  <td><input type="date" name="date" class="form-control name_list" /></td>  <td><input type="time" name="startTime" class="form-control name_list" /></td>   <td><input type="time" name="endTime" class="form-control name_list" /></td>    <td><button type="button" name="remove" id="'+i+'" class="btn btn-danger btn_remove">X</button></td></tr>');  
//     });  
//     $(document).on('click', '.btn_remove', function(){  
//         var button_id = $(this).attr("id");   
//         $('#row'+button_id+'').remove();  
//     });  
//     $('#submit').click(function(){            
//         $.ajax({  
//             url:"name.php",  
//             method:"POST",  
//             data:$('#add_name').serialize(),  
//             success:function(data)  
//             {  
//                 alert(data);  
//                 $('#add_name')[0].reset();
//             }  
//         });  
//     });  
// });  


function deleteRow(id) {
    let table = document.querySelector('#dynamic_body');
    let rowToDelete = document.querySelector(`#row-${id}`);
    table.removeChild(rowToDelete);
}

document.addEventListener("DOMContentLoaded", () => {

    let i = 1;
    let addButton = document.querySelector('#add');

    addButton.addEventListener('click', e => {
        i++;
        let table = document.querySelector('#dynamic_body');
        let row = document.createElement('tr');

        row.setAttribute('id', `row-${i}`);
        {
            var rowInnerHTML = 
            `<td>
                <label for="date-${i}">Date</label>
                <input type="date" name="date-${i}">
            </td>
            <td>
                <label for="start-${i}">Start Time</label>
                <input type="time" name="start-${i}">
            </td>
            <td>
                <label for="end-${i}">End Time</label>
                <input type="time" name="end-${i}">
            </td>
            <td>
                <button type="button" name="delete${i}" id="delete${i}" onClick="deleteRow(${i})">Delete</button>
            </td>`;
        }
        row.innerHTML = rowInnerHTML;
        table.appendChild(row);
    });
});