console.log('Welcome');


var app = angular.module("patient", ['ngRoute', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: "/",
                templateUrl: "/patientTemplates/patientPanel.html",
                controller: "patientPanelCtrl"
            })
            .when("/Ppanel", {
                templateUrl: "/patientTemplates/patientPanel.html",
                controller: "patientPanelCtrl"
            })
            .when("/report", {
                templateUrl: "/patientTemplates/report.html",
                controller: "reportCtrl"
            })
            .when("/notifications", {
                templateUrl: "/patientTemplates/notifications.html",
                controller: "notificationsCtrl"
            })
            .when("/hierarchy", {
                templateUrl: "/patientTemplates/hierarchy.html",
                controller: "hierarchyCtrl"
            })
            .when("/custom", {
                templateUrl: "/patientTemplates/custom.html",
                controller: "customCtrl"
            })
    })
    .controller("patientPanelCtrl", function($scope, $firebaseArray) {
        var subRef = firebase.database().ref().child('patients/' + aadharNumber + '/');
        $scope.subsList = $firebaseArray(subRef);
    })
    .controller("reportCtrl", function($scope, $firebaseArray) {})
    .controller("notificationsCtrl", function($scope, $firebaseArray) {
        var nRef = firebase.database().ref().child('Notifications/');
        $scope.notifications = $firebaseArray(nRef);
    })
    .controller("customCtrl", function($scope, $firebaseArray) {
        $scope.custom = function() {
            var title = document.getElementById('title').value;
            var msg = document.getElementById('msg').value;
            if (title.trim() != '' && msg.trim() != '') {
                var customRef = firebase.database().ref().child('Notifications/').push({
                    Title: title,
                    Message: msg
                });
                console.log("notification send!");
            } else {
                alert('Enter the details!');
            }
        }
    })
    .controller("hierarchyCtrl", function($scope, $firebaseArray) {
        $scope.addRelations = function() {
            var aadhar = document.getElementById('adhar').value;
            var rel = document.getElementById('relation').value;
            if (aadhar.trim() != '' && rel.trim() != '') {
                var relRef = firebase.database().ref().child('Relations/' + aadharNumber + '/').push();
                relRef.set({
                    Number: aadhar,
                    Order: 0 - Date.now(),
                    Relation: rel
                })
                document.getElementById('adhar').focus();
                console.log('Updated!');
            } else {
                alert('Enter the Details!');
            }
        }
        var relRef1 = firebase.database().ref().child('Relations/' + aadharNumber + '/');
        $scope.relations = $firebaseArray(relRef1);
    })