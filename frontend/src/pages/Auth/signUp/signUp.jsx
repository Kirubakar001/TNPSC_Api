import AuthLayout from "@/layouts/AuthLayout";
import SignUpForm from "@/UI/signUp/signUpForm";

const SignUp = () => {
    return (
        <AuthLayout>
            <h2 className="mb-6 text-center text-2xl font-bold max-sm:mb-3">Sign Up</h2>
            <SignUpForm />
        </AuthLayout>
    );
};

export default SignUp;
