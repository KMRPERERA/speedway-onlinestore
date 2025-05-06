namespace OnlineStoreBackend.Models.Business
{

    public class Moterparts
    {
        public int ProductID { get; set; }
        public string ProductCategory { get; set; }
        public string ProductSubCategory { get; set; }
        public string Brand { get; set; }
        public string PartName { get; set; }
        public string PartDescription { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public int StockQty { get; set; }
        public string SupplierEmail { get; set; }
    }

    public class orderitems
    {
        public decimal OrderNumber { get; set; }
    }
}
