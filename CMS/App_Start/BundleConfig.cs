using System.Web.Optimization;

namespace CMS
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // --- FRONT-END ---
            // CSS
            // Fontawesome
            bundles.Add(new StyleBundle("~/fontawesome").Include(
                "~/Content/Vendors/fontawesome/css/all.min.css"
            ));
            // Vendors
            bundles.Add(new StyleBundle("~/vendors/css").Include(
                "~/Content/Vendors/bootstrap/css/bootstrap.min.css",
                "~/Content/Vendors/animate/animate.min.css",
                "~/Content/Vendors/owl.carousel/assets/owl.carousel.min.css",
                "~/Content/Vendors/owl.carousel/assets/owl.theme.default.min.css",
                "~/Content/Vendors/magnific-popup/magnific-popup.min.css"
            ));
            // Theme
            bundles.Add(new StyleBundle("~/theme/css").Include(
                // Theme
                "~/Content/Frontend/css/theme.min.css",
                "~/Content/Frontend/css/theme-elements.css",
                // Page
                "~/Content/Vendors/rs-plugin/css/settings.css",
                //"~/Content/Vendors/rs-plugin/css/layers.css",
                //"~/Content/Vendors/rs-plugin/css/navigation.css",
                // Skin
                "~/Content/Frontend/css/skins/default.css",
                // Theme Custom
                "~/Content/Frontend/css/custom.css"
            ));

            // JS
            // Modernizr
            bundles.Add(new ScriptBundle("~/modernizr").Include(
                "~/Content/Frontend/vendor/modernizr/modernizr.min.js"
            ));
            // Vendors
            bundles.Add(new ScriptBundle("~/vendors/js").Include(
                "~/Content/Vendors/bootstrap/js/bootstrap.bundle.min.js",
                "~/Content/Vendors/common/common.min.js",
                "~/Content/Vendors/isotope/jquery.isotope.min.js",
                "~/Scripts/jquery.unobtrusive-ajax.min.js",
                "~/Content/Vendors/owl.carousel/owl.carousel.min.js",
                "~/Content/Vendors/magnific-popup/jquery.magnific-popup.min.js"
            ));
            // Theme
            bundles.Add(new ScriptBundle("~/theme/js").Include(
                // Theme Base, Components and Settings
                "~/Content/Frontend/js/theme.js",
                // Current Page Vendor and Views,
                "~/Content/Vendors/rs-plugin/js/jquery.themepunch.tools.min.js",
                "~/Content/Vendors/rs-plugin/js/jquery.themepunch.revolution.min.js",
                // Theme Custom
                "~/Content/Frontend/js/custom.js",
                // Theme Initialization Files
                "~/Content/Frontend/js/theme.init.js",
                // Examples,
                "~/Content/Frontend/js/examples/examples.lightboxes.js"
            ));

            BundleTable.EnableOptimizations = false;
        }
    }
}
