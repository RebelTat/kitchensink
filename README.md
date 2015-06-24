# [join.me Kitchen Sink Source Code](https://kitchensink.join.me)

The join.me Kitchen Sink app is a tutorial to demonstrate how to use the [join.me API](https://developer.join.me "join.me API").

## How It Works

The join.me Kitchen Sink app implements every API call on a single page application.  When a user lands on the page for the first time, they are given a message indicating they need to OAuth with join.me to give the app permission.  Details on implementing OAuth with the join.me API are available on our [Authorization documentation](https://developer.join.me/docs/read/authorization) page.  The Kitchen Sink only stores this code for 24 hours in a cookie, but the join.me API page includes more information on preserving/renewing OAuth tokens.

After this, the individual endpoints are all called in the js/joinmeendpoints folder.  Examples for how to call each of the join.me API endpoints can be viewed there.

### Setting it up on your own instance

This code is runnable with some simple setup:
1. Download this and open the solution file in Visual Studio 2013.
2. Open the Web.config, and fill in the following app settings with the relevant information from the https://developer.join.me site:
  * AccessToken - the API key for your application
  * BaseDomain - the domain name where your app is running.  For example, https://kitchensink.join.me
Note that these settings will need to be configured appropriately on the join.me developer portal as well, including the redirect url.

### Special Thanks

The following packages/libraries are in use in this project:

* [Bootstrap](http://getbootstrap.com/) - Licensed under the MIT license: [Bootstrap License FAQs](http://getbootstrap.com/getting-started/#license-faqs)
* [Bootstrap 3 Date/Time Picker](http://eonasdan.github.io/bootstrap-datetimepicker/) - Licensed under the [MIT License](https://raw.githubusercontent.com/Eonasdan/bootstrap-datetimepicker/master/LICENSE)
* [Handlebars JS](http://handlebarsjs.com/) - Licensed under the [MIT License](https://raw.githubusercontent.com/wycats/handlebars.js/master/LICENSE)
* [jQuery](https://jquery.com/) - Licensed under the [MIT License](https://jquery.org/license/)
* [json2.js](https://github.com/douglascrockford/JSON-js) - Licensed under [The JSON License](http://www.json.org/license.html)
* [Moment JS](http://momentjs.com/) - Licensed under the [MIT License](https://raw.githubusercontent.com/moment/moment/develop/LICENSE)

### License

The join.me Kitchen Sink source is [BSD licensed](./LICENSE).