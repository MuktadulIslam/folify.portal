"use client";

interface DeviceFrameProps {
  device: "mobile" | "tablet";
  children: React.ReactNode;
}

const DEVICE_WIDTHS = {
  mobile: 375,
  tablet: 768,
};

export default function DeviceFrame({ device, children }: DeviceFrameProps) {
  const width = DEVICE_WIDTHS[device];

  return (
    <div className="flex-1 flex items-start justify-center overflow-auto bg-green-50 p-6">
      <div
        className="bg-white rounded-2xl shadow-lg border-4 border-gray-800 overflow-hidden"
        style={{ width: `${width}px`, minHeight: "600px" }}
      >
        {/* Device notch */}
        <div className="h-6 bg-gray-800 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
