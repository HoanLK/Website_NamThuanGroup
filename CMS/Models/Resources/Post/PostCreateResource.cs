using System;

namespace CMS.Models.Resources.Post
{
    public class PostCreateResource
    {
        public Nullable<int> CategoryId { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public bool Published { get; set; }
        public bool Featured { get; set; }
        public string Image { get; set; }
        public string Tags { get; set; }
        public string ImageBanner { get; set; }
        public string Note { get; set; }
        public string SEO_Title { get; set; }
        public string SEO_Description { get; set; }
        public string SEO_Keywords { get; set; }
        public string SEO_Image { get; set; }
    }
}