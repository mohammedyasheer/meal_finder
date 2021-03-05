//Global Varaibles
const username = document.getElementById('username'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      password2 = document.getElementById('password2'),
      form = document.getElementById('form');

//functions

//showError
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerHTML = message;
}

//showSuccess
function showSuccess(input) {
  const formControl  = input.parentElement;
  formControl.className = 'form-control success';
}

//Email Validation
function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(re.test(email.value.trim())){
    showSuccess(email);
   }else{
     showError(email , 'Email is not Valid')
   }
}

//Check Required
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if(input.value.trim() === ''){
        showError(input , `${getFieldName(input)} is required`);
    }else{
      showSuccess(input);
    }
  });
  }

  //get Field Name

  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  //check password

  function checkPassword(input, min, max) {
    if(input.value.length < min ){
      showError(input, `${getFieldName(input)} must be grater than ${min}`);
    }
    else if(input.value.length > max) {
      showError(input, `${getFieldName(input)} must be less than ${max}`);
    }else{
      showSuccess(input);
    }
  }

  function checkMatch(input1, input2) {
    if(input1.value !== input2.value){
      showError(input2,`${getFieldName(input2)} does not match`);
    }
  }
//Event Listerner
form.addEventListener('submit', function(event){
  event.preventDefault();
  // if(username.value === ''){
  //   showError(username, 'Username required');
  // }else{
  //   showSuccess(username);
  // }
  // if(email.value === ''){
  //   showError(email, 'Email required');
  //   }
  //   else if(!isValidEmail(email.value)) {
  //     showError(email, 'Enter Vaid Email');
  //   }
  //   else{
  //   showSuccess(email);
  // }
  // if(password.value === ''){
  //   showError(password, 'Password required');
  // }else{
  //   showSuccess(password);
  // }
  // if(password2.value === ''){
  //   showError(password2, 'Password2 required');
  // }else{
  //   showSuccess(password2);
  // }

  checkRequired([username,email,password,password2]);
  checkPassword(password ,6, 23);
  checkPassword(password2 ,6, 23);
  checkMatch(password , password2);
  isValidEmail(email);
});

