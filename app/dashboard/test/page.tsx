"use client"
import { ImagePlus } from "lucide-react"
import axios from "axios";
import Image from "next/image"

export default function TestPage() {
  async function handleChange(event: any) {
    console.log("event : ", event);
    console.log("event.target: ", event.target.value);
    const formData = new FormData();
    formData.append("images", event.target.files[0]);
    formData.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });
    //const { status } = await axios.post("http://localhost:3000/api/handle-images", formData, { headers: { 'Content-Type': `multipart/form-data` } })
    //console.log("client response", status);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log("submited");
    console.log("event : ", event);
    console.log("event.target: ", event.target);
    const formData = new FormData(event.target);
    formData.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });

    await fetch("http://localhost:3000/api/handle-images", {
      method: "POST",
      body: formData,
      headers: { 'Content-Type': `multipart/form-data; boundary="a180b5d870827"` }
    }).catch(e => console.log(e));
    console.log("server response :", status);
  }

  return <div className="flex justify-center items-center">
    <Image src="/images/cfcdf88bf3f54.jpeg" height={400} width={400} alt="just an image" />
    <form onSubmit={handleSubmit}>
      <input
        type={"file"}
        id={"file"}
        name="images"
        className="hidden"
        onChange={(event) => handleChange(event)}
        multiple
      />
      <label htmlFor={"file"} className="flex bg-gray-200 justify-center font-semibold gap-2 mx-[5px] my-0 items-center w-[220px] h-[50px] text-[15px] text-center rounded-[5px] cursor-pointer" >
        Upload an Image
        <ImagePlus className="h-5 w-5 mr-2" />
      </label>
      <button className="bg-black text-white p-4" type={"submit"}>Submit</button> </form>
  </div>
}

export const config = {
  api: {
    bodyParser: false,
  },
};
