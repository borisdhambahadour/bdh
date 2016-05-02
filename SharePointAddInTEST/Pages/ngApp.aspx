<%-- Les 4 lignes suivantes sont des directives ASP.NET nécessaires durant l'utilisation des composants SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- Le balisage et le script de l'élément Content suivant seront placés dans la partie <head> de la page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Ajoutez vos styles CSS au fichier suivant -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" type="text/css" href="../Content/fabric.min.css" />
    <link rel="stylesheet" type="text/css" href="../Content/fabric.components.min.css" />

    <!-- Ajoutez votre code JavaScript au fichier suivant -->
    <script type="text/javascript" src="../Scripts/angular.min.js"></script>
    <script type="text/javascript" src="../Scripts/ngOfficeUiFabric.min.js"></script>
    <script type="text/javascript" src="../Scripts/AppNG.js"></script>
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Employees
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div ng-app="list-module">
        <div ng-controller="list-controller">
            <uif-button uif-type="primary" ng-click="addEmploye()">Add new employe</uif-button>
            <uif-list uif-item-select-mode="single">
             <uif-list-item ng-repeat="item in listitems">
               <uif-list-item-primary-text>{{item.Name}}</uif-list-item-primary-text>
               <uif-list-item-secondary-text> {{item.FirstName}}</uif-list-item-secondary-text>
               <uif-list-item-tertiary-text>{{item.Title}}</uif-list-item-tertiary-text>
               <uif-list-item-meta-text>{{item.Phone}}</uif-list-item-meta-text>
               <uif-list-item-selection-target></uif-list-item-selection-target>
               <uif-list-item-actions>
                 <uif-list-item-action ng-click="mail(item)">
                   <uif-icon uif-type="mail"></uif-icon>
                 </uif-list-item-action>
                 <uif-list-item-action ng-click="deleteEmploye(item)">
                   <uif-icon uif-type="trash"></uif-icon>
                 </uif-list-item-action>
                 <uif-list-item-action ng-click="pin(item)">
                   <uif-icon uif-type="pinLeft"></uif-icon>
                 </uif-list-item-action>
               </uif-list-item-actions>
             </uif-list-item>
        </uif-list>
        </div>
    </div>
</asp:Content>
