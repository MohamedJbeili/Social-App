let logoutBtn =document.querySelector("#logout")

const axios = require('axios');

function login() {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    axios
      .post("https://tarmeezacademy.com/api/v1/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
          // Hide the modal using Bootstrap's Modal instance
      let modalElement = document.querySelector("#loginModal");
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        let newModalInstance = new bootstrap.Modal(modalElement);
        newModalInstance.hide();
      }
      showNotification("logged in is successfully")
        isLoggedIn();
      })
      .catch((error) => {
    
        showNotification(error.response.data.message,"danger")
      }
      );
  }
  // to test if the User loggrd in or not
  function isLoggedIn() {
    let add = document.querySelector("#add")
    if (localStorage.getItem("token") == null) {
      document.querySelector("#log-in-buttons").setAttribute('style', 'display:flex !important')
      document.querySelector("#log-out-buttons").setAttribute('style', 'display:none !important')
      if(add!=null){
        add.setAttribute('style', 'display:none !important')
      }
     
      
      
    }
    else {
      document.querySelector("#log-in-buttons").setAttribute('style', 'display:none !important')
      document.querySelector("#log-out-buttons").setAttribute('style', 'display:flex !important')
      let user = getCurrentUser()
      if(add!=null){
        add.style.display = "flex"
      }
      document.querySelector("#nav-username").innerHTML = user.username
      document.querySelector("#nav-user-image").src = user.profile_image
    }
  }
  function getCurrentUser(){
    let user = null
    if(localStorage.getItem("user") != 'null'){
       user = JSON.parse(localStorage.getItem("user"))
      
    }
   return user
    // let content = `<span id="userSpan" class="me-2"><strong>${user.username}</strong></span>`
    // logoutBtn.insertAdjacentHTML('beforebegin', content);
  }

  isLoggedIn();

  // to logout
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showNotification("logged out is successfully ")
    isLoggedIn();
  }
  
   // to register a new User
  function register() {
    let formData = new FormData(document.getElementById('register-form'))
    console.log(formData)
    axios.post("https://tarmeezacademy.com/api/v1/register", formData,{
      'headers':{
        'Content-Type':'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(formData)
        console.log(response.data.user)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        showNotification("register is successfully ")
        const modal = document.querySelector("#registerModal");
        const modatInstance = bootstrap.Modal.getInstance(modal);
        modatInstance.hide();
        isLoggedIn();
      })
      .catch((error) => showNotification(error.response.data.message,"danger"));
  }

  // to show Notifications
  function showNotification(message,type="success"){
    let content = `
<div class="alert alert-${type} alert-dismissible" role="alert">
  <div>${message}</div>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  ` 
document.querySelector('#notifications').innerHTML = content
  setTimeout(() => {
    document.querySelector('#notifications').innerHTML =""
    }, 2000);
  
  
 }