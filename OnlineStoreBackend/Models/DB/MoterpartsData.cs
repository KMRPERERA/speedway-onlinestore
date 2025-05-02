
using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using OnlineStoreBackend.Models.Business;

namespace OnlineStoreBackend.Models.DB
{
    public class VehicleItemBusiness
    {
        private readonly string _connectionString;

        public VehicleItemBusiness(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Moterparts> GetVehicleItems()
        {
            List<Moterparts> vehicleItems = new List<Moterparts>();

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand("GetUserByLogin", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    connection.Open();

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            vehicleItems.Add(new Moterparts
                            {
                                moterpartid = reader.GetInt32("moterpartid"),
                                moterpartname = reader.GetString("moterpartname"),
                                price = reader.GetInt32("price"),
                            });
                        }
                    }
                }
            }
      

            return vehicleItems;
        }
    }
}