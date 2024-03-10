import { useState } from "react";
import { BsChatQuoteFill } from "react-icons/bs";
import Image from "next/image";

import QueAnsCard from "./cards/que-ans";
import Vote from "./cards/vote";

import { P_FILTER_TYPES, P_FILTERS, P_SMALL_WIDTHS, P_WIDTHS } from "~/constants";
import useDeviceType from "~/hooks/use-device-type";

const Profile: React.FC = (): React.ReactNode => {
    const [active, setActive] = useState<number>(P_FILTER_TYPES.QUESTIONS_ANSWERS);

    const deviceType = useDeviceType();


    const getLeftOffset = (): string => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? P_SMALL_WIDTHS : P_WIDTHS;

        const activeKeys = Object.keys(ACTIVE_WIDTHS).slice(0, active-1);
        const sum = activeKeys.reduce((acc, key) => acc + parseInt(ACTIVE_WIDTHS[parseInt(key)]!, 10), 0);

        return `${sum}px`;
    };

    const getWidth = () => {
        const ACTIVE_WIDTHS = deviceType === "mobile" ? P_SMALL_WIDTHS : P_WIDTHS;
        return ACTIVE_WIDTHS[active]
    }

    return (
        <section className="pt-[150px] md:pt-[190px] pb-20 w-full flex flex-col gap-[40px] md:gap-[90px]">
            <div className="relative flex justify-center items-center">
                <div className="absolute top-0 -translate-y-1/2 bg-primary-light text-primary font-ibm-mono text-xs md:text-[13px] px-5 py-3 rounded-[10px]">
                    730/770 Question answered
                </div>

                <div className="w-[90%] md:w-auto flex gap-6 items-center bg-white rounded-xl border border-primary-light shadow-color  pt-9  px-5 pb-7 flex-col md:flex-row ">
                    <div>
                        <Image 
                            src={"/assets/profile/img.png"}
                            width={1000}
                            height={1000}
                            className="w-[140px] aspect-square object-cover"
                            alt="img"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-tertiary font-ibm-mono text-xs md:text-sm tracking-wide text-center md:text-left">
                            uqwdbd8271gd98n13241
                        </div>
                        <div className="text-[36px] font-medium text-black font-neue-regrade ">
                            Drep of NMKR
                        </div>
                        <div className="flex gap-2.5 items-center mt-5">
                            <button className="px-4 py-2.5 bg-gradient-to-b from-[#FFC896] from-[-47.73%] to-[#FB652B] to-[78.41%] flex gap-2.5 items-center text-white rounded-lg">
                                <BsChatQuoteFill className="text-[24px]" />
                                <div className="text-xs md:text-sm font-inter font-medium text-shadow ">
                                    Ask question
                                </div>
                            </button>

                            <button className="px-4 py-2.5 bg-[#EAEAEA] flex gap-2.5 items-center text-secondary rounded-lg">
                                <div className="text-xs md:text-sm font-inter font-medium ">
                                    Delagate
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full  bg-white px-[5%] py-7 pb-12 flex justify-center items-center shadow-[-5px_0px_13px_0px_#0000001A]">
                <div className="max-w-[1600px] flex flex-col gap-6 md:gap-10 w-full">
                    <div className="w-full flex justify-between items-start md:items-center text-secondary-dark font-inter font-medium tracking-wide flex-col md:flex-row gap-2 ">
                        <div className="text-base md:text-xl">
                            Questions and answers
                        </div>
                        <div className="bg-[#EAEAEA] p-1.5 rounded-lg text-xs md:text-sm text-tertiary">
                            <div className="flex relative  ">
                                {P_FILTERS.map((filter) => (
                                    <div
                                        key={filter.type}
                                        className={`relative z-[1] px-2 py-1.5 ${active === filter.type ? "text-black " : "text-tertiary"} transition-all duration-200 cursor-pointer`}
                                        onClick={() => setActive(filter.type)}
                                    >
                                        {filter.label}
                                    </div>
                                ))}

                                <div 
                                    className="absolute bg-white mix-blend-overlay shadow-md top-0 left-0 bottom-0 h-full rounded-md transition-all duration-200 z-0" 
                                    style={{left: getLeftOffset(), width: getWidth()}}
                                />
                            </div>
                        </div>
                    </div>

                    {
                        active === P_FILTER_TYPES.QUESTIONS_ANSWERS  &&
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {
                                    Array(4).fill(0).map((_, i) => (
                                        <QueAnsCard key={i} />
                                    ))
                                }
                            </div>
                    }

                    {
                        active === P_FILTER_TYPES.VOTES && 
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {
                                    Array(6).fill(0).map((_, i) => (
                                        <Vote key={i} />
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Profile;