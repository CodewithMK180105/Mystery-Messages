"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
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
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"

const Page = () => { 
  const [isSubmitting, setIsSubmitting]= useState(false);

  const { toast } = useToast();
  const router=useRouter();

  const form= useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  })


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
  
    try {
      const result = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      });
  
      if (result?.error) {
        toast({
          title: "Login Failed",
          description: "Incorrect username/email or password",
          variant: "destructive",
        });
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">
            Welcome back to your anonymous journey
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="email/username" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your email or the Username
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
                  Enter your password
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
                </>) : "SignIn"
            }
          </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
            <p>
              Don&apos;t have an account? {' '}
              <Link href="sign-up" className="text-blue-600 hover:to-blue-800">
                Sign up
              </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Page
