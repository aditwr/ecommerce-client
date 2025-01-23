import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logoutUserThunk } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { AlertDescription } from "../ui/alert";

function Logout({ children, open = false, onOpenChange = () => {} }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUserThunk());
    onOpenChange(false);
  };

  return (
    <div className="">
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="w-64">
          <AlertDialogHeader>
            <AlertDialogTitle>Want to Logout?</AlertDialogTitle>
            <AlertDescription>
              Are you sure you want to logout?
            </AlertDescription>
          </AlertDialogHeader>
          <div className="flex justify-center gap-x-4">
            <AlertDialogCancel onClick={() => onOpenChange(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Logout;
