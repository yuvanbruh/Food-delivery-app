
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import Menu from "@/app/models/menuitems"; // Assuming your Menu model
import connectMongoDB from "@/lib/mongodb";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const action = formData.get("action"); // 'upload' or 'create'

  if (action === "upload") {
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to buffer

    try {
      const cloudinaryResponse = await new Promise((resolve, reject) => {
        const result = cloudinary.v2.uploader.upload_stream(
          { folder: "menu_images" },
          (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );
        result.write(buffer);
        result.end();
      });

      return NextResponse.json(
        { imageUrl: cloudinaryResponse.secure_url, message: "File uploaded successfully." },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during upload:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else if (action === "create") {
    const name = formData.get("name");
    const desc = formData.get("desc");
    const baseprice = formData.get("baseprice");
    const file = formData.get("file");

    if (!name || !desc || !file) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
       const cloudinaryResponse = await new Promise((resolve, reject) => {
             const result = cloudinary.v2.uploader.upload_stream(
               { folder: "nextjs14_uploads" },
               async (error, response) => {
                 if (error) {
                   reject(error); // Reject promise if error occurs
                 } else {
                   resolve(response); // Resolve promise with the response
                 }
               }
             );
       
             result.write(buffer);
             result.end();
           });
       
           // Successfully uploaded image
           console.log("Cloudinary Response:", cloudinaryResponse);
       
    try {
      await connectMongoDB();
      const newMenuItem = await Menu.create({
        name,
        desc,
        userImage: cloudinaryResponse.secure_url,
        baseprice,
      });

      return NextResponse.json({ imageUrl: cloudinaryResponse.secure_url }, { status: 200 });

      
    } catch (error) {
      console.error("Error during database save:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }
}
export async function GET() {
        await connectMongoDB()
        const finduser = await Menu.find()
     if(finduser){
        return NextResponse.json({finduser,ok:true})
     }
     else{
        return NextResponse.json({message:"users not found",ok:false})
     }
    }
   
        export async function PUT(req) {
            const formData = await req.formData();
            const action = formData.get("action"); // 'upload' or 'create'
          
            if (action === "upload") {
              const file = formData.get("file");
              if (!file) {
                return NextResponse.json({ error: "No file provided." }, { status: 400 });
              }
          
              const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to buffer
          
              try {
                const cloudinaryResponse = await new Promise((resolve, reject) => {
                  const result = cloudinary.v2.uploader.upload_stream(
                    { folder: "menu_images" },
                    (error, response) => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(response);
                      }
                    }
                  );
                  result.write(buffer);
                  result.end();
                });
          
                return NextResponse.json(
                  { imageUrl: cloudinaryResponse.secure_url, message: "File uploaded successfully." },
                  { status: 200 }
                );
              } catch (error) {
                console.error("Error during upload:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
              }
            } else if (action === "create") {
              const name = formData.get("name");
              const _id = formData.get("id");
              const desc = formData.get("desc");
              const baseprice = formData.get("baseprice");
              const file = formData.get("file");
              const sizes= JSON.parse(formData.get("sizes"))
              const ingredients=JSON.parse(formData.get("ingredients"))
              const category = formData.get("category")
          
              if (!name || !desc || !file) {
                return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
              }
          
              const buffer = Buffer.from(await file.arrayBuffer());
              const cloudinaryResponse = await new Promise((resolve, reject) => {
                const result = cloudinary.v2.uploader.upload_stream(
                  { folder: "nextjs14_uploads" },
                  async (error, response) => {
                    if (error) {
                      reject(error); // Reject promise if error occurs
                    } else {
                      resolve(response); // Resolve promise with the response
                    }
                  }
                );
          
                result.write(buffer);
                result.end();
              });
          
              // Successfully uploaded image
              console.log("Cloudinary Response:", cloudinaryResponse);
          
              try {
                await connectMongoDB();
          
                // Update the menu item with the new details and image URL
                const updatedMenuItem = await Menu.findByIdAndUpdate(
                  _id,
                  {
                    name,
                    desc,
                    baseprice,
                    userImage: cloudinaryResponse.secure_url,
                    sizes,
                    ingredients,
                    category // Update image URL
                  },
                  { new: true } // Make sure to return the updated document
                );
          
                if (!updatedMenuItem) {
                  return NextResponse.json({ error: "Menu item not found." }, { status: 404 });
                }
          
                return NextResponse.json(
                  { updatedMenuItem, message: "Menu item updated successfully." },
                  { status: 200 }
                );
              } catch (error) {
                console.error("Error during database save:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
              }
            } else {
              return NextResponse.json({ error: "Invalid action." }, { status: 400 });
            }
          }
          export async function DELETE(req){
            const url = new URL(req.url)
            const _id = url.searchParams.get("id")
            console.log(_id,"id")
          const deleted=   await  Menu.deleteOne({_id})
            if (deleted){
              return NextResponse.json({ok:true})
            }
            return NextResponse.json({ok:false})
            
         }