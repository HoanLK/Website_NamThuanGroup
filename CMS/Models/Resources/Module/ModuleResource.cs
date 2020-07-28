using System;

namespace CMS.Models.Resources.Module
{
    public class ModuleResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public bool Published { get; set; }
        public Nullable<int> SortOrder { get; set; }
        public string CreateUser { get; set; }
        public Nullable<DateTime> CreateTime { get; set; }
        public string ModifyUser { get; set; }
        public Nullable<DateTime> ModifyTime { get; set; }
    }
}