using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Google.Cloud.Translation.V2;




namespace SentimentAnalyser.Controllers
{



    public class GoogleMethodController : Controller
    {
       
        
        // GET: GoogleMethod
        public ActionResult Index()
        {
            return View();
        }


        public void test()
        {
            Console.OutputEncoding = System.Text.Encoding.Unicode;
            TranslationClient client = TranslationClient.Create();
            var response = client.TranslateText("Hello World.", "ru");
            Console.WriteLine(response.TranslatedText);
        }


    }
}