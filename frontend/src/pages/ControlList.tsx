import Layout from "@/components/account-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { ControlDocument } from "../../../backend/src/control/schemas/control.schema";
import Modal from "@/components/modal";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ControlList() {
  const [controls, setControls] = useState<ControlDocument[]>([]);

  async function getControls() {
    try {
      const data = await fetch(`http://localhost:3000/control`);
      setControls(await data.json());
    } catch (e) {
      console.error("whoops", e);
    }
  }

  // async function getBorderName(id: any) {
  //   try {
  //     const data = await fetch(`http://localhost:3000/border/${id}`);
  //     setBorder(await data.json());
  //   } catch (e) {
  //     console.error("whoops", e);
  //   }
  // }

  useEffect(() => {
    getControls();
  }, []);

  return (
    <Layout title="Controls">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Driver</TableHead>
            <TableHead>License plate</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Border</TableHead>
            <TableHead className="text-right">Management</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controls.map((control) => (
            <TableRow key={control.id}>
              <TableCell className="font-medium">
                {control.driver.name}
              </TableCell>
              <TableCell>{control.vehicle.licensePlate}</TableCell>
              <TableCell>{control.date}</TableCell>
              <TableCell>{control.borderId?.name}</TableCell>
              <TableCell className="text-right">
                <Modal
                  title="Control Details"
                  trigger={<Button variant="outline">Details</Button>}
                >
                  <div className="grid grid-cols-2 grid-rows-2 w-full gap-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Driver Info</CardTitle>
                        <CardDescription>
                          Name: {control.driver.name}
                        </CardDescription>
                        <CardDescription>
                          Document: {control.driver.documentType.toUpperCase()}-
                          {control.driver.documentNumber}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Vehicle Info</CardTitle>
                        <CardDescription>
                          Type: {control.vehicle.type.toUpperCase()}
                        </CardDescription>
                        <CardDescription>
                          Make: {control.vehicle.make.toUpperCase()}
                        </CardDescription>
                        <CardDescription>
                          Model: {control.vehicle.model.toUpperCase()}
                        </CardDescription>
                        <CardDescription>
                          Year: {control.vehicle.year}
                        </CardDescription>
                        <CardDescription>
                          License Plate: {control.vehicle.licensePlate}
                        </CardDescription>
                        <CardDescription>
                          VIN Number: {control.vehicle.vinNumber}
                        </CardDescription>
                        <CardDescription>
                          Weight: {control.vehicle.weight} KG
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Additional Info</CardTitle>
                        <CardDescription>
                          Border: {control.borderId?.name}
                        </CardDescription>
                        <CardDescription>Date: {control.date}</CardDescription>
                        <CardDescription>
                          Agent Name: {control.userId?.name}
                        </CardDescription>
                        {control.hasProblems ? (
                          <CardDescription>
                            Problems: {control.problemDescription}
                          </CardDescription>
                        ) : (
                          <CardDescription>No problems</CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  </div>
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
