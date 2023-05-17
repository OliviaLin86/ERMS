namespace ERMS.Models
{
    public class RequestUI
    {
        public int RequestId { get; set; }
        public int RequestVendorId { get; set; }
        public int ClientUserId { get; set; }
        public bool IsReceived { get; set; }
        public int VendorUserId { get; set; }
        public int SupplyId { get; set; }
    }
}