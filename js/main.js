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
            'profiles': "showProfiles",
            'profiles/:id': "showProfileDetails",
            'profiles/:id/basic' : "showBasicDetails",
            'profiles/:id/advance' : "showAdvanceDetails"
        },
        showPanel: function () {
            "use strict";
            var userPanelView = new UserPanelView();
        },
        showProfiles: function (e) {
            "use strict";
            var profileModel = new ProfileModel();
            if (localStorage.battleTag) {
                profileModel.url = "http://eu.battle.net/api/d3/profile/" + localStorage.battleTag + "/?callback=?";
            }
            var profileCollection = new ProfileCollection({model: profileModel});
            var profilesView = new ProfilesView({model: profileModel});

            window.location.hash = 'profiles';
        },
        showProfileDetails: function (id) {
            "use strict";
            var heroModel = new HeroModel();
            if (id) {
                heroModel.url = "http://eu.battle.net/api/d3/profile/" + localStorage.battleTag + "/hero/" + id + "?callback=?";
            }
            var heroCollection = new HeroCollection({model: heroModel});
            var heroView = new HeroView({model: heroModel});

            window.location.hash = 'profiles/' + id;
        },
        showBasicDetails : function(id) {
            "use strict";
            console.log("basic of: "+id);
            var detailsBasicView = new DetailsBasicView();
        },
        showAdvanceDetails : function (id) {
            "use strict";
            console.log("advance of: "+id);
            var detailsAdvanceView = new DetailsAdvanceView();
        }
    });

    var ProfileModel = Backbone.Model.extend({
        url: "http://eu.battle.net/api/d3/profile/Alucard-2129/?callback=?",
        initialize: function (attributes) {
            "use strict";
            console.log("model started");
            this.fetch();
        }
    });

    var ProfileCollection = Backbone.Collection.extend({
        initialize: function () {
            "use strict";
            console.log("collection started");
        }
    });

    var HeroModel = Backbone.Model.extend({
        url: "http://eu.battle.net/api/d3/profile/Alucard-2129/hero/235114?callback=?",
        initialize: function (attributes) {
            "use strict";
            console.log("model started");
            this.fetch();
        }
    });

    var HeroCollection = Backbone.Collection.extend({
        initialize: function () {
            "use strict";
            console.log("collection started");
        }
    });

    var TopBarView = Backbone.View.extend({
        el: ".header",
        initialize: function () {
            "use strict";
            _.bindAll(this, 'render');
            this.render();
        },
        render: function () {
            "use strict";
            var that = this;
            var source = $('#top-bar').html();
            var template = _.template(source);
            this.$el.html(source);
        }
    });


    var DetailsBasicView = Backbone.View.extend({
        el: ".details",
        initialize: function () {
            "use strict";
            _.bindAll(this, 'render');
            this.render();
        },
        render: function () {
            "use strict";
            var that = this;
            var source = $('#hero-details-basic').html();
            var template = _.template(source);
            this.$el.html(source);
        }
    });

    var DetailsAdvanceView = Backbone.View.extend({
        el: ".details",
        initialize: function () {
            "use strict";
            _.bindAll(this, 'render');
            this.render();
        },
        render: function () {
            "use strict";
            var that = this;
            var source = $('#hero-details-advance').html();
            var template = _.template(source);
            this.$el.html(source);
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
            "click .setTag": "setBattleTag"
        },
        setBattleTag: function (e) {
            var form = $(".battleTagForm").serializeArray();
            var battleTag = $.trim(form[0].value);

            var profileModel = new ProfileModel();
            if (battleTag) {
                localStorage.battleTag = battleTag;
                profileModel.url = "http://eu.battle.net/api/d3/profile/" + battleTag + "/?callback=?";
            }
            var profileCollection = new ProfileCollection({model: profileModel});
            var profilesView = new ProfilesView({model: profileModel});
        },
        render: function () {
            "use strict";
            var that = this;
            var source = $('#user-panel').html();
            var template = _.template(source);
            this.$el.html(source);
        }
    });

    var HeroView = Backbone.View.extend({
        el: '.profiles',
        initialize: function () {
            "use strict";
            _.bindAll(this, 'render');
            this.fetchModel();
        },
        fetchModel: function () {
            var that = this;
            that.model.fetch({
                success: function (model) {
                    var hero = model;
                    that.render(hero);
                },
                error: function () {
                    console.log("Fetch error!");
                }
            });
        },
        render: function (model) {
            "use strict";
            var that = this;
            var source = $('#hero-details').html();
            var template = _.template(source);
            console.log(model);
            var html = template({
                hero: model
            });
            this.$el.html(html);
        }
    });

    var ProfilesView = Backbone.View.extend({
        el: '.profiles',
        initialize: function () {
            "use strict";
            _.bindAll(this, 'render', 'fetchModel');
            this.fetchModel();
        },
        /*showHeroDetails: function (e) {
            "use strict";
            var form = $(e.target, this).parent().serializeArray(),
                heroId = form[0].value;

            var heroModel = new HeroModel();
            if (heroId) {
                heroModel.url = "http://eu.battle.net/api/d3/profile/" + localStorage.battleTag + "/hero/" + heroId + "?callback=?";
            }
            var heroCollection = new HeroCollection({model: heroModel});
            var heroView = new HeroView({model: heroModel});

            console.log(heroId);
        },*/
        fetchModel: function () {
            var that = this;
            that.model.fetch({
                success: function (model) {
                    var heroes = model.get('heroes');
                    that.render(model);
                },
                error: function () {
                    console.log("Fetch error!");
                }
            });
        },
        render: function (model) {
            "use strict";
            var that = this;
            var source = $('#heroes-list').html();
            var template = _.template(source);
            var html = template({
                heroes: model.get("heroes")
            });
            this.$el.html(html);
        }
    });
    Backbone.history.start();
    var app = new AppRouter();
    var topbarView = new TopBarView();

});