using System.Configuration;

namespace KitchenSink
{
    public class Default : System.Web.UI.Page
    {
        protected string APIKey
        {
            get
            {
                return ConfigurationManager.AppSettings["APIKey"];
            }
        }
    }
}