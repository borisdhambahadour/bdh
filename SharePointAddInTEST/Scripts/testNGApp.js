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

angular.module('EmployeApp', [])
    .service("EmployeFactory", ['$http', '$q', function ($http, $q) {
        var getUrl = function (id) {
            var retVal = '';
            if (!id) {
                //get all items
                retVal = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items?" +
                    "@target='" + SPHostUrl + "'";
            } else {
                //get a single item
                retVal = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items(" + id + ")?" +
                    "@target='" + SPHostUrl + "'";
            }
            return retVal;
        };
        $http({
            url: SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items?" +
                    "@target='" + SPHostUrl + "'",
            method: "GET",
            headers: {
                accept: "application/json;odata=verbose"
            }
        }).then(function (responseData) {
            this.contentType = responseData.data.d.ListItemEntityTypeFullName;
        })
        return {
            query: function () {
                var $returnValue = $q.defer();
                $returnValue = $http({
                    url: getUrl(),
                    method: 'GET',
                    isArray: true,
                    headers: { 'Accept': 'application/json;odata=verbose' }
                });
                return $returnValue;
            }
    		,
            get: function (id) {
                var $returnValue = $q.defer();
                //Get a single item
                $returnValue = $http({
                    method: "GET",
                    url: getUrl(id.id),
                    headers: {
                        accept: "application/json;odata=verbose"
                    }
                });
                return $returnValue;
            }
        }
    }]).controller('EmployeController', ['$scope', '$http', function ($scope, $http) {
        $scope.employes;
                $scope.getEmployes = function () {
            $http({
                url: SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
                    "/web/lists/getbytitle('Employes')/items?" +
                    "@target='" + SPHostUrl + "'",
                method: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                }
            }).then(function (response) {
                $(response.data.d.results).each(function (index, employe) {
                    $scope.employes.push(employe);
                }, function (error) {
                    console.log(error);
                });
            });
        };
    }]);


