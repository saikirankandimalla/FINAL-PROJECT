const firebaseConfig = {
    apiKey: "AIzaSyD3MDqHIQpuvhUoi0FOOCVnfdzD_TcYeEM",
    authDomain: "fixer-d7b99.firebaseapp.com",
    projectId: "fixer-d7b99",
    storageBucket: "fixer-d7b99.appspot.com",
    messagingSenderId: "951386388638",
    appId: "1:951386388638:web:a379e6806b2c5cf3a4638f"
  };
  firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const database = firebase.database();

// Function to validate email
function validateEmail(email) {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(validEmail);
}

// Function to validate password
function validatePassword(password) {
  const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return password.match(validPassword);
}

// Register function
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('name').value;

  if (!validateEmail(email) || !validatePassword(password)) {
      alert('Enter correct email and password');
      return;
  }

  auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
          const user = auth.currentUser;
          const userRef = database.ref('users/' + user.uid);
          const user_data = {
              email: email,
              name: full_name,
              last_login: Date.now()
          };

          userRef.set(user_data)
              .then(() => {
                  alert('User Created!!');
              })
              .catch((error) => {
                  alert(error.message);
              });
      })
      .catch((error) => {
          alert(error.message);
      });
}
function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('User signed in:', user);
    })
    .catch((error) => {
      // Handle Errors here.
      console.error('Error signing in:', error);
    });
}
