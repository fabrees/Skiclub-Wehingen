"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog } from "@prisma/client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import DeleteButton from "@/app/admin/components/DeleteBlogButton";
import EditBlogButton from "@/app/admin/components/EditBlogButton";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  //nur für das Dropdownmenü wichtig
  const [position, setPosition] = React.useState("bottom");

  useEffect(() => {
    // Abrufen der Blogdaten vom Server
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);


return (
  <div className="mb-12">
    <div className="mx-auto flex max-w-4xl flex-col">
      <h1 className="font-bold md:text-5xl tracking-tight text-3xl">
        Verwaltung aller Rundmails
      </h1>

      <p className="mt-3 mb-10 ">
        Bearbeite alle bereits erstellten Rundmails
      </p>

      <div className="w-full">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full  place-self-end">
            <Card className="p-5 mt-6 shadow-md">
              <CardContent className="pb-0 flex flex-row items-center justify-between gap-4 break-words">
                {blog.title}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Bearbeiten</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-50 mt-1 py-1 px-2 rounded-md ">
                    <DropdownMenuLabel className="border-b-2">
                      Bearbeitungsmöglichkeiten
                    </DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={setPosition}
                      className="mt-2"
                    >
                      <div>
                        <DropdownMenuRadioItem
                          value="top"
                          className="hover:cursor-pointer py-1 px-2 rounded-lg"
                        >
                          <DeleteButton blogId={blog.id} />
                        </DropdownMenuRadioItem>
                      </div>
                      <div>
                        <DropdownMenuRadioItem
                          value="top"
                          className="hover:cursor-pointer py-1 px-2 rounded-lg"
                        >
                          <EditBlogButton blogId={blog.id} />
                        </DropdownMenuRadioItem>
                      </div>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default AdminDashboard;
