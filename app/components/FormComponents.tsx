"use client";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import FormSelect from "@/components/ui/form/FormSelect";
import FormTextArea from "@/components/ui/form/FormTextarea";
import FormSwitch from "@/components/ui/form/FormSwitch";
import FormSlider from "@/components/ui/form/FormSlider";
import FormInputOTP from "@/components/ui/form/FormInputOTP";
import FormDatePicker from "@/components/ui/form/FormDatePicker";
import ComponentListElementWrapper from "./ComponentListElementWrapper";
import { Form } from "@/components/ui/form/Form";
import { useForm } from "react-hook-form";
import { EditableValue } from "@/components/ui/form/EditableValue";
import {
  showSuccessToast,
  // showErrorToast
} from "@/lib/toasts";
import { EditableBooleanValue } from "@/components/ui/form/EditableBooleanValue";

const FormComponents = () => {
  const form = useForm<any>({
    defaultValues: {},
    mode: "onChange",
  });

  // const updateValueMutation = useUpdateValue(
  //   () => {
  //     refetchValue();
  //     showSuccessToast("Value updated successfully");
  //   },
  //   () => {
  //     showErrorToast("Failed to update Value");
  //   },
  // );

  // const handleUpdate = async (
  //   field: string,
  //   value: string | number | boolean,
  // ) => {
  //   updateValueMutation.mutateAsync({
  //     id: someState.selectedId,
  //     payload: {
  //       [field]: value,
  //     },
  //   });
  // };
  return (
    <div className="flex flex-col gap-4">
      <h4>Form components</h4>
      <Form {...form}>
        <form className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          <ComponentListElementWrapper title="Form Text Input">
            <FormTextInput
              control={form.control}
              name="textInputExample"
              label="Input Label"
            />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Form Select">
            <FormSelect
              control={form.control}
              name="selectExample"
              label="Select Label"
              options={[
                { value: "value-1", label: "Value 1" },
                { value: "value-2", label: "Value 2" },
                { value: "value-3", label: "Value 3" },
              ]}
              className="w-full"
            />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Form Date Picker">
            <FormDatePicker control={form.control} name="datePickerExample" />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Form Switch">
            <FormSwitch
              control={form.control}
              name="switchExample"
              label="Switch Label"
            />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Form Slider">
            <FormSlider
              control={form.control}
              name="sliderExample"
              label="Slider Label"
            />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Form OTP">
            <p>OTP Label</p>
            <FormInputOTP control={form.control} name="otpExample" />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Form Text Area">
            <FormTextArea
              control={form.control}
              name="textAreaExample"
              label="Text Area Label"
            />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Editable Value">
            <EditableValue
              value={"Edit me!"}
              onConfirm={(_value) =>
                // handleUpdate function should contain the logic to update the value in your form state or backend and refetch the new value.
                // handleUpdate("fieldName", _value);
                showSuccessToast("Value updated successfully!")
              }
            />
          </ComponentListElementWrapper>

          <ComponentListElementWrapper title="Editable Boolean Value">
            <EditableBooleanValue
              value={false}
              className="w-fit"
              onConfirm={(_value) =>
                // handleUpdate function should contain the logic to update the value in your form state or backend and refetch the new value.
                // handleUpdate("fieldName", _value);
                showSuccessToast("Value updated successfully!")
              }
            />
          </ComponentListElementWrapper>
        </form>
      </Form>
    </div>
  );
};

export default FormComponents;
