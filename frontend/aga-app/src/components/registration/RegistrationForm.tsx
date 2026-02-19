import InputName from "../ui/InputName";
import InputLastName from "../ui/InputLastName";
import InputLogin from "../ui/InputLogin";
import InputPassword from "../ui/InputPassword";
import InputConfirmPassword from "../ui/InputConfirmPassword";
import InputEmail from "../ui/InputEmail";
import ButtonSignUp from "../ui/ButtonSignUp";

interface RegistrationFormProps {
  formData: {
    name: string;
    secondName: string;
    login: string;
    password: string;
    confirmPassword: string;
    email: string;
  };
  setFormData: (value: any) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RegistrationForm(props: RegistrationFormProps) {
  const setField = (field: keyof typeof props.formData) => (value: string) => {
    props.setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <InputName name={props.formData.name} setName={setField("name")} />
      <InputLastName
        lastName={props.formData.secondName}
        setLastName={setField("secondName")}
      />
      <InputLogin login={props.formData.login} setLogin={setField("login")} />
      <InputPassword
        password={props.formData.password}
        setPassword={setField("password")}
      />
      <InputConfirmPassword
        confirmPassword={props.formData.confirmPassword}
        setConfirmPassword={setField("confirmPassword")}
        passwordValue={props.formData.password}
      />
      <InputEmail email={props.formData.email} setEmail={setField("email")} />
      <ButtonSignUp
        formData={props.formData}
        handleSubmit={props.handleSubmit}
      />
    </>
  );
}
