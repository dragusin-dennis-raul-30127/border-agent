import Layout from "@/components/account-layout";
import { AlertDialogDemo } from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import { BorderFormValues } from "@/lib/schemas/border-schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { BorderDocument } from "../../../backend/src/border/border.schema";
import BorderEditForm from "@/components/edit-border-form";
import FormModal from "@/components/form-modal";
import BorderAddForm from "@/components/add-border-form";
import { Card, CardContent } from "@/components/ui/card";

export default function Borders() {
  const [borders, setBorders] = useState<BorderDocument[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalBorder, setEditModalBorder] = useState<BorderDocument>();

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

  async function updateBorder(id: any, data: BorderFormValues) {
    try {
      await fetch(`http://localhost:3000/border/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      loadData();
      setEditModalOpen(false);
    } catch (e) {
      console.error("whoops", e);
    }
  }

  async function addBorder(data: BorderFormValues) {
    try {
      await fetch(`http://localhost:3000/border`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      loadData();
      setAddModalOpen(false);
    } catch (e) {
      console.error("whoops", e);
    }
  }

  const editBorder = (border: BorderDocument) => {
    setEditModalBorder(border);
    setEditModalOpen(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout title="Borders">
      <div className="">
        <FormModal
          open={addModalOpen}
          onOpenChange={setAddModalOpen}
          trigger={
            <Button variant="default" className="mb-5">
              <Plus /> Create new
            </Button>
          }
          title={"Add Border"}
          form={"add-border-form"}
        >
          <BorderAddForm onSave={(data) => addBorder(data)} />
        </FormModal>
      </div>

      <FormModal
        title={"EditBorder"}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        form={"edit-border-form"}
      >
        {editModalBorder && (
          <BorderEditForm
            border={editModalBorder}
            onSave={(data) =>
              updateBorder(editModalBorder._id.toString(), data)
            }
          />
        )}
      </FormModal>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[33%px]">Name</TableHead>
                <TableHead className="w-[33%px]">Latitude</TableHead>
                <TableHead className="w-[33%px]">Longitude</TableHead>
                <TableHead className="w-[33%px] text-right">
                  Management
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borders.map((border) => (
                <TableRow key={border._id.toString()}>
                  <TableCell className="font-medium">{border.name}</TableCell>
                  <TableCell>{border.latitude}</TableCell>
                  <TableCell>{border.longitude}</TableCell>
                  <TableCell className="flex gap-1 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => editBorder(border)}
                    >
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
        </CardContent>
      </Card>
    </Layout>
  );
}
