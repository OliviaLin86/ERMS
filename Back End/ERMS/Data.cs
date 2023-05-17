using ERMS.Models;
using System.Collections.Generic;

namespace ERMS
{
    public class Data
    {
        public static List<RequestDB> Requests = new()
        {
            new RequestDB()
            {
                RequestId = 1,
                ClientUserId = 1
            },
            new RequestDB()
            {
                RequestId = 2,
                ClientUserId = 2
            },
            new RequestDB()
            {
                RequestId = 3,
                ClientUserId = 1
            }
        };

        public static List<RequestVendor> RequestVendors = new()
        {
            new RequestVendor()
            {
                RequestVendorId = 1,
                RequestId = 1,
                VendorUserId = 3,
                SupplyId = 1,
                IsReceived = true
            },
            new RequestVendor()
            {
                RequestVendorId = 2,
                RequestId = 2,
                VendorUserId = 4,
                SupplyId = 2,
                IsReceived = false
            },
            new RequestVendor()
            {
                RequestVendorId = 3,
                RequestId = 3,
                VendorUserId = 3,
                SupplyId = 1,
                IsReceived = true
            },
            new RequestVendor()
            {
                RequestVendorId = 4,
                RequestId = 3,
                VendorUserId = 4,
                SupplyId = 2,
                IsReceived = false
            }
        };

        public static List<User> Users = new()
        {
            new User()
            {
                UserId = 1,
                UserName = "Client1",
                UserType = UserType.Client
            },
            new User()
            {
                UserId = 2,
                UserName = "Client2",
                UserType = UserType.Client
            },
            new User()
            {
                UserId = 3,
                UserName = "Vendor1",
                UserType = UserType.Vendor
            },
            new User()
            {
                UserId = 4,
                UserName = "Vendor2",
                UserType = UserType.Vendor
            }
        };

        public static List<Supply> Supplies = new()
        {
            new Supply()
            {
                SupplyId = 1,
                SupplyName = "Glove"
            },
            new Supply()
            {
                SupplyId = 2,
                SupplyName = "Scalpel"
            }
        };
    }
}