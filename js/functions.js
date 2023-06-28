import bankAccounts from "./data.js";

const MAX_BALANCE = 5000000;
const MIN_BALANCE = 100000;

export const findAccount = (documentId) => bankAccounts.find(acc => acc.documentId === documentId);

export const showError = (message) => {
  const alert = document.querySelector(".error-alert");
  alert.classList.remove("none");
  document.querySelector(".error-msg").textContent = message;

  setTimeout(() => {
    alert.classList.add('none');
  }, 4000);      
}

export const insertCash = (obj, amount) => {
    if((obj.balance + amount) > MAX_BALANCE) return;
    
    obj.balance += amount;
    localStorage.setItem("account", JSON.stringify(obj));
    return true;
}

export const withdrawCash = (obj, amount) => {
    if((obj.balance - amount) < MIN_BALANCE) return;
    
    obj.balance -= amount;
    localStorage.setItem("account", JSON.stringify(obj));
    return true;
}

export const setAccounts = (arr, obj) => {
  arr.push(obj);
  localStorage.setItem("accounts", JSON.stringify(arr));  
  localStorage.setItem("account", JSON.stringify(obj));
}
