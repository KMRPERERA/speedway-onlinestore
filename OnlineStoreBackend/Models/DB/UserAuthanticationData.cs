

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
    }
}