const optionsList = ["default", "motivational", "jokes", "spirits", "Stress-Relief", "Riddles"];


let selectedValue;
const selectElement = document.getElementById('options');
let storedSelectedChoice = '';
chrome.storage.sync.get(['userSettings']).then(result => {
    if (result.userSettings) {
        console.log('userSetting stored', result.userSettings.category);
        storedSelectedChoice = result.userSettings['category'];
        console.log('storedSelectedChoice', storedSelectedChoice);
    }
    optionsList.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
        if (option === storedSelectedChoice) {
            optionElement.selected = true;
            selectedValue = option;
        }
    });
})

document.getElementById('options').addEventListener('change', function () {
    selectedValue = this.value;

});

document.getElementById('submit').addEventListener('click', function () {
    if (selectElement) {
        chrome.storage.sync.set({ userSettings: { category: selectedValue } }, function () {
            console.log('Category saved as ' + selectedValue);
        });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    }
})