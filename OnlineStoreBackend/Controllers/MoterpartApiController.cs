
using Microsoft.AspNetCore.Mvc;
using OnlineStoreBackend.Models.DB;
using OnlineStoreBackend.Models.Business;
using System.Collections.Generic;

namespace OnlineStoreBackend.Controllers
{
    [ApiController]
    [Route("api/onlinestore")]
    public class MoterpartApiController : ControllerBase
    {
        private readonly VehicleItemBusiness _vehicleItemBusiness;

        public MoterpartApiController(VehicleItemBusiness vehicleItemBusiness)
        {
            _vehicleItemBusiness = vehicleItemBusiness;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Moterparts>> GetVehicleItems()
        {
            var vehicleItems = _vehicleItemBusiness.GetVehicleItems();
            return Ok(vehicleItems);
        }
    }
}