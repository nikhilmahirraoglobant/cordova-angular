'use strict';

/**
 * @ngdoc service
 * @name core.Services.CordovaContacts
 * @description CordovaContacts Factory
 */
angular
    .module('core')
    .factory('$cordovaContacts', function($q) {

        return {
            save: function(contact) {
                var q = $q.defer();
                var deviceContact = navigator.contacts.create({"displayName": contact});

                deviceContact.save(function(result) {
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                });
                return q.promise;
            },

            remove: function(contact) {
                var q = $q.defer();
                var deviceContact = navigator.contacts.create({"displayName": contact});

                deviceContact.remove(function(result) {
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                });
                return q.promise;
            },

            clone: function(contact) {
                var deviceContact = navigator.contacts.create(contact);
                return deviceContact.clone(contact);
            },

            find: function(searchTerm) {
                var q = $q.defer();
                
                var options = new ContactFindOptions();
                options.filter = searchTerm;
                options.multiple = true;
                options.desiredFields = [navigator.contacts.fieldType.id];
                options.hasPhoneNumber = true;
                
                var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];

                //delete options.fields;
                
                if (Object.keys(options).length === 0) {
                    navigator.contacts.find(fields, function(results) {
                        q.resolve(results);
                    }, function(err) {
                        q.reject(err);
                    }, options);
                } else {
                    navigator.contacts.find(fields, function(results) {
                        q.resolve(results);
                    }, function(err) {
                        q.reject(err);
                    }, options);
                }
                return q.promise;
            },

            pickContact: function() {
                var q = $q.defer();

                navigator.contacts.pickContact(function(contact) {
                    q.resolve(contact);
                }, function(err) {
                    q.reject(err);
                });

                return q.promise;
            }

            // TODO: method to set / get ContactAddress
            // TODO: method to set / get ContactError
            // TODO: method to set / get ContactField
            // TODO: method to set / get ContactName
            // TODO: method to set / get ContactOrganization
        };
    });
