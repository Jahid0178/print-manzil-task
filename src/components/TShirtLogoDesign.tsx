import { useRef, useState } from "react";
import TShirtMockPic from "../assets/tshirt-mock.jpg";
import FileUploader from "./FileUploader";
import Button from "./Button";

interface Position {
  x: number;
  y: number;
}

interface DragOffset {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

const TShirtLogoDesign = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>({ x: 150, y: 150 });
  const [logoSize, setLogoSize] = useState<Size>({ width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const newHeight = 100;
          const newWidth = newHeight * aspectRatio;
          setLogoSize({ width: newWidth, height: newHeight });
        };
        img.src = e.target?.result as string;
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle resize
  const handleResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    const aspectRatio = logoSize.width / logoSize.height;

    setLogoSize({ width: newSize * aspectRatio, height: newSize });
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  // Handle dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const container = document.getElementById("tshirt-container");
      console.log(container);
      if (!container) return;

      const rect = container.getBoundingClientRect();

      let newX = e.clientX - rect.left - dragOffset.x;
      let newY = e.clientY - rect.top - dragOffset.y;

      newX = Math.max(0, Math.min(newX, rect.width - logoSize.width));
      newY = Math.max(0, Math.min(newY, rect.height - logoSize.height));

      setPosition({ x: newX, y: newY });
    }
  };

  // Handle drag end
  const handleMouseUp = (): void => {
    setIsDragging(false);
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div
        id="tshirt-container"
        className="relative w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={TShirtMockPic}
          alt="T-Shiprt Mock"
          className="w-full h-full object-contain"
        />

        {logo && (
          <div
            ref={logoRef}
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${logoSize.width}px`,
              height: `${logoSize.height}px`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
          >
            <img
              src={logo}
              alt="Uploaded logo"
              className="w-full h-full object-contain"
              draggable={true}
            />
          </div>
        )}
      </div>
      <div className="border-2 border-gray-300 p-2 rounded-md relative">
        <div className="flex gap-4">
          <FileUploader onChange={handleLogoUpload} />
          {logo && (
            <input
              type="range"
              min="50"
              max="200"
              defaultValue="100"
              className="w-32"
              onChange={handleResize}
            />
          )}
          <Button
            type="submit"
            className="absolute bottom-2 right-2"
            onClick={() => alert("Logo Submitted Successfully")}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TShirtLogoDesign;
