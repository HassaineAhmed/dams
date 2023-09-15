"use client";

import { useEffect, useState } from "react";
import { Button } from "../../_components/ui/button";
import Image from "next/image"; import { ImagePlus, Trash } from "lucide-react"; import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: Array<{ imageName: string, url?: string }>;
  isMultiple: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  isMultiple,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  function UploadImageButton() {
    async function sendImage(image: Blob) {
      interface ApiResponse {
        fileName: string;
      }
      return new Promise((resolve, reject) => {
        if (image.type.split("/")[0] != "image") {
          toast.error("Upload Images Only", {
            duration: 3000,
            className: "font-bold w-[300px] bg-[black] text-[white]",
            style: {
              backgroundColor: "black",
              color: "white",
            },
            icon: "❌",
          });
          reject("didn't upload an image");
        } else {
          const reader = new FileReader();
          reader.onload = async function(event) {
            const base64Image = event.target?.result;
            await axios
              .post<ApiResponse>(
                "/api/handle-images/upload-image-s3",
                JSON.stringify({ image: base64Image }),
                { headers: { "Content-Type": `application/json` } }
              )
              .then(response => {
                resolve(response?.data?.fileName);
              })
              .catch((e) => {
                toast.error("could not upload this image")
                console.log(e)
                reject(e);
              });
          };
          reader.readAsDataURL(image);
        }
      });
    }

    async function handleChange(event: any) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        await sendImage(files[i])
          .catch((e) => console.log(e))
          .then((fileName) => {
            onChange(`${fileName}`);
          });
      }
    }

    return (
      <div key={"images"} className="">
        <input
          type={"file"}
          id={"file"}
          name="images"
          className="hidden"
          onChange={(event) => handleChange(event)}
        />
        <label
          htmlFor={"file"}
          className="flex bg-gray-200 justify-center font-semibold gap-2 mr-[5px] my-0 items-center w-[220px] h-[50px] text-[15px] text-center rounded-[5px] cursor-pointer"
        >
          Upload an Image
          <ImagePlus className="h-5 w-5 mr-2" />
        </label>
      </div>
    );
  }
  async function handleRemove(imageName: string) {
    try {
      await axios.delete(`/api/handle-images/${imageName}`);
      onRemove(imageName);
    } catch (e) {
      toast.error("can't remove the image, try again.")
    }
  }
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map(({ imageName, url }: { imageName: string; url?: string }) =>
          imageName != "" ? (
            <div
              key={imageName}
              className="relative bg-gray-300 w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => handleRemove(imageName)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              {url ? <Image fill className="object-cover" alt="Image" src={`${url}`} /> :
                <Image fill className="object-cover" alt="Image" src={`https://dams-images.s3.eu-central-1.amazonaws.com/${imageName}`} />
              }
            </div>
          ) : (
            <div key={imageName}></div>
          )
        )}
      </div>

      {(isMultiple || value.length == 0) && <UploadImageButton />}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ImageUpload;
