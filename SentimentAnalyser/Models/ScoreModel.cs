using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SentimentAnalyser.Models
{
    public class ScoreModel
    {

        public IList<string> Words { get; set; }

        public IList<string> Negative { get; set; }

        public IList<string> Positive { get; set; }

        public ScoreModel()
            {
                Words = new List<string>();
                Negative = new List<string>();
                Positive = new List<string>();
            }

        public IEnumerable<string> Tokens { get; set; }

        public int Sentiment { get; set; }
    }

}