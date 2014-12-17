var ProfileModel = Backbone.Model.extend({
    url: "http://eu.battle.net/api/d3/profile/" + localStorage.battleTag + "/hero/" + localStorage.heroId + "?callback=?",
    initialize: function () {}
});

var ProfileView = Backbone.View.extend({
    el: '.profiles',
    model: new ProfileModel,
    initialize: function () {
        _.bindAll(this, 'render');
    },
    render: function () {
        var self = this;

        this.model.fetch({
            success : function (model) {
                var template = _.template($('#hero-details').html(), {hero: model});
                self.$el.html(template);
            },
            error : function () {
                console.log("Error during fetching model from external source");
            }
        });
    }
});