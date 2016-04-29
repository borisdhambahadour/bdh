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
    <script type="text/javascript">
        function hideshow(which) {
            if (!document.getElementById)
                return
            if (which.style.display == "block")
                which.style.display = "none"
            else
                which.style.display = "block"
        }
        (function ($) {
            $.fn.ListItem = function () {

                /** Go through each panel we've been given. */
                return this.each(function () {

                    var $listItem = $(this);

                    /** Detect clicks on selectable list items. */
                    $listItem.on('click', '.js-toggleSelection', function () {
                        $(this).parents('.ms-ListItem').toggleClass('is-selected');
                    });

                });

            };
        })(jQuery);
    </script>
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Employees
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="listitem" data-bind="foreach: Customers">
        <ul class="ms-List" data-bind="click: $root.getSelectedCustomer">
            <li class="ms-ListItem is-selectable" onclick="$(this).toggleClass('is-selected');">
                <span class="ms-ListItem-primaryText" data-bind="text: Title"></span>
                <span class="ms-ListItem-secondaryText" data-bind="text: FirstName"></span>
                <span class="ms-ListItem-tertiaryText" data-bind="text: LastName"></span>
                <div class="ms-ListItem-selectionTarget js-toggleSelection">
                </div>
                <div class="ms-ListItem-actions">
                    <div class="ms-ListItem-action"><i class="ms-Icon ms-Icon--mail"></i></div>
                    <div class="ms-ListItem-action"><i class="ms-Icon ms-Icon--trash"></i></div>
                    <div class="ms-ListItem-action"><i class="ms-Icon ms-Icon--flag"></i></div>
                    <div class="ms-ListItem-action"><i class="ms-Icon ms-Icon--pinLeft"></i></div>
                </div>
            </li>
        </ul>
    </div>
    <hr>
    <button class="ms-Button ms-Button--primary" onclick="hideshow(hideShow);return false">
        <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        <span class="ms-Button-label">Do sth</span>
        <span class="ms-Button-description">Description of the action this button takes</span>
    </button>
    <div id="hideShow" style="display: none;">

        <div id="form">
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
        </div>
        <div class="ms-CommandBar">
            <div class="ms-CommandBar-sideCommands">
                <div class="ms-CommandBarItem">
                    <div class="ms-CommandBarItem-linkWrapper">
                        <a class="ms-CommandBarItem-link" tabindex="1" data-bind="click: $root.clear"><span class="ms-CommandBarItem-icon ms-Icon ms-Icon--reactivate"></span><span class="ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular">Clear</span> <i class="ms-CommandBarItem-chevronDown ms-Icon ms-Icon--chevronDown"></i></a>
                    </div>
                </div>
            </div>
            <div class="ms-CommandBar-mainArea">
                <div class="ms-CommandBarItem">
                    <div class="ms-CommandBarItem-linkWrapper">
                        <a class="ms-CommandBarItem-link" tabindex="1" data-bind="click: $root.createCustomer"><span class="ms-CommandBarItem-icon ms-Icon ms-Icon--star"></span><span class="ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular">New</span></a>
                    </div>
                </div>
                <div class="ms-CommandBarItem">
                    <div class="ms-CommandBarItem-linkWrapper">
                        <a class="ms-CommandBarItem-link" tabindex="1" data-bind="click: $root.updateCustomer"><span class="ms-CommandBarItem-icon ms-Icon ms-Icon--save"></span><span class="ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular">Update</span> </a>
                    </div>
                </div>
                <div class="ms-CommandBarItem">
                    <div class="ms-CommandBarItem-linkWrapper">
                        <a class="ms-CommandBarItem-link" tabindex="1" data-bind="click: $root.deleteCustomer"><span class="ms-CommandBarItem-icon ms-Icon ms-Icon--trash"></span><span class="ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular">Delete</span> </a>
                    </div>
                </div>
                <div class="ms-CommandBarItem ms-CommandBarItem--iconOnly ms-CommandBarItem-overflow">
                    <div class="ms-CommandBarItem-linkWrapper">
                        <a class="ms-CommandBarItem-link" tabindex="2"><span class="ms-CommandBarItem-icon ms-Icon ms-Icon--ellipsis"></span><span class="ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular">Ellipsis</span> <i class="ms-CommandBarItem-chevronDown ms-Icon ms-Icon--chevronDown"></i></a>
                    </div>
                    <ul class="ms-CommandBar-overflowMenu ms-ContextualMenu"></ul>
                </div>

            </div>
        </div>
    </div>
    <div>
        <span data-bind="text: error"></span>
    </div>

</asp:Content>
