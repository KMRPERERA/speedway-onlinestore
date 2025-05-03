
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


    }
}