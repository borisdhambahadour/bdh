angular.module("Employe", ["ui.router", "ngResource"])
.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/list');
    $stateProvider.state('list', {
        cache: false,
        url: '/list',
        templateUrl: '/personal/sgannon/BlogPost/SiteAssets/BlogPost/templates/tasklist.html',
        controller: 'TaskController'
    })
    .state('detail', {
        url: '/:id',
        templateUrl: '/personal/sgannon/BlogPost/SiteAssets/BlogPost/templates/taskdetail.html',
        controller: 'TaskController'
    });
})
.service("EmployeFactory", ['$http', '$q', function ($http, $q) {
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
        url: "/_api/web/lists/GetByTitle('Employes')",
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
}]).controller('EmployeController', ['$scope', '$http', '$state', '$stateParams', 'TaskFactory', function ($scope, $http, $state, $stateParams, EmployeFactory) {
    switch ($state.current.url) {
        case "/:id":
            if ($stateParams.id) {
                //This is an existing task
                var id = $stateParams.id;
                EmployeFactory.get({ id: id }).then(function (responseData) {
                    var item = responseData.data.d;
                    $scope.employe = item;
                });
            } else {
                //This is a new task
                $scope.employe = new EmployeFactory();
            };
            break;
        case "/list":
            var employes = EmployeFactory.query().then(function (responseData) {
                $scope.employes = [];
                $(responseData.data.d.results).each(function (index, item) {
                    $scope.employes.push(item);
                });
            }, function (error) {
                console.log(error);
            });
            break;
        default:
            break;
    }

    $scope.saveEmploye = function () {
        if (!$scope.employe.Id) {
            //Save new item
        } else {
            var requestBody = {};
            requestBody.__metadata = { type: $scope.employe.__metadata.type };
            requestBody.Title = $scope.employe.Title;
            requestBody.Id = $scope.employe.Id;
            EmployeFactory.update(requestBody, $scope.employe).then(function () {
                alert('Employe successfully saved.');
                $state.go('list', {}, { reload: true });
            },
                function (error) {
                    alert(error.message);
                    $state.go('list');
                });
        }
    };
    
    $scope.deleteEmploye = function () {
        EmployeFactory.remove($scope.employe.Id).then(
            function () {
                alert('Employe successfully deleted.');
                $state.go('list', {}, { reload: true });
            },
            function (error) {
                alert(error.message);
                $state.go('list', {}, { reload: true });
            });
    };
    //$scope.editDate = function (inDate) {
    //    var retDate = new Date(inDate)
    //    return retDate.toDateString();
    //};
    //$scope.transformDate = function (inDate) {
    //    var retDate = new Date(inDate)
    //    return retDate.toUTCString();
    //};

}])