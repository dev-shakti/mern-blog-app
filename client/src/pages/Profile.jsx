import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import showToast from "@/helpers/showToast";
import getEnv from "@/helpers/getEnv";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/redux/authSlice";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email(),
  bio: z.string().min(3, {
    message: "Bio must be at least 6 characters.",
  }),
});

const Profile = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(user?._id || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      bio: user?.bio || "",
    },
  });

  function handleFile(acceptedFiles) {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a preview URL
      setImage(imageUrl);
      setFile(file); // Store the file for upload
    }
  }

  async function onSubmit(values) {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("data", JSON.stringify(values));

    //api call
    try {
      setLoading(true);
      const response = await fetch(
        `${getEnv("VITE_BASE_URL")}/auth/${userId}/profile-update`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      dispatch(loginUser(data.user));
      navigate("/");
      showToast("success", data.message);
    } catch (error) {
      console.error("Registration error:", error.message);
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (user?._id) {
      setUserId(user._id);
    }
  }, [user]);

  return (
    <div className="p-4 md:p-6">
      <Form {...form}>
        <Card className="w-full mx-auto max-w-4xl bg-white rounded-lg shadow-xl">
          <CardContent>
            <div className="flex justify-center mb-4">
              <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Avatar className="w-24 h-24 relative overflow-hidden rounded-full">
                        {/* Avatar Image */}
                        <AvatarImage
                          src={image ? image : user?.profileImage}
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>

                        {/* Overlay with Camera Icon */}
                        <div className="absolute inset-0 cursor-pointer bg-gray-200 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <CameraIcon className="w-6 h-6 text-gray-700" />
                        </div>
                      </Avatar>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
              Update your Profile
            </h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your Bio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                type="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Saving" : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};

export default Profile;
