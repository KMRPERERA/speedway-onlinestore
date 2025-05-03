
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient; // Changed from MySql.Data.MySqlClient
using OnlineStoreBackend.Models.Business;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;

namespace OnlineStoreBackend.Models.DB
{
    public class MoterpartsData
    {
        private readonly string _connectionString;

        public MoterpartsData(string connectionString)
        {
            _connectionString = connectionString;
        }

        public bool AddItemsToCart(string ProductCategory, string ProductSubCategory, string Brand, string PartName,string PartDescription,decimal Price,string ImageURL,int StockQty,string SupplierEmail)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("AddShoppingCartItem", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        // Add parameters to the command
                        cmd.Parameters.AddWithValue("@ProductCategory", ProductCategory);
                        cmd.Parameters.AddWithValue("@ProductSubCategory", ProductSubCategory);
                        cmd.Parameters.AddWithValue("@Brand", Brand);
                        cmd.Parameters.AddWithValue("@PartName", PartName);
                        cmd.Parameters.AddWithValue("@PartDescription", PartDescription);
                        cmd.Parameters.AddWithValue("@Price", Price);
                        cmd.Parameters.AddWithValue("@ImageURL", ImageURL);
                        cmd.Parameters.AddWithValue("@StockQty", StockQty);
                        cmd.Parameters.AddWithValue("@SupplierEmail", SupplierEmail);
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


        public List<Moterparts> GetItemsToCart()
        {
            List<Moterparts> users = new List<Moterparts>();
            using (SqlConnection connection = new SqlConnection(_connectionString)) // Changed from MySqlConnection
            {
                using (SqlCommand cmd = new SqlCommand("GetAllShoppingCartItems", connection)) // Changed from MySqlCommand
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Add parameters to the command

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader()) // Changed from MySqlDataReader
                    {
                        while (reader.Read())
                        {
                            users.Add(new Moterparts
                            {
                                StockQty = reader.GetInt32(reader.GetOrdinal("StockQty")), // SQL Server best practice
                                ProductID = reader.GetInt32(reader.GetOrdinal("ProductID")),
                                ProductCategory = reader.GetString(reader.GetOrdinal("ProductCategory")),
                                ProductSubCategory = reader.GetString(reader.GetOrdinal("ProductSubCategory")),
                                Brand = reader.GetString(reader.GetOrdinal("Brand")),
                                PartName = reader.GetString(reader.GetOrdinal("PartName")),
                                PartDescription = reader.GetString(reader.GetOrdinal("PartDescription")),
                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price"))
                            });
                        }
                    }
                }
            }
            return users;
        }


    }
}