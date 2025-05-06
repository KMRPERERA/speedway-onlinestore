

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient; // Changed from MySql.Data.MySqlClient
using OnlineStoreBackend.Models.Business;

namespace OnlineStoreBackend.Models.DB
{
    public class UserAuthanticationData
    {
        private readonly string _connectionString;

        public UserAuthanticationData(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<usercredentials> GetUsers(string p_email, string p_password, string p_account_type)
        {
            List<usercredentials> users = new List<usercredentials>();
            using (SqlConnection connection = new SqlConnection(_connectionString)) // Changed from MySqlConnection
            {
                using (SqlCommand cmd = new SqlCommand("GetUserByLogin", connection)) // Changed from MySqlCommand
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Add parameters to the command
                    cmd.Parameters.AddWithValue("@p_email", p_email);
                    cmd.Parameters.AddWithValue("@p_password", p_password);
                    cmd.Parameters.AddWithValue("@p_account_type", p_account_type);

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader()) // Changed from MySqlDataReader
                    {
                        while (reader.Read())
                        {
                            users.Add(new usercredentials
                            {
                                id = reader.GetInt32(reader.GetOrdinal("id")), // SQL Server best practice
                                name = reader.GetString(reader.GetOrdinal("name")),
                                email = reader.GetString(reader.GetOrdinal("email")),
                            });
                        }
                    }
                }
            }
            return users;
        }

