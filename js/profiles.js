var ProfilesModel = Backbone.Model.extend({
    url: "http://eu.battle.net/api/d3/profile/" + localStorage.battleTag + "/?callback=?",
    initialize: function () {}
});

var ProfilesView = Backbone.View.extend({
    el: '.profiles',
    model: new ProfilesModel(),
    initialize: function () {
        _.bindAll(this, 'render');
    },
    events: {
        "click .heroDetails": "showHeroDetail"
    },
    showHeroDetail: function (e) {
        localStorage.removeItem('heroId');
        var heroId = $(e.target).data('heroid');

        if (heroId) {
            localStorage.heroId = heroId;
            Backbone.history.navigate('profiles/' + heroId, {trigger: true, replace: true});
        }
    },
    render: function () {
        var self = this;
        this.model.fetch({
            success : function (model) {
                var template = _.template($('#heroes-list').html(), {heroes: model.get("heroes")});
                self.$el.html(template);
            },
            error : function () {
                console.log("Error during fetching model from external source");
            }
        });
    }
});