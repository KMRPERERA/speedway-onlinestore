namespace OnlineStoreBackend.Models.Business
{
    public class usercredentials
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }

    }
    public class SupplierCredentials
    {
        public string p_supplier_name { get; set; }
        public string p_supplier_password { get; set; }
        public string p_primary_contact_person { get; set; }
        public string p_business_email { get; set; }
        public string p_business_phone { get; set; }
        public string p_alternative_phone { get; set; }
        public string p_business_hours { get; set; }
        public string p_business_name { get; set; }
        public string p_business_registration_number { get; set; }
        public string p_type_of_business { get; set; }
        public int p_years_in_business { get; set; }
        public string p_business_description { get; set; }
        public string p_street_address { get; set; }
        public string p_city { get; set; }
        public string p_state { get; set; }
        public string p_postal_code { get; set; }
        public string p_service_area_coverage { get; set; }
        public string p_branch_name { get; set; }
        public string p_branch_address { get; set; }
        public string p_business_logo { get; set; }
        public string p_business_license { get; set; }
        public string p_tax_registration_documents { get; set; }
        public string p_trade_certificates { get; set; }
        public string p_brand_dealership_certificates { get; set; }
    }

    public class CustomerCredentials
    {
        public string p_customer_name { get; set; }
        public string p_customer_password { get; set; }
        public string p_customer_email { get; set; }
        public string p_customer_phone { get; set; }
    }
}


