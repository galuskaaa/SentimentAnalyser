using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SentimentAnalyser.Startup))]
namespace SentimentAnalyser
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
