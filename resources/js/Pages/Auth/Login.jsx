import Buttons from "@/Components/Buttons";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import ApplicationLogo from "@/Components/ApplicationLogo";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* CONTAINER DUA KOLOM */}
            <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 bg-white rounded-lg shadow-2xl overflow-hidden select-none w-full max-w-4xl min-h-[500px]">
                {/* KOLOM KIRI */}
                <div className="p-8 bg-gray-200/50 hidden sm:flex flex-col justify-between">
                    {/* Logo GIPM */}
                    <div className="flex items-center space-x-2">
                        <ApplicationLogo className="w-8 h-8 fill-current text-gray-800" />
                        <span className="text-xl font-bold">GiPM</span>
                    </div>

                    {/* Teks Utama */}
                    <div className="mt-8">
                        <h1 className="text-3xl font-extrabold leading-tight text-gray-900">
                            GiPM. <br />
                            Project Management, <br />
                            simplified.
                        </h1>
                        <p className="mt-4 text-sm text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Mauris felis.
                        </p>
                    </div>
                </div>

                {/* KOLOM KANAN */}
                <div className="p-8 flex flex-col">
                    {/* Logo */}
                    <div className="flex justify-center items-center mb-6 space-x-2">
                        <ApplicationLogo className="w-10 h-10 fill-current text-gray-800" />
                        <span className="text-3xl font-bold">GiPM</span>
                    </div>

                    <h2 className="text-2xl font-semibold">Log in</h2>

                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mt-4">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 underline hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot Password
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-center mt-6">
                            <Buttons
                                variant="primary"
                                onClick={submit}
                                disabled={processing}
                            >
                                LOG IN
                            </Buttons>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
