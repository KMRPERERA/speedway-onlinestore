
using Microsoft.AspNetCore.Mvc;
using OnlineStoreBackend.Models.DB;
using OnlineStoreBackend.Models.Business;
using System.Collections.Generic;

namespace OnlineStoreBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoterpartApiController : ControllerBase
    {
        private readonly MoterpartsData _moterpartdata;

        public MoterpartApiController(MoterpartsData moterpartdata)
        {
            _moterpartdata = moterpartdata;
        }


        [HttpPost("additems")]
        public ActionResult AddItemsToCart(string ProductCategory, string ProductSubCategory, string Brand, string PartName, string PartDescription, decimal Price, string ImageURL, int StockQty, string SupplierEmail)
        {
            bool addusers = _moterpartdata.AddItemsToCart(ProductCategory, ProductSubCategory,Brand, PartName,PartDescription,Price,ImageURL,StockQty,SupplierEmail); // Fixed syntax error
            return Ok(addusers);
        }

        [HttpGet("getitems")]
        public ActionResult<IEnumerable<Moterparts>> GetItemsToCart()
        {
            var items= _moterpartdata.GetItemsToCart(); // Fixed syntax error
            return Ok(items);
        }


        [HttpPost("addorder")]
        public ActionResult<IEnumerable<orderitems>> Addorder(int ProductID,string CustomerEmail,string CustomerAddress,decimal OrderPrice,string CustomerName,int OrderQty,string PhoneNumber)
        {
            var items = _moterpartdata.addorderItems(ProductID, CustomerEmail, CustomerAddress, OrderPrice, CustomerName, OrderQty, PhoneNumber); // Fixed syntax error
            return Ok(items);
        }


        [HttpGet("getorders")]
        public ActionResult<IEnumerable<OrderDetails>> Getorder(string SupplierEmail)
        {
            var items = _moterpartdata.Getorder(SupplierEmail); // Fixed syntax error
            return Ok(items);
        }

        [HttpGet("trackorder")]
        public ActionResult<IEnumerable<OrderDetails>>Trackorder(int OrderNumber, string PhoneNumber)
        {
            var items = _moterpartdata.Trackorder(OrderNumber, PhoneNumber); // Fixed syntax error
            return Ok(items);
        }


        [HttpGet("getneworders")]
        public ActionResult<IEnumerable<NEWOrderDetails>> GetNeworder(string SupplierEmail)
        {
            var items = _moterpartdata.GetNeworder(SupplierEmail); // Fixed syntax error
            return Ok(items);
        }


        [HttpPost("adddeliverystatus")]
        public ActionResult<IEnumerable<OrderDetails>> Adddeliverystatus(int OrderNumber,bool IsShipped,bool IsDelivered)
        {
            var items = _moterpartdata.Adddeliverystatus(OrderNumber, IsShipped, IsDelivered); // Fixed syntax error
            return Ok(items);
        }


        [HttpGet("getdeliveredorders")]
        public ActionResult<IEnumerable<NEWOrderDetails>> GetDeliveredorder(string CustomerEmail)
        {
            var items = _moterpartdata.GetDeliveredorder(CustomerEmail); // Fixed syntax error
            return Ok(items);
        }


    }
}