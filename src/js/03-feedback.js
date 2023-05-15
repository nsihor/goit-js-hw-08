const throttle = require('lodash.throttle');

const LOCAL_STORAGE_KEY_FORM_DATA = "feedback-form-state";

const form = document.querySelector('form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const submitButton = form.querySelector('button');

const savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FORM_DATA)) || {};

if (savedFormData.email) {
    emailInput.value = savedFormData.email;
};
if (savedFormData.message) {
    messageInput.value = savedFormData.message;
};

const onThrottleSavingFormData = throttle(e => {
    saveFormDataToLocalStorage()
    // if (e.target === emailInput || messageInput) {
    //     saveFormDataToLocalStorage()
    // }
}, 500);

function saveFormDataToLocalStorage() {
    savedFormData.email = emailInput.value;
    savedFormData.message = messageInput.value;
    localStorage.setItem(LOCAL_STORAGE_KEY_FORM_DATA, JSON.stringify(savedFormData));
};

function onSubmitFormData(e) {
    e.preventDefault();

    console.log(savedFormData);

    localStorage.removeItem(LOCAL_STORAGE_KEY_FORM_DATA);
    messageInput.value = '';
    emailInput.value = '';
}

form.addEventListener('input', onThrottleSavingFormData);

form.addEventListener('submit', onSubmitFormData);
