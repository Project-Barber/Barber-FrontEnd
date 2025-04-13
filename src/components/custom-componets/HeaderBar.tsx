import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function HeaderBar() {
    return (
        <div className="flex h-20 items-center bg-[#393535] justify-between px-64 shadow-md">
            <Link to={"/"}>
                <img
                    src="src/assets/paulista-logo-branco-removebg-preview 2.png"
                    alt="logo-rcc-pb"
                    className="h-[200px] w-[280px] mt-25 "
                />
            </Link>
            <div className="flex items-center gap-5">
                <button className="font-semibold hover:cursor-pointer text-white hover:text-gray-300">Sobre</button>
                <button className="font-semibold hover:cursor-pointer text-white hover:text-gray-300">Cadastrar</button>
                <Button className="w-28  text-white bg-[#7B1216] hover:bg-[#7b1215dc] hover:cursor-pointer hover:text-gray-300">
                    Login
                </Button>
            </div>
        </div>

    )
}