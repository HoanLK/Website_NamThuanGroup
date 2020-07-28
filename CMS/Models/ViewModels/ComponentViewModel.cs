using System.Collections.Generic;

namespace CMS.Models.ViewModels
{
    public class ComponentViewModel
    {
        public int Id { get; set; }
        public string MainTitle { get; set; }
        public string SubTitle { get; set; }
        public string Content { get; set; }
        public string Link { get; set; }
        public string TextButton { get; set; }
        public bool IsSingleMedia { get; set; }
        public string LinkMedia { get; set; }
        public string AnimateIn { get; set; }
        public string AnimateOut { get; set; }
        public double Timeout { get; set; }
        public string Icon { get; set; }
        public int SortOrder { get; set; }
        public ICollection<ComponentImage> ComponentImages { get; set; }
    }
}