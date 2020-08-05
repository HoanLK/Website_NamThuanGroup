using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int SortOrder { get; set; }
    }
}