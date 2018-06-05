var lsState = [];

var viewHandler = {
    initEventListeners : () => {
        $("#addEntryToPhoneBook").click(() => {
            var name = $("#addPhoneNumberName").val();
            var number = $("#addPhoneNumberNumber").val();

            if (!name || !number){
                alert("Please add data before adding a new entry.");
                return;
            }

            lsState.push(new Contact(name, number));
            viewHandler.refreshTable();
            viewHandler.clearInputFields();
        });
    }
    , refreshTable : () => {
        $("#phoneBookTable").empty();
        $("#phoneBookTable").append("<tr> <th class='phoneBookTableHead'>Name</th> <th class='phoneBookTableHead'>Number</th> </tr>");
        lsState.forEach((contact)=>{
            $("#phoneBookTable").append(viewHandler.buildTableRow(contact.name, contact.phoneNumber));
        });
    }
    , buildTableRow : (strName, strPhoneNumber) => {
        var addTR = document.createElement('tr');
        var nameCell = document.createElement('td');
        nameCell.innerHTML = strName;
        addTR.appendChild(nameCell);

        var numberCell = document.createElement('td');
        numberCell.innerHTML = strPhoneNumber;
        addTR.appendChild(numberCell);
        return addTR;
    }
    , clearInputFields : () => {
        $("#addPhoneNumberName").val('');
        $("#addPhoneNumberNumber").val('');
    }
}

class Contact {
    constructor(strName, strPhoneNumber){
        this.name = strName;
        this.phoneNumber = strPhoneNumber;
    }
}

$(document).ready(()=>{
    viewHandler.initEventListeners();

    lsState.push(new Contact("Clemens Stift", "+4364123456789"));
    lsState.push(new Contact("Anna Weiter", "+4969945487625"));
    lsState.push(new Contact("Can Aktugan", "+3948489275"));

    viewHandler.refreshTable();
});