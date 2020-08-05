using System.Collections.Generic;

namespace CMS.Models.ViewModels
{
    public class DetailProductCategoryViewModel
    {
        public ProductCategoryViewModel Category { get; set; }
        public List<ProductViewModel> Products { get; set; }
    }
}