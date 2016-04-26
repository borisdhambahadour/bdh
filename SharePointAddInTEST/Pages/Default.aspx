<%-- Les 4 lignes suivantes sont des directives ASP.NET nécessaires durant l'utilisation des composants SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- Le balisage et le script de l'élément Content suivant seront placés dans la partie <head> de la page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Ajoutez vos styles CSS au fichier suivant -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" type="text/css" href="../Content/fabric.min.css" />
    <link rel="stylesheet" type="text/css" href="../Content/fabric.components.min.css" />

    <!-- Ajoutez votre code JavaScript au fichier suivant -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/knockout-3.4.0.js"></script>
</asp:Content>

<%-- Le balisage de l'élément Content suivant sera placé dans la partie TitleArea de la page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- Le balisage et le script de l'élément Content suivant seront placés dans la partie <body> de la page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="ms-TextField">
        <label class="ms-Label">Title</label>
        <input class="ms-TextField-field" data-bind="value: $root.Title" />
    </div>
    <div class="ms-TextField">
        <label class="ms-Label">First Name</label>
        <input class="ms-TextField-field" data-bind="value: $root.FirstName" />
    </div>
    <div class="ms-TextField">
        <label class="ms-Label">Family name</label>
        <input class="ms-TextField-field" data-bind="value: $root.LastName" />
    </div>

    <button class="ms-Button" data-bind="click: $root.clear">
        <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        <span class="ms-Button-label">Clear</span>
        <span class="ms-Button-description">Description of the action this button takes</span>
    </button>

    <button class="ms-Button" data-bind="click: $root.createCustomer">
        <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        <span class="ms-Button-label">Create</span>
        <span class="ms-Button-description">Description of the action this button takes</span>
    </button>

    <button class="ms-Button" data-bind="click: $root.deleteCustomer">
        <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        <span class="ms-Button-label">Delete</span>
        <span class="ms-Button-description">Description of the action this button takes</span>
    </button>

    <button class="ms-Button" data-bind="click: $root.updateCustomer">
        <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        <span class="ms-Button-label">Update</span>
        <span class="ms-Button-description">Description of the action this button takes</span>
    </button>

    <table id="tbl">
        <tr>
            <td>
                <table>
                    <%--<tr>
                        <td colspan="4" class=".ms-font-m-plus">Title</td>
                        <td colspan="4">
                            <input type="text" id="txtcatid" data-bind="value: $root.Title" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">First Name</td>
                        <td colspan="4">
                            <input type="text" id="txtcatfirstname" data-bind="value: $root.FirstName" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">Last Name</td>
                        <td colspan="4">
                            <input type="text" id="txtcatlastname" data-bind="value: $root.LastName" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <button class="ms-Button" data-bind="click: $root.clear">
                                <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
                                <span class="ms-Button-label">Clear</span>
                                <span class="ms-Button-description">Description of the action this button takes</span>
                            </button>
                            <input type="button" id="btnnew" value="Clear"/>
                        </td>
                        <td colspan="4">
                            <button class="ms-Button" data-bind="click: $root.createCustomer">
                                <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
                                <span class="ms-Button-label">Create</span>
                                <span class="ms-Button-description">Description of the action this button takes</span>
                            </button>
                            <input type="button" id="btnsave" value="Create" data-bind="click: $root.createCustomer" />                       </td>
                        <td colspan="4">
                            <button class="ms-Button" data-bind="click: $root.deleteCustomer">
                                <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
                                <span class="ms-Button-label">Delete</span>
                                <span class="ms-Button-description">Description of the action this button takes</span>
                            </button>
                            <input type="button" id="btnupdate" value="Delete" data-bind="click: $root.deleteCustomer" />
                        </td>
                        <td colspan="4">
                            <button class="ms-Button" data-bind="click: $root.updateCustomer">
                                <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
                                <span class="ms-Button-label">Update</span>
                                <span class="ms-Button-description">Description of the action this button takes</span>
                            </button>
                          <input type="button" id="btndelete" value="Update" data-bind="click: $root.updateCustomer" />
                        </td>
                    </tr>--%>
                </table>
            </td>
            <td>
                <div class="Container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: Customers">
                            <tr data-bind="click: $root.getSelectedCustomer">
                                <td>
                                    <span data-bind="text: Title"></span>
                                </td>
                                <td>
                                    <span data-bind="text: FirstName"></span>
                                </td>
                                <td>
                                    <span data-bind="text: LastName"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    </table>
    <div>
        <span data-bind="text: error"></span>
    </div>
</asp:Content>
