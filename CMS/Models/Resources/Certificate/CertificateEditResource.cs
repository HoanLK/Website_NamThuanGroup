using System;
using System.Collections.Generic;

namespace CMS.Models.Resources.Certificate
{
    public class CertificateEditResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Published { get; set; }
        public bool Featured { get; set; }
        public string Link { get; set; }
        public string Image { get; set; }
        public string Note { get; set; }
        public string SEO_Title { get; set; }
        public string SEO_Description { get; set; }
        public string SEO_Keywords { get; set; }
        public string SEO_Image { get; set; }
    }
}