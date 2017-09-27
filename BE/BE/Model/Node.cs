using System.Reflection.Emit;

namespace BE.Model
{
    public class Node
    {
        public Node(string id, string label, string parentId)
        {
            Id = id;
            Label = label;
            ParentId = ParentId;
        }
        public string Id { get; set; }
        public string Label { get; set; }
        public string ParentId { get; set; }

    }
}