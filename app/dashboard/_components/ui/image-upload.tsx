"use client";

import { useEffect, useState } from "react";
import { Button } from "../../_components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
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
  const [clientImageUrl, setClientImageUrl] = useState("")

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
                "/api/handle-images",
                JSON.stringify({ image: base64Image }),
                { headers: { "Content-Type": `application/json` } }
              )
              .then(response => {
                resolve(response?.data?.fileName);
              })
              .catch((e) => {
                toast.error("could not upload this image")
                console.log("There was a problem");
                console.log(e)
                reject(e);
              });
            //resolve(data?.fileName);
          };
          reader.readAsDataURL(image);
        }
      });
    }

    async function handleChange(event: any) {
      const files = event.target.files;
      const { data } = await axios.get("/api/handle-images/get-presigned-url")
      const { url, fields } = data
      const formData = new FormData();

      const s3Option = {
        ...fields,
        "Content-Type": files.type,
        file: files[0],
      }
      for (const name in s3Option) {
        formData.append(name, s3Option[name]);
      }
      const res = await axios.post(url, s3Option);
      console.log(res?.status);
      for (let i = 0; i < files.length; i++) {
        await sendImage(files[i])
          .catch((e) => console.log(e))
          .then((fileName) => {
            //setTimeout(() => { }, 2000);
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
                  onClick={() => onRemove(imageName)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              {url ? <Image fill className="object-cover" alt="Image" src={`${url}`} /> :
                <Image fill className="object-cover" alt="Image" src={`/images/temp/${imageName}`} />
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
