namespace BrickStoreBackend.DTO
{
    public class EngineerAppointmentResponseDTO
    {
        public long AppointmentId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; }
        public double Sqft { get; set; }
        public int Bhk { get; set; }
        public int Floor { get; set; }
        public string LandDescription { get; set; }

        public long? UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
}
