console.log('Welcome');


var app = angular.module("doctor", ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: "/",
                templateUrl: "/doctorTemplates/doctorPanel.html",
                controller: "doctorPanelCtrl"
            })
            .when("/DPanel", {
                templateUrl: "/doctorTemplates/doctorPanel.html",
                controller: "doctorPanelCtrl"
            })
            .when("/docDB", {
                templateUrl: "/doctorTemplates/doctorDB.html",
                controller: "doctorDBCtrl"
            })
            .when("/docNew", {
                templateUrl: "/doctorTemplates/doctorNew.html",
                controller: "doctorNewCtrl"
            })
            .when("/docPatient", {
                templateUrl: "/doctorTemplates/docPatient.html",
                controller: "docPatientCtrl"
            })
    })
    .controller("doctorPanelCtrl", function($scope, $firebaseArray) {
        $(document).ready(function() {
            $(".button-collapse").sideNav();
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                today: 'Today',
                clear: 'Clear',
                close: 'Ok',
                closeOnSelect: false // Close upon selecting a date,
            });
            $('.modal').modal();
            $('select').material_select();
        })
        var docRef = firebase.database().ref().child('users/' + doctorID + '/');
        $scope.doc = $firebaseArray(docRef);



    })
    .controller("doctorDBCtrl", function($scope, $firebaseArray) {
        $(document).ready(function() {
            $(".button-collapse").sideNav();
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                today: 'Today',
                clear: 'Clear',
                close: 'Ok',
                closeOnSelect: false // Close upon selecting a date,
            });
            $('.modal').modal();
            $('select').material_select();
        })
        var docRef = firebase.database().ref().child('users/' + doctorID + '/');
        $scope.doc = $firebaseArray(docRef);
        $scope.search = true;
        $scope.searchPatient = function() {
            var aadhar = document.getElementById('adhar').value;
            if (aadhar.trim() != '') {
                var dbRef = firebase.database().ref().child('patients/' + aadhar + '/');
                $scope.bdlist = $firebaseArray(dbRef);
                $scope.search = false;
            } else {
                alert('Enter the number!');
            }
        }
        $scope.sideNavClose = function() {
            $('#sideNavDB').css('left', '-250px');
            $('#sideNavDB').css('transition', 'all .3s ease');
        }
        $scope.navTrigger = function() {
            $('#sideNavDB').css('left', '0');
            $('#sideNavDB').css('transition', 'all .3s ease');
        }
    })
    .controller("doctorNewCtrl", function($scope, $firebaseArray) {
        $(document).ready(function() {
            $(".button-collapse").sideNav();
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                today: 'Today',
                clear: 'Clear',
                close: 'Ok',
                closeOnSelect: false // Close upon selecting a date,
            });
            $('.modal').modal();
            $('select').material_select();
        })
        var docRef = firebase.database().ref().child('users/' + doctorID + '/');
        $scope.doc = $firebaseArray(docRef);
        $scope.navTrigger = function() {
            $('#sideNav').css('left', '0');
            $('#sideNav').css('transition', 'all .3s ease');
        }
        $scope.sideNavClose = function() {
            $('#sideNav').css('left', '-250px');
            $('#sideNav').css('transition', 'all .3s ease');
        }
        $scope.addItems = function() {

            var adhar = document.getElementById('adhar').value;
            var name = document.getElementById('name').value;
            var age = document.getElementById('age').value;
            var weight = document.getElementById('weight').value;
            var symptoms = document.getElementById('symptoms').value;
            var medicines = document.getElementById('medicines').value;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            if (adhar.trim() != '' && name.trim() != '' && age.trim() != '' && weight.trim() != '' && symptoms.trim() != '' && medicines.trim() != '') {
                var addSubscriptionRef = firebase.database().ref('patients/' + adhar + '/').push();
                addSubscriptionRef.set({
                    Name: name,
                    Age: age,
                    Weight: weight,
                    Symptoms: symptoms,
                    Medicines: medicines,
                    Date: today,
                    ID: addSubscriptionRef.key,
                    Order: 0 - Date.now()
                });
                var addSubscriptionRefDoc = firebase.database().ref(doctorID + '/').push();
                addSubscriptionRefDoc.set({
                    Name: name,
                    Age: age,
                    Weight: weight,
                    Symptoms: symptoms,
                    Date: today,
                    Medicines: medicines,
                    ID: addSubscriptionRef.key,
                    Order: 0 - Date.now()
                });
                console.log('Updated');
                document.getElementById('adhar').focus();
            } else {
                alert('Enter Details!');
            }
        }

    })
    .controller("docPatientCtrl", function($scope, $firebaseArray) {
        $(document).ready(function() {
            $(".button-collapse").sideNav();
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                today: 'Today',
                clear: 'Clear',
                close: 'Ok',
                closeOnSelect: false // Close upon selecting a date,
            });
            $('.modal').modal();
            $('select').material_select();
        })
        var docRef = firebase.database().ref().child('users/' + doctorID + '/');
        $scope.doc = $firebaseArray(docRef);
        $scope.navTrigger = function() {
            $('#sideNav').css('left', '0');
            $('#sideNav').css('transition', 'all .3s ease');
        }


        $scope.sideNavClose = function() {
            $('#sideNav').css('left', '-250px');
            $('#sideNav').css('transition', 'all .3s ease');
        }
        var patientRef = firebase.database().ref().child(doctorID + '/');
        $scope.patientDoc = $firebaseArray(patientRef);

    })