import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import getEnv from "@/helpers/getEnv";
import showToast from "@/helpers/showToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z
    .string()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
    }),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate=useNavigate()

  async function onSubmit(values) {
   
    //api call
    try {
      setLoading(true);
      const response = await fetch(`${getEnv("VITE_BASE_URL")}/auth/register`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        credentials: "include",
        body: JSON.stringify(values), 
      });
      const data=await response.json();
    
      if(!response.ok){
        showToast("error",data.message);
        return
      }
      navigate("/login")
      showToast("success",data.message);
    } catch (error) {
      console.error("Registration error:", error.message); 
      showToast("error",error.message);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Form {...form}>
        <Card className="p-6 rounded-lg shadow-xl bg-white w-full max-w-md mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
              Create An Account
            </h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
              name="password"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <span>Signup</span>
              )}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Dont have account ?{" "}
              <Link
                to="/login"
                className="hover:underline text-blue-500 hover:text-blue-600"
              >
                Sign in
              </Link>
            </p>
          </form>
        </Card>
      </Form>
    </div>
  );
};

export default Register;
