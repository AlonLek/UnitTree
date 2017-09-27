namespace BE.Model
{
    public class Edge
    {
        public Edge(string from, string to)
        {
            From = from;
            To = to;
        }
        public string From { get; set;}
        public string To { get; set; }

    }
}