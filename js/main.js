/*jslint browser: true*/
/*global $, jQuery, Backbone*/

$(function () {
    var AppRouter = Backbone.Router.extend({
        initialize: function () {
            "use strict";
            this.showPanel();
        },
        routes: {
            '': "showPanel",
            '*profiles': "showProfiles",
            '*profiles/:id': "showProfileDetails",
            'profiles/:id/basic': "showBasicDetails",
            'profiles/:id/advance': "showAdvanceDetails"
        },
        showPanel: function () {
            "use strict";
            new UserPanelView();
        },
        showProfiles: function () {
            "use strict";
            new ProfilesView().render();
        },
        showProfileDetails: function (id) {
            "use strict";
            new HeroView().render();
        }
    });


    var UserPanelView = Backbone.View.extend({
        el: ".profiles",
        initialize: function () {
            "use strict";
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
            "use strict";
            var source = $('#user-panel').html();
            this.$el.html(_.template(source));
        }
    });

    var ProfilesModel = Backbone.Model.extend({
        url: "http://eu.battle.net/api/d3/profile/" + localStorage.battleTag + "/?callback=?",
        initialize: function () {
            "use strict";
            this.fetch();
        }
    });

    var ProfilesView = Backbone.View.extend({
        el: '.profiles',
        model: new ProfilesModel(),
        initialize: function () {
            "use strict";
            _.bindAll(this, 'render');
            this.render();
        },
        events: {
            "click .heroDetails": "showHeroDetail"
        },
        showHeroDetail: function (e) {
            var heroId = $(e.target).data('heroid');

            if (heroId) {
                localStorage.heroId = heroId;
                Backbone.history.navigate('profiles/' + heroId, { trigger: true, replace: true });
            }
        },
        render: function () {
            "use strict";
            var template = _.template($('#heroes-list').html(), { heroes: this.model.get("heroes") });

            this.$el.html(template);
        }
    });

    var HeroModel = Backbone.Model.extend({
        url: "http://eu.battle.net/api/d3/profile/" + localStorage.battleTag + "/hero/" + localStorage.heroId + "?callback=?",
        initialize: function () {
            "use strict";
            this.fetch();
        }
    });

    var HeroView = Backbone.View.extend({
        el: '.profiles',
        model: new HeroModel(),
        initialize: function () {
            "use strict";
            _.bindAll(this, 'render');
            this.render();
        },
        render: function () {
            "use strict";
            var template = _.template($('#hero-details').html(), { hero: this.model });

            this.$el.html(template);
        }
    });


    Backbone.history.start();

    new AppRouter();

});