        public bool AddCustomers(string p_customer_name, string p_customer_password, string p_customer_email, string p_customer_phone)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("AddCustomer", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        // Add parameters to the command
                        cmd.Parameters.AddWithValue("@p_customer_name", p_customer_name);
                        cmd.Parameters.AddWithValue("@p_customer_password", p_customer_password);
                        cmd.Parameters.AddWithValue("@p_customer_email", p_customer_email);
                        cmd.Parameters.AddWithValue("@p_customer_phone", p_customer_phone);
                        connection.Open();

                        // Execute the command
                        cmd.ExecuteNonQuery();

                        // If we reach this point without exceptions, consider it a success
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                // Enhanced exception handling
                Console.WriteLine($"Error adding customer: {ex.Message}");
                return false;
            }
        }

      
        public bool AddSupplier(
    string p_supplier_name,
    string p_supplier_password,
    string p_primary_contact_person,
    string p_business_email,
    string p_business_phone,
    string p_alternative_phone,
    string p_business_hours,
    string p_business_name,
    string p_business_registration_number,
    string p_type_of_business,
    int p_years_in_business,
    string p_business_description,
    string p_street_address,
    string p_city,
    string p_state,
    string p_postal_code,
    string p_service_area_coverage,
    string p_branch_name,
    string p_branch_address,
    string p_business_logo,
    string p_business_license,
    string p_tax_registration_documents,
    string p_trade_certificates,
    string p_brand_dealership_certificates)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("AddSupplier", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Add all parameters to match the stored procedure
                        cmd.Parameters.AddWithValue("@p_supplier_name", p_supplier_name);
                        cmd.Parameters.AddWithValue("@p_supplier_password", p_supplier_password);
                        cmd.Parameters.AddWithValue("@p_primary_contact_person", p_primary_contact_person);
                        cmd.Parameters.AddWithValue("@p_business_email", p_business_email);
                        cmd.Parameters.AddWithValue("@p_business_phone", p_business_phone);
                        cmd.Parameters.AddWithValue("@p_alternative_phone", p_alternative_phone ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_business_hours", p_business_hours ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_business_name", p_business_name);
                        cmd.Parameters.AddWithValue("@p_business_registration_number", p_business_registration_number ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_type_of_business", p_type_of_business ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_years_in_business", p_years_in_business);
                        cmd.Parameters.AddWithValue("@p_business_description", p_business_description ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_street_address", p_street_address ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_city", p_city ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_state", p_state ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_postal_code", p_postal_code ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_service_area_coverage", p_service_area_coverage ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_branch_name", p_branch_name ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_branch_address", p_branch_address ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_business_logo", p_business_logo ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_business_license", p_business_license ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_tax_registration_documents", p_tax_registration_documents ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_trade_certificates", p_trade_certificates ?? (object)DBNull.Value);
                        cmd.Parameters.AddWithValue("@p_brand_dealership_certificates", p_brand_dealership_certificates ?? (object)DBNull.Value);

                        connection.Open();

                        // Execute the command
                        cmd.ExecuteNonQuery();

                        // If we get here without exceptions, the operation was successful
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details
                Console.WriteLine($"Error adding supplier: {ex.Message}");
                return false;
            }
        }

        public List<SupplierDetails> GetSupplier(string business_email)
        {
            List<SupplierDetails> supplierDetails = new List<SupplierDetails>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAllSuppliers", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    // Add parameters to the command
                    cmd.Parameters.AddWithValue("@p_business_email", business_email);
                    connection.Open();

                    // First result set - Supplier details
                    SupplierDetails supplier = null;
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read()) // Read the first (and should be only) row
                        {
                            supplier = new SupplierDetails
                            {
                                supplier_id = reader.GetInt32(reader.GetOrdinal("supplier_id")),
                                p_supplier_name = reader["supplier_name"].ToString(),
                                p_primary_contact_person = reader["primary_contact_person"].ToString(),
                                p_business_email = reader["business_email"].ToString(),
                                p_business_phone = reader["business_phone"].ToString(),
                                p_alternative_phone = reader["alternative_phone"].ToString(),
                                p_business_hours = reader["business_hours"].ToString(),
                                p_business_name = reader["business_name"].ToString(),
                                p_business_registration_number = reader["business_registration_number"].ToString(),
                                p_type_of_business = reader["type_of_business"].ToString(),
                                p_years_in_business = reader.IsDBNull(reader.GetOrdinal("years_in_business")) ? 0 : reader.GetInt32(reader.GetOrdinal("years_in_business")),
                                p_business_description = reader["business_description"].ToString(),
                                p_street_address = reader["street_address"].ToString(),
                                p_city = reader["city"].ToString(),
                                p_state = reader["state"].ToString(),
                                p_postal_code = reader["postal_code"].ToString(),
                                p_service_area_coverage = reader["service_area_coverage"].ToString(),
                                p_branch_name = reader["branch_name"].ToString(),
                                p_branch_address = reader["branch_address"].ToString(),
                                p_business_logo = reader["business_logo"].ToString(),
                                p_business_license = reader["business_license"].ToString(),
                                p_tax_registration_documents = reader["tax_registration_documents"].ToString(),
                                p_trade_certificates = reader["trade_certificates"].ToString(),
                                p_brand_dealership_certificates = reader["brand_dealership_certificates"].ToString(),
                                created_at = reader.IsDBNull(reader.GetOrdinal("created_at")) ? DateTime.MinValue : reader.GetDateTime(reader.GetOrdinal("created_at"))
                            };
                        }

                        // Check if we have more result sets (the orders)
                        if (reader.NextResult())
                        {
                            // Second result set - Order details
                            while (reader.Read())
                            {
                                // Create a new instance for each order with supplier details copied
                                SupplierDetails orderDetail = new SupplierDetails
                                {
                                    // Copy supplier information
                                    supplier_id = supplier.supplier_id,
                                    p_supplier_name = supplier.p_supplier_name,
                                    p_primary_contact_person = supplier.p_primary_contact_person,
                                    p_business_email = supplier.p_business_email,
                                    p_business_phone = supplier.p_business_phone,
                                    p_alternative_phone = supplier.p_alternative_phone,
                                    p_business_hours = supplier.p_business_hours,
                                    p_business_name = supplier.p_business_name,
                                    p_business_registration_number = supplier.p_business_registration_number,
                                    p_type_of_business = supplier.p_type_of_business,
                                    p_years_in_business = supplier.p_years_in_business,
                                    p_business_description = supplier.p_business_description,
                                    p_street_address = supplier.p_street_address,
                                    p_city = supplier.p_city,
                                    p_state = supplier.p_state,
                                    p_postal_code = supplier.p_postal_code,
                                    p_service_area_coverage = supplier.p_service_area_coverage,
                                    p_branch_name = supplier.p_branch_name,
                                    p_branch_address = supplier.p_branch_address,
                                    p_business_logo = supplier.p_business_logo,
                                    p_business_license = supplier.p_business_license,
                                    p_tax_registration_documents = supplier.p_tax_registration_documents,
                                    p_trade_certificates = supplier.p_trade_certificates,
                                    p_brand_dealership_certificates = supplier.p_brand_dealership_certificates,
                                    created_at = supplier.created_at,

                                    // Add order information
                                    //OrderNumber = reader.GetInt32(reader.GetOrdinal("OrderNumber")),
                                    //PhoneNumber = reader["PhoneNumber"].ToString(),
                                    //OrderQty = reader.GetInt32(reader.GetOrdinal("OrderQty")),
                                    //DeliverDate = reader.IsDBNull(reader.GetOrdinal("DeliverDate")) ? DateTime.MinValue : reader.GetDateTime(reader.GetOrdinal("DeliverDate")),
                                    //IsShipped = reader.GetBoolean(reader.GetOrdinal("IsShipped")),
                                    //IsDelivered = reader.GetBoolean(reader.GetOrdinal("IsDelivered")),
                                    //SupplierEmail = reader["SupplierEmail"].ToString(),
                                    //CustomerName = reader["CustomerName"].ToString(),
                                    //ProductID = reader.GetInt32(reader.GetOrdinal("ProductID")),
                                    //ProductName = reader["ProductName"].ToString()
                                };

                                supplierDetails.Add(orderDetail);
                            }
                        }

                        // If there were no orders, add just the supplier record
                        if (supplierDetails.Count == 0 && supplier != null)
                        {
                            supplierDetails.Add(supplier);
                        }
                    }
                }
            }
            return supplierDetails;
        }
    }
}