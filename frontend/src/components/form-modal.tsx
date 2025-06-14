import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
  form: string;
  open: boolean;
  onOpenChange: any;
  entityId?: string;
};

export default function FormModal(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        {props.children}
        <DialogFooter>
          <DialogClose asChild>
            <div>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogClose>
          <Button type="submit" form={props.form}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
