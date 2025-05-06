
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


        public List<orderitems> addorderItems(int ProductID,string CustomerEmail,string CustomerAddress,decimal OrderPrice,string CustomerName,int OrderQty,string PhoneNumber)
        {
            List<orderitems> users = new List<orderitems>();
            using (SqlConnection connection = new SqlConnection(_connectionString)) // Changed from MySqlConnection
            {
                using (SqlCommand cmd = new SqlCommand("CreateNewOrder", connection)) // Changed from MySqlCommand
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProductID", ProductID);
                    cmd.Parameters.AddWithValue("@CustomerEmail", CustomerEmail);
                    cmd.Parameters.AddWithValue("@CustomerAddress", CustomerAddress);
                    cmd.Parameters.AddWithValue("@OrderPrice", OrderPrice);
                    cmd.Parameters.AddWithValue("@CustomerName", CustomerName);
                    cmd.Parameters.AddWithValue("@OrderQty", OrderQty);
                    cmd.Parameters.AddWithValue("@PhoneNumber", PhoneNumber);

                    // Add parameters to the command

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader()) // Changed from MySqlDataReader
                    {
                        while (reader.Read())
                        {
                            users.Add(new orderitems
                            {
                                OrderNumber = reader.GetDecimal(reader.GetOrdinal("NewOrderNumber"))
                            });
                        }
                    }
                }
            }
            return users;
        }



        public List<OrderDetails> Getorder(string SupplierEmail)
        {
            List<OrderDetails> users = new List<OrderDetails>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetOrdersBySupplierEmail", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SupplierEmail", SupplierEmail);

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            users.Add(new OrderDetails
                            {
                                OrderNumber = reader.GetInt32(reader.GetOrdinal("OrderNumber")),
                                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                OrderQty = reader.GetInt32(reader.GetOrdinal("OrderQty")),
                                DeliverDate = reader.GetDateTime(reader.GetOrdinal("DeliverDate")),
                                IsShipped = reader.GetBoolean(reader.GetOrdinal("IsShipped")),
                                IsDelivered = reader.GetBoolean(reader.GetOrdinal("IsDelivered")),
                                SupplierEmail = reader.GetString(reader.GetOrdinal("SupplierEmail")),
                                CustomerName = reader.GetString(reader.GetOrdinal("CustomerName")),
                                CustomerEmail = reader.GetString(reader.GetOrdinal("CustomerEmail")),
                                OrderPrice = reader.GetDecimal(reader.GetOrdinal("OrderPrice")),
                                CustomerAddress = reader.GetString(reader.GetOrdinal("CustomerAddress")),
                                ProductID = reader.GetInt32(reader.GetOrdinal("ProductID"))
                            });
                        }
                    }
                }
            }
            return users;
        }



        public List<OrderDetails> Trackorder(int OrderNumber, string PhoneNumber)
        {
            List<OrderDetails> users = new List<OrderDetails>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetOrderDetails", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@OrderNumber", OrderNumber);
                    cmd.Parameters.AddWithValue("@PhoneNumber", PhoneNumber);

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            users.Add(new OrderDetails
                            {
                                OrderNumber = reader.GetInt32(reader.GetOrdinal("OrderNumber")),
                                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                OrderQty = reader.GetInt32(reader.GetOrdinal("OrderQty")),
                                DeliverDate = reader.GetDateTime(reader.GetOrdinal("DeliverDate")),
                                IsShipped = reader.GetBoolean(reader.GetOrdinal("IsShipped")),
                                IsDelivered = reader.GetBoolean(reader.GetOrdinal("IsDelivered")),
                                SupplierEmail = reader.GetString(reader.GetOrdinal("SupplierEmail")),
                                CustomerName = reader.GetString(reader.GetOrdinal("CustomerName")),
                                CustomerEmail = reader.GetString(reader.GetOrdinal("CustomerEmail")),
                                OrderPrice = reader.GetDecimal(reader.GetOrdinal("OrderPrice")),
                                CustomerAddress = reader.GetString(reader.GetOrdinal("CustomerAddress")),
                                ProductID = reader.GetInt32(reader.GetOrdinal("ProductID"))
                            });
                        }
                    }
                }
            }
            return users;
        }


        public List<NEWOrderDetails> GetNeworder(string SupplierEmail)
        {
            List<NEWOrderDetails> users = new List<NEWOrderDetails>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetNewOrdersBySupplierEmail", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SupplierEmail", SupplierEmail);

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            users.Add(new NEWOrderDetails
                            {
                                OrderNumber = reader.GetInt32(reader.GetOrdinal("OrderNumber")),
                                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                OrderQty = reader.GetInt32(reader.GetOrdinal("OrderQty")),
                                DeliverDate = reader.GetDateTime(reader.GetOrdinal("DeliverDate")),
                                IsShipped = reader.GetBoolean(reader.GetOrdinal("IsShipped")),
                                IsDelivered = reader.GetBoolean(reader.GetOrdinal("IsDelivered")),
                                SupplierEmail = reader.GetString(reader.GetOrdinal("SupplierEmail")),
                                CustomerName = reader.GetString(reader.GetOrdinal("CustomerName")),
                                CustomerEmail = reader.GetString(reader.GetOrdinal("CustomerEmail")),
                                OrderPrice = reader.GetDecimal(reader.GetOrdinal("OrderPrice")),
                                CustomerAddress = reader.GetString(reader.GetOrdinal("CustomerAddress")),
                                ProductID = reader.GetInt32(reader.GetOrdinal("ProductID")),
                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL"))
                            });
                        }
                    }
                }
            }
            return users;
        }




        public List<OrderDetails> Adddeliverystatus(int OrderNumber, bool IsShipped, bool IsDelivered)
        {
            List<OrderDetails> users = new List<OrderDetails>();
            using (SqlConnection connection = new SqlConnection(_connectionString)) // Changed from MySqlConnection
            {
                using (SqlCommand cmd = new SqlCommand("UpdateOrderStatus", connection)) // Changed from MySqlCommand
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@OrderNumber", OrderNumber);
                    cmd.Parameters.AddWithValue("@IsShipped", IsShipped);
                    cmd.Parameters.AddWithValue("@IsDelivered", IsDelivered);
                    // Add parameters to the command

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader()) // Changed from MySqlDataReader
                    {
                        while (reader.Read())
                        {
                            users.Add(new OrderDetails
                            {

                                OrderNumber = reader.GetInt32(reader.GetOrdinal("OrderNumber")),
                                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                OrderQty = reader.GetInt32(reader.GetOrdinal("OrderQty")),
                                DeliverDate = reader.GetDateTime(reader.GetOrdinal("DeliverDate")),
                                IsShipped = reader.GetBoolean(reader.GetOrdinal("IsShipped")),
                                IsDelivered = reader.GetBoolean(reader.GetOrdinal("IsDelivered")),
                                SupplierEmail = reader.GetString(reader.GetOrdinal("SupplierEmail")),
                                CustomerName = reader.GetString(reader.GetOrdinal("CustomerName")),
                                CustomerEmail = reader.GetString(reader.GetOrdinal("CustomerEmail")),
                                OrderPrice = reader.GetDecimal(reader.GetOrdinal("OrderPrice")),
                                CustomerAddress = reader.GetString(reader.GetOrdinal("CustomerAddress")),
                                ProductID = reader.GetInt32(reader.GetOrdinal("ProductID"))
                            });
                        }
                    }
                }
            }
            return users;
        }


        public List<NEWOrderDetails> GetDeliveredorder(string CustomerEmail)
        {
            List<NEWOrderDetails> users = new List<NEWOrderDetails>();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetDeliverdOrders", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CustomerEmail", CustomerEmail);

                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            users.Add(new NEWOrderDetails
                            {
                                OrderNumber = reader.GetInt32(reader.GetOrdinal("OrderNumber")),
                                PhoneNumber = reader.GetString(reader.GetOrdinal("PhoneNumber")),
                                OrderQty = reader.GetInt32(reader.GetOrdinal("OrderQty")),
                                DeliverDate = reader.GetDateTime(reader.GetOrdinal("DeliverDate")),
                                IsShipped = reader.GetBoolean(reader.GetOrdinal("IsShipped")),
                                IsDelivered = reader.GetBoolean(reader.GetOrdinal("IsDelivered")),
                                SupplierEmail = reader.GetString(reader.GetOrdinal("SupplierEmail")),
                                CustomerName = reader.GetString(reader.GetOrdinal("CustomerName")),
                                CustomerEmail = reader.GetString(reader.GetOrdinal("CustomerEmail")),
                                OrderPrice = reader.GetDecimal(reader.GetOrdinal("OrderPrice")),
                                CustomerAddress = reader.GetString(reader.GetOrdinal("CustomerAddress")),
                                ProductID = reader.GetInt32(reader.GetOrdinal("ProductID")),
                                ImageURL = reader.GetString(reader.GetOrdinal("ImageURL"))
                            });
                        }
                    }
                }
            }
            return users;
        }


    }
}