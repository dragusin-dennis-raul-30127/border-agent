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
import { UserFormValues, userSchema } from "@/lib/schemas/user-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BorderDocument } from "../../../backend/src/border/border.schema";

interface UserAddFormProps {
  onSave: (data: UserFormValues) => Promise<void>;
}

export default function UserAddForm({ onSave }: UserAddFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      badgeNumber: 0,
      borderId: "",
      isAdmin: false,
    },
  });

  const [borders, setBorders] = useState<BorderDocument[]>([]);

  const getBorders = async () => {
    try {
      const resp = await fetch("http://localhost:3000/border");
      const json = await resp.json();
      setBorders(json);
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
        id="add-user-form"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
