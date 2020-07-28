using System;

namespace CMS.Models.Resources.Component
{
    public class ComponentResource
    {
        public int Id { get; set; }
        public Nullable<int> ModuleId { get; set; }
        public string Name { get; set; }
        public string VN_MainTitle { get; set; }
        public string VN_SubTitle { get; set; }
        public string VN_Content { get; set; }
        public string VN_Link { get; set; }
        public string VN_TextButton { get; set; }
        public string EN_MainTitle { get; set; }
        public string EN_SubTitle { get; set; }
        public string EN_Content { get; set; }
        public string EN_Link { get; set; }
        public string EN_TextButton { get; set; }
        public bool IsSingleMedia { get; set; }
        public string LinkMedia { get; set; }
        public string AnimateIn { get; set; }
        public string AnimateOut { get; set; }
        public double Timeout { get; set; }
        public string Icon { get; set; }
        public bool Published { get; set; }
        public int SortOrder { get; set; }
        public string Note { get; set; }
        public string CreateUser { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public string ModifyUser { get; set; }
        public Nullable<System.DateTime> ModifyTime { get; set; }
    }
}