/*jslint browser: true*/
/*global $, jQuery, Backbone*/
$(function () {
    var AppRouter = Backbone.Router.extend({
        initialize: function() {
            window.location.hash = "panel";
        },
        routes: {
            'panel': "showPanel",
            'profiles': "showProfiles",
            'profiles/*id': "showProfileDetails"
        },
        showPanel: function (param) {
            console.log("profile");
            new UserPanelView().render();
        },
        showProfiles: function () {
            new ProfilesView().render();
        },
        showProfileDetails: function () {
            new ProfileView().render();
        }
    });

    new AppRouter();

    Backbone.history.start();
});