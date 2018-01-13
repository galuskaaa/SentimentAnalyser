using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace SentimentAnalyser.Models
{
    public class Score
    {
        
        public IEnumerable<string> Tokens { get; set; }
        public int Sentiment { get; set; }
        public double AverageSentimentTokens{ get { return (double)Sentiment / Tokens.Count(); } }
        public double AverageSentimentWords { get { return (double)Sentiment / Words.Count(); } }
        public IList<string> Words { get; set; }
        public IList<string> Negative { get; set; }
        public IList<string> Positive { get; set; }

        public Score()
        {
            Words = new List<string>();
            Negative = new List<string>();
            Positive = new List<string>();
        }
    }

}
