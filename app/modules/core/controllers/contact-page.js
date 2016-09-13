'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.ContactPageController
 * @description ContactPageController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('ContactPageController', function($scope, $cordovaContacts) {

        $scope.contacts = [];

        $scope.addContact = function() {
            $cordovaContacts.save($scope.contactForm).then(function(result) {
                // Contact saved
                alert("Contact saved "+$scope.contactForm);
            }, function(err) {
                // Contact error
                alert("Contact not saved "+err);
            });
        };

        $scope.getAllContacts = function() {
            $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
                $scope.contacts = allContacts;
                alert($scope.contacts[0]);
            }, function(err) {
                // Contact error
                alert("Cant found Contact "+err);
            });
        };

        

        $scope.findContactsBySearchTerm = function(searchTerm) {
            /*var opts = { //search options
                filter: searchTerm, // 'Bob'
                multiple: true, // Yes, return any contact that matches criteria
                fields: [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name], // These are the fields to search for 'bob'.
                desiredFields: [navigator.contacts.fieldType.id] //return fields.
            };*/

            /*if ($ionicPlatform.isAndroid()) {
                opts.hasPhoneNumber = true; //hasPhoneNumber only works for android.
            };*/

            console.log(navigator.contacts);
            
            $cordovaContacts.find(searchTerm).then(function(contactsFound) {
                $scope.contacts = contactsFound;
                alert("Found contacts "+JSON.stringify(contactsFound[0]));
            }, function(err) {
                // Contact error
                alert("Cant found Contact "+err);
            });
        };

        $scope.pickContactUsingNativeUI = function() {
            $cordovaContacts.pickContact().then(function(contactPicked) {
                $scope.contact = contactPicked;
                console.log(contactPicked);
            }, function(err) {
                // Contact error
                alert("Cant Pick Contact "+err);
            })
        };

    });
