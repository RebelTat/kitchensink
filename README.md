# [join.me Kitchen Sink Source Code](https://kitchensink.join.me)

The join.me Kitchen Sink app is a tutorial to demonstrate how to use the [join.me API](https://developer.join.me "join.me API").

## How It Works

The join.me Kitchen Sink app implements every API call on a single page application.  When a user lands on the page for the first time, they are given a message indicating they need to OAuth with join.me to give the app permission. The Kicthen Sink uses [hello.js](https://adodson.com/hello.js/) to make OAuth and API interactions easy. The OAuth token is stored by hello.js in localStorage.

You may also find details on implementing OAuth manually with the join.me API on our [Authorization documentation](https://developer.join.me/docs/read/authorization) page.  The join.me API page also includes more information on preserving/renewing OAuth tokens.

After this, the individual endpoints are all called in the js/joinmeendpoints folder.  Examples for how to call each of the join.me API endpoints using hello.js can be viewed there.

### Setting it up on your own instance

This code is runnable with some simple setup:
1. Download this and open the solution file in Visual Studio 2013.

2. Open Web.config, and fill in the APIKey app setting with the key from your application on the https://developer.join.me site.

3. Ensure that the redirect uri of your application on the https://developer.join.me site is equal to the homepage of the kitchensink app where you intend to host it. For example, if you are running it locally on https://localhost:443/ or http://localhost/KitchenSink/ , that should be your redirect uri. Note that this is the default redirect uri used by hello.js which is equal to the url of the current page when hello.js is embeded. hello.js also allows using a custom redirect uri, which is shown on their page, however it is important to note that the page at the redirect uri must also include the hello.js library or the accessToken returned can not be written to localStorage.

### Special Thanks

The following packages/libraries are in use in this project:

* [Bootstrap](http://getbootstrap.com/) - Licensed under the MIT license: [Bootstrap License FAQs](http://getbootstrap.com/getting-started/#license-faqs)
* [Bootstrap 3 Date/Time Picker](http://eonasdan.github.io/bootstrap-datetimepicker/) - Licensed under the [MIT License](https://raw.githubusercontent.com/Eonasdan/bootstrap-datetimepicker/master/LICENSE)
* [Handlebars JS](http://handlebarsjs.com/) - Licensed under the [MIT License](https://raw.githubusercontent.com/wycats/handlebars.js/master/LICENSE)
* [hello.js](https://github.com/MrSwitch/hello.js) - Licensed under the [MIT License](https://raw.githubusercontent.com/MrSwitch/hello.js/master/LICENSE)
* [jQuery](https://jquery.com/) - Licensed under the [MIT License](https://jquery.org/license/)
* [json2.js](https://github.com/douglascrockford/JSON-js) - Licensed under [The JSON License](http://www.json.org/license.html)
* [Moment JS](http://momentjs.com/) - Licensed under the [MIT License](https://raw.githubusercontent.com/moment/moment/develop/LICENSE)

### License

The join.me Kitchen Sink source is [BSD licensed](./LICENSE).