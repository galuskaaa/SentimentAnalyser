using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace SentimentAnalyser.Helper
{
    public class StringProcessingAction
    {

       private List<String> wordsList;

       public  StringProcessingAction()
       {

       }

       public void tokenizeComments(List<String> values)
       {

            string[] separators = new string[] { ",", ".", "!", "\'", " ", "\'s","?" };
            foreach (var comment  in values)
            {
                foreach(string word in comment.Split(separators, StringSplitOptions.RemoveEmptyEntries))
                {
                    wordsList.Add(word);
                }
            }
       }

    }

   

}