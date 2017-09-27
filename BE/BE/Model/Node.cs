using System.Reflection.Emit;

namespace BE.Model
{
    public class Node
    {
        public Node(string id, string label)
        {
            Id = id;
            Label = label;
        }
        public string Id { get; set; }
        public string Label { get; set; }

    }
}