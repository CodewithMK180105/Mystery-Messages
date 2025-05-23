"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse"
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const Page = () => {
  const [username, setUsername]= useState('');
  const [usernameMessage, setUsernameMessage]=useState('');
  const [isCheckingUsername, setIsCheckingUsername]= useState(false); 
  const [isSubmitting, setIsSubmitting]= useState(false);

  const debouncedUsername= useDebounceCallback(setUsername, 500);
  const { toast } = useToast();
  const router=useRouter();

  const form= useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  useEffect(()=>{
    const checkUsernameUnique= async ()=>{
      if(username){
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response=await axios.get(`/api/check-username-unique?username=${username}`);
          console.log(response);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError= error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username");
        } finally {
          setIsCheckingUsername(false);
        }
      }
    }
    checkUsernameUnique();
  }
  , [username])

  const onSubmit= async (data: z.infer<typeof signUpSchema>)=>{
    setIsSubmitting(true);
    try {
      const response= await axios.post<ApiResponse>('/api/sign-up', data);
      console.log(response);
      if(!response.data.success){
        toast({
          title: "Error",
          description: response.data.message
        });
      } else {
        toast({
          title: "Success",
          description: response.data.message
        });
      }
      router.replace(`verify/${username}`);
    } catch (error) {
      console.error("Error in sign up of user ", error);
      const axiosError= error as AxiosError<ApiResponse>;
      let errorMessage= axiosError.response?.data.message;
      toast({
        title: "Sign Up failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">
            Sign up to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="username" 
                    {...field}
                    onChange={(e)=>{
                      field.onChange(e)
                      debouncedUsername(e.target.value)
                    }}
                  />
                </FormControl>
                {
                    isCheckingUsername && <Loader2 className="animate-spin"/>
                }
                <p className={`text-sm ${usernameMessage==="username is available"? "text-green-500": "text-red-500" }`}>
                    {usernameMessage}
                </p>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input 
                    placeholder="email" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your email address is 100% private — it won&apos;t be shared, seen, or read by anyone.
                </FormDescription>
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
                  <Input 
                    placeholder="password" 
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Set up a strong password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {
              isSubmitting? 
                (<>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait...
                </>) : "SignUp"
            }
          </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
            <p>
              Already a member? {' '}
              <Link href="sign-in" className="text-blue-600 hover:to-blue-800">
                Sign in
              </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Page
