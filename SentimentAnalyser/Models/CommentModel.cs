using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SentimentAnalyser.Models
{
    public class CommentModel
    {
        public IList<string> Neutral{ get; set; }

        public IList<string> Negative { get; set; }

        public IList<string> Positive { get; set; }

        public CommentModel()
        {
            Neutral = new List<string>();
            Negative = new List<string>();
            Positive = new List<string>();
        }

    }
}