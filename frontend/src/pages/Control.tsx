import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/account-layout";
import { getUserDecodedToken } from "@/lib/user-token";

const driverSchema = z.object({
  name: z.string().min(1),
  documentNumber: z.string().min(1),
  documentType: z.enum(["ci", "passport"]),
});

const vehicleSchema = z.object({
  type: z.enum(["car", "truck", "motorcycle"]),
  licensePlate: z.string().min(1),
  vinNumber: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1900),
  weight: z.coerce.number().min(0),
});

const controlSchema = z.object({
  driver: driverSchema,
  vehicle: vehicleSchema,
  borderId: z.string(),
  hasProblems: z.boolean(),
  problemDescription: z.string().optional(),
});

type ControlFormValues = z.infer<typeof controlSchema>;

const ControlPage: React.FC = () => {
  const form = useForm<ControlFormValues>({
    resolver: zodResolver(controlSchema),
    defaultValues: {
      driver: {
        name: "",
        documentNumber: "",
        documentType: "ci",
      },
      vehicle: {
        type: "car",
        licensePlate: "",
        vinNumber: "",
        make: "",
        model: "",
        year: new Date().getFullYear(),
        weight: 1000,
      },
      borderId: "",
      hasProblems: false,
      problemDescription: "",
    },
  });

  const [borderName, setBorderName] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [borderId, setBorderId] = useState<string | null>(null);

  useEffect(() => {
    const decoded = getUserDecodedToken();

    if (decoded === null) {
      return;
    }

    setUserId(decoded.sub);
    setBorderId(decoded.borderId);

    // Fetch border name by ID
    fetch(`http://localhost:3000/border/${decoded.borderId}`)
      .then((res) => res.json())
      .then((data) => {
        setBorderName(data.name);
      });
  }, []);

  const onSubmit = async (data: ControlFormValues) => {
    const token = localStorage.getItem("token");

    const payload = {
      ...data,
      userId,
      borderId,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create control entry");
      alert("Control entry created successfully!");
    } catch (error) {
      alert("Error creating control entry: " + error);
    }
  };

  return (
    <Layout title="New control">
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>
              Create Control Entry for {borderName || "..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Driver */}
                <FormField
                  control={form.control}
                  name="driver.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="driver.documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="driver.documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ci">CI</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vehicle */}
                <FormField
                  control={form.control}
                  name="vehicle.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="motorcycle">Motorcycle</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle.licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle.vinNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIN Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle.make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle.model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle.year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicle.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Problem Checkbox */}
                <FormField
                  control={form.control}
                  name="hasProblems"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label>Has Problems</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Problem Description */}
                <FormField
                  control={form.control}
                  name="problemDescription"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Problem Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!form.watch("hasProblems")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-2 flex justify-end">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ControlPage;
