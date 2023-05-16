const throttle = require('lodash.throttle');

const LOCAL_STORAGE_KEY_FORM_DATA = "feedback-form-state";

const form = document.querySelector('form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const submitButton = form.querySelector('button');

const savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FORM_DATA)) || {};

if (savedFormData.email || savedFormData.message) {
    emailInput.value = savedFormData.email;
    messageInput.value = savedFormData.message;
};
// if (savedFormData.message) {
//     messageInput.value = savedFormData.message;
// };

const onThrottleSavingFormData = throttle(e => {
    savedFormData.email = emailInput.value;
    savedFormData.message = messageInput.value;
    localStorage.setItem(LOCAL_STORAGE_KEY_FORM_DATA, JSON.stringify(savedFormData));
}, 500);

function onSubmitFormData(e) {
    e.preventDefault();

    if (savedFormData.email && savedFormData.message) {
        console.log(savedFormData);
        localStorage.removeItem(LOCAL_STORAGE_KEY_FORM_DATA);
        form.reset();
    } else {
        window.alert('Fill in the blank fields!')
    }
}

form.addEventListener('input', onThrottleSavingFormData);

form.addEventListener('submit', onSubmitFormData);
