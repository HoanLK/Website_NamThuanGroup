using System.Collections.Generic;

namespace CMS.Models.ViewModels
{
    public class ComponentViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SubTitle { get; set; }
        public string Content { get; set; }
        public string Link { get; set; }
        public string TextButton { get; set; }
        public bool IsSingleMedia { get; set; }
        public string LinkMedia { get; set; }
        public ICollection<ComponentImage> ComponentImages { get; set; }
    }
}