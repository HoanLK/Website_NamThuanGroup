using System.Collections.Generic;

namespace CMS.Models.ViewModels
{
    public class HomeViewModel
    {
        public ModuleViewModel GioiThieuDacDiem { get; set; }
        public ModuleViewModel QuyTrinhSanXuat { get; set; }
        public ModuleViewModel QuyTrinhKiemSoatChatLuong { get; set; }
        public List<ProductCategoryViewModel> ProductCategories { get; set; }
        public SendEmailContactViewModel EmailContact { get; set; }
    }
}