var spApp = angular.module('list-module', []);
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

spApp.controller('list-controller', function ($scope, $http) {
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