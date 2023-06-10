import { useState } from "react";
import TextToImageGenerator from "./textToImage";
import ImageUploadForm from "./imageUploadForm";

const ArtGenerator = () => {
  // State variables
  const [imageParams, setImageParams] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {(() => {
        switch (true) {
          case imageUrl === "":
            // Render TextToImageGenerator component when imageUrl is empty
            return (
              <TextToImageGenerator
                setBase64Image={setBase64Image}
                setImageParams={setImageParams}
                setImageUrl={setImageUrl}
                setLoading={setLoading}
              />
            );
          case imageUrl !== "":
            // Render ImageUploadForm component when imageUrl is not empty
            return (
              <ImageUploadForm
                image={imageUrl}
                base64Image={base64Image}
                imageParams={imageParams}
              />
            );
          case loading:
            // Render loading message when loading is true
            return <div>loading</div>;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default ArtGenerator;
