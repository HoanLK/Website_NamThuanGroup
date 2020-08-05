//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CMS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            this.ProductImages = new HashSet<ProductImage>();
        }
    
        public int Id { get; set; }
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
        public string CreateUser { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public string ModifyUser { get; set; }
        public Nullable<System.DateTime> ModifyTime { get; set; }
        public double Views { get; set; }
    
        public virtual ProductCategory ProductCategory { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductImage> ProductImages { get; set; }
    }
}