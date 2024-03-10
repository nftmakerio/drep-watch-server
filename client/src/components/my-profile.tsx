import Image from "next/image";
import QueAnsCard from "./cards/que-ans";
import { BsChatQuoteFill } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";

const MyProfile: React.FC = (): React.ReactNode => {
    return (
        <section className="pt-[120px] md:pt-[190px] pb-20 w-full flex flex-col gap-[40px] md:gap-[90px]">
            <div className="relative flex justify-center items-center">
                <div className="w-[90%] md:w-auto flex gap-6 items-center bg-white rounded-xl border border-primary-light shadow-color flex-col md:flex-row ">
                    <div className="flex flex-col md:flex-row divide-y md:divide-x divide-brd-clr ">
                        <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center p-8 pb-6 md:pr-6 ">
                            <Image 
                                src={"/assets/profile/user.png"}
                                width={1000}
                                height={1000}
                                className="w-[140px] aspect-square object-cover"
                                alt="img"
                            />
                            <div className="max-w-[290px] truncate text-[28px] md:text-[36px] text-black ">
                                aspinnqenfnqwiaklasdkjf
                            </div>
                        </div>

                        <div className="p-8 pt-6 md:py-4 md:pl-6 flex flex-col gap-2 items-center justify-center ">
                            <div className="font-ibm-mono text-xs md:text-sm text-tertiary">
                                Delegated to
                            </div>
                            <Image 
                                src={"/assets/profile/img.png"}
                                width={1000}
                                height={1000}
                                className="w-[60px] aspect-square object-cover"
                                alt="img"
                            />

                            <div className="rounded-lg bg-primary-light px-[18px] py-2 font-semibold text-primary font-ibm-mono text-xs md:text-[13px] tracking-wide">
                                uqwdbd8271gd98n13241
                            </div>
                            
                            <button className="flex gap-2 items-center font-inter text-sm tracking-wide text-primary mt-2">
                                <div>
                                    View profile
                                </div>

                                <GoArrowRight className="text-lg md:text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full  bg-white px-[5%] py-7 pb-12 flex justify-center items-center shadow-[-5px_0px_13px_0px_#0000001A]">
                <div className="max-w-[1600px] flex flex-col gap-6 md:gap-10 w-full">
                    <div className="w-full flex justify-between items-start md:items-center text-secondary-dark font-inter font-medium tracking-wide flex-col md:flex-row gap-2 ">
                        <div className="text-base md:text-xl">
                            Your Question answers
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {
                            Array(1).fill(0).map((_, i) => (
                                <QueAnsCard key={i} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;