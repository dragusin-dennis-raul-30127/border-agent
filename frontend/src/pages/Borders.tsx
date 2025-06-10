import Layout from "@/components/account-layout";
import { AlertDialogDemo } from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { BorderDocument } from "../../../backend/src/border/border.schema";

export default function Borders() {
  const [borders, setBorders] = useState<BorderDocument[]>([]);

  const loadData = async () => {
    try {
      const resp = await fetch("http://localhost:3000/border");
      const json = await resp.json();
      setBorders(json);
      console.log("border data:", json);
    } catch (e) {
      console.error("whoops", e);
    }
  };

  async function deleteBorder(id: any) {
    try {
      await fetch(`http://localhost:3000/border/delete/${id}`, {
        method: "DELETE",
      });
      loadData();
    } catch (e) {
      console.error("whoops", e);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout title="Borders">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[33%px]">Name</TableHead>
            <TableHead className="w-[33%px]">Lat long</TableHead>
            <TableHead className="w-[33%px] text-right">Management</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borders.map((border) => (
            <TableRow key={border.id}>
              <TableCell className="font-medium">{border.name}</TableCell>
              <TableCell>
                {border.latitude} {border.longitude}
              </TableCell>
              <TableCell className="flex gap-1 justify-end">
                <Button variant="outline">
                  <Pen />
                </Button>
                <AlertDialogDemo
                  button={
                    <Button variant="destructive">
                      <Trash />
                    </Button>
                  }
                  onClick={() => deleteBorder(border._id)}
                ></AlertDialogDemo>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
