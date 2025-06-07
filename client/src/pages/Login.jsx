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
import { loginUser } from "@/redux/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(values) {
    //api call
    try {
      setLoading(true);
      const response = await fetch(`${getEnv("VITE_BASE_URL")}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
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
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Form {...form}>
        <Card className="p-6 rounded-lg shadow-xl bg-background w-full max-w-md mx-auto px-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <h2 className="text-xl font-bold mb-4 text-foreground text-center ">
              Login to Your Account
            </h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="bg-transparent" />
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
                  <FormLabel className="text-muted-foreground">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} className="bg-transparent"/>
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
                  : "bg-violet-500 hover:bg-violet-600"
              }`}
            >
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <span className="text-foreground">Login</span>
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account ?{" "}
              <Link
                to="/register"
                className="hover:underline text-violet-500 hover:text-violet-600"
              >
                Sign up
              </Link>
            </p>
          </form>
        </Card>
      </Form>
    </div>
  );
};

export default Login;
