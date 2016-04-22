'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

   
    // Cette fonction prépare, charge, puis exécute une requête SharePoint pour obtenir des informations sur les utilisateurs actuels
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // Cette fonction est exécutée si l'appel ci-dessus est réussi
    // Elle remplace le contenu de l'élément 'message' par le nom de l'utilisateur
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // Cette fonction est exécutée en cas d'échec de l'appel ci-dessus
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }

    var TestApp = window.TestApp || {};

    TestApp.Customer = function (_id, _title, _firstName, _lastName, _phoneNumber) {

        var f_getID = function () { return _id; },
        f__getTitle = function () { return _title; },
        f_getFirstName = function () { return _firstName; },
        f_getLastName = function () { return _lastName; },
        f_getPhoneNumber = function () { return _phoneNumber; };


        return {
            getID: f_getID,
            getTitle: f__getTitle,
            getFirstName: f_getFirstName,
            getLastName: f_getLastName,
            getPhoneNumber: f_getPhoneNumber
        };
    }

    TestApp.AllService = function () {
        var _allCustomers = ko.observableArray();
        var f_getCustomer = function () {
            var web = context.get_web(),
                   list = web.get_lists().getByTitle('Customer'),
                   items = list.getItems();

            var customers = context.loadQuery(items);

            context.executeQueryAsync(function () {
                customers.forEach(function (customer) {
                    _allCustomers.push(new TestApp.Customer(customer.id, customer.title, customer.firstName, customer.lastName, customer.phoneNumber));
                });
            }, function (error) {
                console.log(error);
            });
        };

        return {
            allCustomers: _allCustomers,
            // ville : _ville,
            // villeDescription : _villeDescription,
            get_Customers: f_getCustomer
        };
    }
    // Ce code s'exécute quand le modèle DOM est prêt. Par ailleurs, il crée un objet de contexte nécessaire à l'utilisation du modèle objet SharePoint
    $(document).ready(function () {
        getUserName();
        var customersService = new TestApp.AllService();
        ko.applyBindings(customersService, document.getElementById('customerSVC'));
        customersService.get_Customers();
    });

}