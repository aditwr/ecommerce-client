import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";

function CustomForm({
  formControls,
  formData,
  setFormData,
  handleSubmit,
  buttonText,
  canSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        {formControls.map((control) => {
          switch (control.elementType) {
            case "input":
              return (
                <div key={control.name} className="space-y-1">
                  <Label htmlFor={control.name}>{control.label}</Label>
                  <Input
                    id={control.name}
                    name={control.name}
                    type={control.type}
                    placeholder={control.placeholder}
                    value={formData[control.name]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [control.name]: e.target.value,
                      })
                    }
                  />
                </div>
              );
            case "textarea":
              return (
                <div key={control.name} className="flex flex-col space-y-2">
                  <Label htmlFor={control.name}>{control.label}</Label>
                  <Textarea
                    id={control.name}
                    name={control.name}
                    placeholder={control.placeholder}
                    value={formData[control.name]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [control.name]: e.target.value,
                      })
                    }
                    className=""
                  />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
      <div className="flex justify-end mt-4">
        <Button {...{ disabled: !canSubmit }} type="submit">
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CustomForm;
