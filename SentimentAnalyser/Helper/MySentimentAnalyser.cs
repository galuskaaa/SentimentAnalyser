using SentimentAnalyser.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace SentimentAnalyser.Helper
{
    public class MySentimentAnalyser
    {

        private readonly IDictionary<string, int> wordsDictionary;

  
        public MySentimentAnalyser()
        {

            string fileName = @"D:\Licens\SentimentAnalyser\SentimentAnalyser\AFINN-111.txt";
            wordsDictionary = new Dictionary<string, int>();
            using (var file = new StreamReader(fileName))
            {
                string line;
                while ((line = file.ReadLine()) != null)
                {
                    var wordStructure = line.Split('\t');
                    wordsDictionary.Add(wordStructure[0], int.Parse(wordStructure[1]));
                }
            }

        }

        private static IEnumerable<string> stringSanitizeSplit(string comment)
        {
            comment = Regex.Replace(comment, "[^a-zA-Z ]+", "");
            comment = Regex.Replace(comment, @"\s+", " ");
            comment = comment.ToLower();
            return comment.Split(' ');
        }


        public Score GetScore(string input)
        {
            var score = new Score { Tokens = stringSanitizeSplit(input) };

            foreach (var token in score.Tokens)
            {
                if (!wordsDictionary.ContainsKey(token)) continue;

                var item = wordsDictionary[token];
                score.Words.Add(token);

                if (item > 0) score.Positive.Add(token);
                if (item < 0) score.Negative.Add(token);

                score.Sentiment += item;
            }

            return score;
        }
}
}