// See https://aka.ms/new-console-template for more information
using System.Text;

if (args.Count() == 0)
{
    Console.WriteLine("string to split required");
    return;
}
string descriptionToSplit = args[0];
if (descriptionToSplit.Length <= 46)
{
    //no need to split this. Just return it back
    Console.WriteLine(descriptionToSplit);
    return;
}
int i = 0, a = 0;
var splitPoints = new List<int>();
var currSplitPoint = -1;
//we want the new line to be as close to 46 characters as we can get.
//we'll update the split point with the split to make each time we hit a space, then take the closes one to every 46 characters.
foreach (char c  in descriptionToSplit){
    
    if (Char.IsWhiteSpace(c))
    {
        currSplitPoint = a;
    }

    if (i == 46)
    {
        //we've reached a final character. store the currSplitPoint in the list,
        //then update i to how far away we are from 46 and continue.
        splitPoints.Add(currSplitPoint);
        i = (46 * splitPoints.Count()) - currSplitPoint;
        currSplitPoint = -1;
    }
    else
    {        
        i++;
    }
    a++;
}

var completedString = new StringBuilder(descriptionToSplit);

i = 0;
foreach (var splitPoint in splitPoints)
{
    completedString.Remove(splitPoint + i, 1);//extra characters accounted for
    completedString.Insert(splitPoint + i, "\\n");
    i++;
}
Console.WriteLine(completedString.ToString());