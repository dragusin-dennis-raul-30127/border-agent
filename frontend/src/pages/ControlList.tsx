import Layout from "@/components/account-layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { ControlDocument } from "../../../backend/src/control/schemas/control.schema";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
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
              <TableCell>{control.borderId.toString()}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Control data</DialogTitle>
                    </DialogHeader>
                    <pre>{control.toString()}</pre>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </Layout>
  );
}
