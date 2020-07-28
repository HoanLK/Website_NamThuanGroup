using System;

namespace CMS.Models.Resources.Module
{
    public class ModuleEditResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public bool Published { get; set; }
        public Nullable<int> SortOrder { get; set; }
    }
}