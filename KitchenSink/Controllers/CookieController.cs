using System;
using System.Web;
using System.Web.Http;

namespace KitchenSink.Controllers
{
    public class CookieController : ApiController
    {
        private static readonly string CookieKey = "KitchenSinkOAuth";

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string access_token)
        {
            HttpContext context = HttpContext.Current;
            if (context == null)
            {
                return;
            }

            HttpCookie accessCookie = new HttpCookie(CookieKey);
            accessCookie.Value = access_token;
            accessCookie.Expires = DateTime.Now.AddHours(24);
            accessCookie.HttpOnly = true;

            context.Response.Cookies.Add(accessCookie);
        }

        // DELETE api/<controller>/5
        public void Delete()
        {
            HttpContext context = HttpContext.Current;
            if (context == null)
            {
                return;
            }

            HttpCookie clearCookie = new HttpCookie(CookieKey);
            clearCookie.Expires = DateTime.Now.AddDays(-2.0);

            context.Response.Cookies.Add(clearCookie);
        }
    }
}