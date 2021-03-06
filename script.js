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
            storageHandler.writeData();
        });
        window.addEventListener("deviceorientation", viewHandler.refreshTable, true);
    }
    , refreshTable : () => {
        $("#phoneBookTable").empty();
        var screenOrientation = window.screen.orientation.type;
        if(screenOrientation && screenOrientation.includes("portrait")){
            $("#phoneBookTable").append("<tr class='portrait'> <th class='phoneBookTableHead'>Name</th> <th class='phoneBookTableHead'>Number</th> </tr>");
        } else {
            $("#phoneBookTable").append("<tr> <th class='phoneBookTableHead'>Name</th> <th class='phoneBookTableHead'>Number</th> </tr>");
        }
        lsState.forEach((contact)=>{
            $("#phoneBookTable").append(viewHandler.buildTableRow(contact.name, contact.phoneNumber));
        });
    }
    , buildTableRow : (strName, strPhoneNumber) => {
        var addTR = document.createElement('tr');
        var screenOrientation = window.screen.orientation.type;
        if(screenOrientation && screenOrientation.includes("portrait")){
            addTR.classList += "portrait";
        }
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

var storageHandler = {
    readData : () => {
        if(!localStorage.getItem('phoneBook')){
            localStorage.setItem('phoneBook', "{}");
        }
        lsState = JSON.parse(localStorage.getItem('phoneBook'));
    }
    , writeData : () => {
        localStorage.setItem('phoneBook', JSON.stringify(lsState));
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

    storageHandler.readData();

    viewHandler.refreshTable();
});