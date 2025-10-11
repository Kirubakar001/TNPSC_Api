const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 max-sm:p-5 max-sm:px-6 rounded-xl shadow-md w-full max-w-md ">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;