using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;

namespace InterReader
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRouting();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseFileServer();

            var routeBuilder = new RouteBuilder(app);
            routeBuilder.MapRoute("translate", Translate);
            app.UseRouter(routeBuilder.Build());

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Something went wrong.");
            });
        }

        private async Task Translate(HttpContext context)
        {
            var word = context.Request.Query["word"];
            var token = Environment.GetEnvironmentVariable("YA_TRAN_KEY");

            var httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://translate.yandex.net/")
            };
            var response = await httpClient.GetAsync(
                $"api/v1.5/tr.json/translate?key={token}&text={word}&lang=en-ru");
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var translation = ((JArray) JObject.Parse(jsonResponse)["text"])[0].ToString();

            await context.Response.WriteAsync(translation);
        }
    }
}
