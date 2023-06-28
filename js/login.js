import {findAccount, showError, setAccounts} from "./functions.js";
const form = document.querySelector('.form');
const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

document.addEventListener('submit', e => {
  e.preventDefault();

  if(e.target === form) {
    const documentId = e.target.documentId.value || "";
    const password = e.target.password.value || "";
    let response;
    
    if(documentId) response = findAccount(documentId);
    
    if(response) {
      if(password !== response.passcode) showError("Contraseña Incorrecta");
      
      if(documentId === response.documentId && password === response.passcode) {
        if(accounts.length > 0) {
          const existingAccount = accounts.find(acc => acc.documentId === documentId);

          if(existingAccount){
              localStorage.setItem("account", JSON.stringify(existingAccount));
              if(existingAccount.dealings) 
                localStorage.setItem("dealings", JSON.stringify(existingAccount.dealings));
          } 
          else {setAccounts(accounts, response);}
        } 
        else {setAccounts(accounts, response);} 

        localStorage.setItem("isLogin", true);
        window.location.href = "index.html";
      }  
    } 
    else {showError("No existe una cuenta asociada con el documento")}
  }
});

