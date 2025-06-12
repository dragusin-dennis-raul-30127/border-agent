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
import { BorderFormValues, borderSchema } from "@/lib/schemas/border-schema";
import { BorderDocument } from "../../../backend/src/border/border.schema";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface BorderEditFormProps {
  border: BorderDocument;
  onSave: (data: BorderFormValues) => Promise<void>;
}

export default function BorderEditForm({
  border,
  onSave,
}: BorderEditFormProps) {
  const form = useForm<BorderFormValues>({
    resolver: zodResolver(borderSchema),
    defaultValues: {
      name: border.name,
      latitude: border.latitude,
      longitude: border.longitude,
      areTrucksAllowed: border.areTrucksAllowed,
    },
  });

  return (
    <Form {...form}>
      <form
        id="edit-border-form"
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
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="areTrucksAllowed"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Label>Can trucks pass?</Label>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
