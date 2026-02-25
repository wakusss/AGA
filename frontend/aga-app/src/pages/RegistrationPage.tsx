import RegistrationForm from "../components/registration/RegistrationForm";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

function Register() {
  return (
    <main className="flex">
      <div className="w-2/3 relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <StarsBackground />
        </div>
        <div className="min-h-screen flex flex-col justify-center items-center relative text-center ">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary-light-mode)] tracking-tight">
            Welcome to AGAChat
          </h1>
          <p className="mt-3 text-lg text-[var(--color-text-primary-light-mode)] max-w-md z-index-30">
            A place to talk openly with people from other countries. No borders,
            no judgment — just real conversations.
          </p>
        </div>
      </div>
      <div className="w-1/3 min-h-screen flex flex-col justify-center items-center">
        <RegistrationForm />
        <div>
          <a
            href="/signin"
            className="text-[var(--color-primary-light-mode)] active:brightness-90 hover:brightness-110 hover:saturate-125 transition-all duration-150"
          >
            You already have an account?
          </a>
        </div>
      </div>
    </main>
  );
}

export default Register;
