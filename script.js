(function () {
const cityStart = document.getElementById('cityStart-id');
const cityFinish = document.getElementById('cityFinish-id');
const budget = document.getElementById('budget-id');
const dateStart = document.getElementById('date-start-id');
const dateEnd = document.getElementById('date-end-id');
const persons = document.getElementById('persons-select');
const transfer = document.getElementById('transfer-select');
const cardsPrint = document.getElementById('cards');
const startFunc = document.getElementById('onClick');

const storageVal = localStorage.getItem("trip_database");
const database = (storageVal) ? JSON.parse(storageVal) : [];
cardsPrint.innerHTML = String(printObject().join(''));

startFunc.onclick = getValue;

function getValue() {
    if (!cityStart.value || !cityFinish.value) {
        alert('Empty City start or City finish!');
        return;
    }
    if (isNaN(budget.value)) {
        alert('Budget error: Please input number without letters!');
        return;
    }
    if (dateStart.value > dateEnd.value) {
        alert('Date start is earlier than Date end!');
        return;
    }

    const travel = {
        cityStart: cityStart.value,
        cityFinish: cityFinish.value,
        budget: budget.value,
        dateStart: dateStart.value,
        dateEnd: dateEnd.value,
        persons: persons.value,
        transfer: transfer.value
    };

    database.push(travel);
    localStorage.setItem("trip_database", JSON.stringify(database));

    cardsPrint.innerHTML = String(printObject().join(''));
    location.reload();
}

function printObject() {
    return database.map(function (object, index) {
        return `<div style="display: flex; flex-direction: row; justify-content: space-between;
    background-color:  #669127; border-radius: 7px; margin: 10px 0; padding: 10px 20px">
        <div>
            <h2>From ${object.cityStart} to ${object.cityFinish}</h2>
            <p>Expected budget: ${object.budget} ILS</p>
            <p>${object.dateStart} - ${object.dateEnd} | ${object.persons} persons | ${object.transfer}</p>
        </div>
        <div>
            <p>
                <img src="./images/edit.png" alt="edit" style="width: 25px; padding-right: 5px; cursor: pointer">
                <img src="./images/cancel.png" alt="delete" style="width: 25px; padding-right: 5px; cursor: pointer" 
                title="click to delete element" class="delete-button" record_id="${index}">
                <img src="./images/dots.png" alt="dots" style="width: 25px; padding-right: 5px; cursor: pointer">
            </p>
        </div>
    </div>`;
    })
}

// Delete object
document.querySelectorAll('img.delete-button').forEach(function (object) {
    object.onclick = function () {
        const indexForDelete = Number(object.getAttribute('record_id'));

        database.splice(indexForDelete, 1);
        localStorage.setItem("trip_database", JSON.stringify(database));

        cardsPrint.innerHTML = String(printObject().join(''));
        location.reload();
    }
})

}) ();

