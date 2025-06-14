import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BorderDocument } from "../../../backend/src/border/border.schema";
import { UserDocument } from "../../../backend/src/user/user.schema";
import {
  UserUpdateFormValues,
  userUpdateSchema,
} from "@/lib/schemas/user-update-schema";

interface UserEditFormProps {
  user: UserDocument;
  onSave: (data: UserUpdateFormValues) => Promise<void>;
}

export default function UserEditForm({ user, onSave }: UserEditFormProps) {
  const form = useForm<UserUpdateFormValues>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      badgeNumber: user.badgeNumber,
      borderId: user.borderId.toString(),
      isAdmin: user.isAdmin,
    },
  });

  const [borders, setBorders] = useState<BorderDocument[]>([]);

  const getBorders = async () => {
    try {
      const resp = await fetch("http://localhost:3000/border");
      const json = await resp.json();
      setBorders(json);
      console.log("border data:", json);
    } catch (e) {
      console.error("whoops", e);
    }
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Form {...form}>
      <form
        id="update-user-form"
        onSubmit={form.handleSubmit(onSave)}
        className="grid gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="badgeNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badge Number</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="borderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Border</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select border" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {borders.map((border) => (
                    <SelectItem key={border.id} value={border._id.toString()}>
                      {border.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
