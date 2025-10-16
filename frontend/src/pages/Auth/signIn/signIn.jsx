import AuthLayout from "@/layouts/AuthLayout";
import SignInForm from "@/UI/signIn/signInForm";

const SignIn = () => {
    return (
        <AuthLayout>
            <h2 className="mb-6 text-center text-2xl font-bold max-sm:mb-3">Sign In</h2>
            <SignInForm />
        </AuthLayout>
    );
};

export default SignIn;
