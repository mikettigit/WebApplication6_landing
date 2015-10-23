using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebApplication6_landing.Startup))]
namespace WebApplication6_landing
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
