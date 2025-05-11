
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from '@/components/Header';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, User } from 'lucide-react';

const profileFormSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }).max(30, {
    message: "Display name cannot be longer than 30 characters.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(20, {
    message: "Username cannot be longer than 20 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio cannot be longer than 160 characters.",
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const EditProfile = () => {
  const navigate = useNavigate();
  
  const defaultValues: ProfileFormValues = {
    displayName: "Alice Renderer",
    username: "alice_renderer",
    bio: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = (data: ProfileFormValues) => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col dark bg-gradient-to-br from-background to-background/95">
      <Header />
      
      <main className="flex-1 container py-6 md:py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={() => navigate('/profile')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl font-medium tracking-tight">Edit Profile</h1>
          </div>
          
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            className="bg-electric-blue hover:bg-electric-blue/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
        
        <Card className="p-6 frost-panel max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
            <div className="relative h-24 w-24 rounded-full bg-glow-gradient shadow-glow-md overflow-hidden">
              <div className="absolute inset-[2px] rounded-full bg-card flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xs font-medium text-white">Change</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-1">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                Upload a profile picture or avatar for your account.
              </p>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Display Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                      <Input placeholder="Tell us about yourself" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default EditProfile;
