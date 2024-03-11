import { IoWalletSharp } from "react-icons/io5";
import Image from "next/image";
import {motion} from 'framer-motion';
import useDeviceType from "~/hooks/use-device-type";

const Navbar: React.FC = (): React.ReactNode => {
    const device = useDeviceType();

    return (
        <div className="fixed top-7 left-0 w-screen flex justify-center items-center z-[10] ">
            <motion.header 
                className="p-2 pl-6 bg-[#303030] shadow-sm flex justify-between items-center rounded-[14px] w-auto md:min-w-[500px] gap-8"
                whileHover={{ width: device!=="mobile" ? "600px" : "auto" }}
                initial={{ opacity: 0 }}
                animate={{opacity: 1 }}
            >
                <div className="flex gap-2.5 items-center">
                    <Image
                        src={"/assets/logo.svg"}
                        width={1000}
                        height={1000}
                        className="w-[20px] h-auto object-cover"
                        alt="logo"
                    />

                    <div className="font-inter text-sm md:text-base tracking-wide text-white font-medium">
                        Drepwatch
                    </div>
                </div>
                <motion.button 
                    className="px-4 md:px-6 py-2.5 bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] flex gap-2.5 items-center text-white rounded-lg"
                    whileHover={{scaleX: 1.025}}
                    whileTap={{scaleX: 0.995}}
                >
                    <IoWalletSharp className="text-[24px]" />
                    <div className="text-xs md:text-sm font-inter font-medium text-shadow ">
                        Connect wallet
                    </div>
                </motion.button>
            </motion.header>
        </div>
    );
};

export default Navbar;