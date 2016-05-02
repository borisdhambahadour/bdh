'use strict'
angular.module("EmployeApp", ["ui.router", "ngResource"])
    .service('employeService', ['$http', '$q', function ($http, $q) {

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
    this.getEmployes = function (listTitle) {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = ""
        var query = "?$select=ID,Title,Name,FirstName,Phone&$expand=Bookauthor&$orderby=Created desc";
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
    this.addEmploye = function (listTitle) {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = "";
        var restUrl = "/sites/dev/_api/web/lists/getbytitle('" + listTitle + "')/items";
        $http.post(restUrl, {
            __metadata: {
                type: "SP.Data." + listTitle + "ListItem"
            },
            Title: "New title"
        }).success(function (data) {
            //resolve the new data
            dfd.resolve(data.d);
        }).error(function (data) {
            dfd.reject("failed to add employe");
        });
        return dfd.promise;
    }

    //Update a employe
    this.updateEmploye = function (listTitle, employe) {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = "MERGE";
        var restUrl = "/sites/dev/_api/web/lists/getbytitle('" + listTitle + "')/items(" + employe.id + ")";
        $http.post(restUrl, {
            __metadata: {
                type: "SP.Data." + listTitle + "ListItem"
            },
            Title: employe.title,
            EmployeName: employe.name,
            EmployeFirstName: employe.firstName,
            Employephone: employe.phone,
        }).success(function (data) {
            //resolve something
            dfd.resolve(true);
        }).error(function (data) {
            dfd.reject("error updating book");
        });
        return dfd.promise;
    }

    //Delete an employe
    this.deleteEmploye = function (listTitle, employe) {
        var dfd = $q.defer();
        $http.defaults.headers.post['X-HTTP-Method'] = "DELETE";
        var restUrl = "/sites/dev/_api/web/lists/getbytitle('" + listTitle + "')/items(" + employe.id + ")";
        $http.post(restUrl)
            .success(function (data) {
                //resolve something
                dfd.resolve(true);
            }).error(function (data) {
                dfd.reject("error deleting employe");
            });
        return dfd.promise;
    }
}]);

employeService.getEmployes("Employes").then(function (result) {
    $scope.employes = [];
    angular.forEach(result, function (b) {
        //Create the employe from the request JSON result.                
        var employe = {
            id: b.ID,
            title: b.Title,
            name: b.Name,
            firstName:b.FirstName,
            phone: b.Phone,
        }
        $scope.employes.push(employe);
    });
});

//example add employe
employeService.addEmploye("Employes").then(function (b) {
    var employe = {
        id: b.ID,
        title: b.Title
    }
    $scope.employes.push(employe);
});