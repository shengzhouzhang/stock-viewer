/**
 * Created by zhang on 5/04/2014.
 */
define(["backbone"], function($, _, Backbone, Signin, TimeLine, Footer, Twitter) {

  var router = {

    base: window.location.origin + window.location.pathname
  };

  Twitter.Init(router.base + "#/oauth_step2");

  var AppRouter = Backbone.Router.extend({

    routes: {
      "timeline/:params": "timeline",
      "oauth_step2": "oauth_step2", // twitter callback handler
      "*":   "stockview"
    },

    stockview: function() {

      var router = this;

      // to signin view
      var signin = new Signin.view({
        el: $("#main_container")
      });

      signin.render();

      var footer = new Footer.view({
        el: $("#footer_container")
      });

      footer.render();
    }
  });


  router.start = function() {

    this.app = new AppRouter();
    Backbone.history.start();
  };

  return router;
});