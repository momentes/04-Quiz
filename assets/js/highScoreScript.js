let backBtnEl = document.querySelector('#back');
backBtnEl.addEventListener('click', handleBackBtn);
let olEl = document.querySelector("ol");

function handleBackBtn() {
    location.replace('index.html');
}

document.querySelector('#clear').addEventListener('click', function() {
    localStorage.clear();
    olEl.innerHTML = '';
});

let records = JSON.parse(localStorage.getItem("record"));
let recordArray = [];

for (let name in records) {
    recordArray.push([name, records[name]]);
}

recordArray.sort(function(a, b) {
    return b[1] - a[1];
});

for (let record of recordArray) {
    let liEl = document.createElement('li');
    liEl.textContent = record[0] + ": " + record[1];
    olEl.appendChild(liEl);
}