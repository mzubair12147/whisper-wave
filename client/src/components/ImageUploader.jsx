import { useState } from "react";

const ImageUploader = ({className}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle image upload to the server here
        console.log("Image to upload:", selectedImage);
    };

    return (
        <div className={"flex flex-col items-center "+className}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full"
            >
                <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4 p-2 border rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 w-full"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Image Preview"
                        className="w-48 h-auto mb-4 border rounded p-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 w-full"
                    />
                )}
            </form>
        </div>
    );
};

export default ImageUploader;
