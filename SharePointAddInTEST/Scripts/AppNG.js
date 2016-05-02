var spApp = angular.module('list-module', ['officeuifabric.core',
        'officeuifabric.components']);
"use strict";
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
spApp.service('listservice', ['$http', '$q'], function ($http, $q) {
    //Define the http headers
    $http.defaults.headers.common.Accept = "application/json;odata=verbose";
    $http.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose';
    $http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    $http.defaults.headers.post['If-Match'] = "*";
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
    //Get the employes
    this.getEmployes = function () {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = ""
        var query = "?$select=ID,Title,Name,FirstName,Phone&$orderby=Created desc";
        var restUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items?" + query +
                    "@target='" + SPHostUrl + "'";
        $http.get(restUrl).success(function (data) {
            dfd.resolve(data.d.results);
        }).error(function (data) {
            dfd.reject("error getting Employes");
        });
        return dfd.promise;
    }
    //Create a employe
    this.addEmploye = function () {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = "";
        var restUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items?" +
                    "@target='" + SPHostUrl + "'";
        $http.post(restUrl, {
            __metadata: {
                type: "SP.Data.EmployesListItem"
            },
            Title: "New title",
            Name: "Toto",
            FirstName: "Toto",
            Phone: "0102010201",
        }).success(function (data) {
            //resolve the new data
            dfd.resolve(data.d);
        }).error(function (data) {
            dfd.reject("failed to add employe");
        });
        return dfd.promise;
    }
    //Update a employe
    this.updateEmploye = function (employe) {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = "MERGE";
        var restUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items(" + employe.id + ")?" +
                    "@target='" + SPHostUrl + "'";
        $http.post(restUrl, {
            __metadata: {
                type: "SP.Data.EmployesListItem"
            },
            Title: employe.title,
            EmployeName: employe.name,
            EmployeFirstName: employe.firstName,
            Employephone: employe.phone,
        }).success(function (data) {
            //resolve something
            dfd.resolve(true);
        }).error(function (data) {
            dfd.reject("error updating employe");
        });
        return dfd.promise;
    }
    this.deleteEmploye = function (employe) {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = "DELETE";
        var restUrl = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items(" + employe.id + ")?" +
                    "@target='" + SPHostUrl + "'";
        $http.post(restUrl)
            .success(function (data) {
                //resolve something
                dfd.resolve(true);
            }).error(function (data) {
                dfd.reject("error deleting employe");
            });
        return dfd.promise;
    }
});
            
spApp.controller('list-controller',['$scope','$http','listservice'] ,function ($scope, $http, $listservice) {
    $http({
        url: SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items?" +
                    "@target='" + SPHostUrl + "'",
        method: "GET",
        headers: { "Accept": "application/json;odata=verbose" }
    }).success(function (data) //got the result successfully  
    {
        var dataResults = data.d.results; // List Items  
        $scope.listitems = dataResults;
    })
      .error(function (data, status, headers, config) // got the error  
      {
          alert("error"); //ToDo:Display proper error message/Stack Trace/ Status Code  
      });
});