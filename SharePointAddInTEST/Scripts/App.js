'use strict';

var SPHostUrl;
var SPAppWebUrl;

// read URL parameters
function retrieveQueryStringParameter(param) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == param) {
            return singleParam[1];
        }
    }
}


SPAppWebUrl = decodeURIComponent(retrieveQueryStringParameter("SPAppWebUrl"));
SPHostUrl = decodeURIComponent(retrieveQueryStringParameter("SPHostUrl"));

//Get the ViewModel in during the document load so that all observable will be available for the Databindng 
$(document).ready(function () {
    getModel();

});

//Function to Instantiate the ViewModel
function getModel() {
    var vm = new crudViewModel();

    ko.applyBindings(vm);
    vm.getCustomers();
}

var crudViewModel = function () {
    var self = this;
    var listName = "Customer";

    self.Id = ko.observable();
    self.Title = ko.observable();
    self.FirstName = ko.observable();
    self.LastName = ko.observable();

    self.Customer = {
        Id: self.Id,
        Title: self.Title,
        FirstName: self.FirstName,
        LastName: self.LastName
    };

    self.url = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
    "/web/lists/getbytitle('" + listName + "')/items?" +
    "@target='" + SPHostUrl + "'";

    self.Customers = ko.observableArray();
    self.error = ko.observable();

    //Function to Read all Categories 
    self.getCustomers = function () {
        $.ajax({
            url: self.url,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }, // return data format
            success: function (data) {
                self.Customers(data.d.results);
            },
            error: function (data) {
                self.error("Error in processing request " + data.success);
            }
        });
    };

    //Function to Create  Customer
    self.createCustomer = function () {
        var itemType = "SP.Data.CustomerListItem";
        var customer = {
            "__metadata": { "type": itemType },
            "Id": self.Id,
            "Title": self.Title,
            "FirstName": self.FirstName,
            "LastName": self.LastName
        };

        $.ajax({
            url: self.url,
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: ko.toJSON(customer),
            headers: {
                "Accept": "application/json;odata=verbose", // return data format
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                self.getCustomers();
                self.clear();
            },
            error: function (data) {
                self.error("Error in processing request " + data.status);
            }
        });
    };

    //Function to get Specific Customer based upon Id
    function getCustomerById(callback) {
        var id = self.Id();

        var url = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
      "/web/lists/getbytitle('" + listName + "')/items(" + id + ")?" +
      "@target='" + SPHostUrl + "'";

        //  var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")";


        $.ajax({
            url: url,
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" }, // return data format
            success: function (data) {
                // alert(JSON.stringify(data.d.__metadata.uri));
                //self.Title(data.d.Title);
                //self.CustomerName(data.d.CustomerName);
                callback(data);
            },
            error: function (data) {
                self.error("Error in processing request");
            }
        });

    };

    //Function to Update Customer
    self.updateCustomer = function () {

        getCustomerById(function (data) {
            var itemType = "SP.Data.CustomerListItem";
            var id = self.Id();
            var customer = {
                "__metadata": { "type": itemType },
                "Id": self.Id,
                "Title": self.Title,
                "FirstName": self.FirstName,
                "LastName": self.LastName
            };
            var url = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
        "/web/lists/getbytitle('" + listName + "')/items(" + id + ")?" +
        "@target='" + SPHostUrl + "'";

            $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json;odata=verbose",
                data: ko.toJSON(customer),
                headers: {
                    "Accept": "application/json;odata=verbose", // return data format
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "MERGE",
                    "If-Match": data.d.__metadata.etag
                },
                success: function (data) {
                    self.getCustomers();
                    self.clear();
                },
                error: function (data) {
                    self.error("Error in processing request " + data.status + "    " + data.statusCode);
                }
            });
        });
    };

    //Function to Delete Customer
    self.deleteCustomer = function () {
        getCustomerById(function (data) {
            var itemType = "SP.Data.CustomerListItem";
            var id = self.Id();
            var customer = {
                "__metadata": { "type": itemType },
                "Id": self.Id,
                "Title": self.Title,
                "FirstName": self.FirstName,
                "LastName": self.LastName
            };
            var url = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
       "/web/lists/getbytitle('" + listName + "')/items(" + id + ")?" +
       "@target='" + SPHostUrl + "'";

            alert("Procssing DELETE");
            $.ajax({
                url: url,
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "DELETE",
                    "If-Match": data.d.__metadata.etag
                },
                success: function (data) {
                    self.getCustomers();
                    self.clear();
                },
                error: function (data) {
                    self.error("Error in processing request " + data.status + "    " + data.statusCode + "Please try again");
                }
            });
        });

    };

    //Function to Select Customer used for Update and Delete
    self.getSelectedCustomer = function (customer) {
        self.Id(customer.Id);
        self.Title(customer.Title);
        self.FirstName(customer.FirstName);
        self.LastName(customer.LastName);
    };

    //Function to clear all Textboxes
    self.clear = function () {
        self.Id(0);
        self.Title("");
        self.FirstName("");
        self.LastName("");
    };

};





