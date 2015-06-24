using System.Configuration;
using System.Web;

namespace KitchenSink
{
    public class Default : System.Web.UI.Page
    {
        private static readonly string CookieKey = "KitchenSinkOAuth";

        protected string GetOAuthUrl()
        {
            return string.Concat(
                ConfigurationManager.AppSettings["BaseOAuthUrl"],
                "?response_type=token",
                "&client_id=",
                ConfigurationManager.AppSettings["AccessToken"],
                "&scope=user_info scheduler start_meeting",
                "&redirect_uri=",
                string.Concat(ConfigurationManager.AppSettings["BaseDomain"], ConfigurationManager.AppSettings["RedirectUri"]));
        }

        protected string GetAccessToken()
        {
            return ConfigurationManager.AppSettings["AccessToken"];
        }

        protected bool IsCookiePresent()
        {
            if (HttpContext.Current == null)
            {
                return false;
            }

            HttpCookie cookie = HttpContext.Current.Request.Cookies.Get(CookieKey);
            return cookie != null;
        }

        protected string GetCookieValue()
        {
            if (HttpContext.Current == null)
            {
                return null;
            }

            HttpCookie cookie = HttpContext.Current.Request.Cookies.Get(CookieKey);
            if (cookie == null)
            {
                return null;
            }
            return cookie.Value;
        }
    }
}