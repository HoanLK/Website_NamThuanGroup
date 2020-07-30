using System;
using System.Collections.Generic;

namespace CMS.Models.Resources.Product
{
    public class ProductCreateResource
    {
        public Nullable<int> CategoryId { get; set; }
        public string VN_Name { get; set; }
        public string VN_Description { get; set; }
        public string VN_Content { get; set; }
        public string EN_Name { get; set; }
        public string EN_Description { get; set; }
        public string EN_Content { get; set; }
        public bool Published { get; set; }
        public bool Featured { get; set; }
        public string Image { get; set; }
        public string ImageBanner { get; set; }
        public string Tags { get; set; }
        public int SortOrder { get; set; }
        public string Note { get; set; }
        public string SEO_Title { get; set; }
        public string SEO_Description { get; set; }
        public string SEO_Keywords { get; set; }
        public string SEO_Image { get; set; }

        public List<string> Images { get; set; }
    }
}