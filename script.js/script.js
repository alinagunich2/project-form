//1

window.onload = ()=>{
let nameInput = document.getElementById('name-input')

nameInput.onkeydown = (event) => {
    if ("1234567890".indexOf(event.key) != -1)
      event.preventDefault();
  };

let usernameInput = document.getElementById('name-username')

usernameInput.onkeydown = (event) => {
    if(',.'.indexOf(event.key) != -1)
    event.preventDefault();
};

let inputAgree = document.getElementsByClassName('form__input-agree')[0]

inputAgree.onclick = function(){
    if(inputAgree.checked){
    console.log('Согласен')
    } else {console.log('Не согласен')}
}




let button = document.querySelector('.sign-up')


let error = document.getElementsByClassName('error')
let buttonOk = document.querySelector('.button__ok');
let modal = document.querySelector('.modal');
let form = document.querySelector('form');



let inputs = document.querySelectorAll('input')
let errors = document.querySelectorAll('.error')



let inputValidation = {
    fullName: {
    regExp: /^[А-Я][а-я]+$/,
    errorMsg: 'Full Name может содержатьтолько русские буквы и заглавную букву'
    },
    yourUserName: {
    regExp: /^[а-я\w-]*$/i,
    errorMsg: 'Your username может содерж только буквы цифры символ подчерк'
    },
    email:{
    regExp: /^[^@\s]+@[^@\s]+\.[^@\s]+$/i,
    errorMsg: 'e-mail допуск один символ @ и любые другие симв кроме пробелов' 
    },
    password:{
    regExp: /(?=.*[A-Z])(?=.*\d)(?=.*[-\(\)\.,:;\?!\*\+%<>@\[\]{}\/\\_\{\}\$#])/,
    errorMsg: 'Пароль должен содерж не меньше 8 символ',
    minLenght: 8,
    },
    repeatPassword: {
        errorMsg: 'Пароли не совпадают'
    }
}



let hasError;

function formReg(e){
    e.preventDefault()
    removeErrorsInputs()
    hasError = false;
    let password = ''
    inputs.forEach(itm =>{
        if(isEmptyValue(itm)){
            return
        }
        switch(itm.previousSibling.nodeValue.trim()){
            case 'Full Name': 
                isInvalidInput(itm, inputValidation.fullName.regExp, inputValidation.fullName.errorMsg )
                break;
            case 'Your username': 
                isInvalidInput(itm, inputValidation.yourUserName.regExp, inputValidation.yourUserName.errorMsg )
                break;
            case 'E-mail': 
                isInvalidInput(itm, inputValidation.email.regExp, inputValidation.email.errorMsg )
                break;
            case 'Password': 
                isInvalidInput(itm, inputValidation.password.regExp, inputValidation.password.errorMsg )
                // isPasswordLenghInvalid(itm, inputValidation.password.minLenght, inputValidation.password.errorMsg);
                password = itm.value
                break;
            case 'Repeat Password':
                isPasswordDifferent(password, itm, inputValidation.repeatPassword.errorMsg )
                break;
        }
    })
    if(!hasError){
        console.log('Aut');

        let obj ={
            name: e.target[0].value,
            username: e.target[1].value,
            email: e.target[2].value,
            passw: e.target[3].value,
            repPassw: e.target[4].value,
                }

                let clients = localStorage.getItem('clients')
        if(clients){
            let clientsArray = JSON.parse(clients)
            clientsArray.push(obj)
            localStorage.setItem('clients',JSON.stringify(clientsArray))
        }else{
            let clientsArray =[]
            clientsArray.push(obj)
            localStorage.setItem('clients',JSON.stringify(clientsArray))
        }

        form.reset()

        modal.style.display = 'flex'
    }    
}


form.addEventListener('submit',formReg)


function  removeErrorsInputs(){
    errors.forEach((itm) =>{
        itm.style.display = 'none'
        itm.previousElementSibling.style.borderBottomColor='';
    })
}

function isEmptyValue (input){
    if(!input.value){
        input.nextElementSibling.style.display = 'block'
        input.style.borderBottom = "1px solid red"
        hasError = true;
        return true
    }
}

function isInvalidInput(input, inputRegExp, errorMsg){
    if(!input.value.match(inputRegExp)){
        input.nextElementSibling.innerText = errorMsg
        input.nextElementSibling.style.display = 'block'
        hasError = true;
    }
}



let input = document.getElementsByTagName('input')

let haveAccount = document.getElementsByClassName('main__have-account')[0]
let registration = document.getElementsByClassName('registration')[0]


function signIn (){
    form.reset();

    for(let i =0; i<error.length;i++){
        error[i].style.display='none'
    }
    for(let i =0; i<input.length;i++){
        input[i].style.borderBottom = "1px solid #C6C6C4"
    }
    

    document.getElementsByClassName('main__title')[0].innerText= 'Log in to the system'
    
    document.getElementsByClassName('FullName')[0].remove()
    document.getElementsByClassName('E-mail')[0].remove()
    document.getElementsByClassName('Repeat-Password')[0].remove()

    

   document.getElementsByClassName('form__label-agree')[0].style.display='none'
   button.innerText= 'Sign In'
   haveAccount.style.display='none'

   registration.style.display='block'

   registration.onclick = function(){
    location.reload()
}

   button.onclick = function (e){
   
    e.preventDefault();
    if(!form[0].value.match(/^[a-z0-9_\-]+$/i)){
        error[0].style.display='block'
    }else if(!form[1].value.match(/(?=.*[A-Z])(?=.*\d)(?=.*[-\(\)\.,:;\?!\*\+%<>@\[\]{}\/\\_\{\}\$#])/)){
        error[1].style.display='block'
    } 

        let clients = localStorage.getItem('clients')
        let clientsArray = JSON.parse(clients)
        let user = clientsArray.find((item)=>{
            return item.username === form[0].value
        })

        let userPassword = clientsArray.find((item)=>{
            return item.passw === form[1].value
        })

        if(!user){
            error[0].innerText='Такой пользователь не зарегистрирован'
            error[0].style.display='block'
            return false
        }

        if(!userPassword){
            error[1].innerText='Неверный пароль'
            error[1].style.display='block'
            return false
        }else{
            document.getElementsByClassName('main__title')[0].innerHTML = 'Welcome,'+ form[0].value
            
           let welcom =  document.getElementsByClassName('enter')
           registration.style.display='none'
           for(let i =0; i<welcom.length;i++){
            welcom[i].style.display='none'
        }
        
        haveAccount.style.display='none'

        button.innerText= 'Exit'
            button.onclick = function(){
                location.reload()
            }
        }

        form.reset();
    
   }
}

haveAccount.onclick = signIn

buttonOk.onclick = ()=>{
    modal.style.display = 'none'
    signIn()
}
}

