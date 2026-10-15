import KernLanyardPass from "./KernLanyardPass";

export default function Lanyard() {
  return (
    <div className="relative h-full w-full min-h-0">
      <KernLanyardPass
        content={{
          attendeeName: "",
          ticketType: "",
          ticketNumber: "",
          eventName: "",
          eventDate: "",
          barcodeValue: "",
          strapText: "RAHARDAN",
        }}
        look={{
          paper: "#131417",
          ink: "#F2F1EC",
          accent: "#FF2D55",
          strapColor: "#1A1A1A",
          strapStyle: "flat",
          photoFit: "cover",
          foil: true,
          finish: "gloss",
          sleeve: false,
        }}
        layout={{
          size: 360,
          padding: 48,
          stackGap: 12,
          thickness: 5.4,
        }}
        motion={true}
      />
    </div>
  );
}
