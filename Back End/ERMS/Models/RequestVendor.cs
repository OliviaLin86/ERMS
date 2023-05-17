namespace ERMS
{
    public class RequestVendor
    {
        public int RequestVendorId { get; set; }
        public int RequestId { get; set; }
        public int VendorUserId { get; set; }
        public int SupplyId { get; set; }
        public bool IsReceived { get; set; }
    }
}