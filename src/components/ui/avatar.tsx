import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut as signOutFunction } from "next-auth/react";

interface AvatarProps {
  image: string;
  name:string;
  email:string;
}

export default function Avatar({ image ,name,email}: AvatarProps) {
  console.log(image)
  return (
    <div className="ml-auto flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <img src={image} width={60} height={60} alt="Avatar" className="overflow-hidden rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuItem>{email}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=' cursor-pointer' onClick={() => signOutFunction()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
