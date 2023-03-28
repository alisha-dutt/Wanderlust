// client-side js functions
function confirmDelete() {
    return confirm('Are you sure you want to delete this?');
}

function comparePasswords() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm').value;
    let passwordMessage = document.getElementById('passwordMessage');

    if (password != confirmPassword) {
        passwordMessage.innerText = "Passwords do not match";
        passwordMessage.className = "text-danger";
        return false;
    }
    else {
        passwordMessage.innerText = "";
        passwordMessage.className = "";
        return true;
    }
}
function showHide() {
    const passwrd = document.getElementById("password");
    const icon = document.getElementById("imgShowHide");
    
    if (passwrd.type == "password") {
      passwrd.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwrd.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }
