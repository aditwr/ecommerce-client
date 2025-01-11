import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswordThunk } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

function ResetPasswordDialog({ dialogOpen, setDialogOpen }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const { toast } = useToast();

  const dispatch = useDispatch();

  useEffect(() => {
    if (oldPassword && newPassword && oldPassword !== newPassword) {
      setCanSubmit(true);
      setErrorMessage("");
    } else if (oldPassword && newPassword && oldPassword === newPassword) {
      setCanSubmit(false);
      setErrorMessage("New password must be different from old password.");
    } else {
      setCanSubmit(false);
    }
  }, [oldPassword, newPassword]);

  // Reset the form when dialog is closed
  useEffect(() => {
    if (!dialogOpen) {
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("");
    }
  }, [dialogOpen]);

  function handleResetPassword() {
    setErrorMessage("");
    dispatch(resetPasswordThunk({ oldPassword, newPassword })).then(
      (action) => {
        if (action.payload.success) {
          setDialogOpen(false);
          setOldPassword("");
          setNewPassword("");
          toast({
            title: action.payload.message,
          });
        } else {
          setErrorMessage(action.payload.message);
          setOldPassword("");
          setNewPassword("");
        }
      }
    );
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Reset Account Password</DialogTitle>
        <DialogDescription>
          You can reset your password here. Please provide your old password and
          new password.
        </DialogDescription>
      </DialogHeader>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="grid py-4 space-y-4">
        <div className="space-y-2">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="oldPassword" className="text-right">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="newPassword" className="text-right">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <AlertDialog>
          <AlertDialogTrigger
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            disabled={!canSubmit}
          >
            Reset Password
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Password Reset Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reset your password?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetPassword}>
                Reset Password
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogFooter>
    </DialogContent>
  );
}

export default ResetPasswordDialog;
