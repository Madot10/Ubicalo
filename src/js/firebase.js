// Initialize Firebase
var config = {
    apiKey: "AIzaSyCTdxs3OlcgJouSxdapNBRuir6cRtl7KuM",
    authDomain: "u-bicalo.firebaseapp.com",
    databaseURL: "https://u-bicalo.firebaseio.com",
    projectId: "u-bicalo",
    storageBucket: "u-bicalo.appspot.com",
    messagingSenderId: "534432514058"
};
firebase.initializeApp(config);
let provider = new firebase.auth.GoogleAuthProvider();
let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

let userData;

function isAuth(){
    //return !(firebase.auth().currentUser == null)
    return true;
}

function LogInPopup(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      userData = { email: result.user.email,
                   name: result.user.displayName
                  };
      changeScreen("main");
      document.getElementById("navbarTog").style.display = "-ms-flexbox";    
  
       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      console.log("ok");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });           
  
    }).catch(function(error) {
      // Handle Errors here.
      popError(`Ocurrio un error al iniciar con la cuenta ${error.email} <br> ${error.message} <br> Codigo: ${error.code}`);
    });
  }

function LogOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        userData = null;
        changeScreen("start");
      }).catch(function(error) {
        // An error happened.
        popError(`Ocurrio un error al intentar cerrar con la cuenta ${error.email} <br> ${error.message} <br> Codigo: ${error.code}`);
      });
}

function addRegistro(dnd, hr, sts, catg, descri){
    toggleLoader();
    db.collection("objPerdidos").add({
        description: descri,
        catg: catg,
        hrs: hr,
        where: dnd,
        status: sts,
        timeAdd: new Date()
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        clearForm();
        toggleLoader();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        popError(error);
        toggleLoader();
    });

}

function getAllReg(){
    db.collection("objPerdidos").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data(),doc,doc.data().catg);
            });
    });
}

window.onload = ()=>{
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		  // User is signed in.
		  console.log("ok1",user);
		  userData = { email: user.email,
			name: user.displayName
		   };
		  changeScreen("main");
		} else {
		  // No user is signed in.
		  console.log("no1");
		  //changeScreen("start");
		}
	  });
}
