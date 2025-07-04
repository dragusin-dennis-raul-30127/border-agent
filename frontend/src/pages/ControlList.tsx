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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BorderDocument } from "../../../backend/src/border/border.schema";
import { UserDocument } from "../../../backend/src/user/user.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ControlList() {
  const [controls, setControls] = useState<ControlDocument[]>([]);
  const [borders, setBorders] = useState<BorderDocument[]>([]);
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [borderId, setBorderId] = useState("*");
  const [userId, setUserId] = useState("*");

  useEffect(() => {
    const getBorders = async () => {
      try {
        const resp = await fetch("http://localhost:3000/border");
        const json = await resp.json();
        setBorders(json);
      } catch (e) {
        console.error("whoops", e);
      }
    };

    getBorders();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await fetch("http://localhost:3000/user");
        const json = await resp.json();
        setUsers(json);
      } catch (e) {
        console.error("whoops", e);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    async function getControls() {
      try {
        const data = await fetch(
          `http://localhost:3000/control?userId=${userId}&borderId=${borderId}`
        );
        setControls(await data.json());
        console.log("border name:", data);
      } catch (e) {
        console.error("whoops", e);
      }
    }
    getControls();
  }, [userId, borderId]);

  return (
    <Layout title="Controls">
      {users.length && borders.length && (
        <Card>
          <CardContent className="flex gap-2">
            <Select value={borderId} onValueChange={setBorderId}>
              <SelectTrigger>
                <SelectValue placeholder="Select border" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">All borders</SelectItem>
                {borders.map((border) => (
                  <SelectItem
                    key={border._id.toString()}
                    value={border._id.toString()}
                  >
                    {border.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="*" value="*">
                  All agents
                </SelectItem>
                {users.map((user) => (
                  <SelectItem
                    key={user._id.toString()}
                    value={user._id.toString()}
                  >
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      <Card className="mt-5">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Driver</TableHead>
                <TableHead>License plate</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Border</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.map((control) => (
                <TableRow key={control._id.toString()}>
                  <TableCell className="font-medium">
                    {control.driver.name}
                  </TableCell>
                  <TableCell>{control.vehicle.licensePlate}</TableCell>
                  <TableCell>
                    {control.date instanceof Date
                      ? control.date.toLocaleString()
                      : String(control.date)}
                  </TableCell>
                  <TableCell>{control.borderId?.name}</TableCell>
                  <TableCell>{control.userId?.name}</TableCell>
                  <TableCell className="text-right">
                    <Modal
                      title="Control Details"
                      trigger={<Button variant="outline">Details</Button>}
                    >
                      <div className="flex flex-col w-full gap-3">
                        <Card>
                          <CardHeader>
                            <CardTitle>Driver Info</CardTitle>
                            <CardDescription>
                              Name: {control.driver.name}
                            </CardDescription>
                            <CardDescription>
                              Document:{" "}
                              {control.driver.documentType.toUpperCase()}-
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
                            <CardDescription>
                              Date: {control.date}
                            </CardDescription>
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
        </CardContent>
      </Card>
    </Layout>
  );
}
