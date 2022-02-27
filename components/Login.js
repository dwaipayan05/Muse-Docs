import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import {providers, getSession, signIn} from "next-auth/client";
import Logo from "../assets/logo.png";

function Login({ providers, session }) {
    return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image
        src = {Logo}
        height = "300"
        width = "550"
        objectFit="contain"
        />

        <Button
            className = "w-44 mt-1 ml-5"
            color = "lightBlue"
            buttonType = "filled"
            ripple = "light"
            onClick = {() => signIn()}>
                Login With Google
        </Button>
    </div>
    );
}

Login.getInitialProps = async (context) => {
    return{
        providers: await providers(context),
        session: await getSession(context)
    }
}
export default Login;
