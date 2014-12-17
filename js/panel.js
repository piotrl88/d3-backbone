var UserPanelView = Backbone.View.extend({
    el: ".profiles",
    initialize: function () {
        _.bindAll(this, 'render');
        this.render();
    },
    events: {
        "click .button": "setBattleTag"
    },
    setBattleTag: function (e) {
        var battleTag = this.$el.find('.battleTag').val();

        if (battleTag) {
            localStorage.battleTag = battleTag.replace('#', '-');
            Backbone.history.navigate('profiles', {trigger: true, replace: true});
        }
    },
    render: function () {
        this.$el.html(_.template( $('#user-panel').html() ));
    }
});
