console.log('Welcome');


var app = angular.module("medicos", ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: "/",
                templateUrl: "/templates/landing.html",
                controller: "landingCtrl"
            })
            .when("/landing", {
                templateUrl: "/templates/landing.html",
                controller: "landingCtrl"
            })
            .when("/login", {
                templateUrl: "/templates/dashboard.html",
                controller: "dashboardCtrl"
            })
            .when("/reg", {
                templateUrl: "/templates/register.html",
                controller: "regCtrl"
            })
            .when("/forgot", {
                templateUrl: "/templates/forgot.html",
                controller: "forgotCtrl"
            })
            .when("/patient", {
                templateUrl: "/templates/patient.html",
                controller: "patientCtrl"
            })
    })
    .controller("dashboardCtrl", function($scope, $firebaseArray) {
        $scope.loginAccount = function() {
            var usr = document.getElementById('user').value;
            var pass = document.getElementById('pass').value;

            firebase.auth().signInWithEmailAndPassword(usr, pass)
                .then(function(user) {
                    document.cookie = 'userid=' + user.uid;
                    parent.location = 'doctor.html';
                    console.log('success');
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(error.message);
                });

        }
    })
    .controller("regCtrl", function($scope, $firebaseArray) {


        $scope.register = function() {
            var usr = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var pass = document.getElementById('password').value;
            var cpass = document.getElementById('cpassword').value;
            var docID = document.getElementById('docID').value;
            var special = document.getElementById('special').value;
            var mob = document.getElementById('mob').value;
            var hospital = document.getElementById('hospital').value;
            if (pass != cpass) {
                alert("Passwords not matching");
            } else if (pass.length < 8) {
                alert("Minimum 8 characters");
            } else if (mob.length != 10) {
                alert("Not a valid number");
            } else {

                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(function(user) {
                        var docRef = firebase.database().ref().child('users/' + user.uid + '/').push();
                        docRef.set({
                            name: usr,
                            email: email,
                            docID: docID,
                            Specialization: special,
                            Phone: mob,
                            Hospital: hospital,
                            Key: docRef.key,
                            Order: 0 - Date.now()
                        })

                        alert("Registration Successfull");

                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(error.message + "");
                    });
                console.log("done_reg");
            }
        }
    })

.controller("forgotCtrl", function($scope, $firebaseArray) {
        $scope.forgot = function() {
            var email = document.getElementById('email').value;
            firebase.auth().sendPasswordResetEmail(email);
            alert("Recovery link has been sent");
        }
    })
    .controller("landingCtrl", function($scope, $firebaseArray) {

    })
    .controller("patientCtrl", function($scope, $firebaseArray) {
        $scope.patientLogin = function() {
            var aadhar = document.getElementById('aadharNumber').value;
            if (aadhar.trim() != '') {

                document.cookie = 'userAdhar=' + aadhar;
                window.location = "patient.html";
            } else {
                alert('Enter the Number!');
            }
        }
    });