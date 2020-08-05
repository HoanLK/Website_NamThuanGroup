namespace CMS.Models.ViewModels
{
    public class ProductCategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string ImageBanner { get; set; }
        public bool Featured { get; set; }
        public int SortOrder { get; set; }
    }
}