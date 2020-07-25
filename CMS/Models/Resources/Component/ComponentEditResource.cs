using System.Collections.Generic;

namespace CMS.Models.Resources.Component
{
    public class ComponentEditResource
    {
        public int Id { get; set; }
        public string VN_Name { get; set; }
        public string VN_SubTitle { get; set; }
        public string VN_Content { get; set; }
        public string VN_Link { get; set; }
        public string VN_TextButton { get; set; }
        public string EN_Name { get; set; }
        public string EN_SubTitle { get; set; }
        public string EN_Content { get; set; }
        public string EN_Link { get; set; }
        public string EN_TextButton { get; set; }
        public bool IsSingleMedia { get; set; }
        public string LinkMedia { get; set; }
        public string Note { get; set; }
        public List<string> Links { get; set; }
    }
}