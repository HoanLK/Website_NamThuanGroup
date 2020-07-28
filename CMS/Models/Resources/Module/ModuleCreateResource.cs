using System;

namespace CMS.Models.Resources.Module
{
    public class ModuleCreateResource
    {
        public string Name { get; set; }
        public string Note { get; set; }
        public bool Published { get; set; }
        public Nullable<int> SortOrder { get; set; }
    }
}