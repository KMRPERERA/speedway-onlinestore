

using Microsoft.AspNetCore.Mvc;
using OnlineStoreBackend.Models.DB;
using OnlineStoreBackend.Models.Business;
using System.Collections.Generic;

namespace OnlineStoreBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAuthenticationController : ControllerBase
    {
        private readonly UserAuthanticationData _userAuthentication;

        public UserAuthenticationController(UserAuthanticationData userAuthentication)
        {
            _userAuthentication = userAuthentication;
        }

        [HttpGet("login")]
        public ActionResult<IEnumerable<usercredentials>> GetUsers(string p_email, string p_password, string p_account_type)
        {
            var users = _userAuthentication.GetUsers(p_email, p_password, p_account_type); // Fixed syntax error
            return Ok(users);
        }

        [HttpPost("customers")]
        public ActionResult AddCustomers(string p_customer_name, string p_customer_password, string p_customer_email, string p_customer_phone)
        {
            bool addusers = _userAuthentication.AddCustomers(p_customer_name, p_customer_password, p_customer_email, p_customer_phone); // Fixed syntax error
            return Ok(addusers);
        }

        [HttpPost("suppliers")]
        public ActionResult AddSupplier(SupplierCredentials model)
        {
            bool supplierAdded = _userAuthentication.AddSupplier(
                model.p_supplier_name,
                model.p_supplier_password,
                model.p_primary_contact_person,
                model.p_business_email,
                model.p_business_phone,
                model.p_alternative_phone,
                model.p_business_hours,
                model.p_business_name,
                model.p_business_registration_number,
                model.p_type_of_business,
                model.p_years_in_business,
                model.p_business_description,
                model.p_street_address,
                model.p_city,
                model.p_state,
                model.p_postal_code,
                model.p_service_area_coverage,
                model.p_branch_name,
                model.p_branch_address,
                model.p_business_logo,
                model.p_business_license,
                model.p_tax_registration_documents,
                model.p_trade_certificates,
                model.p_brand_dealership_certificates
            );

            if (supplierAdded)
            {
                return Ok(new { success = true, message = "Supplier added successfully" });
            }
            else
            {
                return BadRequest(new { success = false, message = "Failed to add supplier" });
            }
        }

        [HttpGet("supplier")]
        public ActionResult<IEnumerable<SupplierCredentials>> GetSupplier(string business_email)
        {
            var users = _userAuthentication.GetSupplier(business_email); // Fixed syntax error
            return Ok(users);
        }
    }
}