using System.Web.Http;

namespace KitchenSink
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Kitchen Sink Cookie Service",
                routeTemplate: "oauth/v1/{controller}",
                defaults: null);
        }
    }
}
