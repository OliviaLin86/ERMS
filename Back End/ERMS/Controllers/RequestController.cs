using ERMS.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace ERMS.Controllers
{
    [Route("[controller]")]
    public class RequestController : ControllerBase
    {
        [HttpPost("/Request/Add")]
        public ActionResult<IEnumerable<RequestUI>> Add([FromBody] RequestUI[] requests)
        {
            int newRequestId = Data.Requests.Count + 1;
            int currentUserId = requests[0].ClientUserId;

            RequestDB newRequest = new()
            {
                RequestId = newRequestId,
                ClientUserId = currentUserId
            };
            Data.Requests.Add(newRequest);

            for (int i = 0; i < requests.Length; i++)
            {
                requests[i].RequestId = newRequestId;
                RequestVendor rv = new()
                {
                    RequestVendorId = Data.RequestVendors.Count + 1,
                    RequestId = newRequestId,
                    VendorUserId = requests[i].VendorUserId,
                    SupplyId = requests[i].SupplyId,
                    IsReceived = false
                };
                Data.RequestVendors.Add(rv);
            }

            return GetRequestsByUserId(currentUserId);
        }

        [HttpGet("/Request/GetByUserId/{currentUserId}")]
        public ActionResult GetRequestsByUserId(int currentUserId)
        {
            bool isCurrentUserClient = Data.Users.Where(user => user.UserId == currentUserId)?
                                           .FirstOrDefault()?.UserType == UserType.Client;
            var result =
            from request in Data.Requests
            join rv in Data.RequestVendors on request.RequestId equals rv.RequestId
            join client in Data.Users on request.ClientUserId equals client.UserId
            join vendor in Data.Users on rv.VendorUserId equals vendor.UserId
            join supply in Data.Supplies on rv.SupplyId equals supply.SupplyId
            where (isCurrentUserClient ? request.ClientUserId : rv.VendorUserId) == currentUserId
            select new RequestUI
            {
                RequestId = request.RequestId,
                RequestVendorId = rv.RequestVendorId,
                ClientUserId = request.ClientUserId,
                VendorUserId = rv.VendorUserId,
                SupplyId = supply.SupplyId,
                IsReceived = rv.IsReceived
            };

            if (!result.Any())
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPut("/Request/Acknowledge/{requestId}/{vendorUserId}")]
        public ActionResult<bool> Acknowledge(int requestId, int vendorUserId)
        {
            RequestVendor requestVendor = Data.RequestVendors.FirstOrDefault(rv => rv.RequestId == requestId && rv.VendorUserId == vendorUserId);
            if (requestVendor != null)
            {
                requestVendor.IsReceived = true;
                return Ok(true);
            }
            return NotFound(false);
        }

        [HttpPut("/Request/Update")]
        public ActionResult<IEnumerable<RequestUI>> Update([FromBody] RequestUI[] requests)
        {
            foreach (RequestUI request in requests)
            {
                RequestVendor requestVendor = Data.RequestVendors.FirstOrDefault(rv => rv.RequestId == request.RequestId && rv.VendorUserId == request.VendorUserId);
                if (requestVendor != null)
                {
                    requestVendor.SupplyId = request.SupplyId;
                    requestVendor.VendorUserId = request.VendorUserId;
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }
    }
}